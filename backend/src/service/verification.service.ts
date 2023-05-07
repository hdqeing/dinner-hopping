import { Config, Inject, Provide,Singleton } from '@midwayjs/core';
import { JwtService } from "@midwayjs/jwt";
import { prisma } from '../prisma'


@Provide()
@Singleton()
export class VerificationService {


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
        const jwtPayload = (await this.jwtService.decode(jwtToken));
        const pid = parseInt(jwtPayload['pid'], 10);
        await prisma.participant.update({
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
