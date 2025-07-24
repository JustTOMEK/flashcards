process.env.SKIP_AUTH = 'true';

import { test, expect} from 'vitest'
const request = require('supertest')
import app from '../app'


test('GET /flashcards', async () => {
    const res = await request(app).get('/flashcards')
    expect(res.status).toBe(200);
})