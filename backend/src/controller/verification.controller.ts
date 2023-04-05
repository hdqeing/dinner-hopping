import { Controller, Get, Query } from "@midwayjs/core";
import { Inject} from "@midwayjs/core";
import { VerificationService } from "../service/verification.service";

@Controller('/api')
export class VerificationController{

    @Inject()
    verificationService: VerificationService;

    @Get('/verification')
    async verify(@Query('jwt') verificationToken: string){
        const feedback = await this.verificationService.verifyEmail(verificationToken);
        return feedback;
    }
}