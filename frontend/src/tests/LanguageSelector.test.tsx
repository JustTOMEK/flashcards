import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, test, vi, beforeEach, expect } from 'vitest'
import LanguageSelector from '../components/LanguageSelector'
import languages from '../filtered_languages.json'

describe('LanguageSelector Component', () => {
    const mockOnChange = vi.fn()

    beforeEach(() => {
        mockOnChange.mockClear()
    })

    test('renders the select input with placeholder', () => {
        render(<LanguageSelector onChange={mockOnChange} />)
        expect(
            screen.getByText('Type to search or create...')
        ).toBeInTheDocument()
    })

    test('displays language options when typing', async () => {
        render(<LanguageSelector onChange={mockOnChange} />)
        const input = screen.getByRole('combobox')

        await userEvent.type(input, 'English')

        const matchingOption = languages.find((lang) =>
            lang.name.toLowerCase().includes('english')
        )
        if (matchingOption) {
            expect(
                await screen.findByText(matchingOption.name)
            ).toBeInTheDocument()
        }
    })

    test('calls onChange when an option is selected', async () => {
        render(<LanguageSelector onChange={mockOnChange} />)
        const input = screen.getByRole('combobox')

        await userEvent.click(input)
        const firstOption = await screen.findByText(languages[0].name)
        await userEvent.click(firstOption)

        expect(mockOnChange).toHaveBeenCalledWith({
            value: languages[0].code,
            label: languages[0].name,
        })
    })

    test('allows creating a new option', async () => {
        render(<LanguageSelector onChange={mockOnChange} />)
        const input = screen.getByRole('combobox')

        const newLanguage = 'Klingon'
        await userEvent.type(input, newLanguage)

        const createOption = await screen.findByText(`Create "${newLanguage}"`)
        await userEvent.click(createOption)

        expect(mockOnChange).toHaveBeenCalledWith(
            expect.objectContaining({
                value: newLanguage,
                label: newLanguage,
            })
        )
    })
})
