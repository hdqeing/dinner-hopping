import { Api, Get, Post } from '@midwayjs/hooks';
import { prisma } from './prisma';
import { AddParticipantRequest } from '../interface';
import { participant } from '@prisma/client';

export const listParticipant = Api(Get(), async () => {
  const results = await prisma.participant.findMany({
    where: { verified: false },
    select: { applicant_name: true },
  });
  return results;
});

export const addParticipant = Api(
  Post(),
  async (request: AddParticipantRequest) => {
    const result = await prisma.participant.create({
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
    return result;
  }
);

export const getParticipantByEmail = async function (
  email: string
): Promise<participant> {
  const result: participant = await prisma.participant.findFirst({
    where: {
      applicant_email: email,
      is_deleted: false,
    },
  });
  return result;
};
