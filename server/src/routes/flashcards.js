const express = require('express')
const {db} = require('../db/lowdb')

const router = express.Router()

router.get('/', async (req, res) => {
    await db.read()
    const flashcards = db.data?.flashcards || []
    res.json(flashcards)
})

router.post('/', async (req, res) =>
{
    const {word, translation} = req.body

    const newFlashcard = {word, translation}

    if (!db.data.flashcards) {
        db.data.flashcards = [];
    }

    db.data.flashcards.push(newFlashcard)
    
    await db.write()

    res.status(201).json(newFlashcard)
})

module.exports = router