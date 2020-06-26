import { sign } from 'jsonwebtoken';
import { getCustomRepository } from 'typeorm';
import authConfig from '../config/auth';

import UsersRepository from '../database/repositories/UsersRepository';
import HashModule from '../modules/HashModule';
import AppError from '../errors/AppError';

interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
  token: string;
}

class AuthenticateUserService {
  private usersRepository: UsersRepository;

  private hashModule: HashModule;

  constructor() {
    this.usersRepository = getCustomRepository(UsersRepository);
    this.hashModule = new HashModule();
  }

  public async execute({ email, password }: IRequest): Promise<IResponse> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new AppError('Incorrect email/password combination', 401);
    }

    const passwordMatched = await this.hashModule.compareHash(
      password,
      user.password,
    );

    if (!passwordMatched) {
      throw new AppError('Incorrect email/password combination', 401);
    }

    const { secret, expiresIn } = authConfig.jwt;

    const token = sign({}, secret, {
      subject: user.email,
      expiresIn,
    });

    return {
      token,
    };
  }
}

export default AuthenticateUserService;
