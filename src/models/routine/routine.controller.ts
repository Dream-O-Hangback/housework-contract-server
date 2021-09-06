import {
    Controller,
    Get,
    HttpException,
    HttpStatus,
    UseGuards,
} from '@nestjs/common';
import { JwtStrategyGuard } from '@auth/guards/jwt.guard';
import { successMessageGenerator } from '@common/lib';
import { failMessage, ShareMethodType } from '@common/constants';

@Controller()
@UseGuards(JwtStrategyGuard)
export class RoutineController {
    constructor() {}

    @UseGuards(JwtStrategyGuard)
    @Get('/routine/share-method/types')
    async GetAwardType() {
        try {
            return successMessageGenerator(ShareMethodType);
        } catch (err) {
            console.log(err);
            if (err instanceof HttpException) {
                throw err;
            }
            
            throw new HttpException(failMessage.ERR_INTERVER_SERVER, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
