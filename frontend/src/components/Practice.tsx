import { useState, useEffect } from 'react'
import withAuth from './withAuth'
import { useLocation, useNavigate } from 'react-router'
import { FaThumbsDown, FaThumbsUp } from "react-icons/fa6";
import { FaSync } from "react-icons/fa";
import { FaArrowRight } from "react-icons/fa";
import { FaFlagCheckered } from "react-icons/fa";



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
        <div className="h-screen bg-dark-olive overflow-auto flex justify-center items-center">
            <div className="bg-tan w-[90%] max-w-md p-6 rounded-xl shadow-lg flex flex-col items-center space-y-6">
                
                <div className="text-dark-olive text-sm font-medium">
                {currentIndex + 1} / {flashcards.length}
                </div>

                <div className="bg-cream w-full py-10 px-4 rounded-lg text-center text-2xl font-semibold text-dark-olive">
                {flashcards.length > 0 &&
                    flashcards[currentIndex] &&
                    (isFlipped
                    ? flashcards[currentIndex].translation
                    : flashcards[currentIndex].word)}
                </div>

                <div className="flex w-full justify-between space-x-4">
                <button
                    className="flex-1 bg-cream text-dark-olive py-2 rounded-md disabled:opacity-50 w-1/2 flex items-center justify-center gap-2"
                    disabled={isAnswered}
                    onClick={() => handleAnswer(true)}
                >
                    <FaThumbsUp />

                    I Know This
                </button>

                <button
                    className="flex-1 bg-cream text-dark-olive py-2 rounded-md disabled:opacity-50 w-1/2 flex items-center justify-center gap-2"
                    disabled={isAnswered}
                    onClick={() => handleAnswer(false)}
                >
                    <FaThumbsDown />
                    I Don't Know This
                </button>
                </div>

                <div className="flex w-full justify-between space-x-2 pt-4">
                <button
                    className="flex-1 bg-cream text-dark-olive py-2 rounded-md disabled:opacity-50 flex items-center justify-center gap-2"
                    disabled={!isAnswered}
                    onClick={handleFlip}
                >
                    <FaSync />
                    Flip
                </button>
                { currentIndex + 1 != flashcards.length && (<button 
                    className="flex-1 bg-cream text-dark-olive py-2 rounded-md disabled:opacity-50 flex items-center justify-center gap-2"
                    disabled={!isAnswered}
                    onClick={handleNext}
                >
                    <FaArrowRight />
                    Next
                </button>)}
                <button
                    className="flex-1 bg-cream text-dark-olive py-2 rounded-md flex items-center justify-center gap-2"
                    onClick={() =>
                    navigate('/set', { state: { setId: flashcards[0].setId } })
                    }
                >
                    <FaFlagCheckered />
                    Finish
                </button>
                </div>
            </div>
</div>

    )
}

export default withAuth(Practice)
