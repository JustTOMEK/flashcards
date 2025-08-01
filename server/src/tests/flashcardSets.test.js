import {test, expect, beforeEach} from 'vitest'
const request = require('supertest')
import app from '../app'
import {db} from '../db/lowdb'

process.env.JWT_SECRET = 'test'


beforeEach(async () => {

    db.data = {

    }
})

test('Get Flashcards from a set', async () => {
    const res = await request(app).get('')
})