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

        expect(
            screen.getByRole('heading', { name: 'Register' })
        ).toBeInTheDocument()
        expect(screen.getByLabelText('Username')).toBeInTheDocument()
        expect(screen.getByLabelText('Password')).toBeInTheDocument()
        expect(
            screen.getByRole('button', { name: 'Register' })
        ).toBeInTheDocument()
        expect(
            screen.getByRole('button', { name: /already have an account/i })
        ).toBeInTheDocument()
    })

    test('allows user to type into inputs', async () => {
        render(
            <MemoryRouter>
                <Register />
            </MemoryRouter>
        )

        const usernameInput = screen.getByLabelText('Username')
        const passwordInput = screen.getByLabelText('Password')

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

        await userEvent.click(
            screen.getByRole('button', { name: /already have an account/i })
        )
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

        await userEvent.type(screen.getByLabelText('Username'), 'newuser')
        await userEvent.type(screen.getByLabelText('Password'), 'newpassword')
        await userEvent.click(screen.getByRole('button', { name: 'Register' }))

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

        const usernameInput = screen.getByLabelText('Username')
        const passwordInput = screen.getByLabelText('Password')

        await userEvent.type(usernameInput, 'baduser')
        await userEvent.type(passwordInput, 'badpassword')
        await userEvent.click(screen.getByRole('button', { name: 'Register' }))

        await waitFor(() => {
            expect(usernameInput).toHaveValue('')
            expect(passwordInput).toHaveValue('')
            expect(mockNavigate).not.toHaveBeenCalled()
        })
    })

    test('handles network error gracefully', async () => {
        const consoleErrorSpy = vi
            .spyOn(console, 'error')
            .mockImplementation(() => {})

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

        await userEvent.type(screen.getByLabelText('Username'), 'erroruser')
        await userEvent.type(screen.getByLabelText('Password'), 'errorpass')
        await userEvent.click(screen.getByRole('button', { name: 'Register' }))

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
