import { NextFunction, Request, Response } from 'express';
import createDebug from 'debug';
import { Auth } from '../services/auth.js';
import { HttpError } from '../types/errors.js';
import { Repository } from '../repository/repository.js';
import { WithId } from '../types/id.js';
import { User } from '../entities/user.js';

const debug = createDebug('W7E:Middleware:Auth.Interceptor');

debug('Loaded');

// Authorization ¿Esta autorizado?
// Authentication ¿Erres quien dices y tienes derecho a ....?

export class AuthInterceptor {
  authorization(req: Request, _res: Response, next: NextFunction) {
    debug('Call authorization interceptor');
    try {
      const token = req.get('Authorization')?.split(' ')[1];
      if (!token) {
        throw new HttpError(498, 'Invalid token', 'No token provided');
      }

      const { id } = Auth.verifyJWTGettingPayload(token);
      req.body.validatedId = id;
      debug(id);
      next();
    } catch (error) {
      next(error);
    }
  }

  authentication<T extends { id: unknown }>(
    itemsRepo: Repository<T>,
    ownerKey: keyof T
  ) {
    return async (req: Request, _res: Response, next: NextFunction) => {
      debug('Call authentication interceptor');
      const userID = req.body.validatedId;
      const itemID = req.params.id;
      try {
        const item = await itemsRepo.getById(itemID);
        const itemOwner = (item[ownerKey] as WithId).id;
        if (itemOwner !== userID) {
          throw new HttpError(403, 'Forbidden', 'Not item owner');
        }

        next();
      } catch (error) {
        next(error);
      }
    };
  }

  isAdmin(usersRepo: Repository<User>) {
    return async (req: Request, _res: Response, next: NextFunction) => {
      try {
        const userID = req.body.validatedId;
        const user = await usersRepo.getById(userID);
        if (user.role !== 'admin') {
          throw new HttpError(403, 'Forbidden', 'Not Admin User');
        }

        next();
      } catch (error) {
        next(error);
      }
    };
  }
}
