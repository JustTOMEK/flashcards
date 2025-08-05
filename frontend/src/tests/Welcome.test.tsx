import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { vi, describe, beforeEach, test, expect } from 'vitest'
import { MemoryRouter } from 'react-router'
import Welcome from '../components/Welcome'

const mockNavigate = vi.fn()

vi.mock('react-router', async () => {
    const actual =
        await vi.importActual<typeof import('react-router')>('react-router')
    return {
        ...actual,
        useNavigate: () => mockNavigate,
    }
})

describe('Welcome Component', () => {
    beforeEach(() => {
        mockNavigate.mockClear()
    })

    test('renders welcome text and buttons', () => {
        render(
            <MemoryRouter>
                <Welcome />
            </MemoryRouter>
        )

        expect(screen.getByText('Welcome to Flashcards!')).toBeInTheDocument()
        expect(screen.getByText('Login')).toBeInTheDocument()
        expect(screen.getByText('Register')).toBeInTheDocument()
    })

    test('navigates to login when Login button is clicked', async () => {
        render(
            <MemoryRouter>
                <Welcome />
            </MemoryRouter>
        )

        await userEvent.click(screen.getByText('Login'))
        expect(mockNavigate).toHaveBeenCalledWith('/login')
    })

    test('navigates to register when Register button is clicked', async () => {
        render(
            <MemoryRouter>
                <Welcome />
            </MemoryRouter>
        )

        await userEvent.click(screen.getByText('Register'))
        expect(mockNavigate).toHaveBeenCalledWith('/register')
    })
})
