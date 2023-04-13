import express from 'express';
import { userRouter } from './user.routes';
import { noteRouter } from './note.routes';

const routes = express.Router();
routes.use('/user', userRouter);
routes.use('/note', noteRouter);

export default routes;