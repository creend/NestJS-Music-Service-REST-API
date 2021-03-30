import { PugAdapter } from '@nest-modules/mailer';

export = {
  // transport: 'smtp://admin123:admin456@localhost:2500',
  transport: {
    auth: {
      user: 'covalmichael23@gmail.com',
      pass: 'mikikaba',
    },
    service: 'gmail',
  },
  // tls: {
  // rejectUnauthorized: false,
  // },
  // service: 'gmail',
  template: {
    dir: './emails',
    adapter: new PugAdapter(),
    options: {
      strict: true,
    },
  },
};
