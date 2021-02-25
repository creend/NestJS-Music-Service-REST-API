import { MailerService } from '@nest-modules/mailer';
import { Test, TestingModule } from '@nestjs/testing';
import { MailService } from './mail.service';
import mailerConfig = require('../mailerconfig');

describe('MailService', () => {
  let mailService: MailService;
  let mailerService: MailerService;

  beforeEach(() => {
    mailerService = new MailerService(mailerConfig);
    mailService = new MailService(mailerService);
  });

  it('should be defined', () => {
    expect(mailService).toBeDefined();
  });
});
