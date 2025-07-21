import { useState } from "react"
import '../App.css'
function AddSet()
{
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");

    const handleAddSet = async () => {

        try{
                const response =  await fetch("http://localhost:3000/flashcardSets", {
                method: "POST",
                headers: {
                "Content-Type": "application/json",
                },
                body: JSON.stringify({ name, description }),
            });
            setName("")
            setDescription("")
        
        const data = await response.json();
        console.log("Set added", data)

        } catch (error){
            console.error("Error tu jest: ", error)
        }
    };


    return (

        <div className="" > 
            <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition" onClick={handleAddSet}> Add Set </button>
            Name:
            <input type ="text" value = {name} className="px-4 py-2 bg-red-500 text-white rounded" onChange={(e) => {
                const value = e.target.value;
                setName(value);
                console.log("Word:", name)}} />
            Description:
            <input type ="text" value = {description} className="px-4 py-2 bg-red-500 text-white rounded" onChange={(e) => {
                const value = e.target.value;
                setDescription(value);
                console.log("Translation:", description)}} />
        </div>
    )


}


export default AddSet