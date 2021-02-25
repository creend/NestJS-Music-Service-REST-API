import { MailerService } from '@nest-modules/mailer';
import { Injectable } from '@nestjs/common';
import * as pug from 'pug';
import * as striptags from 'striptags';

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {}

  async sendMail(to: string, subject: string, html: string): Promise<void> {
    await this.mailerService.sendMail({
      to,
      subject,
      html,
    });
  }

  renederHtml(viewname: string, data?: unknown): string {
    const path = `src/emails/${viewname}.pug`;
    Object.keys(data).map((key) => {
      data[key] = striptags(data[key]);
    });
    return pug.renderFile(path, data);
  }
}
