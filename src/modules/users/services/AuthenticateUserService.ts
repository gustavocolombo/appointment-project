import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import User from '@modules/users/infra/typeorm/entities/User';
import authconfig from '../../../config/authconfig';
import IUsersRepository from '../repositories/IUsersRepository';

interface ICreateSession{
  email: string;
  password: string;
}

interface IResponseUser{
  user: User;
  jwtToken: string;
}

export default class CreateSessionService {
  constructor(private userRepository: IUsersRepository) {}

  public async execute({ email, password }: ICreateSession): Promise<IResponseUser> {
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new Error('Combination email/password does not match');
    }

    const comparePassword = await compare(password, user.password);

    if (!comparePassword) {
      throw new Error('Combination email/password does not match');
    }

    const jwtToken = sign({}, authconfig.jwt.secret, {
      subject: user.id,
      expiresIn: authconfig.jwt.expiresIn,
    });

    return {
      user,
      jwtToken,
    };
  }
}
