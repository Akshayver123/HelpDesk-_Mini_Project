import authRouter from '../../backend/src/routes/auth.js';
import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());
app.use('/api/auth', authRouter);

export default app;
