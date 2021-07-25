import {
    Body,
    Controller,
    Post,
    Get,
    Patch,
    HttpException,
    HttpStatus,
    HttpCode,
    Request,
    Query,
    UseGuards,
} from '@nestjs/common';
import { successMessageGenerator } from '../../common/lib';
import { failMessage } from '../../common/constants';
import { AccountService } from './account.service';
import { JwtStrategyGuard } from '../../auth/guards/jwt.guard';
import NicknameDto from './dto/nickname.dto';
import SearchQuery from './dto/search.query';
import NicknameUpdateDto from './dto/nicknameUpdate.dto';

@Controller('accounts')
export class AccountController {
    constructor(
        private accountService: AccountService
    ) {
        this.accountService = accountService;
    }

    @UseGuards(JwtStrategyGuard)
    @Get('/')
    @HttpCode(200)
    async GetAccountList(@Query() searchData: SearchQuery) {
        try {
            let { offset, limit } = searchData;
            const { search_word: searchWord } = searchData;

            offset = isNaN(offset) ? 0 : offset;
            limit = isNaN(limit) ? 10 : limit;

            const list = await this.accountService.getList({ searchWord, skip: offset * limit, take: limit });

            return successMessageGenerator(list); 
        } catch (err) {
            console.log(err);
            if (err instanceof HttpException) {
                throw err;
            }
            
            throw new HttpException(failMessage.ERR_INTERVER_SERVER, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @UseGuards(JwtStrategyGuard)
    @Get('/me')
    @HttpCode(200)
    async GetMyAccountInfo(@Request() req) {
        try {
            const { id } = req.user;

            const result = await this.accountService.getInfo({ id });
            if (!result) {
                throw new HttpException(failMessage.ERR_NOT_FOUND, HttpStatus.NOT_FOUND);
            }

            return successMessageGenerator(result);
        } catch (err) {
            console.log(err);
            if (err instanceof HttpException) {
                throw err;
            }
            
            throw new HttpException(failMessage.ERR_INTERVER_SERVER, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @UseGuards(JwtStrategyGuard)
    @Patch('/me/nickname')
    @HttpCode(200)
    async UpdateMyAccountInfoNickname(@Request() req, @Body() nicknameUpdateData: NicknameUpdateDto) {
        try {
            const { id } = req.user;
            const { nickname } = nicknameUpdateData;

            const isDuplicated = !!(await this.accountService.getItemByNickname({ nickname }));
            if (isDuplicated) {
                throw new HttpException(failMessage.ERR_ALREADY_EXISTS, HttpStatus.CONFLICT);
            }

            const result = await this.accountService.updateItemNickname({ id, nickname });
            if (result.affected === 0) {
                throw new HttpException(failMessage.ERR_NOT_FOUND, HttpStatus.NOT_FOUND);
            }

            return successMessageGenerator();
        } catch (err) {
            console.log(err);
            if (err instanceof HttpException) {
                throw err;
            }
            
            throw new HttpException(failMessage.ERR_INTERVER_SERVER, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Post('/nickname/exists')
    @HttpCode(200)
    async CheckNicknameDuplication(@Body() nicknameData: NicknameDto) {
        try {
            const { nickname } = nicknameData;

            const isDuplicated = !!(await this.accountService.getItemByNickname({ nickname }));
            if (isDuplicated) {
                throw new HttpException(failMessage.ERR_ALREADY_EXISTS, HttpStatus.CONFLICT);
            }

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
