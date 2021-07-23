import {
    Body,
    Controller,
    Post,
    HttpException,
    HttpStatus,
    HttpCode,
} from '@nestjs/common';
import { successMessageGenerator } from '../../common/lib';
import { failMessage } from '../../common/constants';
import { AccountService } from './account.service';
import NicknameDto from './dto/nickname.dto';

@Controller('accounts')
export class AccountController {
    constructor(
        private accountService: AccountService
    ) {
        this.accountService = accountService;
    }

    @Post('/nickname/exists')
    @HttpCode(200)
    async CheckNicknameDuplication(@Body() nicknameData: NicknameDto): Promise<object> {
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
