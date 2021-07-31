import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MulterModule } from '@nestjs/platform-express';
import { FileService } from '../../providers/file.service';
import { AccountController } from './account.controller';
import { AccountService } from './account.service';
import Account from '../account/entities';

@Module({
    imports: [
        TypeOrmModule.forFeature([Account]),
        // MulterModule.registerAsync({
        //     useClass: FileService,
        //     // imports: [
        //     //     ConfigModule,
        //     //     FileService,
        //     // ],
        //     // useFactory: async (fileService: FileService, configService: ConfigService) => {
        //     //     return {
        //     //         // ...fileService.createMulterOptions(),
        //     //         storage: {
        //     //             key: (req: Express.Request, file: Express.Multer.File, cb: (error: Error | null, key: string) => void) => {
        //     //                 cb(null, `${configService.get<string>('PATH_USER_IMAGE_PROFILE')}/${req.user.id}-${Date.now()}${path.extname(file.originalname)}`);
        //     //             },
        //     //         },
        //     //     };
        //     // }
        // }),
    ],
    controllers: [AccountController],
    providers: [
        ConfigService,
        FileService,
        AccountService,
    ],
    exports: [AccountService],
})
export class AccountModule {}
