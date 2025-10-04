import { Router } from 'express';
import { prisma } from '../db.js';
import { authRequired } from '../middleware/auth.js';

const router = Router();

// List tickets
router.get('/', authRequired, async (req, res) => {
  try {
    const tickets = await prisma.ticket.findMany({
      orderBy: { updatedAt: 'desc' },
      include: {
        createdBy: {
          select: { id: true, name: true, email: true },
        },
      },
    });
    res.json(tickets);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch tickets' });
  }
});

// Create ticket
router.post('/', authRequired, async (req, res) => {
  try {
    const { title, description, priority = 'medium', slaHours = 48 } = req.body;
    if (!title) return res.status(400).json({ error: 'Title required' });
    
    const slaDue = new Date(Date.now() + Number(slaHours) * 3600 * 1000);
    
    const ticket = await prisma.ticket.create({
      data: {
        title,
        description: description || '',
        priority,
        slaDueAt: slaDue,
        createdById: req.user.id,
      },
      include: {
        createdBy: {
          select: { id: true, name: true, email: true },
        },
      },
    });
    
    res.json(ticket);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create ticket' });
  }
});

// Get one
router.get('/:id', authRequired, async (req, res) => {
  try {
    const ticket = await prisma.ticket.findUnique({
      where: { id: parseInt(req.params.id) },
      include: {
        createdBy: {
          select: { id: true, name: true, email: true },
        },
      },
    });
    
    if (!ticket) return res.status(404).json({ error: 'Not found' });
    res.json(ticket);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch ticket' });
  }
});

// Update
router.put('/:id', authRequired, async (req, res) => {
  try {
    const { title, description, status, priority, slaDueAt } = req.body;
    const updateData = {};
    
    if (title !== undefined) updateData.title = title;
    if (description !== undefined) updateData.description = description;
    if (status !== undefined) updateData.status = status;
    if (priority !== undefined) updateData.priority = priority;
    if (slaDueAt !== undefined) updateData.slaDueAt = new Date(slaDueAt);
    
    const ticket = await prisma.ticket.update({
      where: { id: parseInt(req.params.id) },
      data: updateData,
      include: {
        createdBy: {
          select: { id: true, name: true, email: true },
        },
      },
    });
    
    res.json(ticket);
  } catch (err) {
    if (err.code === 'P2025') {
      return res.status(404).json({ error: 'Not found' });
    }
    res.status(500).json({ error: 'Failed to update ticket' });
  }
});

// Delete
router.delete('/:id', authRequired, async (req, res) => {
  try {
    await prisma.ticket.delete({
      where: { id: parseInt(req.params.id) },
    });
    res.json({ success: true });
  } catch (err) {
    if (err.code === 'P2025') {
      return res.status(404).json({ error: 'Not found' });
    }
    res.status(500).json({ error: 'Failed to delete ticket' });
  }
});

export default router;
