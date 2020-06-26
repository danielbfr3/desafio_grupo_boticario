import { Repository, EntityRepository } from 'typeorm';

import User from '../entities/User';
// import ICreateUser from '@database/interfaces/ICreateUser';

@EntityRepository(User)
class UsersRepository extends Repository<User> {
  public async findByCpf(cpf: string): Promise<User | undefined> {
    const findUser = this.findOne({
      where: {
        cpf,
      },
    });

    return findUser;
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    const findUser = this.findOne({
      where: {
        email,
      },
    });

    return findUser;
  }
}

export default UsersRepository;
