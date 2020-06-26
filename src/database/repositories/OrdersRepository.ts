import { Repository, EntityRepository } from 'typeorm';

import Order from '../entities/Order';
// import ICreateOrder from '@database/interfaces/ICreateOrder';

@EntityRepository(Order)
class OrdersRepository extends Repository<Order> {
  public async findAllByCpf(userCpf: string): Promise<Order[] | undefined> {
    const allOrders = await this.find({
      select: [
        'orderId',
        'date',
        'orderValue',
        'cashbackPercentage',
        'cashbackValue',
        'status',
      ],
      where: {
        userCpf,
      },
    });

    return allOrders;
  }

  public async findById(id: number): Promise<Order | undefined> {
    const order = await this.findOne({
      where: {
        id,
      },
    });

    return order;
  }

  public async findAll(): Promise<Order[] | undefined> {
    const allOrders = await this.find();

    return allOrders;
  }
}

export default OrdersRepository;
