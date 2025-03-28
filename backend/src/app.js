import express from 'express';
import cors from 'cors';
import { userRouter } from './routes/userRouter.js';
import { postRouter } from './routes/postRouter.js';
import { connectDB } from './configs/database.js';

const app = express();

app.use(cors());
app.use(express.json());

connectDB();

app.use('/user', userRouter);
app.use('/post',postRouter);

const PORT = 3000;

const server = app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});

export default server;