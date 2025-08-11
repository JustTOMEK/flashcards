import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { vi, describe, beforeEach, test, expect } from 'vitest'
import { MemoryRouter } from 'react-router'
import Welcome from '../components/Welcome'

const mockNavigate = vi.fn()

vi.mock('react-router', async () => {
    const actual = await vi.importActual<typeof import('react-router')>('react-router')
    return {
        ...actual,
        useNavigate: () => mockNavigate,
    }
})

describe('Welcome Component', () => {
    beforeEach(() => {
        mockNavigate.mockClear()
    })

    test('renders welcome page structure', () => {
        render(
            <MemoryRouter>
                <Welcome />
            </MemoryRouter>
        )

        expect(screen.getByTestId('welcome-page')).toBeInTheDocument()
        expect(screen.getByTestId('left-panel')).toBeInTheDocument()
        expect(screen.getByTestId('right-panel')).toBeInTheDocument()
        expect(screen.getByTestId('main-title')).toBeInTheDocument()
        expect(screen.getByTestId('main-description')).toBeInTheDocument()
        expect(screen.getByTestId('login-button')).toBeInTheDocument()
        expect(screen.getByTestId('register-button')).toBeInTheDocument()
    })

    test('navigates to login when Login button is clicked', async () => {
        render(
            <MemoryRouter>
                <Welcome />
            </MemoryRouter>
        )

        await userEvent.click(screen.getByTestId('login-button'))
        expect(mockNavigate).toHaveBeenCalledWith('/login')
    })

    test('navigates to register when Register button is clicked', async () => {
        render(
            <MemoryRouter>
                <Welcome />
            </MemoryRouter>
        )

        await userEvent.click(screen.getByTestId('register-button'))
        expect(mockNavigate).toHaveBeenCalledWith('/register')
    })
})
