import { useState } from 'react'
import '../App.css'
import { NavLink } from 'react-router'

function Login() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const handleLogin = async () => {
        try {
            const response = await fetch('http://localhost:3000/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            })
            setUsername('')
            setPassword('')

            const data = await response.json()
            if (response.ok) {
                localStorage.setItem('token', data.token)
                console.log('Token: ', data.token)
            } else {
                console.log('Login unsucessful')
            }
        } catch (error) {
            console.error('Error tu jest: ', error)
        }
    }

    return (
        <>
            Welcome to the Flashcards Website Username:
            <input
                type="text"
                value={username}
                className="bg-red-500"
                onChange={(e) => {
                    const value = e.target.value
                    setUsername(value)
                }}
            />
            Password:
            <input
                type="password"
                value={password}
                className="bg-red-500"
                onChange={(e) => {
                    const value = e.target.value
                    setPassword(value)
                }}
            />
            <button className="bg-blue-500 rounded" onClick={handleLogin}>
                {' '}
                Signin
            </button>
            <NavLink to="/register" className="bg-green-500 rounded" end>
                {' '}
                Register
            </NavLink>
        </>
    )
}
export default Login
