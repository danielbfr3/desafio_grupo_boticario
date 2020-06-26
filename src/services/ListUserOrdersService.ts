import { getCustomRepository } from 'typeorm';
import UsersRepository from '../database/repositories/UsersRepository';
import OrdersRepository from '../database/repositories/OrdersRepository';
import Order from '../database/entities/Order';

import AppError from '../errors/AppError';

interface IRequest {
  email: string;
}

class ListUserOrdersService {
  private usersRepository: UsersRepository;

  private ordersRepository: OrdersRepository;

  constructor() {
    this.usersRepository = getCustomRepository(UsersRepository);
    this.ordersRepository = getCustomRepository(OrdersRepository);
  }

  public async execute({ email }: IRequest): Promise<Order[]> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new AppError('User does not exist', 401);
    }

    const orders = await this.ordersRepository.findAllByCpf(user.cpf);

    if (!orders) {
      throw new AppError('User does not have orders', 401);
    }

    return orders;
  }
}

export default ListUserOrdersService;
