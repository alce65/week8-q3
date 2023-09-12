import { AnyController, Controller } from './controller.js';
import { Repository } from '../repository/repository.js';
import createDebug from 'debug';
import { LoginData, User } from '../entities/user.js';
import { Request, Response, NextFunction } from 'express';
import { HttpError } from '../types/errors.js';
import { Auth } from '../services/auth.js';
import { TokenPayload } from '../types/token.js';
import { CloudinaryService } from '../services/media.files.js';
const debug = createDebug('W7E:Controller:UsersController');

export class UsersController extends AnyController<User> implements Controller {
  cloudinary: CloudinaryService;
  constructor(protected repo: Repository<User>) {
    super(repo);
    this.cloudinary = new CloudinaryService();
    debug('Instantiated');
  }

  async login(req: Request, res: Response, next: NextFunction) {
    const { userName, passwd } = req.body as unknown as LoginData;
    const error = new HttpError(401, 'UnAuthorized', 'Login unauthorized');
    try {
      if (!this.repo.search) return;
      const data = await this.repo.search({ key: 'userName', value: userName });
      if (!data.length) {
        throw error;
      }

      const user = data[0];
      if (!(await Auth.compare(passwd, user.passwd))) {
        throw error;
      }

      const payload: TokenPayload = {
        id: user.id,
        userName: user.userName,
      };
      const token = Auth.signJWT(payload);
      res.json({ user, token });
    } catch (error) {
      next(error);
    }
  }

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      req.body.passwd = await Auth.hash(req.body.passwd);
      if (!req.file) {
        throw new HttpError(
          400,
          'Bad Request',
          'No avatar image for registration'
        );
      }

      const finalPath = req.file.destination + '/' + req.file!.filename;
      const imageData = await this.cloudinary.uploadImage(finalPath);
      // Delete await fs.unlink(finalPath);
      req.body.imageData = imageData;
      debug(imageData);
    } catch (error) {
      next(error);
      return;
    }

    super.create(req, res, next);
  }

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      if (req.body.passwd) {
        req.body.passwd = await Auth.hash(req.body.passwd);
      }
    } catch (error) {
      next(error);
      return;
    }

    super.update(req, res, next);
  }
}
