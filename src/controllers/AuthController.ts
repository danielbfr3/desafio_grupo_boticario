import { Request, Response } from 'express';

import AuthenticateUserService from '../services/AuthenticateUserService';

export default class AuthController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;

    const authenticateUser = new AuthenticateUserService();

    const authData = await authenticateUser.execute({
      email,
      password,
    });

    return response.status(202).json(authData);
  }
}
