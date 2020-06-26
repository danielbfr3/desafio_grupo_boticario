import { Request, Response } from 'express';

import CreateOrderService from '../services/CreateOrderService';
import DeleteOrderService from '../services/DeleteOrderService';
import UpdateOrderService from '../services/UpdateOrderService';
import ListUserOrdersService from '../services/ListUserOrdersService';

export default class OrdersController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { orderValue } = request.body;

    const createOrder = new CreateOrderService();

    const order = await createOrder.execute({
      email: request.userEmail,
      orderValue,
    });

    delete order.user;

    return response.status(201).json(order);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { orderId } = request.body;

    const deleteOrder = new DeleteOrderService();

    await deleteOrder.execute({
      email: request.userEmail,
      orderId,
    });

    return response.status(204).json();
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { orderId, orderValue } = request.body;

    const updateOrder = new UpdateOrderService();

    const order = await updateOrder.execute({
      email: request.userEmail,
      orderId,
      orderValue,
    });

    delete order.user;

    return response.status(202).json(order);
  }

  public async list(request: Request, response: Response): Promise<Response> {
    const listOrders = new ListUserOrdersService();

    const allOrders = await listOrders.execute({
      email: request.userEmail,
    });

    return response.status(200).json(allOrders);
  }
}
