import { Config, Inject, Provide,Singleton } from '@midwayjs/core';
import { JwtService } from "@midwayjs/jwt";
import { InjectEntityModel } from '@midwayjs/typeorm';
import { Participant } from '../entity/participant.entity';
import { Repository } from 'typeorm';



@Provide()
@Singleton()
export class VerificationService {


  @Inject()
  jwtService: JwtService;

  @Config('jwt.secret')
  emailSecret: string;

  @InjectEntityModel(Participant)
  participantModel: Repository<Participant>;



  /**
   * Create a jwt token.
   */
  async createToken(pid){
    return await this.jwtService.sign({ "pid": pid}, this.emailSecret, {expiresIn:"2 days"});
  }

  /**
   * Verify jwt token and change state of verified user.
   */
  async verifyEmail(jwtToken){
    try{
        const jwtPayload = (await this.jwtService.decode(jwtToken));
        const pid = parseInt(jwtPayload['pid'], 10);
        let participantToVerify = await this.participantModel.findOne({
            where: {
                id: pid,
            },
        });
        participantToVerify.isVerified = true;
        await this.participantModel.save(participantToVerify)

        return { success:true };
    } catch (err){
        console.log(err)
        return { success:false };
    }


  }


}
