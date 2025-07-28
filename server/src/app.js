const cors = require('cors')
const express = require('express')
const flashcardsRouter = require('./routes/flashcards')
const flashcardSetsRouter = require('./routes/flashcardSets')
const registerRouter = require('./routes/register')
const loginRouter = require('./routes/login')
const authenticateRouter = require('./routes/authenticate')
const meRouter = require('./routes/me')

const app = express()

app.use(cors())
app.use(express.json())
app.use('/flashcards', flashcardsRouter)
app.use('/flashcardSets', flashcardSetsRouter)
app.use('/register', registerRouter)
app.use('/login', loginRouter)
app.use('/authenticate', authenticateRouter)
app.use('/me', meRouter)

module.exports = app
