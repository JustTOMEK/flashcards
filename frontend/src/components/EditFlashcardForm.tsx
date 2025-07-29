import { useState } from "react";
import withAuth from "./withAuth";
import { IoMdCloseCircleOutline } from "react-icons/io";

type Flashcard = {
    word: string
    translation: string
    id: string
    setId: string
    level: number
    repetitions: number
}



const EditFlashcardForm: React.FC<{
    flashcard: Flashcard
    onEdit: (edited: Flashcard) => void
    onExit: () => void;
}> = ({flashcard, onEdit, onExit}) =>{

    const[name, setName] = useState(flashcard.word)
    const[translation, setTranslation] = useState(flashcard.translation)

    const token = localStorage.getItem('token')

    async function  handleEdit(){
        fetch(
            `http://localhost:3000/flashcards/level/${flashcard.id}`,
            {
                method: 'PATCH',
                headers: {
                    token: token ?? '',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, translation }),
            }
        )

        const editedCard = {...flashcard, name, translation}
        onEdit(editedCard)


    }


    return (
        <div className="relative bg-tan p-8 rounded-lg shadow-lg w-full max-w-xl space-y-4">
            
            <button
                            onClick={onExit}
                            className="absolute top-2 right-2 text-olive text-xl font-bold"
                        >
                            <IoMdCloseCircleOutline className='text-3xl' />
            </button>
            
            
            <input
                type="text"
                placeholder="Name"
                value={name}
                className="w-full px-4 py-2 bg-cream text-olive rounded focus:outline-none focus:ring-2 "
                onChange={(e) => setName(e.target.value)}
            />

            <input
                type="text"
                placeholder="Description"
                value={translation}
                className="w-full px-4 py-2 bg-cream text-olive rounded focus:outline-none focus:ring-2"
                onChange={(e) => setTranslation(e.target.value)}
            />
            <button
                onClick={handleEdit}
                className="bg-cream"
            >
                Add Set
            </button>
        </div>
    )
}

export default withAuth(EditFlashcardForm)