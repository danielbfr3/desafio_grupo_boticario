import { getCustomRepository } from 'typeorm';
import User from '../database/entities/User';
import UsersRepository from '../database/repositories/UsersRepository';
import HashModule from '../modules/HashModule';

import AppError from '../errors/AppError';

interface IRequest {
  cpf: string;
  fullName: string;
  email: string;
  password: string;
}

class CreateUserService {
  private usersRepository: UsersRepository;

  private hashModule: HashModule;

  constructor() {
    this.usersRepository = getCustomRepository(UsersRepository);
    this.hashModule = new HashModule();
  }

  public async execute({
    cpf,
    email,
    fullName,
    password,
  }: IRequest): Promise<User> {
    const checkCpfExists = await this.usersRepository.findByCpf(cpf);
    const checkEmailExists = await this.usersRepository.findByEmail(email);

    if (checkCpfExists || checkEmailExists) {
      throw new AppError('User already exist', 403);
    }

    const hashedPassword = await this.hashModule.generateHash(password);

    const user = this.usersRepository.create({
      cpf,
      fullName,
      email,
      password: hashedPassword,
      isSpecialUser: false,
    });

    await this.usersRepository.save(user);

    delete user.password;
    delete user.isSpecialUser;

    return user;
  }
}

export default CreateUserService;
