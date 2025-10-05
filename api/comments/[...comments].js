import commentsRouter from '../../backend/src/routes/comments.js';
import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());
app.use('/api/comments', commentsRouter);

export default app;
