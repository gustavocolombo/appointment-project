import { Router } from 'express';
import { celebrate, Joi } from 'celebrate';
import AuthenticateUserService from '@modules/users/services/AuthenticateUserService';
import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';

const sessionRoutes = Router();

sessionRoutes.post('/login', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required(),
    password: Joi.string().required().min(4).max(12),
  }),
}), async (request, response) => {
  try {
    const { email, password } = request.body;

    const sessionService = new AuthenticateUserService(UsersRepository);

    const { user, jwtToken } = await sessionService.execute({ email, password });

    delete user.password;

    return response.json({ user, jwtToken });
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

export default sessionRoutes;
