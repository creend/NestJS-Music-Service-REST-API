import { registerAs } from '@nestjs/config';

export default registerAs('mongoose', () => ({
  dbUrl: process.env.DB_URL,
}));
