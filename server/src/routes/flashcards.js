const express = require('express')
const { db } = require('../db/lowdb')
const { v4: uuidv4 } = require('uuid')
const { authenticate } = require('./authenticateMid')
const router = express.Router()

/*
type Flashcard = {
    word: string
    translation: string
    id: string
    setId: string
    level: number
    repetitions: number
}
*/

function createFlashcardsRouter(db) {
    router.post('/', authenticate, async (req, res) => {
        try {
            const { word, translation, setId } = req.body
            const id = uuidv4()

            const newFlashcard = {
                word,
                translation,
                id,
                setId,
                level: 0,
                repetitions: 0,
            }

            if (!db.data.flashcards) {
                db.data.flashcards = []
            }

            db.data.flashcards.push(newFlashcard)

            await db.write()

            res.status(201).json(newFlashcard)
        } catch (err) {
            console.error('Error creating flashcard:', err)
            res.status(500).json({ error: 'Internal Server Error' })
        }
    })

    router.patch('/level/:id', authenticate, async (req, res) => {
        const { id } = req.params
        const { updatedLevel } = req.body
        await db.read()

        const flashcards = db.data?.flashcards || []

        const index = flashcards.findIndex((card) => card.id === id)

        flashcards[index].level = updatedLevel
        flashcards[index].repetitions = flashcards[index].repetitions + 1

        await db.write()

        res.status(200).json({ message: 'Flashcard updated' })
    })

    router.patch('/edit/:id', authenticate, async (req, res) => {
        const { id } = req.params
        const { word, translation } = req.body
        await db.read()

        const flashcards = db.data?.flashcards || []

        const index = flashcards.findIndex((card) => card.id === id)

        flashcards[index].word = word
        flashcards[index].translation = translation

        await db.write()

        res.status(200).json({ message: 'Flashcard updated' })
    })

    router.delete('/:id', authenticate, async (req, res) => {
        const { id } = req.params
        await db.read()

        const flashcards = db.data?.flashcards || []

        const index = flashcards.findIndex((card) => card.id === id)

        flashcards.splice(index, 1)

        await db.write()

        res.status(200).json()
    })
    return router
}

module.exports = { createFlashcardsRouter }
