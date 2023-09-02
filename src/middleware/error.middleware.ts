import { NextFunction, Request, Response } from 'express';
import createDebug from 'debug';
import { HttpError } from '../types/http.error.js';
const debug = createDebug('W7E:Middleware:Error');

debug('Loaded');

export const errorMiddleware = (
  error: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  debug('Error', error.message);

  let type = 'Server Error';
  res.status(500);
  res.statusMessage = 'Internal Server Error';

  if (error instanceof HttpError) {
    res.status(error.status);
    res.statusMessage = error.statusMessage;
    type = 'Http Error';
  }

  res.json({
    type,
    status: res.statusCode,
    statusMessage: res.statusMessage,
    message: error.message,
    errorName: error.name,
  });
};
