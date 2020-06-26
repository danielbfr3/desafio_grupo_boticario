import { Request, Response } from 'express';

import TotalCashbackService from '../services/TotalCashbackService';

export default class UsersController {
  public async list(request: Request, response: Response): Promise<Response> {
    const totalCashback = new TotalCashbackService();

    const email = request.userEmail;

    const totalCashbackResponse = await totalCashback.execute({
      email,
    });

    return response.status(200).json(totalCashbackResponse);
  }
}
