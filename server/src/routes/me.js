require('dotenv').config()
const jwt = require('jsonwebtoken')
const express = require('express')
const router = express.Router()

router.get('/', async (req, res) => {
    const token = req.headers['token']
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)

        const userId = decoded.id
        return res.status(200).json({ userId })
    } catch (error) {
        return res.status(401).json({ error: 'Invalid token' })
    }
})

module.exports = router
