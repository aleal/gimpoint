import * as Yup from 'yup';
import Plan from '../models/Plan';
import CrudController from './CrudController';
import BusinessError from '../lib/BusinessError';

class PlanController extends CrudController {
  getModel() {
    return Plan;
  }

  async beforeCreate(req) {
    const { title } = req.body;
    const planExists = await Plan.findOne({
      where: {
        title,
        deactivated_at: null,
      },
    });
    if (planExists) {
      throw new BusinessError(`Plan ${title} already exists`);
    }
  }

  async beforeUpdate(req, res) {
    const { title } = req.body;
    const { title: currentTitle } = res.locals.record;
    if (title && title !== currentTitle) {
      const planExists = await Plan.findOne({
        where: {
          title,
          deactivated_at: null,
        },
      });
      if (planExists) {
        throw new BusinessError(`Plan ${title} already exists`);
      }
    }
  }

  createValidator() {
    return Yup.object({
      title: Yup.string()
        .required()
        .min(3),
      duration: Yup.number()
        .required()
        .positive()
        .min(1),
      price: Yup.number()
        .required()
        .positive(),
    });
  }

  updateValidator() {
    return Yup.object({
      title: Yup.string().min(3),
      duration: Yup.number()
        .positive()
        .min(1),
      price: Yup.number().positive(),
    });
  }
}

export default new PlanController();
