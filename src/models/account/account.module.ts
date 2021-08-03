import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MulterModule } from '@nestjs/platform-express';
import { MailModule } from '@mails/mails.module';
import { FileService } from '@providers/file.service';
import { FileModule } from '@providers/file.module';
import { AccountController } from './account.controller';
import { AccountService } from './account.service';
import Account from './entities';

@Module({
    imports: [
        FileModule,
        MailModule,
        TypeOrmModule.forFeature([Account]),
        MulterModule.registerAsync({
            imports: [ConfigModule],
            useFactory: async (configService: ConfigService) => {
                return FileService.createMulterOptions(configService.get<string>('PATH_USER_IMAGE_PROFILE'));
            },
            inject: [ConfigService]
        }),
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
