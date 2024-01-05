import type { Express } from 'express'
import { describe, it, expect } from 'vitest'
import supertest from 'supertest'
import App from '../app'
import { login } from '../utils/login'

describe('test cars module', () => {
    const app: Express = new App().app

    let token: string = ''
    const id: string = ''

    it('should be able to login superadmin', async () => {
        const response = await login(supertest, app, 'mizz@gmail.com', 'password')

        expect(response).toBeTruthy()

        token = response.body.token
    }, 70000)

    it('should be delete all car', async () => {
        const response = await supertest(app)
            .delete('/api/v1/cars')
            .set({
                Authorization: `Bearer ${token}`,
            })

        expect(response).toBeTruthy()
        expect(response.statusCode).toBe(200)
    })

    it("should be can't delete all car", async () => {
        const response = await supertest(app)
            .delete('/api/v1/cars')
            .set({
                Authorization: `Bearer ${token}`,
            })

        expect(response).toBeTruthy()
        expect(response.statusCode).toBe(404)
    })

    it("should be can't get all cars", async () => {
        const response = await supertest(app).get('/api/v1/cars')

        expect(response.headers['content-type']).toBe('application/json; charset=utf-8')
        expect(response.statusCode).toBe(404)
    }, 70000)

    it("should be can't get car by id", async () => {
        const response = await supertest(app)
            .get(`/api/v1/cars/${id}`)
            .set({
                Authorization: `Bearer ${token}`,
            })

        expect(response.headers['content-type']).toBe('application/json; charset=utf-8')
        expect(response.statusCode).toBe(404)
    }, 70000)
})
