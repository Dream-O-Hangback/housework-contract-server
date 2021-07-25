import {
    Body,
    Controller,
    Post,
    Get,
    Patch,
    HttpException,
    HttpStatus,
    HttpCode,
} from '@nestjs/common';
import { successMessageGenerator } from '../../common/lib';
import { failMessage } from '../../common/constants';
import { DefaultService } from './default.service';

@Controller('default')
export class DefaultController {
    constructor(private defaultService: DefaultService) {
        this.defaultService = defaultService;
    }

    @Get('/group/types')
    @HttpCode(200)
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
    @HttpCode(200)
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
    @HttpCode(200)
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
}
