import React, {useEffect, useState} from 'react'

type Flashcard = {
    word: string,
    translation: string
    id: string
}



const Flashcards: React.FC = () => {
    const [flashcards, setFlashcards] = useState<Flashcard> ([])

    useEffect(() => {
        fetch('http://localhost:3000/flashcards')
        .then((res) => res.json())
        .then((data) => {
            setFlashcards(data)})

    }, [])

    const handleDelete = async (id: string) => {
        fetch(`http://localhost:3000/flashcards/${id}`, {
            method: 'DELETE',
        });
        setFlashcards((previous) => previous.filter((card) => card.id !== id));
    };

    return (
        <div>
            <h1> Flashcards: </h1>
            <ul>
                {flashcards.map((card, index) => (
                    <li key={index}>
                        <strong> {card.word} </strong> : {card.translation}
                        <button onClick={ () => handleDelete(card.id)} > Id: {card.id} </button>
                    </li>
                ))}

            </ul>
        </div>
    )
}

export default Flashcards