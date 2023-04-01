import { Provide, Inject, Config, Init } from '@midwayjs/core';
import { participant } from '@prisma/client';
import { SendMailEvent } from '../interface';
import { TemplateManager } from '../template.manager';
import { MailService } from '@sendgrid/mail';

@Provide()
export class EmailService {
  @Inject()
  templateManager: TemplateManager;

  @Config('sendgrid.apiKey')
  apiKey: string;

  @Config('sendgrid.sender')
  sender: string;

  sendgridMailClient: MailService;

  constructor() {
    this.sendgridMailClient = new MailService();
  }

  @Init()
  async init() {
    this.sendgridMailClient.setApiKey(this.apiKey);
  }

  async sendMail(event: SendMailEvent) {
    const options = {
      from: this.sender,
      to: event.to,
      subject: event.subject,
      html: event.html,
    };

    return this.sendgridMailClient.send(options);
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
