import { EntityRepository, Repository } from 'typeorm';
import User from '@modules/users/infra/typeorm/entities/User';

@EntityRepository(User)
export default class UsersRepository extends Repository<User> {
  public async findByName(name: string): Promise<User | null> {
    const findUser = await this.findOne({
      where: { name },
    });

    return findUser || null;
  }

  public async findByEmail(email: string): Promise<User | null> {
    const findUser = await this.findOne({
      where: { email },
    });

    return findUser || null;
  }

  public async findByUserById(id: string): Promise<User | null> {
    const findUser = await this.findOne({
      where: { id },
    });

    return findUser || null;
  }
}
