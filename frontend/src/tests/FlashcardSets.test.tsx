import { render, screen, waitFor } from '@testing-library/react'
import { test, vi, expect } from 'vitest'
import FlashcardSets from '../components/FlashcardSets'
import { MemoryRouter } from 'react-router'
import type { ReactElement, ComponentType } from 'react'

vi.mock('../components/withAuth', () => ({
    default:
        <P extends object>(Component: ComponentType<P>) =>
        (props: P): ReactElement => <Component {...props} />,
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
        ) as unknown as typeof fetch
    )

    render(
        <MemoryRouter>
            <FlashcardSets />
        </MemoryRouter>
    )

    await waitFor(() => {
        expect(screen.getByTestId('flashcard-set-0')).toBeInTheDocument()
        expect(screen.getByTestId('set-name-0')).toHaveTextContent('Set 1')
        expect(screen.getByTestId('set-description-0')).toHaveTextContent(
            'Basic greetings'
        )
    })
})
