import { useEffect, useState } from 'react'
import { useLocation } from 'react-router'
import withAuth from './withAuth'
import Logout from './Logout'
import { useNavigate } from 'react-router'

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
    const setId = location.state.setId
    const [sourceLanguageCode, setsourceLanguageCode] = useState("")
    const [targetLanguageCode, settargetLanguageCode] = useState("")

    const [flashcards, setFlashcards] = useState<Flashcard[]>([])

    const token = localStorage.getItem('token')

    useEffect(() => {
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
        fetch(`http://localhost:3000/flashcardSets/languagecodes/${setId}`, 
            {
                headers: {
                    token: token ?? '',
                },
            })
            .then((res) => res.json())
            .then((data) => {
                setsourceLanguageCode(data.sourceLanguageCode)
                settargetLanguageCode(data.targetLanguageCode)
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

    const handleTranslate= async () => {
        let q = ""
        let source = ""
        let target = ""
        if(translation == ""){
            q = word
            source = sourceLanguageCode
            target = targetLanguageCode
        }
        else if (word == ""){
            q = translation
            source = targetLanguageCode
            target = sourceLanguageCode
        }
        else{
            console.log('Leave word or translation blank')
        }

        const translateResponse = await fetch('http://127.0.0.1:5000/translate', {
            method: 'POST',
            body: JSON.stringify({
                q: q,
                source: source,
                target: target,
            }),
            headers: {
                'Content-Type': 'application/json',
            },
        })
        console.log('Odpowiedz: ', translateResponse)
        if (!translateResponse.ok){
            console.log('No translation available for custom languages')
            return
        }

        const response = await translateResponse.json()
        const translatedText = response.translatedText

        if(translation == ""){
            setTranslation(translatedText)
        }
        else if (word == ""){
            setWord(translatedText)
        }

    }

    const navigate = useNavigate()

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
            <button className='bg-pink-500' onClick={() =>{handleTranslate()}}> Translate</button>
            <button className='bg-blue-400' onClick={() => {navigate('/practice', {state: flashcards})}} > Start Practice</button>
            <Logout />
        </div>
    )
}

export default withAuth(Flashcards)
