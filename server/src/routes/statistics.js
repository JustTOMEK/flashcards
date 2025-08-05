import { Router } from 'express'
import { authenticate } from './authenticateMid.js'

function createStatisticsRouter(db) {
    const router = Router()
    router.get('/percentage', authenticate, async (req, res) => {
        const userId = req.userId
        await db.read()
        const sets = db.data?.flashcardSets.filter(
            (set) => set.userId === userId
        )

        const result = sets.map((set) => {
            const flashcardsForSet = db.data.flashcards.filter(
                (card) => card.setId === set.id
            )
            const total = flashcardsForSet.length

            const level3Count = flashcardsForSet.reduce((count, card) => {
                return card.level === 3 ? count + 1 : count
            }, 0)

            const level3Percentage = total > 0 ? (level3Count / total) * 100 : 0

            return {
                setName: set.name,
                level3Percentage: level3Percentage.toFixed(2) + '%',
            }
        })
        res.json(result)
    })

    router.get('/completed', authenticate, async (req, res) => {
        const userId = req.userId
        await db.read()
        const sets =
            db.data?.flashcardSets.filter((set) => set.userId === userId) || []

        const flashcards = db.data?.flashcards || []

        const userSetIds = sets.map((set) => set.id)

        const userFlashcards = flashcards.filter((card) =>
            userSetIds.includes(card.setId)
        )

        let completed = 0
        let notCompleted = 0
        let repetitions = 0

        for (const card of userFlashcards) {
            repetitions += card.repetitions
            if (card.level === 3) {
                completed++
            } else {
                notCompleted++
            }
        }
        const user = db.data.users.find((user) => user.id === userId)

        res.json({
            completed,
            notCompleted,
            repetitions,
            dailyStreak: user.dailyStreak,
        })
    })
    return router
}

export { createStatisticsRouter }
