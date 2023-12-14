import { Model } from 'objection'
import type { JSONSchema, ModelObject } from 'objection'

export class UsersModel extends Model {
    // membuat type Users
    id!: number
    email!: string
    name!: string
    password!: string
    role!: string

    static readonly tableName = 'users'
    // validasi http request body
    static get jsonSchema(): JSONSchema {
        return {
            type: 'object',
            required: ['email', 'name', 'password'],
            properties: {
                name: { type: 'string', minLength: 3 },
                password: { type: 'string', minLength: 6 },
            },
        }
    }
}

export type Users = ModelObject<UsersModel>
