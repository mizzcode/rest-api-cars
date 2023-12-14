import type { Users } from '../models/users'
import { UserRepository } from '../repository/UserRepository'

export class UserService {
    userRepository: UserRepository

    constructor() {
        this.userRepository = new UserRepository()
    }

    saveUser = async (user: Partial<Users>): Promise<Users> => {
        return await this.userRepository.save(user)
    }

    getUserByEmail = async (email: string): Promise<Users[]> => {
        return await this.userRepository.findUserByEmail(email)
    }

    deleteAllUser = async (): Promise<number> => {
        return await this.userRepository.deleteAllUser()
    }
}
