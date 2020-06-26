import { getCustomRepository } from 'typeorm';
import axios from 'axios';
import UsersRepository from '../database/repositories/UsersRepository';

import AppError from '../errors/AppError';

interface IRequest {
  email: string;
}

interface IResponse {
  data: string;
}

class TotalCashbackService {
  private usersRepository: UsersRepository;

  constructor() {
    this.usersRepository = getCustomRepository(UsersRepository);
  }

  public async execute({ email }: IRequest): Promise<IResponse> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new AppError('User does not exist', 401);
    }

    try {
      const options = {
        headers: {
          token: process.env.CASHBACK_API_TOKEN,
        },
      };

      // TODO: Put this url on env
      const response = await axios.get(
        `https://mdaqk8ek5j.execute-api.us-east-1.amazonaws.com/v1/cashback?cpf=${user.cpf}`,
        options,
      );

      return response.data;
    } catch (err) {
      throw new AppError('Service temporary unavaliable', 400);
    }
  }
}

export default TotalCashbackService;
