import { MailerModule } from '@nest-modules/mailer';
import { Module } from '@nestjs/common';
import { MailService } from './mail.service';
import mailerConfig = require('../mailerconfig');

@Module({
  imports: [MailerModule.forRoot(mailerConfig)],
  providers: [MailService],
  exports: [MailService],
})
export class MailModule {}
