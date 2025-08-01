import {test, expect, beforeEach} from 'vitest'
const request = require('supertest')
import app from '../app'
import {db} from '../db/lowdb'

process.env.SKIP_AUTH = 'true'
beforeEach(async () => {

    db.data = {
        users: [
    {
      "id": "user1",
      "hashedPassword": "",
      "username": "janek"
    },
    {
      "username": "tomek_poziomek",
      "hashedPassword": "",
      "id": "25e1f770-bba8-429a-892c-4bdd3a263241"
    }
  ],
  flashcardSets: [
    {
      "id": "9fa5d0a7-d582-4d4d-9b97-82d273b4dbd6",
      "name": "zestaw_tomka_poziomka",
      "description": "dsadas",
      "userId": "25e1f770-bba8-429a-892c-4bdd3a263241",
      "sourceLanguage": "English",
      "targetLanguage": "Polish",
      "sourceLanguageCode": "en",
      "targetLanguageCode": "pl"
    },
    {
      "id": "23a9b870-92c9-474b-a264-7a613c355fb0",
      "name": "zestaw_honoraty",
      "description": "dsadas",
      "userId": "25e1f770-bba8-429a-892c-4bdd3a263241",
      "sourceLanguage": "German",
      "targetLanguage": "English",
      "sourceLanguageCode": "de",
      "targetLanguageCode": "en"
    }
  ],
  flashcards: [
    {
      "word": "james",
      "translation": "corden",
      "id": "f29877ba-0fb5-4440-9256-e6c97ed31cbf",
      "setId": "9fa5d0a7-d582-4d4d-9b97-82d273b4dbd6",
      "level": 0,
      "repetitions": 0
    },
    {
      "word": "whitney",
      "translation": "houston",
      "id": "d4efda03-e122-4d72-bdd3-5a82829c2d05",
      "setId": "9fa5d0a7-d582-4d4d-9b97-82d273b4dbd6",
      "level": 0,
      "repetitions": 0
    },
    {
      "word": "oprah",
      "translation": "winfrey",
      "id": "aab3a9df-7db8-44dd-b728-88531fb926a4",
      "setId": "9fa5d0a7-d582-4d4d-9b97-82d273b4dbd6",
      "level": 0,
      "repetitions": 0
    }
  ]

    }
    await db.write()
})


test('returns flashcards for a valid setId', async () => {
    const res = await request(app)
      .get('/flashcardSets/set/9fa5d0a7-d582-4d4d-9b97-82d273b4dbd6')

    expect(res.status).toBe(200)
    expect(res.body).toHaveLength(3)
    expect(res.body[0]).toMatchObject({ word: 'james', translation: 'corden' })
    expect(res.body[1]).toMatchObject({ word: 'whitney', translation: 'houston' })
    expect(res.body[2]).toMatchObject({ word: 'oprah', translation: 'winfrey' })

  })

test('returns language codes for a valid setId', async () => {
    const res = await request(app)
      .get('/flashcardSets/languagecodes/23a9b870-92c9-474b-a264-7a613c355fb0')

    expect(res.status).toBe(201)
    expect(res.body.sourceLanguageCode).toBe('de')
    expect(res.body.targetLanguageCode).toBe('en')

  })
  