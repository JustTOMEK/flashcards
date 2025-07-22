const express = require('express')
require('dotenv').config()
const {db} = require('../db/lowdb')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const router = express.Router()


router.post('/', async (req, res) =>{
    await db.read()
    const {username, password} = req.body

    const user = db.data.users.find(user => user.username === username)
    const password_good = await bcrypt.compare(password, user.hashedPassword)

    if (!user || !password_good ){
        return res.status(401).json({message: 'Invalid username or password'})
    }

    const JWT_SECRET = process.env.JWT_SECRET

    const token = jwt.sign({username: username}, JWT_SECRET, {expiresIn: '1h'})

    return res.status(200).json({message: 'Login successful', token})
})

module.exports = router