import express from 'express';
import cors from 'cors';
import { config } from './config.js';
import authRouter from './routes/auth.js';
import ticketsRouter from './routes/tickets.js';
import commentsRouter from './routes/comments.js';
import { startSlaChecker } from './utils/slaChecker.js';

const app = express();
app.use(cors());
app.use(express.json());

app.get('/', (_req, res) => {
  res.json({ name: 'HelpDesk Mini API', status: 'ok' });
});

app.get('/api', (_req, res) => {
  res.json({ name: 'HelpDesk Mini API', status: 'ok', version: '1.0.0' });
});

app.use('/api/auth', authRouter);
app.use('/api/tickets', ticketsRouter);
app.use('/api/comments', commentsRouter);

// For local development
if (process.env.NODE_ENV !== 'production' || !process.env.VERCEL) {
  app.listen(config.port, () => {
    console.log(`✅ API running on http://localhost:${config.port}`);
    startSlaChecker();
  });
}

// For Vercel serverless functions
export default app;
