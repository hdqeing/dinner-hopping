import { Inject, Controller, Post, Body } from '@midwayjs/core';
import { Context } from '@midwayjs/koa';
import { EmailService } from '../service/mail.service';
import { TemplateManager } from '../template.manager';
import { AddParticipantRequest } from '../interface';
import { addParticipant, getParticipantByEmail } from '../api/participant';

@Controller('/api')
export class APIController {
  @Inject()
  ctx: Context;

  @Inject()
  emailService: EmailService;

  @Inject()
  templateManager: TemplateManager;

  @Post('/participant')
  async addParticipant(@Body() request: AddParticipantRequest) {
    await addParticipant(request);
    const participant = await getParticipantByEmail(request.email);
    await this.emailService.sendRegistrationSuccessEmail(participant);
    return { success: true, message: 'OK' };
  }
}
