import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router'
import Flashcards from './components/Flashcards'
import Translation from './components/Translation'
import FlashcardSets from './components/FlashcardSets'
import Login from './components/Login'
import Register from './components/Register'
function App() {
    return (
        <BrowserRouter>
            <div className="App">
                <h1> APP HERE</h1>
                <Routes>
                    <Route path="/" element={<FlashcardSets />} />

                    <Route path="/set" element={<Flashcards />} />

                    <Route path="/translation" element={<Translation />} />

                    <Route path="/login" element={<Login />} />

                    <Route path="/register" element={<Register />} />
                </Routes>
            </div>
        </BrowserRouter>
    )
}

export default App
