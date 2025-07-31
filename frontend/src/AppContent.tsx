import './App.css'
import {Routes, Route, useLocation } from 'react-router'
import Flashcards from './components/Flashcards'
import Translation from './components/Translation'
import FlashcardSets from './components/FlashcardSets'
import Login from './components/Login'
import Register from './components/Register'
import Practice from './components/Practice'
import Welcome from './components/Welcome'
import Navbar from './components/Navbar'
function AppContent() {
    const location = useLocation();
    const noNavbarPaths = ["/login", "/register", "/welcome"]
    const shouldHideNavbar = noNavbarPaths.includes(location.pathname);
    return (
            <div className="bg-cream min-h-screen">
                {!shouldHideNavbar && <Navbar />}
                <Routes>
                    <Route path="/welcome" element={<Welcome />} />

                    <Route path="/" element={<FlashcardSets />} />

                    <Route path="/set" element={<Flashcards />} />

                    <Route path="/translation" element={<Translation />} />

                    <Route path="/login" element={<Login />} />

                    <Route path="/register" element={<Register />} />

                    <Route path="/practice" element={<Practice />} />
                </Routes>
            </div>
    )
}

export default AppContent
