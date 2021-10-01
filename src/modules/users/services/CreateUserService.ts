import { hash } from 'bcryptjs';
import User from '@modules/users/infra/typeorm/entities/User';
import IUsersRepository from '../repositories/IUsersRepository';

interface ICreateUser{
  name: string;
  email: string;
  password: string;
}

export default class CreateUserService {
  constructor(private userRepository: IUsersRepository) {}

  public async execute({ name, email, password }: ICreateUser): Promise<User> {
    const validateUser = await this.userRepository.findByEmail(email);

    if (validateUser) {
      throw new Error('Cannot create user, address email is already registered');
    }

    const hashedPassword = await hash(password, 8);

    const user = await this.userRepository.create({ name, email, password: hashedPassword });

    return user;
  }
}
