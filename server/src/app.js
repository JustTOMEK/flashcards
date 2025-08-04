const cors = require('cors')
const express = require('express')
const { createRegisterRouter } = require('./routes/register')
const { createLoginRouter } = require('./routes/login')
const { createFlashcardsRouter } = require('./routes/flashcards')
const { createFlashcardSetsRouter } = require('./routes/flashcardSets')
const { createAuthenticateRouter } = require('./routes/authenticate')
const { createMeRouter } = require('./routes/me')
const { createStatisticsRouter } = require('./routes/statistics')

const app = express()

app.use(cors())
app.use(express.json())

const initApp = async (dbInstance = null) => {
    let db = dbInstance

    if (!db) {
        const { createDB } = require('./db/lowdb')
        const result = createDB('json', 'db.json')
        db = result.db
        await result.initDB()
    }

    app.locals.db = db

    app.use('/register', createRegisterRouter(db))
    app.use('/login', createLoginRouter(db))
    app.use('/flashcards', createFlashcardsRouter(db))
    app.use('/flashcardSets', createFlashcardSetsRouter(db))
    app.use('/authenticate', createAuthenticateRouter(db))
    app.use('/me', createMeRouter(db))
    app.use('/statistics', createStatisticsRouter(db))
}

module.exports = { app, initApp }
