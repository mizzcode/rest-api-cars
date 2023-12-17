import { UserRepository } from '../repository/UserRepository'
import bcrypt from 'bcrypt'

const userRepository = new UserRepository()

export const createUser = async (email: string = 'mizz@gmail.com', name: string = 'Misbah'): Promise<boolean> => {
    await userRepository.save({
        email,
        name,
        password: await bcrypt.hash('password', 10),
        role: 'superadmin',
    })
    return true
}
