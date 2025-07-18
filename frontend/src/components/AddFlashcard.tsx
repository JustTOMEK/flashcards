import { useState } from "react"

function AddFlashcard()
{
    const [word, setWord] = useState("");
    const [translation, setTranslation] = useState("");

    const handleAddFlashcard = async () => {

        try{
                const response =  await fetch("http://localhost:3000/flashcards", {
                method: "POST",
                headers: {
                "Content-Type": "application/json",
                },
                body: JSON.stringify({ word, translation }),
            });
            const data = await response.json();
            console.log("Flashcard added", data)

        

        } catch (error){
            console.error("Error tu jest: ", error)
        }
    };


    return (

        <div> 
            <button className="" onClick={handleAddFlashcard}> Add Flashcard </button>
            <input type ="text" onChange={(e) => {
                const value = e.target.value;
                setWord(value);
                console.log("Word:", word)}} />
            
            <input type ="text" onChange={(e) => {
                const value = e.target.value;
                setTranslation(value);
                console.log("Translation:", translation)}} />
        </div>
    )


}


export default AddFlashcard