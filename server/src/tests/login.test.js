import { test, expect, beforeEach } from 'vitest'
import request from 'supertest'
import { app, initApp } from '../app'
import { createDB } from '../db/lowdb'
import bcrypt from 'bcrypt'

process.env.JWT_SECRET = 'test'

let testDb

beforeEach(async () => {
    const { db, initDB } = createDB('memory')
    testDb = db
    await initDB()

    const hashedPassword = await bcrypt.hash('passworddd', 10)

    testDb.data = {
        users: [
            {
                id: 'user1',
                hashedPassword,
                username: 'janek',
            },
        ],
        flashcardSets: [],
        flashcards: [],
    }

    await testDb.write()

    app.locals.db = testDb

    await initApp(testDb)
})

test('Successful login', async () => {
    const res = await request(app).post('/login').send({
        username: 'janek',
        password: 'passworddd',
    })
    expect(res.status).toBe(200)
    expect(res.body).toHaveProperty('token')
    expect(res.body.message).toBe('Login successful')
})

test('Wrong password', async () => {
    const res = await request(app).post('/login').send({
        username: 'janek',
        password: 'passwordd',
    })
    expect(res.status).toBe(401)
    expect(res.body.message).toBe('Invalid password')
})

test('Non-existing user', async () => {
    const res = await request(app).post('/login').send({
        username: 'tomek',
        password: 'passwordd',
    })
    expect(res.status).toBe(401)
    expect(res.body.message).toBe('Invalid username')
})

test('Empty password', async () => {
    const res = await request(app).post('/login').send({
        username: 'tomek',
        password: '',
    })
    expect(res.status).toBe(400)
    expect(res.body.message).toBe('Username and password cannot be empty')
})

test('Empty username', async () => {
    const res = await request(app).post('/login').send({
        username: '',
        password: 'passwordd',
    })
    expect(res.status).toBe(400)
    expect(res.body.message).toBe('Username and password cannot be empty')
})
