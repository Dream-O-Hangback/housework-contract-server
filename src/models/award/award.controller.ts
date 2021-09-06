import {
    Controller,
    Get,
    HttpException,
    HttpStatus,
    UseGuards,
} from '@nestjs/common';
import { JwtStrategyGuard } from '@auth/guards/jwt.guard';
import { successMessageGenerator } from '@common/lib';
import { AwardType, failMessage } from '@common/constants';

@Controller()
@UseGuards(JwtStrategyGuard)
export class AwardController {
    constructor() {}

    @UseGuards(JwtStrategyGuard)
    @Get('/award/types')
    async GetAwardType() {
        try {
            return successMessageGenerator(AwardType);
        } catch (err) {
            console.log(err);
            if (err instanceof HttpException) {
                throw err;
            }
            
            throw new HttpException(failMessage.ERR_INTERVER_SERVER, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
