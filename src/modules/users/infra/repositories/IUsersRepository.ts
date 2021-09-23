import User from '../typeorm/entities/User';

export default interface IUsersRepository{
  findByname(name: string): Promise<User | null>,
  findByEmail(email: string): Promise<User | null>,
  findByUserById(id: string): Promise<User | null>
}
