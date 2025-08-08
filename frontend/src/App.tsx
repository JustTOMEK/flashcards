import './App.css'
import { BrowserRouter } from 'react-router'
import AppContent from './AppContent'
import './i18'
function App() {
    return (
        <BrowserRouter>
            <AppContent />
        </BrowserRouter>
    )
}

export default App
