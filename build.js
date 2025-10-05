#!/usr/bin/env node

import { execSync } from 'child_process';
import { existsSync } from 'fs';
import path from 'path';

console.log('🚀 Starting HelpDesk Mini build process...');

try {
  // Install dependencies for both frontend and backend
  console.log('📦 Installing dependencies...');
  
  if (existsSync('frontend/package.json')) {
    console.log('Installing frontend dependencies...');
    execSync('cd frontend && npm install', { stdio: 'inherit' });
  }
  
  if (existsSync('backend/package.json')) {
    console.log('Installing backend dependencies...');
    execSync('cd backend && npm install', { stdio: 'inherit' });
  }
  
  // Generate Prisma client
  console.log('🔧 Generating Prisma client...');
  execSync('cd backend && npx prisma generate', { stdio: 'inherit' });
  
  // Build frontend
  console.log('🏗️ Building frontend...');
  execSync('cd frontend && npm run build', { stdio: 'inherit' });
  
  console.log('✅ Build completed successfully!');
  console.log('📁 Frontend built to: frontend/dist/');
  console.log('🔗 API entry point: api/index.js');
  
} catch (error) {
  console.error('❌ Build failed:', error.message);
  process.exit(1);
}
