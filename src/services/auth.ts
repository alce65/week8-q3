import createDebug from 'debug';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { HttpError } from '../types/errors.js';
import { TokenPayload } from '../types/token.js';

const debug = createDebug('W7E:Services:Auth');
debug('Loaded');

export class Auth {
  private static secret = process.env.TOKEN_SECRET!;

  static hash(passwd: string): Promise<string> {
    const saltRounds = 10;
    return bcrypt.hash(passwd, saltRounds);
  }

  static compare(passwd: string, hash: string): Promise<boolean> {
    return bcrypt.compare(passwd, hash);
  }

  static signJWT(payload: TokenPayload): string {
    const token = jwt.sign(payload, Auth.secret);
    return token;
  }

  static verifyJWTGettingPayload(token: string): TokenPayload {
    try {
      const result = jwt.verify(token, Auth.secret);
      if (typeof result === 'string') {
        throw new HttpError(498, 'Invalid token', result);
      }

      return result as TokenPayload;
    } catch (error) {
      throw new HttpError(498, 'Invalid token', (error as Error).message);
    }
  }
}
