import { Router } from 'express';
import SessionController from './app/controllers/SessionController';
import UserController from './app/controllers/UserController';
import StudentController from './app/controllers/StudentController';
import authMiddleware from './app/middlewares/auth';
import validatorMiddleware from './app/middlewares/validator';
import PlanController from './app/controllers/PlanController';

const routes = new Router();
routes.post('/sessions', SessionController.store);
routes.post('/users', UserController.store);
routes.use(authMiddleware);
routes.put('/users', UserController.update);
routes.post(
  '/students',
  validatorMiddleware(StudentController.storeValidator),
  StudentController.store
);
routes.put(
  '/students/:id',
  validatorMiddleware(StudentController.updateValidator),
  StudentController.update
);
routes.get('/students/:id', StudentController.find);
routes.get('/students', StudentController.findAll);
PlanController.configRoutes(routes, '/plans');
export default routes;
