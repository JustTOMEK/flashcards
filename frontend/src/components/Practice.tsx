import { useState, useEffect } from "react";
import withAuth from "./withAuth";
import { useLocation } from "react-router";
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


    function handleAnswer(answer: boolean){
        if (isAnswered){
            return
        }
        setisAnswered(true)
        if (answer){

        }
        else{

        }

    }

    function handleFlip(){
        setisFlipped(!isFlipped)
    }

    function handleNext(){
        setcurrentIndex(currentIndex+1)
        setisFlipped(false)
        setisAnswered(false)
    }




    return (
        <>
            
            {flashcards.length > 0 && flashcards[currentIndex] && (
                isFlipped ? flashcards[currentIndex].translation : flashcards[currentIndex].word
                )}

            <button className="bg-pink-500" disabled={isAnswered} onClick={() => {handleAnswer(true)}} > I know this</button>
            <button className="bg-pink-500" disabled={isAnswered} onClick={() => {handleAnswer(false)}} > I don't know this</button>
            <button className="bg-blue-500" disabled={!isAnswered} onClick={() => {handleFlip()}} > Flip</button>
            <button className="bg-green-500" disabled={!isAnswered} onClick={() => {handleNext()}} > Next</button>
        </>
    )
}

export default withAuth(Practice)