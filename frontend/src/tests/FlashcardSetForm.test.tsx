import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, test, vi, beforeEach, expect } from 'vitest'
import FlashcardSetForm from '../components/FlashcardSetForm'

describe('FlashcardSetForm Component', () => {
    const mockSetShowForm = vi.fn()
    const mockSetFlashcardSets = vi.fn()

    beforeEach(() => {
        vi.resetAllMocks()
        localStorage.clear()
    })

    test('renders form inputs and buttons', () => {
        render(
            <FlashcardSetForm
                setShowForm={mockSetShowForm}
                setflashcardSets={mockSetFlashcardSets}
            />
        )

        expect(screen.getByTestId('form-title')).toBeInTheDocument()
        expect(screen.getByTestId('input-name')).toBeInTheDocument()
        expect(screen.getByTestId('input-description')).toBeInTheDocument()
        expect(screen.getByTestId('label-source-language')).toBeInTheDocument()
        expect(screen.getByTestId('label-target-language')).toBeInTheDocument()
        expect(screen.getByTestId('submit-set-button')).toBeInTheDocument()
    })

    test('updates name and description inputs', async () => {
        render(<FlashcardSetForm setShowForm={mockSetShowForm} />)

        const nameInput = screen.getByTestId('input-name')
        const descriptionInput = screen.getByTestId('input-description')

        await userEvent.type(nameInput, 'My Flashcards')
        await userEvent.type(descriptionInput, 'Some description')

        expect(nameInput).toHaveValue('My Flashcards')
        expect(descriptionInput).toHaveValue('Some description')
    })

    test('closes form when close button is clicked', async () => {
        render(<FlashcardSetForm setShowForm={mockSetShowForm} />)

        const closeButton = screen.getByTestId('close-form-button')
        await userEvent.click(closeButton)

        expect(mockSetShowForm).toHaveBeenCalledWith(false)
    })

    test('submits form and updates flashcard sets', async () => {
        const mockResponse = {
            id: 1,
            name: 'Test Set',
            description: 'Test Description',
            sourceLanguage: 'English',
            targetLanguage: 'Spanish',
            sourceLanguageCode: 'en',
            targetLanguageCode: 'es',
        }

        localStorage.setItem('token', 'test-token')

        vi.stubGlobal(
            'fetch',
            vi.fn(() =>
                Promise.resolve({
                    json: () => Promise.resolve(mockResponse),
                })
            ) as unknown as typeof fetch
        )

        render(
            <FlashcardSetForm
                setShowForm={mockSetShowForm}
                setflashcardSets={mockSetFlashcardSets}
            />
        )

        await userEvent.type(screen.getByTestId('input-name'), 'Test Set')
        await userEvent.type(
            screen.getByTestId('input-description'),
            'Test Description'
        )

        const languageComboboxes = screen.getAllByRole('combobox')
        await userEvent.click(languageComboboxes[0])
        await userEvent.type(languageComboboxes[0], 'English')
        await userEvent.click(await screen.findByText('English'))

        await userEvent.click(languageComboboxes[1])
        await userEvent.type(languageComboboxes[1], 'Spanish')
        await userEvent.click(await screen.findByText('Spanish'))

        await userEvent.click(screen.getByTestId('submit-set-button'))

        await waitFor(() => {
            expect(mockSetFlashcardSets).toHaveBeenCalled()
        })

        const updateFn = mockSetFlashcardSets.mock.calls[0][0]
        const result = updateFn([])

        expect(result).toEqual([mockResponse])
        expect(mockSetShowForm).toHaveBeenCalledWith(false)
    })
})
