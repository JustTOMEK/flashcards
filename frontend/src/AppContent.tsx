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
import AuthChangePasswordForm from './components/ChangePasswordForm'
function AppContent() {
    const location = useLocation()
    const noNavbarPaths = ['/login', '/register', '/welcome']
    const shouldHideNavbar = noNavbarPaths.includes(location.pathname)
    return (
        <div className="bg-cream h-screen flex flex-col">
            {!shouldHideNavbar && <AuthNavbar />}
            <div className="flex-1 overflow-auto">
                <Routes>
                    <Route path="/welcome" element={<Welcome />} />

                    <Route path="/" element={<AuthFlashcardSets />} />

                    <Route path="/set" element={<AuthFlashcards />} />

                    <Route path="/login" element={<Login />} />

                    <Route path="/register" element={<Register />} />

                    <Route path="/practice" element={<AuthPractice />} />

                    <Route path="/statistics" element={<AuthStatistics />} />

                    <Route
                        path="/changePassword"
                        element={<AuthChangePasswordForm />}
                    />
                </Routes>
            </div>
        </div>
    )
}

export default AppContent
