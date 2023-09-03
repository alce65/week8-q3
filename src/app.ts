import express, { NextFunction, Request, Response } from 'express';
import cors from 'cors';
import morgan from 'morgan';
import createDebug from 'debug';
import { ErrorMiddleware } from './middleware/error.middleware.js';
import { HttpError } from './types/http.error.js';
import { UsersMongoRepository } from './repository/users.mongo.repository.js';
import { UsersController } from './controller/users.controller.js';
import { UsersRouter } from './router/users.router.js';
import { User } from './entities/user.js';
import { Repository } from './repository/repository.js';

const debug = createDebug('W7E:App');
export const app = express();

debug('Started');

app.use(morgan('dev'));
app.use(cors());

app.use(express.json());
app.use(express.static('public'));

const userRepo: Repository<User> = new UsersMongoRepository();
const userController: UsersController = new UsersController(userRepo);
const userRouter = new UsersRouter(userController);
app.use('/users', userRouter.router);

app.use('/:id', (req: Request, res: Response, next: NextFunction) => {
  const error = new HttpError(400, 'Bad request', 'Invalid route');
  next(error);
});

const errorMiddleware = new ErrorMiddleware();
app.use(errorMiddleware.manageErrors.bind(errorMiddleware));
