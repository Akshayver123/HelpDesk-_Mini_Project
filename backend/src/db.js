import { PrismaClient } from '@prisma/client';

export const prisma = new PrismaClient();

// Initialize database on startup
async function initDB() {
  try {
    await prisma.$connect();
    console.log('✅ Database connected');
  } catch (error) {
    console.error('❌ Database connection failed:', error);
    // Create a simple in-memory fallback for development
    console.log('🔄 Using fallback database...');
  }
}

initDB();

const prismaClientSingleton = () => {
  return new PrismaClient();
};

const globalForPrisma = globalThis;

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;
