import './App.css'
import { Routes, Route, useLocation } from 'react-router'
import AuthFlashcards from './components/Flashcards'
import AuthFlashcardSets from './components/FlashcardSets'
import Login from './components/Login'
import Register from './components/Register'
import AuthPractice from './components/Practice'
import Welcome from './components/Welcome'
import AuthNavbar from './components/Navbar'
import AuthStatistics from './components/Statistics'
function AppContent() {
    const location = useLocation()
    const noNavbarPaths = ['/login', '/register', '/welcome']
    const shouldHideNavbar = noNavbarPaths.includes(location.pathname)
    return (
        <div className="bg-cream min-h-screen">
            {!shouldHideNavbar && <AuthNavbar />}
            <Routes>
                <Route path="/welcome" element={<Welcome />} />

                <Route path="/" element={<AuthFlashcardSets />} />

                <Route path="/set" element={<AuthFlashcards />} />

                <Route path="/login" element={<Login />} />

                <Route path="/register" element={<Register />} />

                <Route path="/practice" element={<AuthPractice />} />

                <Route path="/statistics" element={<AuthStatistics />} />
            </Routes>
        </div>
    )
}

export default AppContent
