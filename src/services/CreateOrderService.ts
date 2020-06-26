import { getCustomRepository } from 'typeorm';
import UsersRepository from '../database/repositories/UsersRepository';

import Order from '../database/entities/Order';
import OrdersRepository from '../database/repositories/OrdersRepository';

import CashbackModule from '../modules/CashbackModule';

import AppError from '../errors/AppError';

interface IRequest {
  email: string;
  orderValue: number;
}

interface IResponse {
  email: string;
  date: Date;
  status: 'Aprovado' | 'Em validação' | 'Reprovado';
  orderValue: number;
  cashbackPercentage: number;
  cashbackValue: number;
}

class CreateOrderService {
  private usersRepository: UsersRepository;

  private ordersRepository: OrdersRepository;

  private cashbackModule: CashbackModule;

  constructor() {
    this.usersRepository = getCustomRepository(UsersRepository);
    this.ordersRepository = getCustomRepository(OrdersRepository);
    this.cashbackModule = new CashbackModule();
  }

  public async execute({ email, orderValue }: IRequest): Promise<Order> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new AppError('User already exist', 401);
    }

    const cashbackResponse = this.cashbackModule.calculateCashback(orderValue);

    const order = this.ordersRepository.create({
      userCpf: user.cpf,
      orderValue,
      cashbackPercentage: cashbackResponse.percentage,
      cashbackValue: cashbackResponse.value,
      status: !user.isSpecialUser ? 'Em validação' : 'Aprovado',
    });

    await this.ordersRepository.save(order);

    return order;
  }
}

export default CreateOrderService;
