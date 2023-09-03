import { UsersController } from './users.controller.js';
import { UsersMongoRepository } from '../repository/users.mongo.repository.js';
import { Request, Response } from 'express';

describe('Given UsersController', () => {
  describe('When we instantiate and use it WITHOUT errors', () => {
    const mockRepo: UsersMongoRepository = {
      getAll: jest.fn(),
      getById: jest.fn(),
      search: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    };

    const userController = new UsersController(mockRepo);

    test('getAll should be called and return data', async () => {
      const mockData = [{ id: '1', name: 'Lion' }];
      (mockRepo.getAll as jest.Mock).mockResolvedValue(mockData);

      const mockRequest = {} as Request;
      const mockResponse = {
        json: jest.fn(),
      } as unknown as Response;
      const mockNext = jest.fn();

      await userController.getAll(mockRequest, mockResponse, mockNext);
      expect(mockRepo.getAll).toHaveBeenCalledWith();
      expect(mockResponse.json).toHaveBeenCalledWith(mockData);
    });
  });

  describe('When we instantiate and use it WITH errors', () => {
    const mockRepo: UsersMongoRepository = {
      getAll: jest.fn().mockRejectedValue(new Error('GetAll Error')),
      getById: jest.fn(),
      search: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    };

    const userController = new UsersController(mockRepo);

    test('getAll should be called and next will be called ', async () => {
      const mockRequest = {} as Request;
      const mockResponse = {
        json: jest.fn(),
      } as unknown as Response;
      const mockNext = jest.fn();

      await userController.getAll(mockRequest, mockResponse, mockNext);
      expect(mockRepo.getAll).toHaveBeenCalledWith();
      expect(mockNext).toHaveBeenCalledWith(new Error('GetAll Error'));
    });
  });
});
