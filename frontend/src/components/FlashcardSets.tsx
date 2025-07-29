import { useEffect, useState } from 'react'
import '../App.css'
import { useNavigate } from 'react-router'
import withAuth from './withAuth'
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
                    <div className="w-full bg-burnt-orange p-6 rounded-lg shadow-md">
                        <h3 className="text-xl mb-2 text-cream">
                            Welcome {username}
                        </h3>
                        <p className="text-base text-cream">
                            Remember cosistency is important.
                        </p>
                    </div>
                    <>
                        <button
                            className="w-full bg-burnt-orange p-6 rounded-lg shadow-md"
                            onClick={() => setShowForm(true)}
                        >
                            <h3 className="text-xl mb-2 text-cream">
                                Create a new set
                            </h3>
                            <p className="text-base text-cream"></p>
                        </button>

                        {showForm && (
                            <div className="overlay">
                                <FlashcardSetForm
                                userId={userId}
                                setflashcardSets={setflashcardSets}
                                setShowForm={setShowForm}
                                />
                            </div>
                            )}


                    </>

                    <div className="w-full bg-burnt-orange p-6 rounded-lg shadow-md">
                        <h3 className="text-xl mb-2 text-cream">
                            Your statistics:
                        </h3>
                        <p className="text-base text-cream"></p>
                    </div>
                </div>
            </div>
            <div className="w-1/2 p-6 overflow-y-auto bg-cream">
                <div className="grid grid-cols-1 md:grid-cols-2  gap-6 w-4/5 mx-auto">
                    {flashcardSets.map((flashcardSet, index) => (
                        <div key={index} className="bg-tan rounded-xl p-4  shadow-md hover:shadow-lg transition-shadow">
                            <h3 className="text-lg font-semibold text-cream mb-2 text-center">
                                {flashcardSet.name}
                            </h3>
                            <p className="text-cream mb-1 text-center">
                                {flashcardSet.description}
                            </p>
                            <div className="flex flex-wrap justify-center gap-4 mt-4 w-full">
                                <button
                                    className="bg-olive px-4 py-2 rounded text-cream text-center whitespace-nowrap overflow-hidden text-ellipsis w-full sm:basis-1/3 min-w-[120px]"
                                    onClick={() => handleDelete(flashcardSet.id)}
                                >
                                    Delete
                                </button>
                                <button
                                    className="bg-olive px-4 py-2 rounded text-cream text-center whitespace-nowrap overflow-hidden text-ellipsis w-full sm:basis-1/3 min-w-[120px]"
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
                                    className="bg-olive px-4 py-2 rounded text-cream text-center whitespace-nowrap overflow-hidden text-ellipsis w-full sm:basis-1/3 min-w-[120px]"
                                    onClick={() =>
                                    navigate('practice', {
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
