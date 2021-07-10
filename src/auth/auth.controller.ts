import {
    Body,
    Controller,
    Post,
    HttpException,
    HttpStatus,
    UseGuards,
    Request,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import successMessageGenerator from '../common/lib/successMessageGenerator';
import failMessage from '../common/constants/failMessage';
import AccountDto from './dto/account.dto';
import EmailDto from './dto/email.dto';
import CodeDto from './dto/code.dto';
import { AccountService } from '../models/account/account.service';
import { CertificationCodeService } from '../models/certificationCode/certificationCode.service';
// import { RefreshTokenService } from '../models/refreshToken/refreshToken.service';
import { MailService } from '../mails/mails.service';
import { LocalStrategyGuard } from './guards/local.guard';

@Controller('auth')
export class AuthController {
    constructor(
        private accountService: AccountService,
        private certificationCodeService: CertificationCodeService,
        // private refreshTokenService: RefreshTokenService,
        private mailService: MailService
    ) {
        this.accountService = accountService;
        this.certificationCodeService = certificationCodeService;
        // this.refreshTokenService = refreshTokenService;
        this.mailService = mailService;
    }

    @Post('/sign-up')
    async signUp(@Body() accountData: AccountDto): Promise<object> {
        try {
            const { email } = accountData;

            const account = await this.accountService.getActiveItemByEmail({ email });
            if (account) {
                throw new HttpException(failMessage.ERR_ALREADY_EXISTS, HttpStatus.CONFLICT);
            }

            await this.accountService.createItem(accountData);
            
            return successMessageGenerator();
        } catch (err) {
            console.log(err);
            if (err instanceof HttpException) {
                throw err;
            }
            
            throw new HttpException(failMessage.ERR_INTERVER_SERVER, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @UseGuards(LocalStrategyGuard)
    @Post('/login')
    async login(@Request() req) {
        return req.user;
    }

    @Post('/email-code')
    async sendEmailCode(@Body() emailData: EmailDto): Promise<object> {
        try {
            const { email } = emailData;

            const account = await this.accountService.getItemByEmail({ email });
            if (!account) {
                throw new HttpException(failMessage.ERR_NOT_FOUND, HttpStatus.NOT_FOUND);
            }

            const { id: accountId } = account;
            const certificationCode = await this.certificationCodeService.upsertItem({ accountId, email });
            const { code, createDate } = certificationCode;

            this.mailService.sendEmailCodeEmail({ email: emailData.email, code, generateDate: createDate }).catch((err) => console.log(err));
            
            return successMessageGenerator();
        } catch (err) {
            console.log(err);
            if (err instanceof HttpException) {
                throw err;
            }
            
            throw new HttpException(failMessage.ERR_INTERVER_SERVER, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Post('/email-verify')
    async verifyEmailCode(@Body() codeDto: CodeDto): Promise<object> {
        try {
            const certificationCode = await this.certificationCodeService.getItem(codeDto);
            if (!certificationCode) {
                throw new HttpException(failMessage.ERR_NOT_FOUND, HttpStatus.NOT_FOUND);
            }

            const { accountId } = certificationCode;

            const account = await this.accountService.updateItemActive({ id: accountId });
            if (account.affected === 0) {
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

    @Post('/email/exists')
    async CheckEmailDuplication(@Body() emailDto: EmailDto): Promise<object> {
        try {
            const isDuplicated = !!(await this.accountService.getItemByEmail(emailDto));
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
