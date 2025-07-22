import {useState} from "react"
import "../App.css"
import { useNavigate } from "react-router";

function Register(){

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    const handleRegister = async () =>{
        try {
            const response = await fetch("http://localhost:3000/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({username, password})
            });
            const data = await response.json();
            console.log('dsadsa')
            
            console.log(response)
            if (response.ok){
                navigate("/login")
            }
            else{
                setUsername("")
                setPassword("")
                console.log('Register unsucessful')
            }
        } catch (error){
            console.error("Error tu jest: ", error)
        }
    }


    return (
        <>
        Welcome to the Flashcards Website
        Usernamea:
        <input type = "text" value = {username} className="bg-red-500" 
        onChange={(e) => {const value = e.target.value; setUsername(value)}} />

        Password:
        <input type = "password" value = {password} className="bg-red-500" 
        onChange={(e) => {const value = e.target.value; setPassword(value)}} />
        
        <button className="bg-blue-500 rounded" onClick={handleRegister} > Register</button>

        </>
    )
}
export default Register