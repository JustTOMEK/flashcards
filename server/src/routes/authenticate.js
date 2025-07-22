require('dotenv').config()
const jwt = require('jsonwebtoken')
const express = require('express')
const router = express.Router()


router.post('/', async(req, res) => {
    const token = req.headers['token']
    try{
        jwt.verify(token, process.env.JWT_SECRET )
        return res.status(200).json({ message: 'Token is ok'}); 
    }
    catch(error){
        return res.status(401).json({ error: 'Invalid token' })
    }
    
})

module.exports = router