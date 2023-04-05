import { Config, Inject, Provide,Singleton } from '@midwayjs/core';
import { JwtService } from "@midwayjs/jwt";
import { BaseService } from './base.service';


@Provide()
@Singleton()
export class VerificationService extends BaseService {


  @Inject()
  jwtService: JwtService;

  @Config('jwt.secret')
  emailSecret: string;


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
      console.log("Email secret is: "+this.emailSecret);
        const pidString = (await this.jwtService.verify(jwtToken, this.emailSecret)).toString();
        const pid = parseInt(pidString, 10);
        await this.prisma.participant.update({
            where: {
                participant_id: pid,
            },
            data: {
                verified: true,
            }
        });
        return { success:true };
    } catch (err){
        console.log(err)
        return { success:false };
    }
    

  }


}
