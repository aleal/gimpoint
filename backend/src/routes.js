import { Router } from 'express';
import SessionController from './app/controllers/SessionController';
import UserController from './app/controllers/UserController';
import StudentController from './app/controllers/StudentController';
import authMiddleware from './app/middlewares/auth';
import validatorMiddleware from './app/middlewares/validator';

const routes = new Router();
routes.post('/sessions', SessionController.store);
routes.post('/users', UserController.store);
routes.put('/users', authMiddleware, UserController.update);
routes.post(
  '/students',
  authMiddleware,
  validatorMiddleware(StudentController.storeValidator),
  StudentController.store
);
routes.put(
  '/students/:id',
  authMiddleware,
  validatorMiddleware(StudentController.updateValidator),
  StudentController.update
);
routes.get('/students/:id', authMiddleware, StudentController.find);
routes.get('/students', authMiddleware, StudentController.findAll);
export default routes;
