import { MailerService } from '@nest-modules/mailer';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as pug from 'pug';
import * as striptags from 'striptags';

@Injectable()
export class MailService {
  constructor(
    private readonly mailerService: MailerService,
    private readonly configService: ConfigService,
  ) {}

  async sendMail(to: string, subject: string, html: string): Promise<void> {
    await this.mailerService.sendMail({
      to,
      subject,
      html,
    });
  }

  renederHtml(viewname: string, data?: unknown): string {
    const templateDir = this.configService.get('mailer.template.dir');
    const path = `${templateDir}/${viewname}.pug`;
    Object.keys(data).map((key) => {
      data[key] = striptags(data[key]);
    });
    return pug.renderFile(path, data);
  }
}
