import type supertest from 'supertest'
import type { Express } from 'express'

export const login = async (
    st: typeof supertest,
    app: Express,
    email: string,
    password: string
    // @ts-expect-error request
): Promise<request.Response> => {
    const response = await st(app).post('/api/v1/users/login').send({
        email,
        password,
    })

    return response
}
