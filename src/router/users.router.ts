import express, { Router as createRouter } from 'express';
import createDebug from 'debug';
import { UsersController } from '../controller/users.controller.js';

const debug = createDebug('W7E:Router:UsersRouter');

export class UsersRouter {
  router: express.Router;
  // eslint-disable-next-line no-unused-vars
  constructor(private controller: UsersController) {
    debug('Instantiated');
    this.router = createRouter();
    this.configure();
  }

  configure() {
    this.router.patch('/login', this.controller.login.bind(this.controller));
    this.router.post('/register', this.controller.create.bind(this.controller));

    this.router.get('/', this.controller.getAll.bind(this.controller));
    this.router.get('/:id', this.controller.getById.bind(this.controller));
    this.router.patch('/:id', this.controller.update.bind(this.controller));
    this.router.delete('/:id', this.controller.delete.bind(this.controller));
  }
}
