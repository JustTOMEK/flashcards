import dotenv from 'dotenv';
dotenv.config();
import jwt from 'jsonwebtoken';
const { verify } = jwt;


//This is the middleware to authenticate whether user has right to use specific request

const authenticate = (req, res, next) => {
    if (process.env.SKIP_AUTH === 'true') {
        return next()
    }

    const token = req.headers['token']
    try {
        const decoded = verify(token, process.env.JWT_SECRET)
        req.userId = decoded.id
        next()
    } catch (error) {
        return res.status(401).json(error)
    }
}

export { authenticate }
