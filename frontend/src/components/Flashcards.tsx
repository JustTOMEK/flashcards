import React, {useEffect, useState} from 'react'

type Flashcard = {
    word: string,
    translation: string
}

const Flashcards: React.FC = () => {
    const [flashcards, setFlashcards] = useState<Flashcard> ([])

    useEffect(() => {
        fetch('http://localhost:3000/flashcards')
        .then((res) => res.json())
        .then((data) => {
            console.log('Data: ', data)
            setFlashcards(data)})

    }, [])

    return (
        <div>
            <h1> Flashcards: </h1>
            <ul>
                {flashcards.map((card, index) => (
                    <li key={index}>
                        <strong> {card.word} </strong> : {card.translation}
                    </li>
                ))}

            </ul>
        </div>
    )
}

export default Flashcards