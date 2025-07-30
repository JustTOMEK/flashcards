import { useEffect, useState } from 'react'
import { useLocation } from 'react-router'
import withAuth from './withAuth'
import { FaTrash } from 'react-icons/fa6'
import { MdModeEditOutline } from 'react-icons/md'
import EditFlashcardForm from './EditFlashcardForm'
import { FaGlobe } from 'react-icons/fa'
import { IoMdAddCircle } from 'react-icons/io'
import Navbar from './Navbar'

type Flashcard = {
    word: string
    translation: string
    id: string
    setId: string
    level: number
    repetitions: number
}

function Flashcards() {
    const location = useLocation()
    const flashcardSet = location.state.flashcardSet
    console.log(flashcardSet)
    const [editingCard, setEditingCard] = useState<Flashcard | null>(null)

    const [flashcards, setFlashcards] = useState<Flashcard[]>([])

    const token = localStorage.getItem('token')

    useEffect(() => {
        fetch(`http://localhost:3000/flashcardSets/set/${flashcardSet.id}`, {
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
                body: JSON.stringify({ word, translation, setId: flashcardSet?.setId || "" }),
            })
            const newFlashcard = await addRes.json()

            setFlashcards((prevFlashcards) => [...prevFlashcards, newFlashcard])

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

    const handleTranslate = async () => {
        let q = ''
        let source = ''
        let target = ''
        if (translation == '') {
            q = word
            source = flashcardSet.sourceLanguageCode
            target = flashcardSet.targetLanguageCode
        } else if (word == '') {
            q = translation
            source = flashcardSet.targetLanguageCode
            target = flashcardSet.sourceLanguageCode
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

    function handleEdit(editedCard: Flashcard): void {
        setFlashcards((prev) =>
            prev.map((card) => (card.id === editedCard.id ? editedCard : card))
        )
        setEditingCard(null)
    }

    return (
        <>
        <Navbar userId={'blank'} username={'blank'}/>
        <div className="min-h-screen bg-cream  pt-10 overflow-auto">
            <div className="grid grid-cols-2 md:grid-cols-5  gap-6 w-5/6 mx-auto place-items-stretch   ">
                
            <div className="h-full w-full bg-tan rounded-xl gap-4 p-4 text-cream grid md:grid-cols-2  grid-cols-1 whitespace-nowrap shadow-md hover:shadow-lg transition-shadow">
                    <p className="flex items-center justify-center h-full">
                        {' '}
                        Word:{' '}
                    </p>
                    <input
                        type="text"
                        value={word}
                        className="px-1 py-1 bg-cream text-olive rounded"
                        onChange={(e) => {
                            const value = e.target.value
                            setWord(value)
                        }}
                    />
                    <p className="flex items-center justify-center h-full">
                        {' '}
                        Translation:{' '}
                    </p>
                    <input
                        type="text"
                        value={translation}
                        className="px-1 py-1 bg-cream text-olive rounded"
                        onChange={(e) => {
                            const value = e.target.value
                            setTranslation(value)
                        }}
                    />
                    <button
                        className="bg-olive rounded flex items-center justify-center gap-2"
                        onClick={() => {
                            handleTranslate()
                        }}
                    >
                        <FaGlobe />
                        Translate
                    </button>

                    <button
                        className="px-4 py-2 bg-olive flex  items-center justify-center gap-2 rounded  "
                        onClick={handleAddFlashcard}
                    >
                        <IoMdAddCircle className="text-xl" />
                        Add
                    </button>
                </div>
                
                
                
                {flashcards.map((card, index) => (
                    <div
                        key={index}
                        className="min-h-[170px] bg-tan rounded-xl p-4 flex flex-col justify-between text-cream h-full w-full shadow-md hover:shadow-lg transition-shadow"
                    >
                        <div className="text-center text-xl font-bold ">
                            {card.word} : {card.translation}
                        </div>

                        <div className="text-center text-md  ">
                            Practiced : {card.repetitions}
                        </div>
                        <div className="flex gap-2 justify-center">
                            <button
                                className="bg-olive px-4 py-2 rounded w-1/2 flex items-center justify-center gap-2 "
                                onClick={() => handleDelete(card.id)}
                            >
                                <FaTrash />
                                Delete
                            </button>

                            <button
                                className="bg-olive px-4 py-2 rounded w-1/2 flex items-center justify-center gap-2"
                                onClick={() => setEditingCard(card)}
                            >
                                <MdModeEditOutline className="text-xl" />
                                Edit
                            </button>
                        </div>
                    </div>
                ))}
                {editingCard && (
                    <div className="overlay">
                        <EditFlashcardForm
                            flashcard={editingCard}
                            onEdit={handleEdit}
                            onExit={() => setEditingCard(null)}
                            sourceLanguageCode={flashcardSet.sourceLanguageCode}
                            targetLanguageCode={flashcardSet.targetLanguageCode}
                        />
                    </div>
                )}
                
            </div>
        </div>
        </>
    )
}

export default withAuth(Flashcards)
