import cors from 'cors'
import express from 'express'
import { createRegisterRouter } from './routes/register.js'
import { createLoginRouter } from './routes/login.js'
import { createFlashcardsRouter } from './routes/flashcards.js'
import { createFlashcardSetsRouter } from './routes/flashcardSets.js'
import { createAuthenticateRouter } from './routes/authenticate.js'
import { createMeRouter } from './routes/me.js'
import { createStatisticsRouter } from './routes/statistics.js'
import { createDB } from './db/lowdb.js'

const app = express()

app.use(cors())
app.use(express.json())

const initApp = async (dbInstance = null) => {
    let db = dbInstance

    if (!db) {
        const result = createDB('json', 'db.json')
        db = result.db
        await result.initDB()
    }

    app.locals.db = db

    app.use('/register', createRegisterRouter(db))
    app.use('/login', createLoginRouter(db))
    app.use('/flashcards', createFlashcardsRouter(db))
    app.use('/flashcardSets', createFlashcardSetsRouter(db))
    app.use('/authenticate', createAuthenticateRouter())
    app.use('/me', createMeRouter(db))
    app.use('/statistics', createStatisticsRouter(db))
}

export { app, initApp }
