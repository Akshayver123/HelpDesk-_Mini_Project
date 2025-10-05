export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  try {
    if (req.method === 'GET') {
      // Return mock tickets for now
      res.status(200).json({
        tickets: [
          {
            id: 1,
            title: 'Test Ticket',
            status: 'open',
            priority: 'medium',
            createdAt: new Date().toISOString()
          }
        ],
        message: 'Tickets endpoint working'
      });
    } else if (req.method === 'POST') {
      res.status(201).json({
        message: 'Ticket created successfully',
        ticket: {
          id: Date.now(),
          ...req.body,
          createdAt: new Date().toISOString()
        }
      });
    } else {
      res.status(405).json({ error: 'Method not allowed' });
    }
  } catch (error) {
    console.error('Tickets error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}
