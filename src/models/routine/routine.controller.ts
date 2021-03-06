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

@Controller('routines')
@UseGuards(JwtStrategyGuard)
export class RoutineController {
    constructor() {}

    @Get('/share-method/types')
    async GetRoutineShareMethodType() {
        try {
            return successMessageGenerator(ShareMethodType);
        } catch (err) {
            console.log(err);
            if (err instanceof HttpException) {
                throw err;
            }
            
            throw new HttpException(failMessage.ERR_INTERNAL_SERVER, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
