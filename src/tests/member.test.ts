import supertest from 'supertest'
import App from '../app'
import type { Express } from 'express'
import { describe, it, expect } from 'vitest'
import { login } from '../utils/login'
import path from 'path'
import jsonCar from './car.json'

describe('login member', () => {
    const app: Express = new App().app
    const id: string = ''

    let token: string = ''

    it('should be able to login member', async () => {
        const response = await login(supertest, app, 'jani@gmail.com', 'password')

        expect(response).toBeTruthy()

        token = response.body.token
    }, 70000)

    it("should be can't create a new car", async () => {
        const st = supertest(app)
            .post('/api/v1/cars')
            .attach('image', path.resolve(__dirname, 'car.jpg'))
            .set({
                'Content-Type': 'multipart/form-data',
                Authorization: `Bearer ${token}`,
                Accept: 'application/json',
            })

        // @ts-expect-error delete req column
        delete jsonCar.id
        // @ts-expect-error delete req column
        delete jsonCar.image
        // @ts-expect-error delete req column
        delete jsonCar.availableAt

        for (const key in jsonCar) {
            // @ts-expect-error any
            const value = jsonCar[key]
            if (key !== 'image') {
                // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
                void st.field(key, value)
            }
        }

        const response = await st

        expect(response.statusCode).toBe(401)
    }, 70000)

    it("should be can't edit car by id", async () => {
        const response = await supertest(app)
            .patch(`/api/v1/cars/${id}`)
            .send({
                plate: 'M 003 J',
            })
            .set({
                Authorization: `Bearer ${token}`,
            })

        expect(response.headers['content-type']).toBe('application/json; charset=utf-8')
        expect(response.statusCode).toBe(404)
    }, 70000)

    it("should be can't delete car by id", async () => {
        const response = await supertest(app)
            .delete(`/api/v1/cars/${id}`)
            .set({
                Authorization: `Bearer ${token}`,
            })

        expect(response.headers['content-type']).toBe('application/json; charset=utf-8')
        expect(response.statusCode).toBe(401)
    }, 70000)
})
