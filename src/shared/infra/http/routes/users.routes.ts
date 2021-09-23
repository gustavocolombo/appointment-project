import { Router } from 'express';
import { classToClass } from 'class-transformer';
import { celebrate, Joi } from 'celebrate';
import CreateUserService from '@modules/users/services/CreateUserService';

const usersRoutes = Router();

usersRoutes.post('/', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required(),
    email: Joi.string().required(),
    password: Joi.string().required().min(4).max(12),
  }),
}), async (request, response) => {
  try {
    const { name, email, password } = request.body;

    const userService = new CreateUserService();

    const user = await userService.execute({ name, email, password });

    return response.json({ user: classToClass(user) });
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

export default usersRoutes;
