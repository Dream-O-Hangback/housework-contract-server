import {
    Controller,
    Get,
    HttpException,
    HttpStatus,
    UseGuards,
} from '@nestjs/common';
import { JwtStrategyGuard } from '@auth/guards/jwt.guard';
import { successMessageGenerator } from '@common/lib';
import { failMessage } from '@common/constants';
import { DefaultService } from './default.service';

@Controller('default')
@UseGuards(JwtStrategyGuard)
export class DefaultController {
    constructor(private defaultService: DefaultService) {
        this.defaultService = defaultService;
    }

    @Get('/group/types')
    async GetAllGroupTypes() {
        try {
            const list = await this.defaultService.getAllActiveDefaultGroupTypes();

            return successMessageGenerator({ list, count: list.length });
        } catch (err) {
            console.log(err);
            if (err instanceof HttpException) {
                throw err;
            }
            
            throw new HttpException(failMessage.ERR_INTERVER_SERVER, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Get('/alternative-payment/types')
    async GetAllAlternativePaymentTypes() {
        try {
            const list = await this.defaultService.getAllActiveDefaultAlternativePaymentTypes();

            return successMessageGenerator({ list, count: list.length });
        } catch (err) {
            console.log(err);
            if (err instanceof HttpException) {
                throw err;
            }
            
            throw new HttpException(failMessage.ERR_INTERVER_SERVER, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Get('/housework')
    async GetAllHousework() {
        try {
            const list = await this.defaultService.getAllActiveDefaultHousework();

            return successMessageGenerator({ list, count: list.length });
        } catch (err) {
            console.log(err);
            if (err instanceof HttpException) {
                throw err;
            }
            
            throw new HttpException(failMessage.ERR_INTERVER_SERVER, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Get('/awards')
    async GetAllAwards() {
        try {
            const list = await this.defaultService.getAllActiveDefaultAwards();

            return successMessageGenerator({ list, count: list.length });
        } catch (err) {
            console.log(err);
            if (err instanceof HttpException) {
                throw err;
            }
            
            throw new HttpException(failMessage.ERR_INTERVER_SERVER, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
