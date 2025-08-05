import { Router } from 'express'
import { hash } from 'bcrypt'
import { v4 as uuidv4 } from 'uuid'

function createRegisterRouter(db) {
    const router = Router()

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

        const hashedPassword = await hash(password, 10)
        const newUser = { username, hashedPassword, id, lastLoginDate: null, dailyStreak: 0 }

        db.data.users.push(newUser)
        await db.write()

        res.status(201).json({ message: 'User created successfully' })
    })

    return router
}

export { createRegisterRouter }
