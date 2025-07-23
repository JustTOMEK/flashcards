require('dotenv').config()
const jwt = require('jsonwebtoken')
const express = require('express')

//This is the middleware to authenticate whether user has right to use specific request

const authenticate = (req, res, next) => {
    const token = req.headers['token']
    try {
        jwt.verify(token, process.env.JWT_SECRET)
        next()
    } catch (error) {
        return res.status(401).json({ error: 'Invalid token' })
    }
}

module.exports = {authenticate}