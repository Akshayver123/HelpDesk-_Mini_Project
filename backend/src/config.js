import dotenv from 'dotenv';
dotenv.config();

export const config = {
  port: process.env.PORT || 4000,
  jwtSecret: process.env.JWT_SECRET || 'dev_secret_change_in_production',
  uploadDir: process.env.UPLOAD_DIR || './uploads',
  nodeEnv: process.env.NODE_ENV || 'development',
};
