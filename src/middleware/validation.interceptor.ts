import createDebug from 'debug';
import { validate } from 'express-validation';
import { userSchema } from '../entities/user.js';
const debug = createDebug('W7E:Middleware:Validation.Interceptor');

export class ValidationInterceptor {
  constructor() {
    debug('Instantiated');
  }

  registerValidator() {
    return validate(
      {
        body: userSchema,
      },
      {
        statusCode: 406,
      },
      {
        abortEarly: false,
      }
    );
  }
}
