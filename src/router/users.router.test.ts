/* eslint-disable no-labels */
/* eslint-disable no-unused-labels */
import { NextFunction, Request, Response } from 'express';
import { UsersController } from '../controller/users.controller';
import { FilesInterceptor } from '../middleware/files.interceptor';
import { UsersRouter } from './users.router';

describe('Given UsersRouter', () => {
  describe('When we instantiate it', () => {
    jest.spyOn(Function.prototype, 'bind');
    const controller = {
      getAll: jest.fn(),
      getById: jest.fn(),
      login: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    } as unknown as UsersController;

    const mockFileInterceptor = {
      singleFileStore: jest
        .fn()
        .mockImplementation(
          () => (_req: Request, _res: Response, next: NextFunction) => {
            next();
          }
        ),
    } as FilesInterceptor;
    const router = new UsersRouter(controller, mockFileInterceptor);
    test('Then it should register all routes', () => {
      expect(router).toBeInstanceOf(UsersRouter);
      expect(Function.prototype.bind).toHaveBeenCalledTimes(9);
    });
  });
});
