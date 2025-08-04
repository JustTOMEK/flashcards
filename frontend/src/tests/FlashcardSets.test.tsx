import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, test, vi, beforeEach, expect } from 'vitest'
import FlashcardSets from '../components/FlashcardSets'
import { MemoryRouter } from 'react-router'

vi.mock('../components/withAuth', () => ({
    default: (Component: React.FC<any>) => Component,
}))

const mockSets = [
    {
        name: 'Set 1',
        description: 'Basic greetings',
        id: '1',
        userId: 'user1',
        sourceLanguage: 'English',
        targetLanguage: 'Spanish',
        sourceLanguageCode: 'en',
        targetLanguageCode: 'es',
    },
]

test('renders flashcard sets from API', async () => {
    vi.stubGlobal(
        'fetch',
        vi.fn(() =>
            Promise.resolve({
                ok: true,
                json: () => Promise.resolve(mockSets),
            })
        ) as any
    )

    render(
        <MemoryRouter>
            <FlashcardSets />
        </MemoryRouter>
    )

    await waitFor(() => {
        expect(screen.getByText('Set 1')).toBeInTheDocument()
        expect(screen.getByText('Basic greetings')).toBeInTheDocument()
    })
})

test('deletes a flashcard set when Delete is clicked', async () => {
    vi.stubGlobal(
        'fetch',
        vi.fn((url, options) => {
            if (options?.method === 'DELETE') {
                return Promise.resolve({ ok: true })
            }
            return Promise.resolve({
                ok: true,
                json: () => Promise.resolve(mockSets),
            })
        }) as any
    )

    render(
        <MemoryRouter>
            <FlashcardSets />
        </MemoryRouter>
    )

    await waitFor(() => {
        expect(screen.getByText('Set 1')).toBeInTheDocument()
    })

    const deleteButton = screen.getByText('Delete')
    await userEvent.click(deleteButton)

    await waitFor(() => {
        expect(screen.queryByText('Set 1')).not.toBeInTheDocument()
    })
})
