import { PugAdapter } from '@nest-modules/mailer';

export = {
  transport: 'smtp://admin123:admin456@localhost:2500',
  defaults: {
    from: 'admin@musicsranie.pl',
  },
  template: {
    dir: './emails',
    adapter: new PugAdapter(),
    options: {
      strict: true,
    },
  },
};
