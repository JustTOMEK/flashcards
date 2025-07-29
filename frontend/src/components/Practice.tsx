import { useState, useEffect } from 'react'
import withAuth from './withAuth'
import { useLocation, useNavigate } from 'react-router'
type Flashcard = {
    word: string
    translation: string
    id: string
    setId: string
    level: number
    repetitions: number
}

function Practice() {
    const [flashcards, setFlashcards] = useState<Flashcard[]>([])
    const [currentIndex, setcurrentIndex] = useState(0)
    const [isAnswered, setisAnswered] = useState(false)
    const [isFlipped, setisFlipped] = useState(false)
    const location = useLocation()
    const setId = location.state.setId
    const token = localStorage.getItem('token')
    useEffect(() => {
        fetch(`http://localhost:3000/flashcardSets/set/${setId}`, {
            headers: {
                token: token ?? '',
            },
        })
            .then((res) => res.json())
            .then((data) => {
                setFlashcards([...data].sort((a,b) => a.level - b.level))
            })

    }, [])

    async function handleAnswer(answer: boolean) {
        if (isAnswered) {
            return
        }
        let updatedLevel = flashcards[currentIndex].level
        if (answer && updatedLevel < 3) {
            updatedLevel = updatedLevel + 1
        } else if (!answer && updatedLevel > 0) {
            updatedLevel = updatedLevel - 1
        }
        fetch(
            `http://localhost:3000/flashcards/${flashcards[currentIndex].id}`,
            {
                method: 'PATCH',
                headers: {
                    token: token ?? '',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ updatedLevel }),
            }
        )
        setisAnswered(true)
    }

    function handleFlip() {
        setisFlipped(!isFlipped)
    }

    function handleNext() {
        setcurrentIndex(currentIndex + 1)
        setisFlipped(false)
        setisAnswered(false)
    }

    const navigate = useNavigate()

    return (
        <div className="h-screen bg-cream overflow-auto flex justify-center items-center">
            <div className="bg-white w-[90%] max-w-md p-6 rounded-xl shadow-lg flex flex-col items-center space-y-6">
                
                <div className="text-gray-600 text-sm font-medium">
                {currentIndex + 1} / {flashcards.length}
                </div>

                <div className="bg-tan w-full py-10 px-4 rounded-lg text-center text-2xl font-semibold text-black">
                {flashcards.length > 0 &&
                    flashcards[currentIndex] &&
                    (isFlipped
                    ? flashcards[currentIndex].translation
                    : flashcards[currentIndex].word)}
                </div>

                <div className="flex w-full justify-between space-x-4">
                <button
                    className="flex-1 bg-green-500 text-white py-2 rounded-md disabled:opacity-50"
                    disabled={isAnswered}
                    onClick={() => handleAnswer(true)}
                >
                    I Know This
                </button>
                <button
                    className="flex-1 bg-red-500 text-white py-2 rounded-md disabled:opacity-50"
                    disabled={isAnswered}
                    onClick={() => handleAnswer(false)}
                >
                    I Don't Know This
                </button>
                </div>

                <div className="flex w-full justify-between space-x-2 pt-4">
                <button
                    className="flex-1 bg-blue-500 text-white py-2 rounded-md disabled:opacity-50"
                    disabled={!isAnswered}
                    onClick={handleFlip}
                >
                    Flip
                </button>
                <button
                    className="flex-1 bg-green-600 text-white py-2 rounded-md disabled:opacity-50"
                    disabled={!isAnswered}
                    onClick={handleNext}
                >
                    Next
                </button>
                <button
                    className="flex-1 bg-red-600 text-white py-2 rounded-md"
                    onClick={() =>
                    navigate('/set', { state: { setId: flashcards[0].setId } })
                    }
                >
                    Finish Practice
                </button>
                </div>
            </div>
</div>

    )
}

export default withAuth(Practice)
