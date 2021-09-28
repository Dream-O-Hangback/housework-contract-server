import {
    Body,
    Controller,
    Headers,
    Post,
    HttpException,
    HttpStatus,
    UseGuards,
    Request,
} from '@nestjs/common';
import { successMessageGenerator } from '@common/lib';
import { failMessage } from '@common/constants';
import { MailService } from '@mails/mails.service';
import { AccountService } from '@models/account/account.service';
import { CertificationCodeService } from '@models/certificationCode/certificationCode.service';
import { AuthService } from './auth.service';
import { AccountDto, EmailDto, CodeDto } from './dto';
import { LocalStrategyGuard, JwtStrategyGuard } from './guards';

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
    async SignUp(@Body() accountData: AccountDto) {
        try {
            const { email } = accountData;

            const doesExistActiveAccount = await this.accountService.getActiveItemByEmail({ email });
            if (doesExistActiveAccount) {
                throw new HttpException(failMessage.ERR_ALREADY_EXISTS, HttpStatus.CONFLICT);
            }

            const doesExistAccount = await this.accountService.getItemByEmail({ email });
            if (doesExistAccount) {
                throw new HttpException(failMessage.ERR_ALREADY_CREATED, HttpStatus.CONFLICT);
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
    @Post('/sign-in')
    async SignIn(@Request() req) {
        try {
            if (!req.user) {
                throw new HttpException(failMessage.ERR_NOT_VERIFIED, HttpStatus.CONFLICT);
            }

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
    @Post('/sign-out')
    async SignOut(@Request() req) {
        try {
            await this.authService.resetRefreshToken(req.user)
            
            return successMessageGenerator();
        } catch (err) {
            console.log(err);
            if (err instanceof HttpException) {
                throw err;
            }
            
            throw new HttpException(failMessage.ERR_INTERVER_SERVER, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Post('/refresh-token')
    async ReissueAccessToken(@Headers('authorization') accessToken: string) {
        try {
            let payload = undefined;

            try {
                if (!accessToken) {
                    throw new HttpException(undefined, HttpStatus.UNAUTHORIZED);
                }

                payload = this.authService.verifyAccessToken(accessToken.replace('Bearer ', ''));
                if (!payload || !payload.id) {
                    throw new HttpException(undefined, HttpStatus.UNAUTHORIZED);
                }

                const account = await this.accountService.getActiveItem({ id: payload.id });
                if (!account) {
                    throw new HttpException(undefined, HttpStatus.UNAUTHORIZED);
                }
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

    @Post('/code')
    async SendCertificationCodeEmail(@Body() emailData: EmailDto) {
        try {
            const { email } = emailData;

            const account = await this.accountService.getItemByEmail({ email });
            if (!account) {
                throw new HttpException(failMessage.ERR_ACCOUNT_NOT_FOUND, HttpStatus.NOT_FOUND);
            }

            const { id: accountId } = account;
            await this.certificationCodeService.upsertItem({ accountId, email });
            const certificationCode = await this.certificationCodeService.getItemByAccountId({ accountId });
            const { code, createDate } = certificationCode;

            this.mailService.sendEmailCodeEmail(emailData.email, code, createDate).catch((err) => console.log(err));
            
            return successMessageGenerator();
        } catch (err) {
            console.log(err);
            if (err instanceof HttpException) {
                throw err;
            }
            
            throw new HttpException(failMessage.ERR_INTERVER_SERVER, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Post('/code-verify')
    async VerifyCerficationCode(@Body() codeDto: CodeDto) {
        try {
            const certificationCode = await this.certificationCodeService.getItem(codeDto);
            if (!certificationCode) {
                throw new HttpException(failMessage.ERR_NOT_FOUND, HttpStatus.NOT_FOUND);
            }

            const { accountId } = certificationCode;

            const result = await this.accountService.updateItemActive({ id: accountId });
            if (result.affected === 0) {
                throw new HttpException(failMessage.ERR_ACCOUNT_NOT_FOUND, HttpStatus.NOT_FOUND);
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
    async CheckEmailDuplication(@Body() emailDto: EmailDto) {
        try {
            const { email } = emailDto;

            const isDuplicated = !!(await this.accountService.getItemByEmail({ email }));
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
