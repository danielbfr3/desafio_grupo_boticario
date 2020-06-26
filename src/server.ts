import 'reflect-metadata';
import 'express-async-errors';

import './database/typeorm';

import express, { Request, Response, NextFunction } from 'express';

import cors from 'cors';
import morgan from 'morgan';

import AppError from './errors/AppError';
import routes from './router';

const app = express();

app.use(cors());
app.use(morgan('short'));
app.use(express.json());
app.use(routes);

app.use((err: Error, request: Request, response: Response, _: NextFunction) => {
  if (err instanceof AppError) {
    return response.status(err.statusCode).json({
      status: 'error',
      message: err.message,
    });
  }

  console.error(err);

  return response.status(500).json({
    status: 'error',
    message: 'Internal Server Error',
  });
});

app.listen(3333, () => {
  console.log('Server started on port 3333...');
});
