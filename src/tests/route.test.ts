import { describe, it, expect } from 'vitest'
import supertest from 'supertest'
import App from '../app'

describe('test route', () => {
    const app = new App().app
    it('should be route not found', async () => {
        const response = await supertest(app).get('/api/v1/notfound')

        expect(response.statusCode).toBe(404)
    })
})
