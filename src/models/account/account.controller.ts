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
import * as bcrypt from 'bcrypt';
import { successMessageGenerator } from '../../common/lib';
import { failMessage } from '../../common/constants';
import { AccountService } from './account.service';
import { JwtStrategyGuard } from '../../auth/guards/jwt.guard';
import NicknameDto from './dto/nickname.dto';
import SearchQuery from './dto/search.query';
import NicknameUpdateDto from './dto/nicknameUpdate.dto';
import ProfileUpdateDto from './dto/profileUpdate.dto';
import PasswordUpdateDto from './dto/passwordUpdate.dto';

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

            await this.accountService.updateItemNickname({ id, nickname });

            return successMessageGenerator();
        } catch (err) {
            console.log(err);
            if (err instanceof HttpException) {
                throw err;
            }
            
            throw new HttpException(failMessage.ERR_INTERVER_SERVER, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @UseGuards(JwtStrategyGuard)
    @Patch('/me/profile')
    @HttpCode(200)
    async UpdateMyAccountInfoProfile(@Request() req, @Body() profileUpdateData: ProfileUpdateDto) {
        try {
            const { id } = req.user;
            const { profile } = profileUpdateData;

            await this.accountService.updateItemProfile({ id, profile });

            return successMessageGenerator();
        } catch (err) {
            console.log(err);
            if (err instanceof HttpException) {
                throw err;
            }
            
            throw new HttpException(failMessage.ERR_INTERVER_SERVER, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @UseGuards(JwtStrategyGuard)
    @Patch('/me/password')
    @HttpCode(200)
    async UpdateMyAccountPassword(@Request() req, @Body() passwordUpdateData: PasswordUpdateDto) {
        try {
            const { id } = req.user;
            const { oldPassword, newPassword } = passwordUpdateData;

            const account = await this.accountService.getActiveItem({ id });
            if (!(await bcrypt.compare(oldPassword, account.password))) {
                throw new HttpException(failMessage.ERR_NOT_VERIFIED, HttpStatus.CONFLICT);
            }

            await this.accountService.updateItemPassword({ id, password: newPassword });

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
