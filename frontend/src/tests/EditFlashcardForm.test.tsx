import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, test, vi, beforeEach, expect } from 'vitest'
import EditFlashcardForm from '../components/EditFlashcardForm'
import { MemoryRouter } from 'react-router'
import type { ReactElement, ComponentType } from 'react';

const mockFlashcard = {
    word: 'hello',
    translation: 'hola',
    id: '1',
    setId: 'set1',
    level: 1,
    repetitions: 0,
}

vi.mock('../components/withAuth', () => ({
    default: <P extends object>(Component: ComponentType<P>) =>
      (props: P): ReactElement => <Component {...props} />,
  }));

describe('EditFlashcardForm Component', () => {
    const mockOnEdit = vi.fn()
    const mockOnExit = vi.fn()

    beforeEach(() => {
        vi.resetAllMocks()
        vi.stubGlobal('localStorage', {
            getItem: vi.fn(() => 'mock-token'),
        })
    })

    test('renders inputs and buttons', () => {
        render(
            <MemoryRouter>
                <EditFlashcardForm
                    flashcard={mockFlashcard}
                    onEdit={mockOnEdit}
                    onExit={mockOnExit}
                    sourceLanguageCode="en"
                    targetLanguageCode="es"
                />
            </MemoryRouter>
        )

        expect(screen.getByPlaceholderText('Word')).toHaveValue('hello')
        expect(screen.getByPlaceholderText('Translation')).toHaveValue('hola')
        expect(screen.getByText('Translate')).toBeInTheDocument()
        expect(screen.getByText('Confirm')).toBeInTheDocument()
    })

    test('updates word and translation inputs', async () => {
        render(
            <MemoryRouter>
                <EditFlashcardForm
                    flashcard={mockFlashcard}
                    onEdit={mockOnEdit}
                    onExit={mockOnExit}
                    sourceLanguageCode="en"
                    targetLanguageCode="es"
                />
            </MemoryRouter>
        )

        const wordInput = screen.getByPlaceholderText('Word')
        const translationInput = screen.getByPlaceholderText('Translation')

        await userEvent.clear(wordInput)
        await userEvent.type(wordInput, 'hi')

        await userEvent.clear(translationInput)
        await userEvent.type(translationInput, 'salut')

        expect(wordInput).toHaveValue('hi')
        expect(translationInput).toHaveValue('salut')
    })

    test('calls onEdit with updated flashcard on confirm', async () => {
        vi.stubGlobal(
            'fetch',
            vi.fn(() => Promise.resolve({ ok: true })) as unknown as typeof fetch
        )

        render(
            <MemoryRouter>
                <EditFlashcardForm
                    flashcard={mockFlashcard}
                    onEdit={mockOnEdit}
                    onExit={mockOnExit}
                    sourceLanguageCode="en"
                    targetLanguageCode="es"
                />
            </MemoryRouter>
        )

        const wordInput = screen.getByPlaceholderText('Word')
        const translationInput = screen.getByPlaceholderText('Translation')

        await userEvent.clear(wordInput)
        await userEvent.type(wordInput, 'hi')

        await userEvent.clear(translationInput)
        await userEvent.type(translationInput, 'salut')

        await userEvent.click(screen.getByText('Confirm'))

        await waitFor(() => {
            expect(mockOnEdit).toHaveBeenCalledWith({
                ...mockFlashcard,
                word: 'hi',
                translation: 'salut',
            })
        })
    })

    test('calls translation API and updates translation', async () => {
        vi.stubGlobal('fetch', vi.fn(() =>
            Promise.resolve({
              ok: true,
              json: () => Promise.resolve({ translatedText: 'bonjour' }),
            })
          ) as unknown as typeof fetch)
          

        render(
            <MemoryRouter>
                <EditFlashcardForm
                    flashcard={mockFlashcard}
                    onEdit={mockOnEdit}
                    onExit={mockOnExit}
                    sourceLanguageCode="en"
                    targetLanguageCode="es"
                />
            </MemoryRouter>
        )

        const translationInput = screen.getByPlaceholderText('Translation')

        await userEvent.clear(translationInput)

        await userEvent.click(screen.getByText('Translate'))

        await waitFor(() => {
            expect(screen.getByPlaceholderText('Translation')).toHaveValue(
                'bonjour'
            )
        })
    })

    test('calls onExit when close button is clicked', async () => {
        render(
            <MemoryRouter>
                <EditFlashcardForm
                    flashcard={mockFlashcard}
                    onEdit={mockOnEdit}
                    onExit={mockOnExit}
                    sourceLanguageCode="en"
                    targetLanguageCode="es"
                />
            </MemoryRouter>
        )

        const closeButton = screen.getByRole('button', { name: '' })
        await userEvent.click(closeButton)

        expect(mockOnExit).toHaveBeenCalled()
    })
})
