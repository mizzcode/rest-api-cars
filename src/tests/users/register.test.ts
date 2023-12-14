import supertest from 'supertest'
import { describe, it, expect } from 'vitest'
import App from '../../app'
import { fakerID_ID as faker } from '@faker-js/faker'

const app = new App().app

const email = faker.internet.email()
const name = faker.person.fullName()
const password = faker.internet.password()

describe('delete all records of users', () => {
    it('all users should be deleted', async () => {
        const response = await supertest(app).delete('/api/v1/users')

        expect(response.statusCode).toBe(200)
        expect(response.body).toMatchObject({
            message: 'Success delete all user',
        })
    })
})

describe('user register API:/api/v1/users/register', () => {
    it('should be user can register', async () => {
        const response = await supertest(app).post('/api/v1/users/register').send({
            email,
            name,
            password,
        })

        expect(response.headers['content-type']).toBe('application/json; charset=utf-8')
        expect(response.statusCode).toBe(201)
        expect(response.body).toMatchObject({
            user: {
                email,
                name,
                role: 'member',
            },
        })
    })

    it("should be user can't register", async () => {
        const response = await supertest(app).post('/api/v1/users/register').send({
            email,
            name,
            password,
        })

        expect(response.headers['content-type']).toBe('application/json; charset=utf-8')
        expect(response.statusCode).toBe(409)
        expect(response.body).toMatchObject({
            message: 'Email already exist',
        })
    })
})
