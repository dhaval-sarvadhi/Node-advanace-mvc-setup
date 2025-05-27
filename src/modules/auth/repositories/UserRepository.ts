import UserModel from '../../../models/UserModel';

export default class UserRepository {
  public async findByEmail(email: string) {
    return UserModel.findOne({ where: { email } });
  }

  public async create(userData: { email: string; password: string }) {
    return UserModel.create(userData);
  }
}
