import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { vi, describe, beforeEach, test, expect } from 'vitest'
import { MemoryRouter } from 'react-router'
import Register from '../components/Register'

const mockNavigate = vi.fn()

vi.mock('react-router', async () => {
    const actual = await vi.importActual<typeof import('react-router')>('react-router')
    return {
        ...actual,
        useNavigate: () => mockNavigate,
    }
})

describe('Register Component', () => {
    beforeEach(() => {
        mockNavigate.mockClear()
        vi.resetAllMocks()
    })

    test('renders register form elements', () => {
        render(
            <MemoryRouter>
                <Register />
            </MemoryRouter>
        )

        expect(screen.getByTestId('register-page')).toBeInTheDocument()
        expect(screen.getByTestId('register-title')).toBeInTheDocument()
        expect(screen.getByTestId('username-input')).toBeInTheDocument()
        expect(screen.getByTestId('password-input')).toBeInTheDocument()
        expect(screen.getByTestId('submit-register')).toBeInTheDocument()
        expect(screen.getByTestId('go-to-login')).toBeInTheDocument()
    })

    test('allows user to type into inputs', async () => {
        render(
            <MemoryRouter>
                <Register />
            </MemoryRouter>
        )

        const usernameInput = screen.getByTestId('username-input')
        const passwordInput = screen.getByTestId('password-input')

        await userEvent.type(usernameInput, 'newuser')
        await userEvent.type(passwordInput, 'newpassword')

        expect(usernameInput).toHaveValue('newuser')
        expect(passwordInput).toHaveValue('newpassword')
    })

    test('navigates to login page on button click', async () => {
        render(
            <MemoryRouter>
                <Register />
            </MemoryRouter>
        )

        await userEvent.click(screen.getByTestId('go-to-login'))
        expect(mockNavigate).toHaveBeenCalledWith('/login')
    })

    test('successful registration navigates to login', async () => {
        vi.stubGlobal(
            'fetch',
            vi.fn(() =>
                Promise.resolve({
                    ok: true,
                    json: () => Promise.resolve({}),
                })
            ) as unknown as typeof fetch
        )

        render(
            <MemoryRouter>
                <Register />
            </MemoryRouter>
        )

        await userEvent.type(screen.getByTestId('username-input'), 'newuser')
        await userEvent.type(screen.getByTestId('password-input'), 'newpassword')
        await userEvent.click(screen.getByTestId('submit-register'))

        await waitFor(() => {
            expect(mockNavigate).toHaveBeenCalledWith('/login')
        })
    })

    test('unsuccessful registration clears inputs and does not navigate', async () => {
        vi.stubGlobal(
            'fetch',
            vi.fn(() =>
                Promise.resolve({
                    ok: false,
                    json: () => Promise.resolve({}),
                })
            ) as unknown as typeof fetch
        )

        render(
            <MemoryRouter>
                <Register />
            </MemoryRouter>
        )

        const usernameInput = screen.getByTestId('username-input')
        const passwordInput = screen.getByTestId('password-input')

        await userEvent.type(usernameInput, 'baduser')
        await userEvent.type(passwordInput, 'badpassword')
        await userEvent.click(screen.getByTestId('submit-register'))

        await waitFor(() => {
            expect(usernameInput).toHaveValue('')
            expect(passwordInput).toHaveValue('')
            expect(mockNavigate).not.toHaveBeenCalled()
        })
    })

    test('handles network error gracefully', async () => {
        const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {})

        vi.stubGlobal(
            'fetch',
            vi.fn(() => {
                throw new Error('Network error')
            }) as typeof fetch
        )

        render(
            <MemoryRouter>
                <Register />
            </MemoryRouter>
        )

        await userEvent.type(screen.getByTestId('username-input'), 'erroruser')
        await userEvent.type(screen.getByTestId('password-input'), 'errorpass')
        await userEvent.click(screen.getByTestId('submit-register'))

        await waitFor(() => {
            expect(consoleErrorSpy).toHaveBeenCalledWith(
                'Error tu jest: ',
                expect.any(Error)
            )
            expect(mockNavigate).not.toHaveBeenCalled()
        })

        consoleErrorSpy.mockRestore()
    })
})
