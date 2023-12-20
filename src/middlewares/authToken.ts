import type { Request, Response, NextFunction } from 'express'
import { readFileSync } from 'fs'
import jwt from 'jsonwebtoken'
import path from 'path'

export const authToken = async (
    req: Request<unknown, unknown, unknown, unknown>,
    res: Response,
    next: NextFunction
): Promise<Response<any, Record<string, any>> | undefined> => {
    try {
        const bearerToken = req.headers.authorization
        // Leave the Bearer
        const token = bearerToken?.split('Bearer ')[1]

        const privateKey = readFileSync(path.join(process.cwd(), 'keys', 'jwtRS256.key'))

        if (token === undefined) {
            return res.status(401).json({ message: 'Invalid Token' })
        }

        jwt.verify(token, privateKey, (err, user) => {
            if (err !== null) {
                return res.status(403).json({ message: 'Forbidden' })
            }
            // @ts-expect-error user
            req.user = user
            next()
        })
    } catch (err: any) {
        console.error(err)
    }
}
