import cron from 'node-cron';
import { prisma } from '../db.js';

export function startSlaChecker() {
  // Run every hour at minute 0
  cron.schedule('0 * * * *', async () => {
    console.log('🔍 Running SLA checker...');
    try {
      const now = new Date();
      
      // Find all open/in_progress tickets with SLA past due
      const overdueTickets = await prisma.ticket.findMany({
        where: {
          status: {
            in: ['open', 'in_progress'],
          },
          slaDueAt: {
            lt: now,
          },
        },
      });

      if (overdueTickets.length > 0) {
        console.log(`⚠️  Found ${overdueTickets.length} overdue ticket(s)`);
        
        // Update status to overdue
        await prisma.ticket.updateMany({
          where: {
            id: {
              in: overdueTickets.map(t => t.id),
            },
          },
          data: {
            status: 'overdue',
          },
        });
        
        console.log(`✅ Marked ${overdueTickets.length} ticket(s) as overdue`);
      } else {
        console.log('✅ No overdue tickets found');
      }
    } catch (err) {
      console.error('❌ SLA checker error:', err);
    }
  });

  console.log('⏰ SLA checker scheduled (runs every hour)');
}
