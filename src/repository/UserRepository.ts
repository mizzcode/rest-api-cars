import { UsersModel } from '../models/users'
import type { Users } from '../models/users'

export class UserRepository {
    save = async (user: Partial<Users>): Promise<UsersModel> => {
        return await UsersModel.query().insert(user).returning(['email', 'name', 'role'])
    }

    findUserByEmail = async (email: string): Promise<UsersModel[]> => {
        return await UsersModel.query().where('email', email).throwIfNotFound()
    }

    deleteAllUser = async (): Promise<number> => {
        return await UsersModel.query().delete()
    }
}
