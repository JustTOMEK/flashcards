const cors = require('cors')
const express = require('express')
const app = express()

app.use(cors())
app.use(express.json())

const { createDB } = require('./db/lowdb')
const {createRegisterRouter} = require('./routes/register')
const { createLoginRouter } = require('./routes/login')
const { createFlashcardsRouter } = require('./routes/flashcards')
const { createFlashcardSetsRouter } = require('./routes/flashcardSets')
const { createAuthenticateRouter } = require('./routes/authenticate')
const { createMeRouter } = require('./routes/me')
const { createStatisticsRouter } = require('./routes/statistics')

const PORT = 3000

const startServer = async () => {
  try {
    const { db, initDB } = createDB('json', 'db.json')
    await initDB()

    app.locals.db = db 

    app.use('/register', createRegisterRouter(db))
    app.use('/login', createLoginRouter(db))
    app.use('/flashcards', createFlashcardsRouter(db))
    app.use('/flashcardSets', createFlashcardSetsRouter(db))
    app.use('/authenticate', createAuthenticateRouter(db))
    app.use('/me', createMeRouter(db))
    app.use('/statistics', createStatisticsRouter(db))

    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`)
    })
  } catch (err) {
    console.error('Failed to initialize DB:', err)
  }
}

startServer()
