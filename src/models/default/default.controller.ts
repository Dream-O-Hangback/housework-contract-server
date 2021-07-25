import {
    Body,
    Controller,
    Post,
    Get,
    Patch,
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
import TypeUpdateDto from './dto/typeUpdate.dto';

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

    @Post('/award')
    @HttpCode(200)
    async CreateAward(@Body() awardData: ContentDto) {
        try {
            const { type, title, description } = awardData;

            await this.defaultService.createDefaultAward({ type, title, description });

            return successMessageGenerator(); 
        } catch (err) {
            console.log(err);
            if (err instanceof HttpException) {
                throw err;
            }
            
            throw new HttpException(failMessage.ERR_INTERVER_SERVER, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Get('/group/types')
    @HttpCode(200)
    async GetAllGroupTypes() {
        try {
            const list = await this.defaultService.getAllDefaultGroupTypes();

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
            const list = await this.defaultService.getAllDefaultAlternativePaymentTypes();

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
            const list = await this.defaultService.getAllDefaultHousework();

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
    @HttpCode(200)
    async GetAllAwards() {
        try {
            const list = await this.defaultService.getAllDefaultAwards();

            return successMessageGenerator({ list, count: list.length });
        } catch (err) {
            console.log(err);
            if (err instanceof HttpException) {
                throw err;
            }
            
            throw new HttpException(failMessage.ERR_INTERVER_SERVER, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Patch('/group/type')
    @HttpCode(200)
    async UpdateGroupType(@Body() groupTypeUpdateData: TypeUpdateDto) {
        try {
            const { id, title, displayTitle } = groupTypeUpdateData;

            await this.defaultService.updateDefaultGroupType({ id, title, displayTitle });

            return successMessageGenerator(); 
        } catch (err) {
            console.log(err);
            if (err instanceof HttpException) {
                throw err;
            }
            
            throw new HttpException(failMessage.ERR_INTERVER_SERVER, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Patch('/alternative-payment/type')
    @HttpCode(200)
    async UpdateAlternativePaymentType(@Body() alternativePaymentTypeUpdateData: TypeUpdateDto) {
        try {
            const { id, title, displayTitle } = alternativePaymentTypeUpdateData;

            await this.defaultService.updateDefaultAlternativePaymentType({ id, title, displayTitle });

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
