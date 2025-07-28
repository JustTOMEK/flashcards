import { useState } from 'react'
import '../App.css'
import { useNavigate } from 'react-router'

function Register() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const navigate = useNavigate()

    function handleLogin() {
        navigate('/login')
    }

    const handleRegister = async () => {
        try {
            const response = await fetch('http://localhost:3000/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            })

            if (response.ok) {
                navigate('/login')
            } else {
                setUsername('')
                setPassword('')
                console.log('Register unsucessful')
            }
        } catch (error) {
            console.error('Error tu jest: ', error)
        }
    }

    return (
        <div className="flex h-screen bg-blue-50 text-blue-900">
            <div className="w-1/2 p-8 bg-dark-olive flex flex-col justify-center items-center">
                <div className="space-y-6">
                    <div className="bg-tan p-6 rounded-lg shadow-md">
                        <h3 className="text-xl mb-2 text-cream">
                            Create Flashcard Sets
                        </h3>
                        <p className="text-base text-cream">
                            Build your own flashcard sets to study and review
                            topics effectively.
                        </p>
                    </div>
                    <div className="bg-tan p-6 rounded-lg shadow-md">
                        <h3 className="text-xl mb-2 text-cream">Practice</h3>
                        <p className="text-base text-cream">
                            Test your knowledge by practicing with flashcards
                            created by you.
                        </p>
                    </div>
                    <div className="bg-tan p-6 rounded-lg shadow-md">
                        <h3 className="text-xl mb-2 text-cream">
                            Track Your Progress
                        </h3>
                        <p className="text-base text-cream">
                            Monitor your learning journey and improve your
                            retention over time.
                        </p>
                    </div>
                </div>
            </div>

            <div className="w-1/2 p-8 flex flex-col justify-center items-center bg-cream shadow-md">
                <h2 className="text-2xl font-semibold mb-6 text-olive">
                    Register
                </h2>

                <label className="w-full max-w-sm mb-4">
                    <span className="block mb-1 text-sm font-medium text-olive">
                        Username
                    </span>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="w-full p-2 rounded border border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                </label>

                <label className="w-full max-w-sm mb-6">
                    <span className="block mb-1 text-sm font-medium text-olive">
                        Password
                    </span>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full p-2 rounded border border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                </label>

                <div className="w-full max-w-sm space-y-4">
                    <button
                        onClick={handleRegister}
                        className="w-full bg-tan hover:bg-blue-600 text-white font-semibold py-2 px-6 rounded transition"
                    >
                        Register
                    </button>

                    <button
                        onClick={handleLogin}
                        className="w-full bg-tan hover:bg-blue-600 text-white font-semibold py-2 px-6 rounded transition"
                    >
                        Already have an account? Log in
                    </button>
                </div>
            </div>
        </div>
    )
}
export default Register
