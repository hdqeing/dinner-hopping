import { Provide, Inject, Config, Init } from '@midwayjs/core';
import { SendMailEvent } from '../interface';
import { TemplateManager } from '../template.manager';
import { MailService } from '@sendgrid/mail';
import { InjectEntityModel } from '@midwayjs/typeorm';
import { Participant } from '../entity/participant.entity';
import { Repository } from 'typeorm';

@Provide()
export class EmailService {
  @Inject()
  templateManager: TemplateManager;

  @InjectEntityModel(Participant)
  participantModel: Repository<Participant>;

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

  async sendRegistrationSuccessEmail(pojo: Participant) {
    let title: string;
    let emailHtml: string;
    title = 'Successful Dinner Hopping registration for yourself';

    // Generate email html
    //emailHtml = await this.templateManager.getRegistrationSuccessHtml(pojo);
    emailHtml = "Love you";

    console.log(pojo.email);

    // Send mail to applicant
      await this.sendMail({
        to: pojo.email,
        subject: title,
        html: emailHtml,
      });
    }
    
}
