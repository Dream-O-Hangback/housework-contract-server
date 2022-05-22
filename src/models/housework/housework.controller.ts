import {
    Controller,
    Get,
    Patch,
    Post,
    HttpException,
    HttpStatus,
    Request,
    UseGuards,
    Body,
    Param,
} from '@nestjs/common';
import { JwtStrategyGuard } from '@auth/guards/jwt.guard';
import { successMessageGenerator } from '@common/lib';
import { HouseworkType, failMessage } from '@common/constants';
import { HouseworkLogService } from '../houseworkLog/houseworkLog.service';
import {
    GroupIdParams,
    HouseworkProgressDto,
    ProgressIdParams,
} from './dto';

@Controller('housework')
@UseGuards(JwtStrategyGuard)
export class HouseworkController {
    constructor(private houseworkLogService: HouseworkLogService) {
        this.houseworkLogService = houseworkLogService;
    }

    @Get('/types')
    GetHouseworkType() {
        try {
            return successMessageGenerator(HouseworkType);
        } catch (err) {
            console.log(err);
            if (err instanceof HttpException) {
                throw err;
            }
            HouseworkType
            throw new HttpException(failMessage.ERR_INTERNAL_SERVER, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Post('/groups/:id/housework/progress')
    CreateHouseworkProgress(@Request() req, @Param() params: GroupIdParams, @Body() houseworkProgressDto: HouseworkProgressDto) {
        try {
            const { id } = req.user;
            const { id: groupId } = params;

            // TODO

            return successMessageGenerator();
        } catch (err) {
            console.log(err);
            if (err instanceof HttpException) {
                throw err;
            }
            
            throw new HttpException(failMessage.ERR_INTERNAL_SERVER, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Patch('/groups/:groupId/housework/progress/:id/complete')
    async CompleteHouseworkProgress(@Request() req, @Param() params: ProgressIdParams) {
        try {
            const { id: workerId } = req.user;
            const { groupId, id: progressId } = params;

            const result = await this.houseworkLogService.completeItem({ id: progressId, groupId, workerId });
            if (result.affected === 0) {
                throw new HttpException(failMessage.ERR_HOUSEWORK_PROGRESS_NOT_FOUND, HttpStatus.NOT_FOUND);
            }

            return successMessageGenerator();
        } catch (err) {
            console.log(err);
            if (err instanceof HttpException) {
                throw err;
            }
            
            throw new HttpException(failMessage.ERR_INTERNAL_SERVER, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Patch('/groups/:id/housework/progress/skip')
    async SkipHouseworkProgress(@Request() req, @Param() params: ProgressIdParams) {
        try {
            const { id: workerId } = req.user;
            const { groupId, id: progressId } = params;

            // TODO skip limit

            const result = await this.houseworkLogService.skipItem({ id: progressId, groupId, workerId });
            if (result.affected === 0) {
                throw new HttpException(failMessage.ERR_HOUSEWORK_PROGRESS_NOT_FOUND, HttpStatus.NOT_FOUND);
            }

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
