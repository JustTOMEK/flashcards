const express = require('express')
const {db} = require('../db/lowdb')
const bcrypt = require('bcrypt')
const { v4: uuidv4 } = require('uuid');

const router = express.Router()


router.post('/', async(req, res) =>{

    const {username, password} = req.body
    const id = uuidv4();

    //Checking whether user with this username already exists
    const existinguser = db.data.users.find(user => user.username === username)
    if (existinguser){
        return res.status(409).json({message: 'Username already taken.'})
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const newUser = {username, hashedPassword, id}

    db.data.users.push(newUser)

    await db.write()

    res.status(201)
})

module.exports = router