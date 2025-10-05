// Alternative single serverless function approach
import { createServer } from 'http';
import { parse } from 'url';
import express from 'express';
import cors from 'cors';
import authRouter from '../backend/src/routes/auth.js';
import ticketsRouter from '../backend/src/routes/tickets.js';
import commentsRouter from '../backend/src/routes/comments.js';

const app = express();

// Middleware
app.use(cors({
  origin: true,
  credentials: true
}));
app.use(express.json());

// Health check
app.get('/api', (req, res) => {
  res.json({ 
    message: 'HelpDesk Mini API is running',
    status: 'ok',
    timestamp: new Date().toISOString()
  });
});

// Routes
app.use('/api/auth', authRouter);
app.use('/api/tickets', ticketsRouter);
app.use('/api/comments', commentsRouter);

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ 
    error: 'Not Found',
    path: req.originalUrl,
    message: 'The requested resource was not found'
  });
});

// Export for Vercel
export default (req, res) => {
  return app(req, res);
};
