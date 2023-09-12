import { Request, Response } from 'express';
import { FilesInterceptor } from './files.interceptor';
import multer from 'multer';

jest.mock('multer');

describe('Given FilesInterceptor class', () => {
  describe('When we instantiate it', () => {
    const filesInterceptor = new FilesInterceptor();
    test('Then it should ...', () => {
      // Arrange
      const mockMiddleware = jest.fn();

      multer.diskStorage = jest.fn().mockImplementation(({ filename }) =>
        // eslint-disable-next-line max-nested-callbacks
        filename('', '', () => {})
      );
      (multer as unknown as jest.Mock).mockReturnValue({
        single: jest.fn().mockReturnValue(mockMiddleware),
      });

      const mockResponse = {} as Response;
      const mockRequest = {} as Request;
      const mockNext = jest.fn();

      // Act
      filesInterceptor.singleFileStore('')(mockRequest, mockResponse, mockNext);

      // Assert
      expect(mockMiddleware).toHaveBeenCalled();
    });
  });
});
