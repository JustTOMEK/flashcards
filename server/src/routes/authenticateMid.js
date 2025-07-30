require('dotenv').config()
const jwt = require('jsonwebtoken')

//This is the middleware to authenticate whether user has right to use specific request

const authenticate = (req, res, next) => {
    if (process.env.SKIP_AUTH === 'true') {
        return next()
    }

    const token = req.headers['token']
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        req.userId = decoded.id
        next()
    } catch (error) {
        return res.status(401).json({ error: 'Invalid token' })
    }
}

module.exports = { authenticate }
