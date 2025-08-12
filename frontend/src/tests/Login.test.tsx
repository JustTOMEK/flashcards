import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { vi, describe, beforeEach, test, expect } from 'vitest'
import { MemoryRouter } from 'react-router'
import Login from '../components/Login'

const mockNavigate = vi.fn()

vi.mock('react-router', async () => {
    const actual =
        await vi.importActual<typeof import('react-router')>('react-router')
    return {
        ...actual,
        useNavigate: () => mockNavigate,
    }
})

describe('Login Component', () => {
    beforeEach(() => {
        mockNavigate.mockClear()
        vi.resetAllMocks()
        localStorage.clear()
    })

    test('renders login form elements', () => {
        render(
            <MemoryRouter>
                <Login />
            </MemoryRouter>
        )

        expect(screen.getByTestId('login-title')).toBeInTheDocument()
        expect(screen.getByTestId('username-input')).toBeInTheDocument()
        expect(screen.getByTestId('password-input')).toBeInTheDocument()
        expect(screen.getByTestId('submit-login')).toBeInTheDocument()
        expect(screen.getByTestId('go-to-register')).toBeInTheDocument()
    })

    test('allows user to type into inputs', async () => {
        render(
            <MemoryRouter>
                <Login />
            </MemoryRouter>
        )

        const usernameInput = screen.getByTestId('username-input')
        const passwordInput = screen.getByTestId('password-input')

        await userEvent.type(usernameInput, 'testuser')
        await userEvent.type(passwordInput, 'password123')

        expect(usernameInput).toHaveValue('testuser')
        expect(passwordInput).toHaveValue('password123')
    })

    test('navigates to register page on button click', async () => {
        render(
            <MemoryRouter>
                <Login />
            </MemoryRouter>
        )

        await userEvent.click(screen.getByTestId('go-to-register'))
        expect(mockNavigate).toHaveBeenCalledWith('/register')
    })

    test('successful login stores token and navigates home', async () => {
        const fakeToken = 'fake-jwt-token'
        vi.stubGlobal(
            'fetch',
            vi.fn(() =>
                Promise.resolve({
                    ok: true,
                    json: () => Promise.resolve({ token: fakeToken }),
                })
            ) as unknown as typeof fetch
        )

        render(
            <MemoryRouter>
                <Login />
            </MemoryRouter>
        )

        await userEvent.type(screen.getByTestId('username-input'), 'testuser')
        await userEvent.type(
            screen.getByTestId('password-input'),
            'password123'
        )
        await userEvent.click(screen.getByTestId('submit-login'))

        await waitFor(() => {
            expect(localStorage.getItem('token')).toBe(fakeToken)
            expect(mockNavigate).toHaveBeenCalledWith('/')
        })
    })

    test('unsuccessful login does not navigate', async () => {
        vi.stubGlobal(
            'fetch',
            vi.fn(() =>
                Promise.resolve({
                    ok: false,
                    json: () =>
                        Promise.resolve({ message: 'Invalid credentials' }),
                })
            ) as unknown as typeof fetch
        )

        render(
            <MemoryRouter>
                <Login />
            </MemoryRouter>
        )

        await userEvent.type(screen.getByTestId('username-input'), 'wronguser')
        await userEvent.type(screen.getByTestId('password-input'), 'wrongpass')
        await userEvent.click(screen.getByTestId('submit-login'))

        await waitFor(() => {
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
                throw new Error('Network failure')
            }) as typeof fetch
        )

        render(
            <MemoryRouter>
                <Login />
            </MemoryRouter>
        )

        await userEvent.type(screen.getByTestId('username-input'), 'testuser')
        await userEvent.type(
            screen.getByTestId('password-input'),
            'password123'
        )
        await userEvent.click(screen.getByTestId('submit-login'))

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
