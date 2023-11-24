import { UsersModel, Users } from '../models/users';

export class UserRepository {
  save = async (user: Partial<Users>) => {
    return await UsersModel.query().insert(user).returning(['email', 'name', 'role']);
  };

  findUserByEmail = async (email: string) => {
    return await UsersModel.query().where('email', email).throwIfNotFound();
  };
}
