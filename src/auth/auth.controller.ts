import {
    Body,
    Controller,
    Headers,
    Post,
    HttpException,
    HttpStatus,
    UseGuards,
    Request,
    HttpCode,
} from '@nestjs/common';
import { successMessageGenerator } from '../common/lib';
import { failMessage } from '../common/constants';
import AccountDto from './dto/account.dto';
import EmailDto from './dto/email.dto';
import CodeDto from './dto/code.dto';
import { AuthService } from './auth.service';
import { AccountService } from '../models/account/account.service';
import { CertificationCodeService } from '../models/certificationCode/certificationCode.service';
import { MailService } from '../mails/mails.service';
import { LocalStrategyGuard } from './guards/local.guard';
import { JwtStrategyGuard } from './guards/jwt.guard';

@Controller('auth')
export class AuthController {
    constructor(
        private authService: AuthService,
        private accountService: AccountService,
        private certificationCodeService: CertificationCodeService,
        private mailService: MailService,
    ) {
        this.authService = authService;
        this.accountService = accountService;
        this.certificationCodeService = certificationCodeService;
        this.mailService = mailService;
    }

    @Post('/sign-up')
    @HttpCode(200)
    async signUp(@Body() accountData: AccountDto) {
        try {
            const { email } = accountData;

            const doesExistsActiveAccount = await this.accountService.getActiveItemByEmail({ email });
            const doesExistsAccount = await this.accountService.getItemByEmail({ email });
            if (doesExistsActiveAccount) {
                throw new HttpException(failMessage.ERR_ALREADY_EXISTS, HttpStatus.CONFLICT);
            }
            if (doesExistsAccount) {
                throw new HttpException(failMessage.ERR_ALREADY_STARTED, HttpStatus.CONFLICT);
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
    @HttpCode(200)
    async login(@Request() req) {
        try {
            return successMessageGenerator(await this.authService.issueAccessToken(req.user));
        } catch (err) {
            console.log(err);
            if (err instanceof HttpException) {
                throw err;
            }
            
            throw new HttpException(failMessage.ERR_INTERVER_SERVER, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @UseGuards(JwtStrategyGuard)
    @Post('/logout')
    @HttpCode(200)
    async logout(@Request() req) {
        try {
            return successMessageGenerator(await this.authService.resetRefreshToken(req.user));
        } catch (err) {
            console.log(err);
            if (err instanceof HttpException) {
                throw err;
            }
            
            throw new HttpException(failMessage.ERR_INTERVER_SERVER, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Post('/refresh-token')
    @HttpCode(200)
    async reissueToken(@Headers('authorization') accessToken: string) {
        try {
            let payload = undefined;

            try {
                if (!accessToken) throw new Error();

                payload = this.authService.verifyAccessToken(accessToken.replace('Bearer ', ''));
                if (!payload || !payload.id) throw new Error();

                const account = await this.accountService.getItem({ id: payload.id });
                if (!account) throw new Error();
            } catch (err) {
                console.log(err);
                throw new HttpException(undefined, HttpStatus.UNAUTHORIZED);
            }
            
            return successMessageGenerator(await this.authService.issueAccessToken(payload));
        } catch (err) {
            console.log(err);
            if (err instanceof HttpException) {
                throw err;
            }
            
            throw new HttpException(failMessage.ERR_INTERVER_SERVER, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Post('/email-code')
    @HttpCode(200)
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
    @HttpCode(200)
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
    @HttpCode(200)
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
