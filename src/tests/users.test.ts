import type { Express } from 'express'
import supertest from 'supertest'
import { describe, it, expect } from 'vitest'
import App from '../app'
import { createUser } from '../utils/createUser'
import bcrypt from 'bcrypt'
import { fakerID_ID as faker } from '@faker-js/faker'
import { login } from '../utils/login'

describe('test user module', () => {
    const app: Express = new App().app
    const email: string = faker.internet.email()
    const name: string = faker.person.fullName()
    const password: string = faker.internet.password()
    const passwordBcrypt: Promise<string> = bcrypt.hash(password, 10)

    let token: string = ''

    it('should be able to login', async () => {
        const response = await login(supertest, app, 'mizz@gmail.com', 'password')

        expect(response).toBeTruthy()

        token = response.body.token
    })

    it('all users should be deleted when row in db is not empty', async () => {
        const response = await supertest(app)
            .delete('/api/v1/users')
            .set({
                Authorization: `Bearer ${token}`,
            })

        expect(response.statusCode).toBe(200)
        expect(response.body).toMatchObject({
            message: 'Success delete all user',
        })
    })

    it("should be can't delete all user because row in db is empty", async () => {
        const response = await supertest(app)
            .delete('/api/v1/users')
            .set({
                Authorization: `Bearer ${token}`,
            })

        expect(response.statusCode).toBe(500)
        expect(response.body).toMatchObject({
            message: 'Server error',
        })
    })

    it('should be created user utils', async () => {
        const response = await createUser()

        expect(response).toBeTruthy()
    })

    it('should be login superadmin', async () => {
        const response = await login(supertest, app, 'mizz@gmail.com', 'password')

        expect(response.statusCode).toBe(200)
        expect(response.body).toMatchObject({
            token: expect.any(String),
        })

        token = response.body.token
    })

    it("should be can't login because password is wrong", async () => {
        const response = await login(supertest, app, 'mizz@gmail.com', 'salah')

        expect(response.statusCode).toBe(400)
        expect(response.body).toMatchObject({
            message: 'Email or Password is wrong',
        })
    })

    it('should be user can register', async () => {
        const response = await supertest(app)
            .post('/api/v1/users/register')
            .send({
                email,
                name,
                password: await passwordBcrypt,
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
        const response = await supertest(app)
            .post('/api/v1/users/register')
            .send({
                email,
                name,
                password: await passwordBcrypt,
            })

        expect(response.headers['content-type']).toBe('application/json; charset=utf-8')
        expect(response.statusCode).toBe(409)
        expect(response.body).toMatchObject({
            message: 'Email already exist',
        })
    })

    it('should be show the profile of user', async () => {
        const response = await supertest(app)
            .get('/api/v1/users/profile')
            .set({
                Authorization: `Bearer ${token}`,
            })

        expect(response.statusCode).toBe(200)
    })

    it('should be add a new user', async () => {
        const response = await supertest(app)
            .post('/api/v1/users/add')
            .set({
                Authorization: `Bearer ${token}`,
            })
            .send({
                email: 'jani@gmail.com',
                name: 'Anjani',
                password: 'password',
                role: 'admin',
            })

        expect(response.headers['content-type']).toBe('application/json; charset=utf-8')
        expect(response.statusCode).toBe(201)
        expect(response.body).toMatchObject({
            user: {
                email: 'jani@gmail.com',
                name: 'Anjani',
                role: 'admin',
            },
        })
    })

    it("should cant't add a new user with unknown role", async () => {
        const response = await supertest(app)
            .post('/api/v1/users/add')
            .set({
                Authorization: `Bearer ${token}`,
            })
            .send({
                email: 'dado@gmail.com',
                name: 'Dado',
                password: 'password',
                role: 'unknown',
            })

        expect(response.headers['content-type']).toBe('application/json; charset=utf-8')
        expect(response.statusCode).toBe(400)
        expect(response.body).toMatchObject({
            message: 'The value of role is not allowed',
        })
    })

    it("should cant't add a new user", async () => {
        const response = await supertest(app)
            .post('/api/v1/users/add')
            .set({
                Authorization: `Bearer ${token}`,
            })
            .send({
                email: 'jani@gmail.com',
                name: 'Anjani',
                password: 'password',
                role: 'admin',
            })

        expect(response.statusCode).toBe(409)
        expect(response.body).toMatchObject({
            message: 'Email already exist',
        })
    })

    it('should be login member', async () => {
        const response = await login(supertest, app, email, await passwordBcrypt)

        expect(response.statusCode).toBe(200)
        expect(response.body).toMatchObject({
            token: expect.any(String),
        })

        token = response.body.token
    })

    it("should can't add a new user because role user is member", async () => {
        const response = await supertest(app)
            .post('/api/v1/users/add')
            .set({
                Authorization: `Bearer ${token}`,
            })
            .send({
                email: 'dado@gmail.com',
                name: 'Dado',
                password: 'password',
                role: 'admin',
            })

        expect(response.statusCode).toBe(401)
        expect(response.body).toMatchObject({
            message: 'Only role superadmin or admin!',
        })
    })

    it('should be show the profile of user', async () => {
        const response = await supertest(app)
            .get('/api/v1/users/profile')
            .set({
                Authorization: `Bearer ${token}`,
            })

        expect(response.statusCode).toBe(200)
        expect(response.body).toMatchObject({
            email: expect.any(String),
            exp: expect.any(Number),
            iat: expect.any(Number),
            id: expect.any(Number),
            name: expect.any(String),
            role: expect.any(String),
        })
    })

    it('should be get one user', async () => {
        const response = await supertest(app)
            .get('/api/v1/users/one')
            .set({
                Authorization: `Bearer ${token}`,
            })

        expect(response.statusCode).toBe(200)
        expect(response.body).toMatchObject({
            user: {
                email: expect.any(String),
                id: expect.any(Number),
                name: expect.any(String),
                role: expect.any(String),
                password: expect.any(String),
            },
        })
    })

    it('should be user not found', async () => {
        await supertest(app)
            .delete('/api/v1/users')
            .set({
                Authorization: `Bearer ${token}`,
            })

        const response = await supertest(app)
            .get('/api/v1/users/one')
            .set({
                Authorization: `Bearer ${token}`,
            })

        expect(response.statusCode).toBe(404)
        expect(response.body).toMatchObject({
            message: 'User not found!',
        })

        await createUser()
    })
})
