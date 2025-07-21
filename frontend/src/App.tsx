import './App.css'
import { BrowserRouter, Routes, Route } from "react-router";
import FlashcardSets from './components/Sets'
import AddSet from './components/AddSet'

function App() {
  return (
    <BrowserRouter>
      <div className = "App">
        <h1> APP HERE</h1>
          <Routes>
            <Route path = "/" element = { <> <FlashcardSets />
        <AddSet /> </>} />     
          </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
