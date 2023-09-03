import { UsersMongoRepository } from './users.mongo.repository';
import { UserModel } from './users.mongo.model.js';

jest.mock('./users.mongo.model.js');

describe('Given the class UsersMongoRepository', () => {
  let repo: UsersMongoRepository;
  beforeEach(() => {
    repo = new UsersMongoRepository();
  });

  describe('When we instantiate it and all is OK', () => {
    const mockExec = jest.fn().mockResolvedValue([]);
    UserModel.find = jest.fn().mockReturnValue({
      populate: jest.fn().mockReturnValue({
        exec: mockExec,
      }),
      exec: mockExec,
    });

    test('We should use getAll', async () => {
      const result = await repo.getAll();
      expect(mockExec).toHaveBeenCalled();
      expect(result).toEqual([]);
    });
  });

  describe('When we instantiate it and there are errors', () => {
    const mockExec = jest.fn().mockResolvedValue(null);
    UserModel.findById = jest.fn().mockReturnValue({
      exec: mockExec,
    });

    test('We should get an error if we use getById', () => {
      expect(repo.getById('')).rejects.toThrow();
    });
  });
});
