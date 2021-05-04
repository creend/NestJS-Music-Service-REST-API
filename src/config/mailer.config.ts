import { PugAdapter } from '@nest-modules/mailer';
import { registerAs } from '@nestjs/config';

export default registerAs('mailer', () => ({
  transport: {
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD,
    },
    service: process.env.MAIL_SERVICE,
  },
  template: {
    dir: process.env.TEMPLATE_DIRECTORY_PATH,
    adapter: new PugAdapter(),
    options: {
      strict: true,
    },
  },
}));
