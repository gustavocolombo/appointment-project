import User from '@modules/users/infra/typeorm/entities/User';
import ICreateUserDTO from '../dtos/ICreateUserDTO';

export default interface IUsersRepository{
  create(data: ICreateUserDTO): Promise<User>,
  findByname(name: string): Promise<User | null>,
  findByEmail(email: string): Promise<User | null>,
  findByUserById(id: string): Promise<User | null>
}
