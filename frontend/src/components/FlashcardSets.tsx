import { useEffect, useState } from 'react'
import '../App.css'
import { useNavigate } from 'react-router'
import withAuth from './withAuth'
import FlashcardSetForm from './FlashcardSetForm'
import { IoMdAddCircle } from 'react-icons/io'
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

function FlashcardSets() {
    const [flashcardSets, setflashcardSets] = useState<FlashcardSet[]>([])
    const [showForm, setShowForm] = useState(false)
    const { t } = useTranslation()
    const navigate = useNavigate()

    useEffect(() => {
        const token = localStorage.getItem('token')
        fetch(`http://localhost:3000/flashcardSets`, {
            headers: {
                token: token ?? '',
            },
        })
            .then((res) => res.json())
            .then((data) => {
                setflashcardSets(data)
            })
    }, [])

    const handleDelete = async (id: string) => {
        const token = localStorage.getItem('token')
        await fetch(`http://localhost:3000/flashcardSets/${id}`, {
            method: 'DELETE',
            headers: {
                token: token ?? '',
            },
        })
        setflashcardSets((previous) => previous.filter((card) => card.id !== id))
    }

    return (
        <div className="h-full bg-cream pt-10 overflow-auto" data-testid="flashcard-sets-page">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6 w-4/5 mx-auto" data-testid="flashcard-sets-grid">
                <div
                    className="bg-tan rounded-xl p-4 text-cream shadow-md hover:shadow-lg transition-shadow min-h-[200px] flex flex-col items-center justify-center space-y-2"
                    data-testid="add-set-card"
                >
                    <span className="text-lg font-semibold">{t('sets_1')}</span>
                    <IoMdAddCircle
                        className="text-5xl"
                        onClick={() => setShowForm(true)}
                        data-testid="add-set-button"
                    />
                </div>

                {showForm && (
                    <div className="overlay" data-testid="flashcard-set-form">
                        <FlashcardSetForm
                            setflashcardSets={setflashcardSets}
                            setShowForm={setShowForm}
                        />
                    </div>
                )}

                {flashcardSets.map((flashcardSet, index) => (
                    <div
                        key={index}
                        className="bg-tan rounded-xl p-4 shadow-md hover:shadow-lg transition-shadow min-h-[200px]"
                        data-testid={`flashcard-set-${index}`}
                    >
                        <h3 className="text-lg font-semibold text-cream mb-2 text-center" data-testid={`set-name-${index}`}>
                            {flashcardSet.name}
                        </h3>
                        <p className="text-cream mb-1 text-center" data-testid={`set-description-${index}`}>
                            {flashcardSet.description}
                        </p>
                        <div className="flex flex-wrap justify-center gap-4 mt-4 w-full" data-testid={`set-actions-${index}`}>
                            <button
                                className="bg-olive px-4 py-2 rounded text-cream text-center w-full sm:basis-1/3 min-w-[120px]"
                                onClick={() => handleDelete(flashcardSet.id)}
                                data-testid={`delete-button-${index}`}
                            >
                                {t('delete')}
                            </button>
                            <button
                                className="bg-olive px-4 py-2 rounded text-cream text-center w-full sm:basis-1/3 min-w-[120px]"
                                onClick={() =>
                                    navigate('set', {
                                        state: { flashcardSet },
                                    })
                                }
                                data-testid={`edit-button-${index}`}
                            >
                                {t('edit')}
                            </button>
                            <button
                                className="bg-olive px-4 py-2 rounded text-cream text-center w-full sm:basis-1/3 min-w-[120px]"
                                onClick={() =>
                                    navigate('practice', {
                                        state: { setId: flashcardSet.id },
                                    })
                                }
                                data-testid={`practice-button-${index}`}
                            >
                                {t('practice')}
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

const AuthFlashcardSets = withAuth(FlashcardSets)
export default AuthFlashcardSets
