import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { vi, describe, test, beforeEach, expect } from 'vitest'
import { MemoryRouter } from 'react-router'
import Navbar from '../components/Navbar'

const mockNavigate = vi.fn()

vi.mock('react-router', async () => {
  const actual = await vi.importActual<any>('react-router')
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
    vi.stubGlobal('fetch', vi.fn(() => new Promise(() => {})) as any)

    render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>
    )

    expect(screen.getByText('Loading...')).toBeInTheDocument()
  })

  test('renders navbar after successful auth', async () => {
    localStorage.setItem('token', 'valid-token')

    vi.stubGlobal('fetch', vi.fn(() =>
      Promise.resolve({ ok: true })
    ) as any)

    render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>
    )

    await waitFor(() => {
      expect(screen.getByText(/Welcome.*to Flashcards/i)).toBeInTheDocument()
    })
  })

  test('redirects to login if not authenticated', async () => {
    localStorage.setItem('token', 'invalid-token')

    vi.stubGlobal('fetch', vi.fn(() =>
      Promise.resolve({ ok: false })
    ) as any)

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

    vi.stubGlobal('fetch', vi.fn(() =>
      Promise.resolve({ ok: true })
    ) as any)

    render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>
    )

    await waitFor(() => {
      expect(screen.getByText(/Welcome.*to Flashcards/i)).toBeInTheDocument()
    })

    const statsIcon = screen.getByRole('img', { hidden: true }) 
    await userEvent.click(statsIcon)

    expect(mockNavigate).toHaveBeenCalledWith('/statistics')
  })

  test('logs out and navigates to login', async () => {
    localStorage.setItem('token', 'valid-token')

    vi.stubGlobal('fetch', vi.fn(() =>
      Promise.resolve({ ok: true })
    ) as any)

    render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>
    )

    await waitFor(() => {
      expect(screen.getByText(/Welcome.*to Flashcards/i)).toBeInTheDocument()
    })

    const logoutIcon = screen.getAllByRole('img', { hidden: true }).at(-1)!
    await userEvent.click(logoutIcon)

    expect(localStorage.getItem('token')).toBeNull()
    expect(mockNavigate).toHaveBeenCalledWith('/login')
  })
})
