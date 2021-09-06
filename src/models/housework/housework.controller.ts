import {
    Controller,
    Get,
    HttpException,
    HttpStatus,
    UseGuards,
} from '@nestjs/common';
import { JwtStrategyGuard } from '@auth/guards/jwt.guard';
import { successMessageGenerator } from '@common/lib';
import { HouseworkType, failMessage } from '@common/constants';

@Controller('housework')
@UseGuards(JwtStrategyGuard)
export class HouseworkController {
    constructor() {}

    @Get('/types')
    async GetHouseworkType() {
        try {
            return successMessageGenerator(HouseworkType);
        } catch (err) {
            console.log(err);
            if (err instanceof HttpException) {
                throw err;
            }
            
            throw new HttpException(failMessage.ERR_INTERVER_SERVER, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
