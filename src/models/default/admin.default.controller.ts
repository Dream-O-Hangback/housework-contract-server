import {
    Body,
    Controller,
    Post,
    Get,
    Patch,
    Delete,
    HttpException,
    HttpStatus,
    UseGuards,
    Param,
} from '@nestjs/common';
import { AdminGuard } from '@auth/guards/admin.guard';
import { successMessageGenerator } from '@common/lib';
import { failMessage } from '@common/constants';
import { DefaultService } from './default.service';
import { ContentDto, IdParams, TypeDto } from './dto';

@Controller('admin/default')
@UseGuards(AdminGuard)
export class DefaultAdminController {
    constructor(private defaultService: DefaultService) {
        this.defaultService = defaultService;
    }

    @Post('/group/type')
    async CreateDefaultGroupType(@Body() groupTypeData: TypeDto) {
        try {
            const { title, displayTitle } = groupTypeData;

            await this.defaultService.createDefaultGroupType({ title, displayTitle });

            return successMessageGenerator(); 
        } catch (err) {
            console.log(err);
            if (err instanceof HttpException) {
                throw err;
            }
            
            throw new HttpException(failMessage.ERR_INTERNAL_SERVER, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Post('/alternative-payment/type')
    async CreateDefaultAlternativePaymentType(@Body() alternativePaymentTypeData: TypeDto) {
        try {
            const { title, displayTitle } = alternativePaymentTypeData;

            await this.defaultService.createDefaultAlternativePaymentType({ title, displayTitle });

            return successMessageGenerator(); 
        } catch (err) {
            console.log(err);
            if (err instanceof HttpException) {
                throw err;
            }
            
            throw new HttpException(failMessage.ERR_INTERNAL_SERVER, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Post('/housework')
    async CreateDefaultHousework(@Body() houseworkData: ContentDto) {
        try {
            const { type, title, description } = houseworkData;

            await this.defaultService.createDefaultHousework({ type, title, description });

            return successMessageGenerator(); 
        } catch (err) {
            console.log(err);
            if (err instanceof HttpException) {
                throw err;
            }
            
            throw new HttpException(failMessage.ERR_INTERNAL_SERVER, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Post('/award')
    async CreateDefaultAward(@Body() awardData: ContentDto) {
        try {
            const { type, title, description } = awardData;

            await this.defaultService.createDefaultAward({ type, title, description });

            return successMessageGenerator(); 
        } catch (err) {
            console.log(err);
            if (err instanceof HttpException) {
                throw err;
            }
            
            throw new HttpException(failMessage.ERR_INTERNAL_SERVER, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Get('/group/types')
    async GetAllDefaultGroupTypeList() {
        try {
            const list = await this.defaultService.getAllDefaultGroupTypes();

            return successMessageGenerator({ list, count: list.length });
        } catch (err) {
            console.log(err);
            if (err instanceof HttpException) {
                throw err;
            }
            
            throw new HttpException(failMessage.ERR_INTERNAL_SERVER, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Get('/alternative-payment/types')
    async GetAllDefaultAlternativePaymentTypeList() {
        try {
            const list = await this.defaultService.getAllDefaultAlternativePaymentTypes();

            return successMessageGenerator({ list, count: list.length });
        } catch (err) {
            console.log(err);
            if (err instanceof HttpException) {
                throw err;
            }
            
            throw new HttpException(failMessage.ERR_INTERNAL_SERVER, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Get('/housework')
    async GetAllDefaultHouseworkList() {
        try {
            const list = await this.defaultService.getAllDefaultHousework();

            return successMessageGenerator({ list, count: list.length });
        } catch (err) {
            console.log(err);
            if (err instanceof HttpException) {
                throw err;
            }
            
            throw new HttpException(failMessage.ERR_INTERNAL_SERVER, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Get('/awards')
    async GetAllDefaultAwardList() {
        try {
            const list = await this.defaultService.getAllDefaultAwards();

            return successMessageGenerator({ list, count: list.length });
        } catch (err) {
            console.log(err);
            if (err instanceof HttpException) {
                throw err;
            }
            
            throw new HttpException(failMessage.ERR_INTERNAL_SERVER, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Patch('/group/types/:id')
    async UpdateDefaultGroupType(@Param() params: IdParams, @Body() groupTypeUpdateData: TypeDto) {
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
            
            throw new HttpException(failMessage.ERR_INTERNAL_SERVER, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Patch('/alternative-payment/types/:id')
    async UpdateDefaultAlternativePaymentType(@Param() params: IdParams, @Body() alternativePaymentTypeUpdateData: TypeDto) {
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
            
            throw new HttpException(failMessage.ERR_INTERNAL_SERVER, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Patch('/housework/:id')
    async UpdateDefaultHousework(@Param() params: IdParams, @Body() houseworkUpdateData: ContentDto) {
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
            
            throw new HttpException(failMessage.ERR_INTERNAL_SERVER, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Patch('/awards/:id')
    async UpdateDefaultAward(@Param() params: IdParams, @Body() awardUpdateData: ContentDto) {
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
            
            throw new HttpException(failMessage.ERR_INTERNAL_SERVER, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Delete('/group/types/:id')
    async DeleteDefaultGroupType(@Param() params: IdParams) {
        try {
            const { id } = params;
            
            await this.defaultService.deleteDefaultGroupType({ id });

            return successMessageGenerator();
        } catch (err) {
            console.log(err);
            if (err instanceof HttpException) {
                throw err;
            }
            
            throw new HttpException(failMessage.ERR_INTERNAL_SERVER, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Delete('/alternative-payment/types/:id')
    async DeleteDefaultAlternativePaymentType(@Param() params: IdParams) {
        try {
            const { id } = params;

            await this.defaultService.deleteAlternativePaymentType({ id });

            return successMessageGenerator();
        } catch (err) {
            console.log(err);
            if (err instanceof HttpException) {
                throw err;
            }
            
            throw new HttpException(failMessage.ERR_INTERNAL_SERVER, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Delete('/housework/:id')
    async DeleteDefaultHousework(@Param() params: IdParams) {
        try {
            const { id } = params;

            await this.defaultService.deleteDefaultHousework({ id });

            return successMessageGenerator();
        } catch (err) {
            console.log(err);
            if (err instanceof HttpException) {
                throw err;
            }
            
            throw new HttpException(failMessage.ERR_INTERNAL_SERVER, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Delete('/awards/:id')
    async DeleteDefaultAward(@Param() params: IdParams) {
        try {
            const { id } = params;

            await this.defaultService.deleteDefaultAward({ id });

            return successMessageGenerator();
        } catch (err) {
            console.log(err);
            if (err instanceof HttpException) {
                throw err;
            }
            
            throw new HttpException(failMessage.ERR_INTERNAL_SERVER, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
