import dotenv from 'dotenv';
dotenv.config();
import jwt from 'jsonwebtoken';
const { verify } = jwt;

import { Router } from 'express'

function createMeRouter(db) {
    const router = Router()

    router.get('/', async (req, res) => {
        await db.read()
        const token = req.headers['token']
        try {
            const decoded = verify(token, process.env.JWT_SECRET)

            const userId = decoded.id
            const user = db.data.users.find((u) => u.id === userId)
            return res.status(200).json({ userId, username: user.username })
        } catch (error) {
            return res.status(401).json(error)
        }
    })
    return router
}

export { createMeRouter }
