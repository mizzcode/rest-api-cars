import { describe, it, expect } from 'vitest'
import supertest from 'supertest'
import App from '../app'

const app = new App().app

describe('test server module', function () {
    it('should be able to view home page', async function () {
        const response = await supertest(app).get('/')

        expect(response.headers['content-type']).toBe('text/html; charset=utf-8')
        expect(response.status).toBe(200)
    })
})
