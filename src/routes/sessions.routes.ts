import { Router } from 'express';
import AuthenticateUserService from '../services/AuthenticateUserService';

const sessionRoutes = Router();

sessionRoutes.post('/login', async (request, response) => {
  try {
    const { email, password } = request.body;

    const sessionService = new AuthenticateUserService();

    const { user, jwtToken } = await sessionService.execute({ email, password });

    delete user.password;

    return response.json({ user, jwtToken });
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

export default sessionRoutes;
