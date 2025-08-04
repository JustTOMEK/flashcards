const express = require('express')
const bcrypt = require('bcrypt')
const { v4: uuidv4 } = require('uuid')

function createRegisterRouter(db) {
    const router = express.Router()

    router.post('/', async (req, res) => {
        const { username, password } = req.body
        const id = uuidv4()

        await db.read()

        const existingUser = db.data.users.find(
            (user) => user.username === username
        )
        if (existingUser) {
            return res.status(409).json({ message: 'Username already taken.' })
        }

        const hashedPassword = await bcrypt.hash(password, 10)
        const newUser = { username, hashedPassword, id }

        db.data.users.push(newUser)
        await db.write()

        res.status(201).json({ message: 'User created successfully' })
    })

    return router
}

module.exports = { createRegisterRouter }
