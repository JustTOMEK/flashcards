import React, { useState } from 'react'
import LanguageSelector from './LanguageSelector'
import { IoMdCloseCircleOutline } from "react-icons/io";
interface FlashcardSetFormProps {
    userId: string
    setflashcardSets?: React.Dispatch<React.SetStateAction<any[]>>
    setShowForm: React.Dispatch<React.SetStateAction<boolean>>
}

interface LanguageOption {
    label: string
    value: string
}

const FlashcardSetForm: React.FC<FlashcardSetFormProps> = ({
    userId,
    setflashcardSets,
    setShowForm,
}) => {
    const [name, setName] = useState<string>('')
    const [description, setDescription] = useState<string>('')
    const [sourceLanguage, setSourceLanguage] = useState<string>('')
    const [targetLanguage, setTargetLanguage] = useState<string>('')
    const [sourceLanguageCode, setSourceLanguageCode] = useState<string>('')
    const [targetLanguageCode, setTargetLanguageCode] = useState<string>('')

    const handleAddSet = async () => {
        try {
            const token = localStorage.getItem('token')

            const addRes = await fetch('http://localhost:3000/flashcardSets', {
                method: 'POST',
                headers: {
                    token: token ?? '',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name,
                    description,
                    userId,
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
        } catch (error) {
            console.error('Error creating flashcard set:', error)
        }
    }

    return (
        <div className="relative bg-tan p-8 rounded-lg shadow-lg w-full max-w-xl space-y-4">
            <button
                onClick={() => {(setShowForm(false))}}
                className="absolute top-2 right-2 text-olive text-xl font-bold"
            >
                <IoMdCloseCircleOutline className='text-3xl' />
            </button>

            <h2 className="text-2xl text-olive text-center font-semibold">
                Create a New Flashcard Set
            </h2>

            <input
                type="text"
                placeholder="Name"
                value={name}
                className="w-full px-4 py-2 bg-cream text-olive rounded focus:outline-none focus:ring-2"
                onChange={(e) => setName(e.target.value)}
            />

            <input
                type="text"
                placeholder="Description"
                value={description}
                className="w-full px-4 py-2 bg-cream text-olive rounded focus:outline-none focus:ring-2"
                onChange={(e) => setDescription(e.target.value)}
            />
            
            <label className="text-olive">Choose source language:</label>
            <LanguageSelector
                onChange={(selected: LanguageOption | null) => {
                    setSourceLanguage(selected?.label || '')
                    setSourceLanguageCode(selected?.value || '')
                }}
            />

            <label className="text-olive">Choose target language:</label>
            <LanguageSelector
                onChange={(selected: LanguageOption | null) => {
                    setTargetLanguage(selected?.label || '')
                    setTargetLanguageCode(selected?.value || '')
                }}
            />

            <button
                onClick={handleAddSet}
                className="w-full px-4 py-2 bg-cream text-olive rounded hover:bg-blue-600 transition"
            >
                Add Set
            </button>
        </div>
    )
}

export default FlashcardSetForm
