import { Provide, Config, Inject } from '@midwayjs/core';
import { createTransport } from 'nodemailer';
import { SendMailEvent, OAuthCredentials } from '../interface';
import { TokenManager } from '../token.manager';

@Provide()
export class EmailService {
  @Config('oauth2')
  credentials: OAuthCredentials;

  @Inject()
  tokenManager: TokenManager;

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
}
