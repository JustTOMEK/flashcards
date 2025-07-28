import { test, expect, beforeEach } from 'vitest'
const request = require('supertest')
import app from '../app'
import { db } from '../db/lowdb'
const bcrypt = require('bcrypt')

process.env.JWT_SECRET = 'test'

beforeEach(async () => {
    const hashedPassword = await bcrypt.hash('passworddd', 10)

    db.data = {
        users: [
            {
                id: 'user1',
                hashedPassword,
                username: 'janek',
            },
        ],
    }
    await db.write()
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

test('wrong password', async () => {
    const res = await request(app).post('/login').send({
        username: 'janek',
        password: 'passwordd',
    })
    expect(res.status).toBe(401)
    expect(res.body.message).toBe('Invalid password')
})

test('Not exisiting user', async () => {
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

test('Empty user', async () => {
    const res = await request(app).post('/login').send({
        username: '',
        password: 'passwordd',
    })
    expect(res.status).toBe(400)
    expect(res.body.message).toBe('Username and password cannot be empty')
})
