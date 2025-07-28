require('dotenv').config()
const jwt = require('jsonwebtoken')
const { db } = require('../db/lowdb')
const express = require('express')
const router = express.Router()

router.get('/', async (req, res) => {
    await db.read()
    const token = req.headers['token']
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)

        const userId = decoded.id
        console.log(userId)
        const user = db.data.users.find((u) => u.id === userId)
        console.log(user)
        return res.status(200).json({ userId, username: user.username })
    } catch (error) {
        return res.status(401).json({ error: 'Invalid token' })
    }
})

module.exports = router
