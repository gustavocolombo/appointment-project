import { Router } from 'express';
import { classToClass } from 'class-transformer';
import CreateUserService from '../services/CreateUserService';

const usersRoutes = Router();

usersRoutes.post('/', async (request, response) => {
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
