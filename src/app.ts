import express, { NextFunction, Request, Response } from 'express';
import cors from 'cors';
import morgan from 'morgan';
import createDebug from 'debug';
import { ErrorMiddleware } from './middleware/error.middleware.js';
import { HttpError } from './types/http.error.js';

const debug = createDebug('W7E:App');
export const app = express();

const errorMiddleware = new ErrorMiddleware();

debug('Started');

app.use(morgan('dev'));
app.use(cors());

app.use(express.json());
app.use(express.static('public'));

app.use('/:id', (req: Request, res: Response, next: NextFunction) => {
  const error = new HttpError(400, 'Bad request', 'Invalid route');
  next(error);
});

app.use(errorMiddleware.manageErrors.bind(errorMiddleware));
