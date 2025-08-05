import dotenv from 'dotenv'
dotenv.config()
import jwt from 'jsonwebtoken'
const { verify } = jwt
import { Router } from 'express'
const router = Router()

function createAuthenticateRouter() {
    router.post('/', async (req, res) => {
        const token = req.headers['token']
        try {
            verify(token, process.env.JWT_SECRET)
            return res.status(200).json({ message: 'Token is ok' })
        } catch (error) {
            return res.status(401).json(error)
        }
    })
    return router
}

export { createAuthenticateRouter }
