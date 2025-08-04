import { test, expect, beforeEach } from 'vitest'
import request from 'supertest'
import { app, initApp } from '../app'
import { createDB } from '../db/lowdb'

process.env.SKIP_AUTH = 'true'

let testDb

beforeEach(async () => {
  const { db, initDB } = createDB('memory')
  testDb = db
  initDB()

  testDb.data = {
    users: [
      {
        id: 'user1',
        hashedPassword: '',
        username: 'janek',
      },
      {
        username: 'tomek_poziomek',
        hashedPassword: '',
        id: '25e1f770-bba8-429a-892c-4bdd3a263241',
      },
    ],
    flashcardSets: [
      {
        id: '9fa5d0a7-d582-4d4d-9b97-82d273b4dbd6',
        name: 'zestaw_tomka_poziomka',
        description: 'dsadas',
        userId: '25e1f770-bba8-429a-892c-4bdd3a263241',
        sourceLanguage: 'English',
        targetLanguage: 'Polish',
        sourceLanguageCode: 'en',
        targetLanguageCode: 'pl',
      },
      {
        id: '23a9b870-92c9-474b-a264-7a613c355fb0',
        name: 'zestaw_honoraty',
        description: 'dsadas',
        userId: '25e1f770-bba8-429a-892c-4bdd3a263241',
        sourceLanguage: 'German',
        targetLanguage: 'English',
        sourceLanguageCode: 'de',
        targetLanguageCode: 'en',
      },
    ],
    flashcards: [
      {
        word: 'james',
        translation: 'corden',
        id: 'f29877ba-0fb5-4440-9256-e6c97ed31cbf',
        setId: '9fa5d0a7-d582-4d4d-9b97-82d273b4dbd6',
        level: 0,
        repetitions: 0,
      },
      {
        word: 'whitney',
        translation: 'houston',
        id: 'd4efda03-e122-4d72-bdd3-5a82829c2d05',
        setId: '9fa5d0a7-d582-4d4d-9b97-82d273b4dbd6',
        level: 0,
        repetitions: 0,
      },
      {
        word: 'oprah',
        translation: 'winfrey',
        id: 'aab3a9df-7db8-44dd-b728-88531fb926a4',
        setId: '9fa5d0a7-d582-4d4d-9b97-82d273b4dbd6',
        level: 0,
        repetitions: 0,
      },
    ],
  }

  testDb.write()

  app.locals.db = testDb
  await initApp(testDb)
})

test('should create a new flashcard and return 201', async () => {
  const newCard = {
    word: 'elon',
    translation: 'musk',
    setId: '9fa5d0a7-d582-4d4d-9b97-82d273b4dbd6',
  }

  const response = await request(app).post('/flashcards').send(newCard)

  expect(response.status).toBe(201)
  expect(response.body).toMatchObject({
    word: 'elon',
    translation: 'musk',
    setId: newCard.setId,
    level: 0,
    repetitions: 0,
  })
  expect(response.body.id).toBeDefined()

  const added = testDb.data.flashcards.find((flashcard) => flashcard.word === 'elon')
  expect(added).toBeDefined()
})
