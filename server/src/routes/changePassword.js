import { Router } from "express";
import { compare, hash } from 'bcrypt'
import { authenticate } from "./authenticateMid.js";


function createChangePasswordRouter(db){
    const router = Router()

    router.patch('/', authenticate, async(req, res) =>{
        const {currentPassword, newPassword} = req.body
        await db.read()
        const user = db.data.users.find((user) => user.id === req.userId)
        const password_good = await compare(currentPassword, user.hashedPassword)

        if (!password_good) {
            return res.status(401).json({ message: 'Invalid password' })
        }
        const hashedPassword = await hash(newPassword, 10)
        user.hashedPassword = hashedPassword
        await db.write()

        res.status(200).json({message: 'Changed password'})

    })
    return router
}
export {createChangePasswordRouter}