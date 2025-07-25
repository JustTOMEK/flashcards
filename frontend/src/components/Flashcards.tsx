import { useEffect, useState } from 'react'
import { useLocation } from 'react-router'
import withAuth from './withAuth'
import Logout from './Logout'

type Flashcard = {
    word: string
    translation: string
    id: string
    setId: string
}

function Flashcards() {
    const location = useLocation()
    const setId = location.state.setId
    const sourceLanguageCode = location.state.sourceLanguageCode
    const targetLanguageCode = location.state.targetLanguageCode

    const [flashcards, setFlashcards] = useState<Flashcard[]>([])

    const token = localStorage.getItem('token')

    useEffect(() => {
        console.log('Set id ', setId)
        console.log('Source ',sourceLanguageCode)
        console.log('Target ', targetLanguageCode)
        fetch(`http://localhost:3000/flashcardSets/set/${setId}`, 
            {
                headers: {
                    token: token ?? '',
                },
            })
            .then((res) => res.json())
            .then((data) => {
                setFlashcards(data)
            })
    }, [])

    const [word, setWord] = useState('')
    const [translation, setTranslation] = useState('')

    const handleAddFlashcard = async () => {
        try {
            const addRes = await fetch('http://localhost:3000/flashcards', {
                method: 'POST',
                headers: {
                     token: token ?? '',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ word, translation, setId }),
            })
            const newFlashcard = await addRes.json();

            setFlashcards(prevFlashcards => [...prevFlashcards, newFlashcard])

            setWord('')
            setTranslation('')
        } catch (error) {
            console.error('Error tu jest: ', error)
        }
    }

    const handleDelete = async (id: string) => {
        fetch(`http://localhost:3000/flashcards/${id}`, {
            method: 'DELETE',
            headers: {
                token: token ?? '',
            },
            
        })
        setFlashcards((previous) => previous.filter((card) => card.id !== id))
    }

    return (
        <div>
            <h1> Flashcards: </h1>
            <ul>
                {flashcards.map((card, index) => (
                    <li key={index}>
                        <strong> {card.word} </strong> : {card.translation}
                        <button 
                            className="bg-yellow-400 px-4 py-2 rounded"
                            onClick={() => handleDelete(card.id)}
                        >
                            Delete
                        </button>
                    </li>
                ))}
            </ul>
            <button
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
                onClick={handleAddFlashcard}
            >
                {' '}
                Add Flashcard{' '}
            </button>
            Word:
            <input
                type="text"
                value={word}
                className="px-4 py-2 bg-red-500 text-white rounded"
                onChange={(e) => {
                    const value = e.target.value
                    setWord(value)
                }}
            />
            Translation:
            <input
                type="text"
                value={translation}
                className="px-4 py-2 bg-red-500 text-white rounded"
                onChange={(e) => {
                    const value = e.target.value
                    setTranslation(value)
                }}
            />
            <Logout />
        </div>
    )
}

export default withAuth(Flashcards)
