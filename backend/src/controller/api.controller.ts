import { Inject, Controller, Get, Query, Post, Body } from '@midwayjs/core';
import { Context } from '@midwayjs/koa';
import { UserService } from '../service/user.service';
import { EmailService } from '../service/mail.service';
import { TemplateManager } from '../template.manager';
import { AddParticipantRequest, EmailType } from '../interface';
import { listParticipant, addParticipant } from '../api/participant';

@Controller('/api')
export class APIController {
  @Inject()
  ctx: Context;

  @Inject()
  userService: UserService;

  @Inject()
  emailService: EmailService;

  @Inject()
  templateManager: TemplateManager;

  @Get('/get_user')
  async getUser(@Query('uid') uid) {
    const user = await this.userService.getUser({ uid });
    return { success: true, message: 'OK', data: user };
  }

  @Get('/participant')
  async getParticipant() {
    listParticipant().then(console.log);
    return { success: true, message: 'OK' };
  }

  @Post('/participant')
  async addParticipant(@Body() request: AddParticipantRequest) {
    addParticipant(request).then(console.log);
    return { success: true, message: 'OK' };
  }

  @Post('/send_mail')
  async sendMail() {
    const event = {
      to: 'hdqeing@gmail.com',
      subject: 'Gmail 测试邮件',
      html: await this.templateManager.getHtml(EmailType.TEST, {
        userName: 'He Dingqing',
      }),
    };
    //const result = await this.emailService.sendMail(event);
    return { success: true, message: 'OK', data: event.html };
  }
}
