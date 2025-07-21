const express = require('express')
const {db} = require('../db/lowdb')
const { v4: uuidv4 } = require('uuid');

const router = express.Router()

router.get('/', async (req, res) => {
    await db.read()
    const flashcards = db.data?.flashcards || []
    res.json(flashcards)
})

router.post('/', async (req, res) =>{
    const {word, translation, setId} = req.body
    const id = uuidv4();

    const newFlashcard = {word, translation, id, setId}

    if (!db.data.flashcards) {
        db.data.flashcards = [];
    }

    db.data.flashcards.push(newFlashcard)
    
    await db.write()

    res.status(201).json(newFlashcard)
})

router.delete('/:id', async (req, res) =>{
    const {id} = req.params
    await db.read()

    const flashcards = db.data?.flashcards || [];

    const index = flashcards.findIndex(card => card.id === id)

    flashcards.splice(index, 1);

    await db.write();

    res.status(200).json()


})

module.exports = router