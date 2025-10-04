import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');

  // Create admin user
  const adminPassword = bcrypt.hashSync('admin123', 10);
  const admin = await prisma.user.upsert({
    where: { email: 'admin@helpdesk.com' },
    update: {},
    create: {
      email: 'admin@helpdesk.com',
      password: adminPassword,
      name: 'Admin User',
      role: 'admin',
    },
  });

  // Create regular user
  const userPassword = bcrypt.hashSync('user123', 10);
  const user = await prisma.user.upsert({
    where: { email: 'user@helpdesk.com' },
    update: {},
    create: {
      email: 'user@helpdesk.com',
      password: userPassword,
      name: 'Regular User',
      role: 'user',
    },
  });

  // Create sample tickets
  const ticket1 = await prisma.ticket.create({
    data: {
      title: 'Login issue on mobile app',
      description: 'Users are unable to login via mobile app after latest update.',
      status: 'open',
      priority: 'high',
      slaDueAt: new Date(Date.now() + 24 * 3600 * 1000), // 24 hours from now
      createdById: user.id,
    },
  });

  const ticket2 = await prisma.ticket.create({
    data: {
      title: 'Feature request: Dark mode',
      description: 'Please add dark mode support to the dashboard.',
      status: 'open',
      priority: 'low',
      slaDueAt: new Date(Date.now() + 7 * 24 * 3600 * 1000), // 7 days from now
      createdById: user.id,
    },
  });

  // Create sample comments
  await prisma.comment.create({
    data: {
      content: 'We are investigating this issue. Will update soon.',
      ticketId: ticket1.id,
      userId: admin.id,
    },
  });

  console.log('✅ Seeding complete!');
  console.log('📧 Admin: admin@helpdesk.com / admin123');
  console.log('📧 User: user@helpdesk.com / user123');
}

main()
  .catch((e) => {
    console.error('❌ Seeding failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
