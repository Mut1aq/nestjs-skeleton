import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { checkNullability } from '@shared/util/check-nullability.util';
import { renderFile } from 'ejs';
import { createTransport, Transporter } from 'nodemailer';
import SMTPTransport from 'nodemailer/lib/smtp-transport';
import { CreateBulkMailDto } from './dto/create-bulk-mail.dto';
import { MailOptions } from './interfaces/mail-options.interface';

@Injectable()
export class MailsService {
  emailTransport?: Transporter<SMTPTransport.SentMessageInfo>;

  constructor(private readonly configService: ConfigService) {}

  logo = {
    filename: 'skeleton-logo.jpg',
    path: __dirname + '/templates/images/skeleton-logo.jpg',
    cid: 'skeleton-logo',
  };

  async sendBulkEmail(createBulkMailDto: CreateBulkMailDto) {
    const { body, priority, subject } = createBulkMailDto;
    const to = 'await this.usersHelperService.getEmails(emailSendOptions);';

    await this.sendEmail({
      to,
      fileName: 'bulk-email.ejs',
      priority,
      subject,
      data: { body },
    });
  }

  async welcomeToSkeleton(to: string, name: string) {
    await this.sendEmail({
      fileName: 'welcome.ejs',
      to,
      data: { name },
      priority: 'low',
      subject: 'Welcome to Eve',
    });
  }

  async forgetPassword(to: string, name: string, token: string) {
    await this.sendEmail({
      fileName: 'forget-password.ejs',
      to,
      data: {
        name,
        token,
        link: this.configService.get<string>('WEB_FRONT_URL'),
      },
      priority: 'high',
      subject: 'Forget Password',
    });
  }

  async sendEmail(mailOptions: MailOptions) {
    const { to, data, fileName, priority, subject } = mailOptions;

    const file = await renderFile(
      __dirname + '/templates/emails/' + fileName,
      data,
      {
        rmWhitespace: true,
      },
    );

    await this.transporter.sendMail({
      from: `Skeleton Team <${this.configService.get<string>('EMAIL_FROM')}>`,
      to,
      subject,
      attachments: [this.logo],
      html: file,
      sender: this.configService.get<string>('EMAIL_FROM'),
      priority,
    });
  }

  private get transporter(): Transporter<SMTPTransport.SentMessageInfo> {
    if (checkNullability(this.emailTransport)) {
      return this.emailTransport!;
    } else {
      this.emailTransport = createTransport({
        host: this.configService.get('EMAIL_HOST'),
        secure: false,
        port: 587,
        auth: {
          user: this.configService.get('EMAIL_USERNAME'),
          pass: this.configService.get('EMAIL_PASSWORD'),
        },
        tls: {
          rejectUnauthorized: false,
        },
      });
      return this.emailTransport;
    }
  }
}
