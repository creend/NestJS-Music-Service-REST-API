import { registerAs } from '@nestjs/config';

export default registerAs('mongoose', () => ({
  uri: process.env.DB_URL,
  useCreateIndex: true,
  useNewUrlParser: true,
  useFindAndModify: false,
}));
