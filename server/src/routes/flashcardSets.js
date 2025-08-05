import { Router } from 'express'
import { v4 as uuidv4 } from 'uuid'
import { authenticate } from './authenticateMid.js'

/*
type FlashcardSet = {
    name: string
    description: string
    id: string
    userId: string
    sourceLanguage: string
    targetLanguage: string
    sourceLanguageCode: string
    targetLanguageCode: string
}
*/
function createFlashcardSetsRouter(db) {
    const router = Router()
    // this is to get flashcards of specific flascardSet
    router.get('/set/:setId', authenticate, async (req, res) => {
        const { setId } = req.params
        await db.read()
        const flashcards =
            db.data?.flashcards.filter((card) => card.setId === setId) || []

        res.status(200).json(flashcards)
    })

    // this is to get all sets that an userowns
    router.get('/', authenticate, async (req, res) => {
        const userId = req.userId
        await db.read()

        const sets = db.data?.flashcardSets.filter(
            (set) => set.userId === userId
        )

        res.json(sets)
    })

    router.get(`/languagecodes/:setId`, authenticate, async (req, res) => {
        const { setId } = req.params
        await db.read()
        const set = db.data?.flashcardSets.find((set) => set.id === setId)

        res.status(201).json({
            sourceLanguageCode: set.sourceLanguageCode,
            targetLanguageCode: set.targetLanguageCode,
        })
    })

    router.post('/', authenticate, async (req, res) => {
        const {
            name,
            description,
            sourceLanguage,
            targetLanguage,
            sourceLanguageCode,
            targetLanguageCode,
        } = req.body

        const userId = req.userId
        const id = uuidv4()

        const newFlashcardSet = {
            id,
            name,
            description,
            userId,
            sourceLanguage,
            targetLanguage,
            sourceLanguageCode,
            targetLanguageCode,
        }

        if (!db.data.flashcardSets) {
            db.data.flashcardSets = []
        }

        db.data.flashcardSets.push(newFlashcardSet)

        await db.write()

        res.status(201).json(newFlashcardSet)
    })

    router.delete('/:id', authenticate, async (req, res) => {
        const { id } = req.params
        await db.read()

        const flashcardSets = db.data?.flashcardSets || []

        const index = flashcardSets.findIndex((card) => card.id === id)

        flashcardSets.splice(index, 1)

        const flashcards = db.data?.flashcards || []

        for (let i = flashcards.length - 1; i >= 0; i--) {
            if (flashcards[i].setId === id) {
                flashcards.splice(i, 1)
            }
        }

        await db.write()

        res.status(200).json()
    })
    return router
}

export { createFlashcardSetsRouter }
