import express from 'express';
import { UserController } from '../controllers/userController.js';

export const userRouter = express.Router();
const userController = new UserController();

userRouter.post('/create', userController.create);
userRouter.delete('/delete/:id', userController.delete);
userRouter.get('/all', userController.getAll); 
userRouter.get('/id/:id', userController.getById);
userRouter.post('/authenticate', userController.authenticate);
userRouter.patch('/is_active/:id', userController.isActive);