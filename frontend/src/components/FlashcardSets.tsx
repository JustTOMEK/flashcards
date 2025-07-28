import { useEffect, useState } from 'react'
import '../App.css'
import { useNavigate } from 'react-router'
import withAuth from './withAuth'
import Logout from './Logout'
import FlashcardSetForm from './FlashcardSetForm'

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
    const [sourceLanguage, setsourceLanguage] = useState('')
    const [targetLanguage, settargetLanguage] = useState('')
    const [sourceLanguageCode, setsourceLanguageCode] = useState('')
    const [targetLanguageCode, settargetLanguageCode] = useState('')
    const [username, setusername] = useState('')
    const [showForm, setShowForm] = useState(false)
    const [userId, setuserId] = useState('')

    const token = localStorage.getItem('token')
    useEffect(() => {
        fetch('http://localhost:3000/me', {
            headers: {
                token: token ?? '',
            },
        })
            .then((res) => res.json())
            .then((data) => {
                setuserId(data.userId)
                setusername(data.username)
                return fetch(`http://localhost:3000/flashcardSets/${userId}`, {
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
            },
        })
        setflashcardSets((previous) =>
            previous.filter((card) => card.id !== id)
        )
    }

    const navigate = useNavigate()

    return (
        <div className="flex h-screen bg-blue-50 text-blue-900">
            <div className="w-1/2 p-8 bg-dark-olive flex flex-col justify-center items-center">
                <div className="space-y-6 w-3/5">
                    <div className="w-full bg-tan p-6 rounded-lg shadow-md">
                        <h3 className="text-xl mb-2 text-cream">Welcome {username}</h3>
                        <p className="text-base text-cream">Remember cosistency is important.</p>
                    </div>
                        <>
                        <button 
                            className="w-full bg-tan p-6 rounded-lg shadow-md"
                            onClick={() => setShowForm(true)}
                        >
                            <h3 className="text-xl mb-2 text-cream">Create a new set</h3>
                            <p className="text-base text-cream"></p>
                        </button>

                        {showForm && (
                            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                            <FlashcardSetForm
                                userId={userId}
                                setflashcardSets={setflashcardSets}
                                setShowForm={setShowForm}
                            />
                            </div>
                        )}
                        </>

                    <div className="w-full bg-tan p-6 rounded-lg shadow-md">
                        <h3 className="text-xl mb-2 text-cream">Your statistics:</h3>
                        <p className="text-base text-cream"></p>
                    </div>
                </div>
            </div>
            <div className="w-1/2 p-6 overflow-y-auto bg-cream">
                <div className="grid grid-cols-1 md:grid-cols-2  gap-6 w-4/5 mx-auto">
                    {flashcardSets.map((flashcardSet, index) => (
                        <div 
                            key={index}
                            className='bg-tan rounded p-4'>
                            
                            <h3 className="text-lg font-semibold text-cream mb-2 text-center">
                                        {flashcardSet.name}
                                    </h3>
                            <p className="text-cream mb-1 text-center">{flashcardSet.description}</p>
                            <div className="flex flex-col sm:flex-row justify-center gap-4 mt-4 ">
                                <button
                                    className="bg-olive px-4 py-2 rounded text-cream w-full sm:w-1/3"
                                    onClick={() => handleDelete(flashcardSet.id)}
                                >
                                    Delete
                                </button>
                                <button
                                    className="bg-olive px-4 py-2 rounded text-cream w-full sm:w-1/3"
                                    onClick={() =>
                                        navigate('set', {
                                            state: {
                                                setId: flashcardSet.id,
                                            },
                                        })
                                    }
                                >
                                    Edit
                                </button>
                                <button
                                    className="bg-olive px-4 py-2 rounded text-cream w-full sm:w-1/3 "
                                    onClick={() =>
                                        navigate('set', {
                                            state: {
                                                setId: flashcardSet.id,
                                            },
                                        })
                                    }
                                >
                                    Practice
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
export default withAuth(FlashcardSets)
