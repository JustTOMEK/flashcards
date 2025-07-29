import { useNavigate } from 'react-router'

function Welcome() {
    const navigate = useNavigate()

    return (
        <div className="flex h-screen bg-blue-50 text-blue-900">
            <div className="w-1/2 p-8 bg-dark-olive flex flex-col justify-center items-center">
                <div className="space-y-6">
                    <div className="bg-burnt-orange p-6 rounded-lg shadow-md">
                        <h3 className="text-xl mb-2 text-cream">
                            Create Flashcard Sets
                        </h3>
                        <p className="text-base text-cream">
                            Build your own flashcard sets to study and review
                            topics effectively.
                        </p>
                    </div>
                    <div className="bg-burnt-orange p-6 rounded-lg shadow-md">
                        <h3 className="text-xl mb-2 text-cream">Practice</h3>
                        <p className="text-base text-cream">
                            Test your knowledge by practicing with flashcards
                            created by you.
                        </p>
                    </div>
                    <div className="bg-burnt-orange p-6 rounded-lg shadow-md">
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
            <div className="w-1/2 p-8 bg-cream flex flex-col justify-center items-center">
                <h1 className="text-4xl mb-6 text-dark-olive">
                    Welcome to Flashcards!
                </h1>
                <p className="text-lg  text-dark-olive mb-10 text-center">
                    Discover, create, and practice flashcards to enhance your
                    learning. Join a community of learners and boost your
                    knowledge across various languages.
                </p>
                <div className="flex space-x-4">
                    <button
                        className="bg-burnt-orange text-cream py-2 px-4 rounded hover:bg-blue-800"
                        onClick={() => {
                            navigate('/login')
                        }}
                    >
                        Login
                    </button>
                    <button
                        className="bg-burnt-orange text-cream py-2 px-4 rounded hover:bg-blue-800"
                        onClick={() => {
                            navigate('/register')
                        }}
                    >
                        Register
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Welcome
