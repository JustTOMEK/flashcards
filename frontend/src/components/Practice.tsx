import { useState, useEffect } from "react";
import withAuth from "./withAuth";
import { useLocation, useNavigate } from "react-router";
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
    


    useEffect(() => {
        if (location.state){
            const sortedFlashcards = [...location.state].sort((a, b) => a.level - b.level)
            setFlashcards(sortedFlashcards)
        }
    }, [location.state])

    const token = localStorage.getItem('token') 

    async function handleAnswer(answer: boolean){
        if (isAnswered){
            return
        }
        let updatedLevel = flashcards[currentIndex].level
        if (answer && updatedLevel < 3){
            updatedLevel = updatedLevel + 1
        }
        else if (!answer && updatedLevel > 0 ){
            updatedLevel = updatedLevel - 1
        }
        console.log('dsad ', updatedLevel)
        fetch(`http://localhost:3000/flashcards/${flashcards[currentIndex].id}`, {
            method: 'PATCH',
            headers: {
                token: token ?? '',
                'Content-Type': 'application/json',
            },
            body : JSON.stringify({updatedLevel})
        })
        setisAnswered(true)
    }

    function handleFlip(){
        setisFlipped(!isFlipped)
    }

    function handleNext(){
        setcurrentIndex(currentIndex+1)
        setisFlipped(false)
        setisAnswered(false)
    }


    const navigate = useNavigate()

    return (
        <>
            
            {flashcards.length > 0 && flashcards[currentIndex] && (
                isFlipped ? flashcards[currentIndex].translation : flashcards[currentIndex].word
                )}

            <button className="bg-pink-500" disabled={isAnswered} onClick={() => {handleAnswer(true)}} > I know this</button>
            <button className="bg-pink-500" disabled={isAnswered} onClick={() => {handleAnswer(false)}} > I don't know this</button>
            <button className="bg-blue-500" disabled={!isAnswered} onClick={() => {handleFlip()}} > Flip</button>
            <button className="bg-green-500" disabled={!isAnswered} onClick={() => {handleNext()}} > Next</button>
            <button className="bg-red-500" onClick={() => {navigate('/set', {state: {setId: flashcards[0].setId}})}} > Finish practice</button>
        </>
    )
}

export default withAuth(Practice)