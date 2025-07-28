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
    const location = useLocation()
    


    useEffect(() => {
        if (location.state){
            const sortedFlashcards = [...location.state].sort((a, b) => a.level - b.level)
            setFlashcards(sortedFlashcards)
        }
    }, [location.state])




    return (
        <>
            Tu jesteśmy
            <button className="bg-pink-500" onClick={() => {console.log(flashcards)}} > Sprawdz</button>
        </>
    )
}

export default withAuth(Practice)