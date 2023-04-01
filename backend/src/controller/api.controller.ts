import { Inject, Controller, Post, Body } from '@midwayjs/core';
import { Context } from '@midwayjs/koa';
import { EmailService } from '../service/mail.service';
import { AzureKeyVaultService } from '../service/azure.service';
import { TemplateManager } from '../template.manager';
import { AddParticipantRequest } from '../interface';
import { ParticipantService } from '../service/participant.service';

@Controller('/api')
export class APIController {
  @Inject()
  ctx: Context;

  @Inject()
  emailService: EmailService;

  @Inject()
  templateManager: TemplateManager;

  @Inject()
  participantService: ParticipantService;

  @Inject()
  keyVaultService: AzureKeyVaultService;

  @Post('/participant')
  async addParticipant(@Body() request: AddParticipantRequest) {
    await this.participantService.addParticipant(request);
    const participant = await this.participantService.getParticipantByEmail(
      request.email
    );
    await this.emailService.sendRegistrationSuccessEmail(participant);
    return { success: true, message: 'OK' };
  }
}
