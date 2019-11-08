import validatorMiddleware from '../middlewares/validator';
import { isFunction } from '../lib/utils';
/**
 * Abstract class controller with basic functions and structure.
 * ```
 * Hooks that could be overrided:
 * beforeCreate
 * afterUpdate
 * beforeUpdate
 * afterUpdate
 * beforeDelete
 * afterDelete
 * ```
 * Variable record available at res.locals.record when it makes sense;
 */
class CrudController {
  constructor() {
    if (new.target === CrudController) {
      throw new TypeError('CrudController can not be instanciated directly');
    }
    if (!isFunction(this.getModel)) {
      throw new TypeError('Method getModel must be overrided');
    }
  }

  async retrieve(req, res) {
    return res.json(res.locals.record);
  }

  async retrieveAll(req, res) {
    const records = await this.getModel().findAll({
      where: { deactivated_at: null },
    });
    return res.json(records);
  }

  async create(req, res) {
    if (isFunction(this.beforeCreate)) {
      await this.beforeCreate(req, res);
    }
    const record = await this.getModel().create(req.body);
    if (isFunction(this.afterCreate)) {
      await this.afterCreate(req, res, record);
    }
    return res.json(record);
  }

  async update(req, res) {
    const { record } = res.locals;
    if (isFunction(this.beforeUpdate)) {
      await this.beforeUpdate(req, res, record);
    }
    const updatedRecord = await record.update(req.body);
    if (isFunction(this.afterUpdate)) {
      await this.afterUpdate(req, res, updatedRecord);
    }
    return res.json(updatedRecord);
  }

  async delete(req, res) {
    const { record } = res.locals;
    if (isFunction(this.beforeDelete)) {
      await this.afterUpdate(req, res, record);
    }
    const deletedRecord = await record.update({ deactivated_at: new Date() });
    if (isFunction(this.afterDelete)) {
      await this.afterUpdate(req, res, deletedRecord);
    }
    return res.json(deletedRecord);
  }

  async retrieveById(req, res, next) {
    const record = await this.getModel().findByPk(req.params.id);
    if (!record) {
      return res.status(404).json({ error: 'Not found' });
    }
    res.locals.record = record;
    return next();
  }

  configRoutes(routes, path) {
    routes.get(
      `${path}/:id`,
      this.retrieveById.bind(this),
      this.retrieve.bind(this)
    );
    routes.get(path, this.retrieveAll.bind(this));
    routes.post(
      path,
      validatorMiddleware(this.createValidator),
      this.create.bind(this)
    );
    routes.put(
      `${path}/:id`,
      validatorMiddleware(this.updateValidator),
      this.retrieveById.bind(this),
      this.update.bind(this)
    );
    routes.delete(
      `${path}/:id`,
      this.retrieveById.bind(this),
      this.delete.bind(this)
    );
  }
}

export default CrudController;
