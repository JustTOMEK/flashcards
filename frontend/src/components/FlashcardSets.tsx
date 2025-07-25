import { useEffect, useState } from 'react'
import '../App.css'
import { useNavigate } from 'react-router'
import  withAuth from './withAuth'
import Logout from './Logout'
import LanguageSelector from './SelectLanguage'

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

function FlashcardSets() {
    const [flashcardSets, setflashcardSets] = useState<FlashcardSet[]>([])
    const [sourceLanguage, setsourceLanguage] = useState("")
    const [targetLanguage, settargetLanguage] = useState("")
    const [sourceLanguageCode, setsourceLanguageCode] = useState("")
    const [targetLanguageCode, settargetLanguageCode] = useState("")

    const token = localStorage.getItem('token') 
    useEffect(() => {
        fetch('http://localhost:3000/me', {
            headers: {
                token: token ?? '',
            },
        })
            .then((res) => res.json())
            .then((data) => {
                const userId = data.userId
                console.log(userId)

                return fetch(`http://localhost:3000/flashcardSets/${userId}`,{
                    headers: {
                        token: token ?? '',
                    },
            })
                    .then((res) => res.json())
                    .then((data) => {
                        setflashcardSets(data)
                    })
            })
    }, [])

    const [name, setName] = useState('')
    const [description, setDescription] = useState('')

    const handleAddSet = async () => {
        try {
            const token = localStorage.getItem('token')

            const userRes = await fetch('http://localhost:3000/me', {
                headers: {
                    token: token ?? '',
                },
            })

            const userData = await userRes.json()
            const userId = userData.userId

            const addRes = await fetch('http://localhost:3000/flashcardSets', {
                method: 'POST',
                headers: {
                    token: token ?? '',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, description, userId, sourceLanguage, targetLanguage, sourceLanguageCode, targetLanguageCode }),
            })

            const newFlashcardSet = await addRes.json()

            setflashcardSets((prevSets) => [...prevSets, newFlashcardSet])

            setName('')
            setDescription('')
        } catch (error) {
            console.error('Error tu jest:', error)
        }
    }

    const handleDelete = async (id: string) => {
        fetch(`http://localhost:3000/flashcardSets/${id}`, {
            method: 'DELETE',
            headers: {
                token: token ?? '',
            }
        })
        setflashcardSets((previous) =>
            previous.filter((card) => card.id !== id)
        )
    }
    

    const navigate = useNavigate()

    return (
        <div>
            <h1> Sets: </h1>
            <ul>
                {flashcardSets.map((flashcardSet, index) => (
                    <li key={index}>
                        <strong> {flashcardSet.name} </strong> :
                        {flashcardSet.description}
                        Source language: {flashcardSet.sourceLanguage}
                        Target language: {flashcardSet.targetLanguage}
                        <button
                            className="bg-yellow-400 px-4 py-2 rounded"
                            onClick={() => handleDelete(flashcardSet.id)}
                        >
                            Delete
                        </button>
                        <button
                            className="bg-green-400 px-4 py-2 rounded"
                            onClick={() =>
                                navigate('set', { 
                                    state: {
                                        setId: flashcardSet.id,
                                        sourceLanguageCode: flashcardSet.sourceLanguageCode,
                                        targetLanguageCode: flashcardSet.targetLanguageCode } })
                            }
                        >
                            More
                        </button>
                    </li>
                ))}
            </ul>
            <button
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
                onClick={handleAddSet}
            >
                Add set
            </button>
            Name:
            <input
                type="text"
                value={name}
                className="px-4 py-2 bg-red-500 text-white rounded"
                onChange={(e) => {
                    const value = e.target.value
                    setName(value)
                }}
            />
            Description:
            <input
                type="text"
                value={description}
                className="px-4 py-2 bg-red-500 text-white rounded"
                onChange={(e) => {
                    const value = e.target.value
                    setDescription(value)
                }}
            />
            <label htmlFor="languageSelect">Choose source language:</label>
            <LanguageSelector onChange = {(selected) => {
                setsourceLanguage(selected?.label || "")
                setsourceLanguageCode(selected?.value || "")
            }}
                />
            
            <label htmlFor="languageSelect">Choose target language:</label>
            <LanguageSelector onChange = {(selected) => {
                settargetLanguage(selected?.label || "")
                settargetLanguageCode(selected?.value || "")
            }}
                />
            <Logout />
        </div>
    )
}
export default withAuth(FlashcardSets)
