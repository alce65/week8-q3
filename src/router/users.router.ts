/* eslint-disable no-unused-vars */
import express, { Router as createRouter } from 'express';
import createDebug from 'debug';
import { UsersController } from '../controller/users.controller.js';
import { FilesInterceptor } from '../middleware/files.interceptor.js';
import { AuthInterceptor } from '../middleware/auth.interceptor.js';
import { CloudinaryService } from '../services/media.files.js';
import { ValidationInterceptor } from '../middleware/validation.interceptor.js';

const debug = createDebug('W7E:Router:UsersRouter');

export class UsersRouter {
  router: express.Router;
  authInterceptor: AuthInterceptor;
  validationInterceptor: ValidationInterceptor;

  constructor(
    private controller: UsersController,
    private filesInterceptor: FilesInterceptor
  ) {
    debug('Instantiated');
    this.router = createRouter();
    this.authInterceptor = new AuthInterceptor();
    this.validationInterceptor = new ValidationInterceptor();
    this.configure();
  }

  configure() {
    this.router.patch('/login', this.controller.login.bind(this.controller));
    this.router.post(
      '/register',
      this.filesInterceptor.singleFileStore('avatar'),
      this.validationInterceptor
        .registerValidator()
        .bind(this.validationInterceptor),
      this.controller.create.bind(this.controller)
    );

    this.router.post(
      '/files',
      this.authInterceptor.authorization.bind(this.authInterceptor),
      this.filesInterceptor.singleFileStore('avatar'),

      // Sample controller for test cloudinary
      // not testable in this way
      async (req, res, _next) => {
        const cloudinary = new CloudinaryService();
        const finalPath = req.file!.destination + '/' + req.file!.filename;
        req.body.avatar = await cloudinary.uploadImage(finalPath);
        const url200 = cloudinary.resizeImage(req.body.avatar);
        debug(url200);
        res.json(req.body);
      }
    );

    this.router.get('/', this.controller.getAll.bind(this.controller));
    this.router.get('/:id', this.controller.getById.bind(this.controller));
    this.router.patch('/:id', this.controller.update.bind(this.controller));
    this.router.delete('/:id', this.controller.delete.bind(this.controller));
  }
}
