import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { vi, describe, test, beforeEach, expect } from 'vitest'
import { MemoryRouter } from 'react-router'
import Navbar from '../components/Navbar'

const mockNavigate = vi.fn()

vi.mock('react-router', async () => {
    const actual =
        await vi.importActual<typeof import('react-router')>('react-router')
    return {
        ...actual,
        useNavigate: () => mockNavigate,
    }
})

describe('Navbar Component (withAuth)', () => {
    beforeEach(() => {
        mockNavigate.mockClear()
        vi.resetAllMocks()
        localStorage.clear()
    })

    test('shows loading screen initially', () => {
        vi.stubGlobal(
            'fetch',
            vi.fn(() => new Promise(() => {})) as typeof fetch
        )

        render(
            <MemoryRouter>
                <Navbar />
            </MemoryRouter>
        )

        expect(screen.getByText('Loading...')).toBeInTheDocument()
    })

    test('renders navbar after successful auth', async () => {
        localStorage.setItem('token', 'valid-token')

        vi.stubGlobal(
            'fetch',
            vi.fn(() =>
                Promise.resolve({ ok: true })
            ) as unknown as typeof fetch
        )

        render(
            <MemoryRouter>
                <Navbar />
            </MemoryRouter>
        )

        await waitFor(() => {
            expect(screen.getByText(/Flashcards/i)).toBeInTheDocument()
        })
    })

    test('redirects to login if not authenticated', async () => {
        localStorage.setItem('token', 'invalid-token')

        vi.stubGlobal(
            'fetch',
            vi.fn(() =>
                Promise.resolve({ ok: false })
            ) as unknown as typeof fetch
        )

        render(
            <MemoryRouter>
                <Navbar />
            </MemoryRouter>
        )

        await waitFor(() => {
            expect(mockNavigate).toHaveBeenCalledWith('/login')
        })
    })

    test('navigates to statistics when stats icon is clicked', async () => {
        localStorage.setItem('token', 'valid-token')

        vi.stubGlobal(
            'fetch',
            vi.fn(() =>
                Promise.resolve({ ok: true })
            ) as unknown as typeof fetch
        )

        render(
            <MemoryRouter>
                <Navbar />
            </MemoryRouter>
        )

        await waitFor(() => {
            expect(screen.getByText(/Flashcards/i)).toBeInTheDocument()
        })

        const statsIcon = screen.getByLabelText('Statistics')
        await userEvent.click(statsIcon)

        expect(mockNavigate).toHaveBeenCalledWith('/statistics')
    })
})
