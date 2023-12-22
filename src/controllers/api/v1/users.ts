import type { Request, Response } from 'express'
import type { Users } from '../../../models/users'
import { UserService } from '../../../services/UserService'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { readFileSync } from 'fs'
import path from 'path'

export class UsersController {
    userService: UserService
    privateKey: Buffer

    constructor() {
        this.userService = new UserService()
        this.privateKey = readFileSync(path.join(process.cwd(), 'keys', 'jwtRS256.key'))
    }

    register = async (
        req: Request<unknown, unknown, Users>,
        res: Response
    ): Promise<Response<any, Record<string, any>>> => {
        try {
            const body = {
                email: req.body.email,
                name: req.body.name,
                password: await bcrypt.hash(req.body.password, 10),
            }

            const user = await this.userService.saveUser(body)

            return res.status(201).json({
                user: {
                    email: user.email,
                    name: user.name,
                    role: user.role,
                },
            })
        } catch (err: any) {
            console.error(err)
            return res.status(409).json({ message: 'Email already exist' })
        }
    }

    login = async (req: Request, res: Response): Promise<Response<any, Record<string, any>>> => {
        try {
            const email = req.body.email as string
            const password = req.body.password as string

            const user = await this.userService.getUserByEmail(email)

            if (!(await bcrypt.compare(password, user[0].password))) {
                throw new Error('Email or Password is wrong')
            }
            // token will expire in one hour
            const token = jwt.sign(
                { id: user[0].id, email: user[0].email, name: user[0].name, role: user[0].role },
                this.privateKey,
                {
                    expiresIn: '1h',
                    algorithm: 'RS256',
                }
            )

            return res.status(200).json({ token })
        } catch (err: any) {
            console.error(err)
            return res.status(400).json({ message: err.message })
        }
    }

    profile = async (req: Request, res: Response): Promise<Response<any, Record<string, any>>> => {
        return res.status(200).json(req.user)
    }

    addUser = async (
        req: Request<unknown, unknown, Users>,
        res: Response
    ): Promise<Response<any, Record<string, any>>> => {
        try {
            if (req.user.role !== 'superadmin' && req.user.role !== 'admin') {
                return res.status(401).json({ message: 'Only role superadmin or admin!' })
            }

            const body = {
                email: req.body.email,
                name: req.body.name,
                password: await bcrypt.hash(req.body.password, 10),
                role: req.body.role,
            }

            const user = await this.userService.saveUser(body)

            return res.status(201).json({
                user: {
                    email: user.email,
                    name: user.name,
                    role: user.role,
                },
            })
        } catch (err: any) {
            console.error(err)
            if (err.constraint === 'users_role_check') {
                return res.status(400).json({ message: 'The value of role is not allowed' })
            }
            return res.status(409).json({ message: 'Email already exist' })
        }
    }

    deleteUser = async (_: Request, res: Response): Promise<Response<any, Record<string, any>>> => {
        try {
            await this.userService.deleteAllUser()
            return res.status(200).json({ message: 'Success delete all user' })
        } catch (err) {
            console.error(err)
            return res.status(500).json({ message: 'Server error' })
        }
    }

    getOneUser = async (_: Request, res: Response): Promise<Response<any, Record<string, any>> | undefined> => {
        try {
            const user = await this.userService.getOneUser()

            return res.status(200).json({ user })
        } catch (error) {
            console.error(error)
            return res.status(404).json({ message: 'User not found!' })
        }
    }
}
