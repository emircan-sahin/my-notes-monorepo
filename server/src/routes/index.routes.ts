import express from 'express';
import { userRouter } from './user.routes';
import { noteRouter } from './note.routes';
import { z } from 'zod';

export const idSchema = {
    id: z.string().min(12).max(24)
}

const routes = express.Router();
routes.use('/user', userRouter);
routes.use('/note', noteRouter);

export default routes;