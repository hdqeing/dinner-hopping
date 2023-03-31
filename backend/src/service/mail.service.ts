import { Provide, Config, Inject } from '@midwayjs/core';
import { participant } from '@prisma/client';
import { createTransport } from 'nodemailer';
import { SendMailEvent, OAuthCredentials } from '../interface';
import { TemplateManager } from '../template.manager';
import { TokenManager } from '../token.manager';

@Provide()
export class EmailService {
  @Config('oauth2')
  credentials: OAuthCredentials;

  @Inject()
  tokenManager: TokenManager;

  @Inject()
  templateManager: TemplateManager;

  constructor() {}

  async sendMail(event: SendMailEvent) {
    const transporter = createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        type: 'oauth2',
        user: this.credentials.user,
        clientId: this.credentials.clientId,
        clientSecret: this.credentials.clientSecret,
        refreshToken: this.credentials.refreshToken,
        accessToken: this.tokenManager.getAccessToken(),
      },
    });

    const options = {
      from: this.credentials.user,
      to: event.to,
      subject: event.subject,
      html: event.html,
    };

    return transporter.sendMail(options).then(transporter.close);
  }

  async sendRegistrationSuccessEmail(pojo: participant) {
    let title: string;
    let emailHtml: string;
    if (pojo.friend_name && pojo.friend_name !== '') {
      title = 'Successful Dinner Hopping registration for yourself';
    } else {
      title = 'Successful Dinner Hopping registration with your friend';
    }

    // Generate email html
    emailHtml = await this.templateManager.getRegistrationSuccessHtml(pojo);

    // Send mail to applicant
    if (pojo.applicant_email && pojo.applicant_email !== '') {
      await this.sendMail({
        to: pojo.applicant_email,
        subject: title,
        html: emailHtml,
      });
    }

    // Send mail to applicant's friend
    if (pojo.friend_email && pojo.friend_email !== '') {
      await this.sendMail({
        to: pojo.friend_email,
        subject: title,
        html: emailHtml,
      });
    }
  }
}
