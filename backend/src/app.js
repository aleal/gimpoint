import 'dotenv/config';
import express, { json } from 'express';
import 'express-async-errors';
import routes from './routes';
import './database';
import { extractError } from './app/lib/utils';

class App {
  constructor() {
    this.server = express();
    this.middlewares();
    this.routes();
    this.errorHandler();
  }

  middlewares() {
    this.server.use(json());
  }

  routes() {
    this.server.use(routes);
  }

  errorHandler() {
    this.server.use(async (err, req, res, next) => {
      return res.status(500).json(await extractError(err, req));
    });
  }
}

export default new App().server;
