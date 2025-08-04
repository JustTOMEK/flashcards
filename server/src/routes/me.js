require('dotenv').config()
const jwt = require('jsonwebtoken')
const express = require('express')

function createMeRouter(db) {
    const router = express.Router()

    router.get('/', async (req, res) => {
        await db.read()
        const token = req.headers['token']
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET)

            const userId = decoded.id
            const user = db.data.users.find((u) => u.id === userId)
            return res.status(200).json({ userId, username: user.username })
        } catch (error) {
            return res.status(401).json({ error: 'Invalid token' })
        }
    })
    return router
}

module.exports = { createMeRouter }
