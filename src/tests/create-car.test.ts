import type { Express } from 'express'
import { describe, it, expect } from 'vitest'
import supertest from 'supertest'
import App from '../app'
import { login } from '../utils/login'
import path from 'path'
import jsonCar from './car.json'

describe('test car module', () => {
    const app: Express = new App().app

    let token: string = ''
    let id: string = ''

    it('should be able to login superadmin', async () => {
        const response = await login(supertest, app, 'mizz@gmail.com', 'password')

        expect(response).toBeTruthy()

        token = response.body.token
    }, 70000)

    it('should be create a new car', async () => {
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

        expect(response.statusCode).toBe(201)

        id = response.body.data.carId
    }, 70000)

    it('should be get car by id', async () => {
        const response = await supertest(app)
            .get(`/api/v1/cars/${id}`)
            .set({
                Authorization: `Bearer ${token}`,
            })

        expect(response.headers['content-type']).toBe('application/json; charset=utf-8')
        expect(response.statusCode).toBe(200)
    }, 70000)

    it('should be get all cars', async () => {
        const response = await supertest(app).get('/api/v1/cars')

        expect(response.headers['content-type']).toBe('application/json; charset=utf-8')
        expect(response.statusCode).toBe(200)
    }, 70000)
})
