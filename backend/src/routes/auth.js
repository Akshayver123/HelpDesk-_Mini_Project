import { Router } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { prisma } from '../db.js';
import { config } from '../config.js';

const router = Router();

router.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ error: 'Missing fields' });
    }

    const hash = bcrypt.hashSync(password, 10);
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hash,
        role: 'user',
      },
    });

    const tokenPayload = { id: user.id, name: user.name, email: user.email, role: user.role };
    const token = jwt.sign(tokenPayload, config.jwtSecret, { expiresIn: '7d' });
    
    res.json({ 
      user: { id: user.id, name: user.name, email: user.email, role: user.role }, 
      token 
    });
  } catch (err) {
    if (err.code === 'P2002') {
      return res.status(400).json({ error: 'Email already in use' });
    }
    res.status(500).json({ error: 'Registration failed' });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: 'Missing fields' });
    }

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const ok = bcrypt.compareSync(password, user.password);
    if (!ok) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const tokenPayload = { id: user.id, name: user.name, email: user.email, role: user.role };
    const token = jwt.sign(tokenPayload, config.jwtSecret, { expiresIn: '7d' });
    
    res.json({ 
      user: { id: user.id, name: user.name, email: user.email, role: user.role }, 
      token 
    });
  } catch (err) {
    res.status(500).json({ error: 'Login failed' });
  }
});

export default router;
