import { Users } from '../models/users'
import { UserRepository } from '../repository/UserRepository'

export class UserService {
    userRepository: UserRepository

    constructor() {
        this.userRepository = new UserRepository()
    }

    saveUser = async (user: Partial<Users>) => {
        return await this.userRepository.save(user)
    }

    getUserByEmail = async (email: string) => {
        return await this.userRepository.findUserByEmail(email)
    }

    deleteAllUser = async () => {
        return await this.userRepository.deleteAllUser()
    }
}
