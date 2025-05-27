import UserRepository from '../repositories/UserRepository';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

interface LoginDTO {
  email: string;
  password: string;
}

export default class AuthService {
  private userRepository = new UserRepository();

  public async login(dto: LoginDTO) {
    const user = await this.userRepository.findByEmail(dto.email);
    if (!user) {
      throw new Error('Invalid credentials');
    }

    const passwordMatches = await bcrypt.compare(dto.password, user.password);
    if (!passwordMatches) {
      throw new Error('Invalid credentials');
    }

    const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET || 'secret', {
      expiresIn: '1h',
    });

    return { token, user: { id: user.id, email: user.email } };
  }
}
