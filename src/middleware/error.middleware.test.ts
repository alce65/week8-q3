import { Request, Response } from 'express';
import { ErrorMiddleware } from './error.middleware';
import { HttpError } from '../types/errors';

describe('Given ErrorMiddleware class', () => {
  describe('When we instantiate it', () => {
    const errorMiddleware = new ErrorMiddleware();
    const mockRequest = {} as Request;
    const mockResponse = {
      status: jest.fn(),
      json: jest.fn(),
    } as unknown as Response;
    const mockNext = jest.fn();
    test('Then manageError should be used with Error', () => {
      const error = new Error('Test Error');
      errorMiddleware.manageErrors(error, mockRequest, mockResponse, mockNext);
      expect(mockResponse.status).toHaveBeenCalled();
      expect(mockResponse.json).toHaveBeenCalledWith(
        expect.objectContaining({
          type: 'Server Error',
        })
      );
    });

    test('Then manageError should be used with HttpError', () => {
      const error = new HttpError(400, 'Bad Request', 'Test HttpError');
      errorMiddleware.manageErrors(error, mockRequest, mockResponse, mockNext);
      expect(mockResponse.status).toHaveBeenCalled();
      expect(mockResponse.json).toHaveBeenCalledWith(
        expect.objectContaining({
          type: 'Http Error',
        })
      );
    });
  });
});
