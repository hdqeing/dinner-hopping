import { Api, Get, Post } from '@midwayjs/hooks';
import { prisma } from './prisma';
import { AddParticipantRequest } from '../interface';

export const listParticipant = Api(Get(), async () => {
  const results = await prisma.participant.findMany({
    where: { verified: false },
    select: { name: true },
  });
  return results;
});

export const addParticipant = Api(
  Post(),
  async (request: AddParticipantRequest) => {
    const result = await prisma.participant.create({
      data: {
        name: request.name,
        email: request.email,
        vegan: request.vegan,
        vegetarian: request.vegetarian,
        englishSpeaker: request.englishSpeaker,
        germanSpeaker: request.germanSpeaker,
        host: request.host,
        appetizer: request.appetizer,
        mainCourse: request.mainCourse,
        dessert: request.dessert,
        verified: false,
        paid: false,
      },
    });
    return result;
  }
);
