import ticketsRouter from '../../backend/src/routes/tickets.js';
import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());
app.use('/api/tickets', ticketsRouter);

export default app;
