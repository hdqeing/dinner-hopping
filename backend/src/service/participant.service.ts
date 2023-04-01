import { Provide } from '@midwayjs/core'
import { AddParticipantRequest } from '../interface';
import { participant } from '@prisma/client';
import { BaseService } from './base.service';

@Provide()
export class ParticipantService extends BaseService {

  async listParticipant() {
    return await this.prisma.participant.findMany({
      where: { verified: false },
      select: { applicant_name: true },
    });
  }

  async addParticipant(request: AddParticipantRequest) {
    return await this.prisma.participant.create({
      data: {
        applicant_name: request.name,
        applicant_email: request.email,
        friend_name: request.friendName,
        friend_email: request.friendEmail,
        street: request.street,
        house_number: request.houseNumber,
        vegan: request.vegan,
        vegetarian: request.vegetarian,
        english_speaker: request.englishSpeaker,
        german_speaker: request.germanSpeaker,
        host: request.host,
        appetizer: request.appetizer,
        main_course: request.mainCourse,
        dessert: request.dessert,
        verified: false,
        paid: false,
      },
    });
  }

 async getParticipantByEmail(email: string): Promise<participant> {
    return await this.prisma.participant.findFirst({
      where: {
        applicant_email: email,
        is_deleted: false,
      },
    });
  };
}
