import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { vi, describe, beforeEach, test, expect } from 'vitest'
import { MemoryRouter } from 'react-router'
import Practice from '../components/Practice'

const mockNavigate = vi.fn()

vi.mock('react-router', async () => {
    const actual =
        await vi.importActual<typeof import('react-router')>('react-router')
    return {
        ...actual,
        useNavigate: () => mockNavigate,
        useLocation: () => ({ state: { setId: 'abc' } }),
    }
})

vi.stubGlobal('fetch', vi.fn())

vi.stubGlobal('localStorage', {
    getItem: vi.fn(() => 'mock-token'),
})

describe('Practice Component', () => {
    beforeEach(() => {
        vi.clearAllMocks()

        globalThis.fetch = vi.fn().mockResolvedValue({
            ok: true,
            json: async () => [
                {
                    word: 'Kot',
                    translation: 'Cat',
                    id: '1',
                    setId: 'abc',
                    level: 1,
                    repetitions: 0,
                },
                {
                    word: 'Pies',
                    translation: 'Dog',
                    id: '2',
                    setId: 'abc',
                    level: 2,
                    repetitions: 0,
                },
            ],
        })
    })

    test('renders flashcard and buttons', async () => {
        render(
            <MemoryRouter>
                <Practice />
            </MemoryRouter>
        )

        const word = await screen.findByText('Kot')
        expect(word).toBeInTheDocument()

        expect(screen.getByText('I Know This')).toBeInTheDocument()
        expect(screen.getByText("I Don't Know This")).toBeInTheDocument()
        expect(screen.getByText('Flip')).toBeDisabled()
        expect(screen.getByText('Next')).toBeDisabled()
        expect(screen.getByText('Finish')).toBeInTheDocument()
    })

    test('handles correct answer and enables Flip/Next', async () => {
        render(
            <MemoryRouter>
                <Practice />
            </MemoryRouter>
        )

        const word = await screen.findByText('Kot')
        expect(word).toBeInTheDocument()

        await userEvent.click(screen.getByText('I Know This'))

        expect(fetch).toHaveBeenCalledWith(
            'http://localhost:3000/flashcards/level/1',
            expect.objectContaining({
                method: 'PATCH',
            })
        )

        expect(screen.getByText('Flip')).not.toBeDisabled()
        expect(screen.getByText('Next')).not.toBeDisabled()
    })

    test('flips the card to show translation', async () => {
        render(
            <MemoryRouter>
                <Practice />
            </MemoryRouter>
        )

        const word = await screen.findByText('Kot')
        expect(word).toBeInTheDocument()

        await userEvent.click(screen.getByText('I Know This'))
        await userEvent.click(screen.getByText('Flip'))

        const filpped_word = await screen.findByText('Cat')
        expect(filpped_word).toBeInTheDocument()
    })

    test('navigates to next card', async () => {
        render(
            <MemoryRouter>
                <Practice />
            </MemoryRouter>
        )

        const word = await screen.findByText('Kot')
        expect(word).toBeInTheDocument()

        await userEvent.click(screen.getByText('I Know This'))
        await userEvent.click(screen.getByText('Next'))

        const next_word = await screen.findByText('Pies')
        expect(next_word).toBeInTheDocument()
    })

    test('navigates to home on Finish click', async () => {
        render(
            <MemoryRouter>
                <Practice />
            </MemoryRouter>
        )

        const word = await screen.findByText('Kot')
        expect(word).toBeInTheDocument()

        await userEvent.click(screen.getByText('Finish'))
        expect(mockNavigate).toHaveBeenCalledWith('/')
    })
})
