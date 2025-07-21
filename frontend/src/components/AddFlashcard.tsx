import { useState } from "react"
import '../App.css'
import { useLocation } from "react-router";
function AddFlashcard()
{
    const location = useLocation();
    const setId = location.state;
    
    const [word, setWord] = useState("");
    const [translation, setTranslation] = useState("");

    const handleAddFlashcard = async () => {

        try{
                const response =  await fetch("http://localhost:3000/flashcards", {
                method: "POST",
                headers: {
                "Content-Type": "application/json",
                },
                body: JSON.stringify({ word, translation, setId }),
            });
            const data = await response.json();
            console.log("Flashcard added", data)
            setWord("")
            setTranslation("")
        

        } catch (error){
            console.error("Error tu jest: ", error)
        }
    };


    return (

        <div className="" > 
            <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition" onClick={handleAddFlashcard}> Add Flashcard </button>
            Word:
            <input type ="text" value = {word} className="px-4 py-2 bg-red-500 text-white rounded" onChange={(e) => {
                const value = e.target.value;
                setWord(value) }} />
            Translation:
            <input type ="text" value = {translation} className="px-4 py-2 bg-red-500 text-white rounded" onChange={(e) => {
                const value = e.target.value;
                setTranslation(value) }} />
        </div>
    )


}


export default AddFlashcard