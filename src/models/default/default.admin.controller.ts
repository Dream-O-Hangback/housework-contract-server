import {
    Body,
    Controller,
    Post,
    Get,
    Patch,
    Delete,
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
import { Param } from '@nestjs/common';
import IdParams from './dto/id.params';

@Controller('admin/default')
@UseGuards(AdminGuard)
export class DefaultAdminController {
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

    @Patch('/group/types/:id')
    @HttpCode(200)
    async UpdateGroupType(@Param() params: IdParams, @Body() groupTypeUpdateData: TypeDto) {
        try {
            const { id } = params;
            const { title, displayTitle } = groupTypeUpdateData;

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

    @Patch('/alternative-payment/types/:id')
    @HttpCode(200)
    async UpdateAlternativePaymentType(@Param() params: IdParams, @Body() alternativePaymentTypeUpdateData: TypeDto) {
        try {
            const { id } = params;
            const { title, displayTitle } = alternativePaymentTypeUpdateData;

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

    @Patch('/housework/:id')
    @HttpCode(200)
    async UpdateHousework(@Param() params: IdParams, @Body() houseworkUpdateData: ContentDto) {
        try {
            const { id } = params;
            const { type, title, description } = houseworkUpdateData;

            await this.defaultService.updateDefaultHousework({ id, type, title, description });

            return successMessageGenerator(); 
        } catch (err) {
            console.log(err);
            if (err instanceof HttpException) {
                throw err;
            }
            
            throw new HttpException(failMessage.ERR_INTERVER_SERVER, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Patch('/awards/:id')
    @HttpCode(200)
    async UpdateAward(@Param() params: IdParams, @Body() awardUpdateData: ContentDto) {
        try {
            const { id } = params;
            const { type, title, description } = awardUpdateData;

            await this.defaultService.updateDefaultAward({ id, type, title, description });

            return successMessageGenerator(); 
        } catch (err) {
            console.log(err);
            if (err instanceof HttpException) {
                throw err;
            }
            
            throw new HttpException(failMessage.ERR_INTERVER_SERVER, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Delete('/group/types/:id')
    @HttpCode(200)
    async DeleteGroupType(@Param() params: IdParams) {
        try {
            const { id } = params;
            
            await this.defaultService.deleteDefaultGroupType({ id });

            return successMessageGenerator();
        } catch (err) {
            console.log(err);
            if (err instanceof HttpException) {
                throw err;
            }
            
            throw new HttpException(failMessage.ERR_INTERVER_SERVER, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Delete('/alternative-payment/types/:id')
    @HttpCode(200)
    async DeleteAlternativePaymentType(@Param() params: IdParams) {
        try {
            const { id } = params;

            await this.defaultService.deleteAlternativePaymentType({ id });

            return successMessageGenerator();
        } catch (err) {
            console.log(err);
            if (err instanceof HttpException) {
                throw err;
            }
            
            throw new HttpException(failMessage.ERR_INTERVER_SERVER, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Delete('/housework/:id')
    @HttpCode(200)
    async DeleteHousework(@Param() params: IdParams) {
        try {
            const { id } = params;

            await this.defaultService.deleteDefaultHousework({ id });

            return successMessageGenerator();
        } catch (err) {
            console.log(err);
            if (err instanceof HttpException) {
                throw err;
            }
            
            throw new HttpException(failMessage.ERR_INTERVER_SERVER, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Delete('/awards/:id')
    @HttpCode(200)
    async DeleteAward(@Param() params: IdParams) {
        try {
            const { id } = params;

            await this.defaultService.deleteDefaultAward({ id });

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
