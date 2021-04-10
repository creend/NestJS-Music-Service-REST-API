import { PugAdapter } from '@nest-modules/mailer';
import { registerAs } from '@nestjs/config';

export default registerAs('mailer', () => ({
  transport: {
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD,
    },
    service: 'gmail',
  },
  template: {
    dir: '../emails',
    adapter: new PugAdapter(),
    options: {
      strict: true,
    },
  },
}));
