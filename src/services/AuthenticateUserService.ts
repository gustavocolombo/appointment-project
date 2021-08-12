import { getCustomRepository } from 'typeorm';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import UsersRepository from '../repositories/UsersRepository';
import User from '../models/User';
import authconfig from '../config/authconfig';

interface ICreateSession{
  email: string;
  password: string;
}

interface IResponseUser{
  user: User;
  jwtToken: string;
}

export default class CreateSessionService {
  public async execute({ email, password }: ICreateSession): Promise<IResponseUser> {
    const userRepository = getCustomRepository(UsersRepository);

    const user = await userRepository.findByEmail(email);

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
