import { useEffect, useState } from 'react'
import '../App.css'
import { useNavigate } from 'react-router'
import withAuth from './withAuth'
import FlashcardSetForm from './FlashcardSetForm'
import { IoMdAddCircle } from 'react-icons/io'

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
                return fetch(`http://localhost:3000/flashcardSets`, {
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
            <div className="min-h-screen bg-cream  pt-10 overflow-auto">
                <div className="grid grid-cols-2 md:grid-cols-4  gap-6 w-4/5 mx-auto">     
                    <div className="bg-tan rounded-xl p-4 text-cream shadow-md hover:shadow-lg transition-shadow min-h-[200px] flex flex-col items-center justify-center space-y-2">
                    <span className="text-lg font-semibold">Add New Set</span>
                    <IoMdAddCircle className="text-5xl"  onClick={() => setShowForm(true)}/>
                </div>
                {showForm && (
                    <div className='overlay' >
                        <FlashcardSetForm
                            userId={userId}
                            setflashcardSets={setflashcardSets}
                            setShowForm={setShowForm} 
                        />
                    </div>
                )}

                    
                    
                    
                    {flashcardSets.map((flashcardSet, index) => (
                        <div
                            key={index}
                            className="bg-tan rounded-xl p-4  shadow-md hover:shadow-lg transition-shadow min-h-[200px]"
                        >
                            <h3 className="text-lg font-semibold text-cream mb-2 text-center">
                                {flashcardSet.name}
                            </h3>
                            <p className="text-cream mb-1 text-center">
                                {flashcardSet.description}
                            </p>
                            <div className="flex flex-wrap justify-center gap-4 mt-4 w-full">
                                <button
                                    className="bg-olive px-4 py-2 rounded text-cream text-center whitespace-nowrap overflow-hidden text-ellipsis w-full sm:basis-1/3 min-w-[120px]"
                                    onClick={() =>
                                        handleDelete(flashcardSet.id)
                                    }
                                >
                                    Delete
                                </button>
                                <button
                                    className="bg-olive px-4 py-2 rounded text-cream text-center whitespace-nowrap overflow-hidden text-ellipsis w-full sm:basis-1/3 min-w-[120px]"
                                    onClick={() =>
                                        navigate('set', {
                                            state: {
                                                flashcardSet: flashcardSet,
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
                )
}
export default withAuth(FlashcardSets)
