import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MulterModule } from '@nestjs/platform-express';
import { AlternativePaymentModule } from '@models/alternativePayment/alternativePayment.module';
import { FileModule } from '@providers/file.module';
import { FileService } from '@providers/file.service';
import { GroupController } from './group.controller';
import { GroupService } from './group.service';
import { GroupMemberModule } from '../groupMember/groupMember.module';
import Group from './entities';

@Module({
    imports: [
        ConfigModule,
        TypeOrmModule.forFeature([Group]),
        AlternativePaymentModule,
        GroupMemberModule,
        FileModule,
        MulterModule.registerAsync({
            imports: [ConfigModule],
            useFactory: async (configService: ConfigService) => {
                return FileService.createMulterOptions(configService.get<string>('PATH_GROUP_IMAGE_LOGO'));
            },
            inject: [ConfigService]
        }),
    ],
    controllers: [GroupController],
    providers: [GroupService],
})
export class GroupModule {}
