import { useState } from 'react'
import withAuth from './withAuth'
import { IoMdCloseCircleOutline } from 'react-icons/io'
import { FaGlobe } from 'react-icons/fa'
import { FaCheckCircle } from 'react-icons/fa'

type Flashcard = {
    word: string
    translation: string
    id: string
    setId: string
    level: number
    repetitions: number
}

const EditFlashcardForm: React.FC<{
    flashcard: Flashcard
    onEdit: (edited: Flashcard) => void
    onExit: () => void
    sourceLanguageCode: string
    targetLanguageCode: string
}> = ({
    flashcard,
    onEdit,
    onExit,
    sourceLanguageCode,
    targetLanguageCode,
}) => {
    const [word, setWord] = useState(flashcard.word)
    const [translation, setTranslation] = useState(flashcard.translation)

    const token = localStorage.getItem('token')

    async function handleEdit() {
        fetch(`http://localhost:3000/flashcards/edit/${flashcard.id}`, {
            method: 'PATCH',
            headers: {
                token: token ?? '',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ word, translation }),
        })

        const editedCard = { ...flashcard, word, translation }
        onEdit(editedCard)
    }

    const handleTranslate = async () => {
        let q = ''
        let source = ''
        let target = ''
        if (translation == '') {
            q = word
            source = sourceLanguageCode
            target = targetLanguageCode
        } else if (word == '') {
            q = translation
            source = targetLanguageCode
            target = sourceLanguageCode
        } else {
            console.log('Leave word or translation blank')
        }

        const translateResponse = await fetch(
            'http://127.0.0.1:5000/translate',
            {
                method: 'POST',
                body: JSON.stringify({
                    q: q,
                    source: source,
                    target: target,
                }),
                headers: {
                    'Content-Type': 'application/json',
                },
            }
        )
        console.log('Odpowiedz: ', translateResponse)
        if (!translateResponse.ok) {
            console.log('No translation available for custom languages')
            return
        }

        const response = await translateResponse.json()
        const translatedText = response.translatedText

        if (translation == '') {
            setTranslation(translatedText)
        } else if (word == '') {
            setWord(translatedText)
        }
    }

    return (
        <div className="overflow-auto relative h-1/3 w-1/3 bg-olive rounded-xl gap-4 p-7 text-cream grid md:grid-cols-2  grid-cols-1 whitespace-nowrap shadow-md hover:shadow-lg transition-shadow">
            <button
                onClick={onExit}
                className="absolute top-1 right-1 text-tan text-xl font-bold"
            >
                <IoMdCloseCircleOutline className="text-3xl" />
            </button>

            <p className="flex items-center justify-center h-full"> Word: </p>
            <input
                type="text"
                placeholder="Word"
                value={word}
                className=" px-4 py-2 bg-cream text-olive rounded focus:outline-none focus:ring-2 "
                onChange={(e) => setWord(e.target.value)}
            />
            <p className="flex items-center justify-center h-full">
                {' '}
                Translation:{' '}
            </p>
            <input
                type="text"
                placeholder="Translation"
                value={translation}
                className=" px-4 py-2 bg-cream text-olive rounded focus:outline-none focus:ring-2"
                onChange={(e) => setTranslation(e.target.value)}
            />
            <button
                onClick={handleTranslate}
                className="bg-tan px-4 py-2 rounded flex  items-center justify-center gap-2 "
            >
                <FaGlobe />
                Translate
            </button>
            <button
                onClick={handleEdit}
                className="bg-tan px-4 py-2 rounded  flex items-center justify-center gap-2 "
            >
                <FaCheckCircle />
                Confirm
            </button>
        </div>
    )
}

export default withAuth(EditFlashcardForm)
