import { getCustomRepository } from 'typeorm';
import UsersRepository from '../database/repositories/UsersRepository';

import OrdersRepository from '../database/repositories/OrdersRepository';

import AppError from '../errors/AppError';

interface IRequest {
  orderId: number;
  email: string;
}

class DeleteOrderService {
  private usersRepository: UsersRepository;

  private ordersRepository: OrdersRepository;

  constructor() {
    this.usersRepository = getCustomRepository(UsersRepository);
    this.ordersRepository = getCustomRepository(OrdersRepository);
  }

  public async execute({ email, orderId }: IRequest): Promise<void> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new AppError('User does not exist', 401);
    }

    const order = await this.ordersRepository.findOne({
      where: {
        orderId,
      },
    });

    if (!order) {
      throw new AppError('Order does not exist', 401);
    }

    await this.ordersRepository.remove(order);
  }
}

export default DeleteOrderService;
