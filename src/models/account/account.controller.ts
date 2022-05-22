import {
    Body,
    Controller,
    Post,
    Get,
    Patch,
    Delete,
    HttpException,
    HttpStatus,
    Request,
    Query,
    UseGuards,
    UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import * as bcrypt from 'bcrypt';
import { JwtStrategyGuard } from '@auth/guards/jwt.guard';
import {
    successMessageGenerator,
    testPasswordRegex,
} from '@common/lib';
import { failMessage } from '@common/constants';
import { MailService } from '@mails/mails.service';
import { WithdrawService } from '@models/withdraw/withdraw.service';
import { AccountService } from './account.service';
import {
    BooleanUpdateDto,
    EmailDto,
    EmailQuery,
    NicknameDto,
    NicknameUpdateDto,
    PasswordUpdateDto,
    PasswordVerifyDto,
    ProfileUpdateDto,
    SearchQuery,
} from './dto';

@Controller('accounts')
export class AccountController {
    constructor(
        private accountService: AccountService,
        private withdrawService: WithdrawService,
        private mailService: MailService,
    ) {
        this.accountService = accountService;
        this.withdrawService = withdrawService;
        this.mailService = mailService;
    }

    @UseGuards(JwtStrategyGuard)
    @Get('/')
    async GetList(@Query() searchData: SearchQuery) {
        try {
            let { offset, limit } = searchData;
            const { search_word: searchWord } = searchData;

            offset = isNaN(offset) ? 0 : offset;
            limit = isNaN(limit) ? 10 : limit;

            const result = await this.accountService.getList({ searchWord, skip: offset * limit, take: limit });

            return successMessageGenerator(result); 
        } catch (err) {
            console.log(err);
            if (err instanceof HttpException) {
                throw err;
            }
            
            throw new HttpException(failMessage.ERR_INTERNAL_SERVER, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @UseGuards(JwtStrategyGuard)
    @Get('/me')
    async GetMyInformation(@Request() req) {
        try {
            const { id } = req.user;

            const result = await this.accountService.getInfo({ id });

            return successMessageGenerator(result);
        } catch (err) {
            console.log(err);
            if (err instanceof HttpException) {
                throw err;
            }
            
            throw new HttpException(failMessage.ERR_INTERNAL_SERVER, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @UseGuards(JwtStrategyGuard)
    @Post('/me/password/verify')
    async VerifyPassword(@Request() req, @Body() passwordDto: PasswordVerifyDto) {
        try {
            const { id } = req.user;
            const { password } = passwordDto;

            const account = await this.accountService.getActiveItem({ id });
            const isDuplicated = await bcrypt.compare(password, account.password);
            const isValid = testPasswordRegex(password);
            if (isDuplicated || !isValid) {
                throw new HttpException(failMessage.ERR_NOT_VERIFIED, HttpStatus.CONFLICT);
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

    @Post('/password/reset')
    async SendResetPasswordEmail(@Body() emailData: EmailDto) {
        try {
            const { email } = emailData;

            const doesExistAccount = await this.accountService.getItemByEmail({ email });
            if (!doesExistAccount) {
                throw new HttpException(failMessage.ERR_ACCOUNT_NOT_FOUND, HttpStatus.NOT_FOUND);
            }

            this.mailService.sendResetPassword(email).catch(err => console.log(err));

            return successMessageGenerator();
        } catch (err) {
            console.log(err);
            if (err instanceof HttpException) {
                throw err;
            }
            
            throw new HttpException(failMessage.ERR_INTERNAL_SERVER, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Get('/password/reset')
    async ResetPassword(@Query() emailData: EmailQuery) {
        try {
            const { email } = emailData;

            const account = await this.accountService.getItemByEmail({ email });
            if (!account) { // TODO: redirect to not found page
                throw new HttpException(failMessage.ERR_ACCOUNT_NOT_FOUND, HttpStatus.NOT_FOUND);
            }

            const { id } = account;

            const tempPassword = Math.random().toString(36).slice(-8);

            await this.accountService.updateItemPassword({ id, password: tempPassword });

            this.mailService.sendResetPasswordFinished(email, tempPassword).catch(err => console.log(err));

            return successMessageGenerator({ password: tempPassword }); // TODO: redirect to success page
        } catch (err) {
            // TODO: redirect to fail page
            console.log(err);
            if (err instanceof HttpException) {
                throw err;
            }
            
            throw new HttpException(failMessage.ERR_INTERNAL_SERVER, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @UseGuards(JwtStrategyGuard)
    @UseInterceptors(FileInterceptor('files'))
    @Post('/me/profile/upload')
    async UpdateMyProfileImage(@Request() req) {
        try {
            const { id } = req.user;

            const profileImageUrl = req.file.location;
            if (!profileImageUrl) {
                throw new HttpException(failMessage.ERR_NOT_UPLOADED, HttpStatus.BAD_REQUEST);
            }

            await this.accountService.updateItemProfileImage({ id, profileImageUrl });

            return successMessageGenerator({ profileImageUrl });
        } catch (err) {
            console.log(err);
            if (err instanceof HttpException) {
                throw err;
            }
            
            throw new HttpException(failMessage.ERR_INTERNAL_SERVER, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @UseGuards(JwtStrategyGuard)
    @Delete('/me/profile')
    async ResetMyProfileImage(@Request() req) {
        try {
            const { id } = req.user;

            await this.accountService.deleteItemProfileImage({ id });

            return successMessageGenerator();
        } catch (err) {
            console.log(err);
            if (err instanceof HttpException) {
                throw err;
            }
            
            throw new HttpException(failMessage.ERR_INTERNAL_SERVER, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @UseGuards(JwtStrategyGuard)
    @Patch('/me/profile')
    async UpdateMyProfile(@Request() req, @Body() profileUpdateData: ProfileUpdateDto) {
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
            
            throw new HttpException(failMessage.ERR_INTERNAL_SERVER, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @UseGuards(JwtStrategyGuard)
    @Patch('/me/nickname')
    async UpdateMyNickname(@Request() req, @Body() nicknameUpdateData: NicknameUpdateDto) {
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
            
            throw new HttpException(failMessage.ERR_INTERNAL_SERVER, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @UseGuards(JwtStrategyGuard)
    @Patch('/me/password')
    async UpdateMyPassword(@Request() req, @Body() passwordUpdateData: PasswordUpdateDto) {
        try {
            const { id } = req.user;
            const { oldPassword, newPassword } = passwordUpdateData;

            const account = await this.accountService.getActiveItem({ id });
            const isCorrectOldPassword = await bcrypt.compare(oldPassword, account.password);
            const isDuplicated = await bcrypt.compare(newPassword, account.password);
            const isValid = testPasswordRegex(newPassword);

            if (!isCorrectOldPassword || isDuplicated || !isValid) {
                throw new HttpException(failMessage.ERR_NOT_VERIFIED, HttpStatus.CONFLICT);
            }

            await this.accountService.updateItemPassword({ id, password: newPassword });

            return successMessageGenerator();
        } catch (err) {
            console.log(err);
            if (err instanceof HttpException) {
                throw err;
            }
            
            throw new HttpException(failMessage.ERR_INTERNAL_SERVER, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @UseGuards(JwtStrategyGuard)
    @Patch('/me/notifications')
    async UpdateNotificationOption(@Request() req, @Body() notificationOptionUpdateData: BooleanUpdateDto) {
        try {
            const { id } = req.user;
            const { value } = notificationOptionUpdateData;

            await this.accountService.updateItemNotificationOpen({ id, value });

            return successMessageGenerator();
        } catch (err) {
            console.log(err);
            if (err instanceof HttpException) {
                throw err;
            }
            
            throw new HttpException(failMessage.ERR_INTERNAL_SERVER, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @UseGuards(JwtStrategyGuard)
    @Patch('/me/email-notifications')
    async UpdateEmailNotificationOption(@Request() req, @Body() emailNotificationOptionUpdateData: BooleanUpdateDto) {
        try {
            const { id } = req.user;
            const { value } = emailNotificationOptionUpdateData;

            await this.accountService.updateItemEmailOpen({ id, value });

            return successMessageGenerator();
        } catch (err) {
            console.log(err);
            if (err instanceof HttpException) {
                throw err;
            }
            
            throw new HttpException(failMessage.ERR_INTERNAL_SERVER, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Get('/email-notifications/disable')
    async DisableEmailNotificationOption(@Query() emailData: EmailQuery) {
        try {
            const { email } = emailData;

            const doesExistAccount = await this.accountService.getItemByEmail({ email });
            if (!doesExistAccount) { // TODO: redirect to not found page
                throw new HttpException(failMessage.ERR_ACCOUNT_NOT_FOUND, HttpStatus.NOT_FOUND);
            }

            await this.accountService.updateItemEmailOpenByEmail({ email, value: false });

            return successMessageGenerator(); // TODO: redirect to success page
        } catch (err) {
            // TODO: redirect to fail page
            console.log(err);
            if (err instanceof HttpException) {
                throw err;
            }
            
            throw new HttpException(failMessage.ERR_INTERNAL_SERVER, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Post('/nickname/exists')
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
            
            throw new HttpException(failMessage.ERR_INTERNAL_SERVER, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @UseGuards(JwtStrategyGuard)
    @Delete('/me')
    async Withdraw(@Request() req) {
        try {
            const { id } = req.user;

            const account = await this.accountService.getActiveItem({ id });

            await this.withdrawService.createItem({ ...account });

            await this.accountService.deleteItem({ id });

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
