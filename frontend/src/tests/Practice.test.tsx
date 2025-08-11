import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { vi, describe, beforeEach, test, expect } from 'vitest'
import { MemoryRouter } from 'react-router'
import Practice from '../components/Practice'

const mockNavigate = vi.fn()

vi.mock('react-router', async () => {
    const actual = await vi.importActual<typeof import('react-router')>('react-router')
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

    test('handles correct answer and enables Flip/Next', async () => {
        render(
            <MemoryRouter>
                <Practice />
            </MemoryRouter>
        )

        await screen.findByTestId('flashcard-display')
        await userEvent.click(screen.getByTestId('answer-correct'))

        expect(fetch).toHaveBeenCalledWith(
            'http://localhost:3000/flashcards/level/1',
            expect.objectContaining({
                method: 'PATCH',
            })
        )

        expect(screen.getByTestId('flip-button')).not.toBeDisabled()
        expect(screen.getByTestId('next-button')).not.toBeDisabled()
    })

    test('flips the card to show translation', async () => {
        render(
            <MemoryRouter>
                <Practice />
            </MemoryRouter>
        )

        await screen.findByTestId('flashcard-display')
        await userEvent.click(screen.getByTestId('answer-correct'))
        await userEvent.click(screen.getByTestId('flip-button'))

        const flipped = await screen.findByTestId('flashcard-display')
        expect(flipped).toHaveTextContent('Cat')
    })

    test('navigates to next card', async () => {
        render(
            <MemoryRouter>
                <Practice />
            </MemoryRouter>
        )

        await screen.findByTestId('flashcard-display')
        await userEvent.click(screen.getByTestId('answer-correct'))
        await userEvent.click(screen.getByTestId('next-button'))

        const nextCard = await screen.findByTestId('flashcard-display')
        expect(nextCard).toHaveTextContent('Pies')
    })

    test('navigates to home on Finish click', async () => {
        render(
            <MemoryRouter>
                <Practice />
            </MemoryRouter>
        )

        await screen.findByTestId('flashcard-display')
        await userEvent.click(screen.getByTestId('finish-button'))
        expect(mockNavigate).toHaveBeenCalledWith('/')
    })
})
