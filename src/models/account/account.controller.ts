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
    Response,
    Query,
    UseGuards,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';
import { successMessageGenerator } from '../../common/lib';
import { failMessage } from '../../common/constants';
import { FileService } from '../../providers/file.service';
import { AccountService } from './account.service';
import { JwtStrategyGuard } from '../../auth/guards/jwt.guard';
import NicknameDto from './dto/nickname.dto';
import SearchQuery from './dto/search.query';
import NicknameUpdateDto from './dto/nicknameUpdate.dto';
import ProfileUpdateDto from './dto/profileUpdate.dto';
import PasswordUpdateDto from './dto/passwordUpdate.dto';
import BooleanUpdateDto from './dto/booleanUpdate.dto';

@Controller('accounts')
export class AccountController {
    constructor(
        private accountService: AccountService,
        private configService: ConfigService,
        private fileService: FileService,
    ) {
        this.accountService = accountService;
        this.configService = configService;
        this.fileService = fileService;
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
    // @UseInterceptors(FileInterceptor(
    //     'files',
    //     {
    //         storage: multer.diskStorage({
    //             filename: (req, file, cb) => {
    //                 cb(null, `${req.user.id}-${Date.now()}${path.extname(file.originalname)}`);
    //             },
    //             destination: async (_req, _file, cb) => {
    //                 if (!(await fs.doesExist(`/tmp/image/`))) {
    //                     await fs.mkdir(`/tmp/image/`);
    //                 }
    //                 cb(null, `/tmp/image/`);
    //             },
    //         }),
    //     }
    // ))
    @Post('/me/profile/upload')
    @HttpCode(200)
    async UpdateMyAccountInfoProfileImage(@Request() req, /* @UploadedFile() file: Express.Multer.File, */ @Response() res) {
        try {
            const { id } = req.user;

            await this.fileService.uploadFile(req, res, this.configService.get<string>('PATH_USER_IMAGE_PROFILE'));

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

    @UseGuards(JwtStrategyGuard)
    @Patch('/me/notifications')
    @HttpCode(200)
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
            
            throw new HttpException(failMessage.ERR_INTERVER_SERVER, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @UseGuards(JwtStrategyGuard)
    @Patch('/me/email-notifications')
    @HttpCode(200)
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
