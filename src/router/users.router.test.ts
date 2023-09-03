import { UsersController } from '../controller/users.controller';
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

    const router = new UsersRouter(controller);
    test('Then it should ...', () => {
      expect(router).toBeInstanceOf(UsersRouter);
      expect(Function.prototype.bind).toHaveBeenCalledTimes(6);
    });
  });
});
