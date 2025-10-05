import { PrismaClient } from '@prisma/client';
import { execSync } from 'child_process';

async function setupDatabase() {
  try {
    console.log('🔄 Setting up database...');
    
    // Push database schema
    execSync('npx prisma db push', { stdio: 'inherit' });
    
    // Generate Prisma client
    execSync('npx prisma generate', { stdio: 'inherit' });
    
    // Test connection
    const prisma = new PrismaClient();
    await prisma.$connect();
    console.log('✅ Database setup complete!');
    await prisma.$disconnect();
    
  } catch (error) {
    console.error('❌ Database setup failed:', error.message);
    process.exit(1);
  }
}

setupDatabase();
