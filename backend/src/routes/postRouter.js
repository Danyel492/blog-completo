import express from 'express';
import { PostController } from '../controllers/postController.js';

export const postRouter = express.Router();
const postController = new PostController();

postRouter.post('/create', postController.create);
postRouter.delete('/delete/:id', postController.delete);
postRouter.get('/all', postController.getAll); 
postRouter.get('/id/:id', postController.getById);
postRouter.get('/active', postController.getActive);
postRouter.get('/user/:author', postController.getPostByUsername);
postRouter.patch('/is_active/:id', postController.isActive);
postRouter.patch('/change/:id', postController.changeContent);
postRouter.put('/update/:id', postController.update)