import { Router } from 'express';
import appointmentsRouter from './appointments.routes';
import sessionRoutes from './sessions.routes';
import usersRoutes from './users.routes';

const routes = Router();

routes.use('/appointments', appointmentsRouter);
routes.use('/users', usersRoutes);
routes.use('/sessions', sessionRoutes);

export default routes;
