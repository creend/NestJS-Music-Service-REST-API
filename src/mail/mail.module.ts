import { MailerModule, PugAdapter } from '@nest-modules/mailer';
import { Module } from '@nestjs/common';
import { MailService } from './mail.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import mailerConfig from 'src/config/mailer.config';

@Module({
  imports: [
    ConfigModule.forFeature(mailerConfig),
    MailerModule.forRootAsync({
      imports: [ConfigModule.forFeature(mailerConfig)],
      useFactory: async (configService: ConfigService) =>
        configService.get('mailer'),
      inject: [ConfigService],
    }),
  ],
  providers: [MailService],
  exports: [MailService],
})
export class MailModule {}
