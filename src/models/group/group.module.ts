import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MulterModule } from '@nestjs/platform-express';
import { FileModule } from '@providers/file.module';
import { FileService } from '@providers/file.service';
import { GroupController } from './group.controller';
import { GroupService } from './group.service';
import { AlternativePaymentModule } from '../alternativePayment/alternativePayment.module';
import { AwardModule } from '../award/award.module';
import { GroupMemberModule } from '../groupMember/groupMember.module';
import { HouseworkModule } from '../housework/housework.module';
import { RoutineModule } from '../routine/routine.module';
import { RuleModule } from '../rule/rule.module';
import Group from './entities';

@Module({
    imports: [
        ConfigModule,
        TypeOrmModule.forFeature([Group]),
        AlternativePaymentModule,
        AwardModule,
        GroupMemberModule,
        HouseworkModule,
        RoutineModule,
        RuleModule,
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
