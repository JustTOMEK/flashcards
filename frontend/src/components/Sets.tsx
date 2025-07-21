import React, {useEffect, useState} from 'react'


type FlashcardSet = {
    name: string,
    description: string,
    id: string
}

const FlashcardSets: React.FC = () => {
    const [flashcardSets, setflashcardSets] = useState<FlashcardSet> ([])
    
    useEffect(() => {
            fetch('http://localhost:3000/flashcardSets')
            .then((res) => res.json())
            .then((data) => {
                setflashcardSets(data)})
    }, [])


    const handleDelete = async (id: string) => {
        fetch (`http://localhost:3000/flashcardSets/${id}`, {
            method: 'DELETE',
        });
        setflashcardSets((previous) => previous.filter((card) => card.id !== id));
    }

    return (
        <div>
            <h1> Sets: </h1>
            <ul> 
                {flashcardSets.map((flashcardSet, index) =>  (
                    <li key={index}>
                        <strong> {flashcardSet.name} </strong> : {flashcardSet.description}
                        <button onClick={ () => handleDelete(flashcardSet.id)} > Id: {flashcardSet.id} </button>
                    </li>
                ))}
                
    
            </ul>


        </div>
    )
}
export default FlashcardSets