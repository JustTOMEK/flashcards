import './App.css'
import { BrowserRouter, Routes, Route } from "react-router"
import FlashcardSets from './components/FlashcardSets'
import AddSet from './components/AddSet'
import Flashcards from './components/Flashcards'
import AddFlashcard from './components/AddFlashcard'
import Translation from './components/Translation'

function App() {
  return (
    <BrowserRouter>
      <div className = "App">
        <h1> APP HERE</h1>
          <Routes>
            <Route path = "/" element = { 
              <> <FlashcardSets />
                  <AddSet />
              </>} />
            <Route path = "/set" element = {
              <> <Flashcards />
                  <AddFlashcard />
              </>} />

            <Route path = "/translation" element = {<Translation />} />
          </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
