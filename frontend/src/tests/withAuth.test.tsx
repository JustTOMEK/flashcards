import { render, screen, waitFor } from '@testing-library/react'
import { vi, describe, test, beforeEach, expect } from 'vitest'
import { MemoryRouter } from 'react-router'
import withAuth from '../components/withAuth'

const mockNavigate = vi.fn()

vi.mock('react-router', async () => {
    const actual = await vi.importActual<any>('react-router')
    return {
        ...actual,
        useNavigate: () => mockNavigate,
    }
})

const DummyComponent = () => <div>Protected Content</div>
const WrappedComponent = withAuth(DummyComponent)

describe('withAuth HOC', () => {
    beforeEach(() => {
        mockNavigate.mockClear()
        vi.resetAllMocks()
        localStorage.clear()
    })

    test('renders loading screen initially', () => {
        vi.stubGlobal('fetch', vi.fn(() => new Promise(() => {})) as any)

        render(
            <MemoryRouter>
                <WrappedComponent />
            </MemoryRouter>
        )

        expect(screen.getByText('Loading...')).toBeInTheDocument()
    })

    test('renders wrapped component when authenticated', async () => {
        localStorage.setItem('token', 'valid-token')

        
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
                <WrappedComponent />
            </MemoryRouter>
        )

        await waitFor(() => {
            expect(screen.getByText('Protected Content')).toBeInTheDocument()
        })
    })

    test('redirects to login when not authenticated', async () => {
        localStorage.setItem('token', 'invalid-token')

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
                <WrappedComponent />
            </MemoryRouter>
        )

        await waitFor(() => {
            expect(mockNavigate).toHaveBeenCalledWith('/login')
        })
    })
})
