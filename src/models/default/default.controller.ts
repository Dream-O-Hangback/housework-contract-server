import {
    Body,
    Controller,
    Post,
    HttpException,
    HttpStatus,
    HttpCode,
    UseGuards,
} from '@nestjs/common';
import { successMessageGenerator } from '../../common/lib';
import { failMessage } from '../../common/constants';
import { DefaultService } from './default.service';
import { AdminGuard } from '../../auth/guards/admin.guard';
import TypeDto from './dto/type.dto';
import ContentDto from './dto/content.dto';

@Controller('admin/default')
@UseGuards(AdminGuard)
export class DefaultController {
    constructor(private defaultService: DefaultService) {
        this.defaultService = defaultService;
    }

    @Post('/group/type')
    @HttpCode(200)
    async CreateGroupType(@Body() groupTypeData: TypeDto) {
        try {
            const { title, displayTitle } = groupTypeData;

            await this.defaultService.createDefaultGroupType({ title, displayTitle });

            return successMessageGenerator(); 
        } catch (err) {
            console.log(err);
            if (err instanceof HttpException) {
                throw err;
            }
            
            throw new HttpException(failMessage.ERR_INTERVER_SERVER, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Post('/alternative-payment/type')
    @HttpCode(200)
    async CreateAlternativePaymentType(@Body() alternativePaymentTypeData: TypeDto) {
        try {
            const { title, displayTitle } = alternativePaymentTypeData;

            await this.defaultService.createDefaultAlternativePaymentType({ title, displayTitle });

            return successMessageGenerator(); 
        } catch (err) {
            console.log(err);
            if (err instanceof HttpException) {
                throw err;
            }
            
            throw new HttpException(failMessage.ERR_INTERVER_SERVER, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Post('/housework')
    @HttpCode(200)
    async CreateHousework(@Body() houseworkData: ContentDto) {
        try {
            const { type, title, description } = houseworkData;

            await this.defaultService.createDefaultHousework({ type, title, description });

            return successMessageGenerator(); 
        } catch (err) {
            console.log(err);
            if (err instanceof HttpException) {
                throw err;
            }
            
            throw new HttpException(failMessage.ERR_INTERVER_SERVER, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
