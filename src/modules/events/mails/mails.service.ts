import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class MailsService {
  constructor(
    private readonly mailerService: MailerService,

    private readonly configService: ConfigService,
  ) {}

  logo = {
    filename: 'skeleton-logo.png',
    path: __dirname + '/templates/images/skeleton-logo.png',
    cid: 'skeleton-logo',
  };

  async forgetPasswordEmail(email: string, name: string, token: string) {
    return this.mailerService.sendMail({
      to: email,
      from: `Git3com Team <${this.configService.get<string>('EMAIL_FROM')}>`,
      subject: 'Forget Password',
      template: './forget-password.ejs',
      context: {
        name,
        token,
        link: this.configService.get<string>('WEB_FRONT_URL'),
      },
      attachments: [this.logo],
    });
  }
}
