import { Router } from 'express'
import dotenv from 'dotenv'
dotenv.config()
import { compare } from 'bcrypt'
import jwt from 'jsonwebtoken'
const { sign } = jwt

function updateStreak(user) {
    const today = new Date().toISOString().split('T')[0]
    const yesterday = new Date(Date.now() - 86400000)
        .toISOString()
        .split('T')[0]

    if (user.lastLoginDate === today) {
        return
    }

    if (user.lastLoginDate === yesterday) {
        user.dailyStreak += 1
    } else {
        user.dailyStreak = 1
    }

    user.lastLoginDate = today
}

function createLoginRouter(db) {
    const router = Router()

    router.post('/', async (req, res) => {
        await db.read()
        const { username, password } = req.body

        if (!username || !password) {
            return res
                .status(400)
                .json({ message: 'Username and password cannot be empty' })
        }

        const user = db.data.users.find((user) => user.username === username)
        updateStreak(user)
        await db.write()
        if (!user) {
            return res.status(401).json({ message: 'Invalid username' })
        }

        const password_good = await compare(password, user.hashedPassword)

        if (!password_good) {
            return res.status(401).json({ message: 'Invalid password' })
        }

        const token = sign({ id: user.id }, process.env.JWT_SECRET, {
            expiresIn: '1h',
        })

        return res.status(200).json({ message: 'Login successful', token })
    })
    return router
}

export { createLoginRouter }
