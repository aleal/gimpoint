import * as Yup from 'yup';
import Student from '../models/Student';

class StudentController {
  async store(req, res) {
    const studentExists = await Student.findOne({
      where: { email: req.body.email },
    });
    if (studentExists) {
      return res.status(400).json({ error: 'Student already exists!' });
    }
    const student = await Student.create(req.body);
    return res.json(student);
  }

  async update(req, res) {
    const student = await Student.findByPk(req.params.id);
    if (!student) {
      return res.status(404).json({ error: 'Student does not exist!' });
    }
    const { email } = req.body;
    if (email && email !== student.email) {
      const studentExists = await Student.findOne({
        where: { email },
      });
      if (studentExists) {
        return res.status(400).json({ error: 'Email already taken!' });
      }
    }
    const updatedStudent = await student.update(req.body);
    return res.json(updatedStudent);
  }

  async find(req, res) {
    const student = await Student.findByPk(req.params.id);
    if (!student) {
      return res.status(404).json({ error: 'Student was not found!' });
    }
    return res.json(student);
  }

  async findAll(req, res) {
    const students = await Student.findAll();
    return res.json(students);
  }

  storeValidator() {
    return Yup.object({
      name: Yup.string()
        .min(3)
        .required(),
      email: Yup.string()
        .required()
        .email(),
      age: Yup.number()
        .required()
        .positive()
        .moreThan(18, 'These classes are mature rated!'),
      weight: Yup.number()
        .required()
        .positive(),
      height: Yup.number()
        .required()
        .positive(),
    });
  }

  updateValidator() {
    return Yup.object({
      name: Yup.string().min(3),
      email: Yup.string().email(),
      age: Yup.number()
        .positive()
        .moreThan(18, 'These classes are mature rated!'),
      weight: Yup.number().positive(),
      height: Yup.number().positive(),
    });
  }
}

export default new StudentController();
