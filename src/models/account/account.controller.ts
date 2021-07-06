import {
    Body,
    Controller,
    Post,
    HttpException,
    HttpStatus,
} from '@nestjs/common';
import { AccountService } from './account.service';
import NicknameDto from './dto/nickname.dto';

@Controller('accounts')
export class AccountController {
    constructor(
        private accountService: AccountService
    ) {
        this.accountService = accountService;
    }

    @Post('/nickname-check')
    async CheckNicknameDuplication(@Body() nicknameDto: NicknameDto): Promise<object> {
        try {
            const isDuplicated = await this.accountService.getActiveAccountByNickname(nicknameDto);
            if (isDuplicated) {
                throw new HttpException({
                    message: 'fail',
                    errorCode: 'ERR_ALREADY_EXISTS',
                    description: '...'
                }, HttpStatus.BAD_REQUEST);
            }

            return { message: 'success' }; 
        } catch (err) {
            console.log(err);
            if (err instanceof HttpException) {
                throw err;
            }
            
            throw new HttpException({
                message: 'fail',
                errorCode: 'ERR_INTERVER_SERVER',
                description: '...'
            }, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
