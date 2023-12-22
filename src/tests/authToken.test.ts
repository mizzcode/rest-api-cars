import { describe, it, expect } from 'vitest'
import supertest from 'supertest'
import App from '../app'
import jsonCar from './car.json'

describe('test middleware auth token', () => {
    const app = new App().app
    const token = 'invalid token'

    it('should be forbidden token', async () => {
        const st = supertest(app).post('/api/v1/cars').set({
            'Content-Type': 'application/json',
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

            void st.send({
                key: value,
            })
        }

        const response = await st

        expect(response.statusCode).toBe(401)
    }, 70000)

    it('should be invalid token', async () => {
        const st = supertest(app)
            .post('/api/v1/cars')
            .set({
                'Content-Type': 'application/json',
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

            void st.send({
                key: value,
            })
        }

        const response = await st

        expect(response.statusCode).toBe(403)
    }, 70000)
})
