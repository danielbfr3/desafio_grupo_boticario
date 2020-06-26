import { getCustomRepository } from 'typeorm';
import UsersRepository from '../database/repositories/UsersRepository';

import Order from '../database/entities/Order';
import OrdersRepository from '../database/repositories/OrdersRepository';

import CashbackModule from '../modules/CashbackModule';

import AppError from '../errors/AppError';

interface IRequest {
  email: string;
  orderId: number;
  orderValue: number;
}

class UpdateOrderService {
  private usersRepository: UsersRepository;

  private ordersRepository: OrdersRepository;

  private cashbackModule: CashbackModule;

  constructor() {
    this.usersRepository = getCustomRepository(UsersRepository);
    this.ordersRepository = getCustomRepository(OrdersRepository);
    this.cashbackModule = new CashbackModule();
  }

  public async execute({
    email,
    orderId,
    orderValue,
  }: IRequest): Promise<Order> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new AppError('User does not exist', 403);
    }

    const order = await this.ordersRepository.findOne({
      where: {
        orderId,
      },
    });

    if (!order) {
      throw new AppError('Order does not exist', 403);
    }

    if (order.status === 'Aprovada') {
      throw new AppError('Approved orders cannot be updated', 400);
    }

    const cashbackResponse = this.cashbackModule.calculateCashback(orderValue);

    order.orderValue = orderValue;
    order.cashbackPercentage = cashbackResponse.percentage;
    order.cashbackValue = cashbackResponse.value;

    const updatedOrder = await this.ordersRepository.save(order);

    return updatedOrder;
  }
}

export default UpdateOrderService;
