import 'reflect-metadata';
import { errors } from 'celebrate';
import express from 'express';
import routes from '@shared/routes';
import '@shared/database';

const server = express();
server.use(express.json());
server.use(errors());
server.use(routes);

server.listen(3333, () => {
  console.log('Server started on port 3333');
});
