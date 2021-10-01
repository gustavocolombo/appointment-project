import { getRepository, Repository } from 'typeorm';
import User from '@modules/users/infra/typeorm/entities/User';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO';

export default class UsersRepository implements IUsersRepository {
  private ormRepository: Repository<User>

  constructor() {
    this.ormRepository = getRepository(User);
  }

  public async findByName(name: string): Promise<User | null> {
    const findUser = await this.ormRepository.findOne({
      where: { name },
    });

    return findUser || null;
  }

  public async findByEmail(email: string): Promise<User | null> {
    const findUser = await this.ormRepository.findOne({
      where: { email },
    });

    return findUser || null;
  }

  public async findByUserById(id: string): Promise<User | null> {
    const findUser = await this.ormRepository.findOne({
      where: { id },
    });

    return findUser || null;
  }

  public async create({ name, email, password }: ICreateUserDTO): Promise<> {
    const user = this.ormRepository.create({ name, email, password });

    await this.ormRepository.save(user);

    return user;
  }
}
