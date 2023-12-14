import { describe, it, expect } from 'vitest'
import supertest from 'supertest'
import App from '../app'

const app = new App().app

describe('landing page', function () {
    it('should be able to view home page', async function () {
        const response = await supertest(app).get('/')

        expect(response.headers['content-type']).toBe('text/html; charset=utf-8')
        expect(response.status).toBe(200)
    })
})

// Menggunakan tanggal saat ini
const tanggalSekarang = new Date()

// Mendapatkan tahun, bulan, dan tanggal dari tanggal saat ini
const tahun = tanggalSekarang.getFullYear()
const bulan = String(tanggalSekarang.getMonth() + 1).padStart(2, '0') // Perhatikan penanganan bulan (diperoleh dari 0-11)
const tanggal = String(tanggalSekarang.getDate()).padStart(2, '0')

// Membuat string tanggal dengan format yang diinginkan
const date = `${tahun}-${bulan}-${tanggal}`

describe('search cars', function () {
    it('should be able to view multiple cars based on query', async function () {
        const response = await supertest(app).get('/cars').query({
            driver: 1,
            date,
            pickupTime: 'T01:00:00Z',
            totalPassenger: 1,
        })

        expect(response.headers['content-type']).toBe('text/html; charset=utf-8')
        expect(response.status).toBe(200)
    })
})
