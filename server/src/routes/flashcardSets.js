const express = require('express')
const {db} = require('../db/lowdb')
const { v4: uuidv4 } = require('uuid');

const router = express.Router()

router.get('/', async (req, res ) => {
    await db.read()
    const flashcardSets = db.data?.flashcardSets || []
    res.json(flashcardSets)
})

router.get('/:id', async (req, res) => {
    const id = req.params
    await db.read()

    const flashcards = db.data?.flashcards.filter(card => card.id === id) || []

    res.json(flashcards)

})

router.post('/', async (req, res) => {
    const {name, description} = req.body

    const id = uuidv4()

    const newFlashcardSet = {id, name, description}
        
    if (!db.data.flashcardSets) {
        db.data.flashcardSets = [];
    }

    
    db.data.flashcardSets.push(newFlashcardSet)

    await db.write()

    res.status(201).json(newFlashcardSet)
})

router.delete('/:id', async (req, res) => {
    const {id} = req.params
    await db.read()

    const flashcardSets = db.data?.flashcardSets || [];

    const index = flashcardSets.findIndex(card => card.id === id)

    flashcardSets.splice(index, 1);

    const flashcards = db.data?.flashcards || [];

    for (let i = flashcards.length - 1; i >=0; i--){
        if (flashcards[i].setId === id){
            flashcards.splice(i, 1)
        }
    }

    await db.write();

    res.status(200).json()  
})

module.exports = router