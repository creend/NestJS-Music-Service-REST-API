import { MailerModule, PugAdapter } from '@nest-modules/mailer';
import { Module } from '@nestjs/common';
import { MailService } from './mail.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: '.env' }),
    MailerModule.forRoot({
      transport: {
        auth: {
          user: process.env.EMAIL,
          pass: process.env.PASSWORD,
        },
        service: 'gmail',
      },
      template: {
        dir: './emails',
        adapter: new PugAdapter(),
        options: {
          strict: true,
        },
      },
    }),
  ],
  providers: [MailService],
  exports: [MailService],
})
export class MailModule {}
console.log(process.env.EMAIL);
console.log(process.env.PASSWORD);
