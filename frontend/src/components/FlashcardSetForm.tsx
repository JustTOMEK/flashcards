import React, { useState } from 'react'
import LanguageSelector from './LanguageSelector'
import { IoMdCloseCircleOutline } from 'react-icons/io'
import { useTranslation } from 'react-i18next'

type FlashcardSet = {
    name: string
    description: string
    id: string
    userId: string
    sourceLanguage: string
    targetLanguage: string
    sourceLanguageCode: string
    targetLanguageCode: string
}

interface FlashcardSetFormProps {
    setflashcardSets?: React.Dispatch<React.SetStateAction<FlashcardSet[]>>
    setShowForm: React.Dispatch<React.SetStateAction<boolean>>
}

interface LanguageOption {
    label: string
    value: string
}

const FlashcardSetForm: React.FC<FlashcardSetFormProps> = ({
    setflashcardSets,
    setShowForm,
}) => {
    const [name, setName] = useState<string>('')
    const [description, setDescription] = useState<string>('')
    const [sourceLanguage, setSourceLanguage] = useState<string>('')
    const [targetLanguage, setTargetLanguage] = useState<string>('')
    const [sourceLanguageCode, setSourceLanguageCode] = useState<string>('')
    const [targetLanguageCode, setTargetLanguageCode] = useState<string>('')

    const { t } = useTranslation()

    const handleAddSet = async () => {
        try {
            const token = localStorage.getItem('token')

            const addRes = await fetch('https://flashcards-backend-fl4p.onrender.com/flashcardSets', {
                method: 'POST',
                headers: {
                    token: token ?? '',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name,
                    description,
                    sourceLanguage,
                    targetLanguage,
                    sourceLanguageCode,
                    targetLanguageCode,
                }),
            })

            const newFlashcardSet = await addRes.json()

            if (setflashcardSets) {
                setflashcardSets((prevSets) => [...prevSets, newFlashcardSet])
            }

            setName('')
            setDescription('')
            setShowForm(false)
        } catch (error) {
            console.error('Error creating flashcard set:', error)
        }
    }

    return (
        <div
            className="relative bg-tan p-8 rounded-lg shadow-lg w-full max-w-xl space-y-4"
            data-testid="flashcard-set-form"
        >
            <button
                onClick={() => setShowForm(false)}
                className="absolute top-2 right-2 text-olive text-xl font-bold"
                data-testid="close-form-button"
            >
                <IoMdCloseCircleOutline className="text-3xl" />
            </button>

            <h2
                className="text-2xl text-olive text-center font-semibold"
                data-testid="form-title"
            >
                {t('set_form_1')}
            </h2>

            <input
                type="text"
                placeholder={t('name')}
                value={name}
                className="w-full px-4 py-2 bg-cream text-olive rounded focus:outline-none focus:ring-2"
                onChange={(e) => setName(e.target.value)}
                data-testid="input-name"
            />

            <input
                type="text"
                placeholder={t('description')}
                value={description}
                className="w-full px-4 py-2 bg-cream text-olive rounded focus:outline-none focus:ring-2"
                onChange={(e) => setDescription(e.target.value)}
                data-testid="input-description"
            />

            <label className="text-olive" data-testid="label-source-language">
                {t('set_form_2')}:
            </label>
            <LanguageSelector
                onChange={(selected: LanguageOption | null) => {
                    setSourceLanguage(selected?.label || '')
                    setSourceLanguageCode(selected?.value || '')
                }}
            />

            <label className="text-olive" data-testid="label-target-language">
                {t('set_form_3')}
            </label>
            <LanguageSelector
                onChange={(selected: LanguageOption | null) => {
                    setTargetLanguage(selected?.label || '')
                    setTargetLanguageCode(selected?.value || '')
                }}
            />

            <button
                onClick={handleAddSet}
                className="w-full px-4 py-2 bg-cream text-olive rounded hover:bg-blue-600 transition"
                data-testid="submit-set-button"
            >
                {t('set_form_4')}
            </button>
        </div>
    )
}

export default FlashcardSetForm
