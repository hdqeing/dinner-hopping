import { Provide } from '@midwayjs/core'
import { AddParticipantRequest } from '../interface';
import { InjectEntityModel } from '@midwayjs/typeorm';
import { Participant } from '../entity/participant.entity';
import { Repository } from 'typeorm';

@Provide()
export class ParticipantService {

  @InjectEntityModel(Participant)
  participantModel: Repository<Participant>;

  async addParticipant(request: AddParticipantRequest) {
    if (request.hasPartner){
      //create participant object
      let participant = new Participant();
      participant.name = request.name;
      participant.email = request.email;
      participant.phonenumber = request.phonenumber;
      participant.vegan = request.vegan;
      participant.vegetarian = request.vegetarian;
      participant.english_speaker = request.englishSpeaker;
      participant.german_speaker = request.germanSpeaker;
      participant.street = request.street;
      participant.house_number = request.houseNumber;
      participant.host = request.host;
      participant.appetizer= request.appetizer;
      participant.main_course= request.mainCourse;
      participant.dessert= request.dessert;
      participant.comment = request.comment;
      participant.isVerified = false;
      participant.isPaid = false;
      // save participant
      const participantResult = await this.participantModel.save(participant);

      // save success
      console.log('participant id = ', participantResult.id);

      //create partner participant object
      let partnerParticipant = new Participant();
      partnerParticipant.name = request.partnerName;
      partnerParticipant.email = request.partnerEmail;
      partnerParticipant.phonenumber = request.partnerPhonenumber;
      partnerParticipant.vegan = request.vegan;
      partnerParticipant.vegetarian = request.vegetarian;
      partnerParticipant.english_speaker = request.englishSpeaker;
      partnerParticipant.german_speaker = request.germanSpeaker;
      partnerParticipant.street = request.street;
      partnerParticipant.house_number = request.houseNumber;
      partnerParticipant.host = request.host;
      partnerParticipant.appetizer= request.appetizer;
      partnerParticipant.main_course= request.mainCourse;
      partnerParticipant.dessert= request.dessert;
      partnerParticipant.comment = request.comment;
      partnerParticipant.isVerified = false;
      partnerParticipant.isPaid = false;
      // save participant
      const partnerParticipantResult = await this.participantModel.save(partnerParticipant);

      // save success
      console.log('partner participant id = ', partnerParticipantResult.id);




    } else {
      // create one participant object
      let participant = new Participant();
      participant.name = request.name;
      participant.email = request.email;
      participant.phonenumber = request.phonenumber;
      participant.vegan = request.vegan;
      participant.vegetarian = request.vegetarian;
      participant.english_speaker = request.englishSpeaker;
      participant.german_speaker = request.germanSpeaker;
      participant.street = request.street;
      participant.house_number = request.houseNumber;
      participant.host = request.host;
      participant.appetizer= request.appetizer;
      participant.main_course= request.mainCourse;
      participant.dessert= request.dessert;
      participant.comment = request.comment;
      participant.isVerified = false;
      participant.isPaid = false;
      // save participant
      const participantResult = await this.participantModel.save(participant);

      // save success
      console.log('participant id = ', participantResult.id);
    }



  }


 async getParticipantByEmail(email: string) {
    return await this.participantModel.findOne({
      where: { email: email }
    });
    console.log("Find participant with email: ", email);
  };
}
