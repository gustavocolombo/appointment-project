import { getCustomRepository } from 'typeorm';
import { hash } from 'bcryptjs';
import User from '../models/User';
import UsersRepository from '../repositories/UsersRepository';

interface ICreateUser{
  name: string;
  email: string;
  password: string;
}

export default class CreateUserService {
  public async execute({ name, email, password }: ICreateUser): Promise<User> {
    const userRepository = getCustomRepository(UsersRepository);

    const validateUser = await userRepository.findByEmail(email);

    if (validateUser) {
      throw new Error('Cannot create user, address email is already registered');
    }

    const hashedPassword = await hash(password, 8);

    const user = userRepository.create({ name, email, password: hashedPassword });

    await userRepository.save(user);

    return user;
  }
}
