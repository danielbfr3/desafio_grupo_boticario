import { Request, Response } from 'express';

import CreateUserService from '../services/CreateUserService';

export default class UsersController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { fullName, email, cpf, password } = request.body;

    const createUser = new CreateUserService();

    const user = await createUser.execute({
      fullName,
      email,
      password,
      cpf,
    });

    delete user.password;

    return response.status(201).json(user);
  }
}
