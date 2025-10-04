import { Router } from 'express';
import { prisma } from '../db.js';
import { authRequired } from '../middleware/auth.js';

const router = Router();

// List comments by ticket
router.get('/ticket/:ticketId', authRequired, async (req, res) => {
  try {
    const comments = await prisma.comment.findMany({
      where: { ticketId: parseInt(req.params.ticketId) },
      orderBy: { createdAt: 'asc' },
      include: {
        user: {
          select: { id: true, name: true, email: true },
        },
      },
    });
    
    // Transform to match frontend expectation
    const formatted = comments.map(c => ({
      ...c,
      user_name: c.user.name,
    }));
    
    res.json(formatted);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch comments' });
  }
});

// Add comment
router.post('/', authRequired, async (req, res) => {
  try {
    const { ticket_id, content } = req.body;
    if (!ticket_id || !content) {
      return res.status(400).json({ error: 'Missing fields' });
    }
    
    const comment = await prisma.comment.create({
      data: {
        content,
        ticketId: parseInt(ticket_id),
        userId: req.user.id,
      },
      include: {
        user: {
          select: { id: true, name: true, email: true },
        },
      },
    });
    
    res.json({
      ...comment,
      user_name: comment.user.name,
    });
  } catch (err) {
    res.status(500).json({ error: 'Failed to create comment' });
  }
});

export default router;
