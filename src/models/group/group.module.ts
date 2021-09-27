import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MulterModule } from '@nestjs/platform-express';
import { FileModule } from '@providers/file.module';
import { FileService } from '@providers/file.service';
import { AlternativePaymentModule } from '@models/alternativePayment/alternativePayment.module';
import { AwardModule } from '@models/award/award.module';
import { GroupMemberModule } from '@models/groupMember/groupMember.module';
import { HouseworkModule } from '@models/housework/housework.module';
import { RoutineModule } from '@models/routine/routine.module';
import { RuleModule } from '@models/rule/rule.module';
import { RuleLogModule } from '@models/ruleLog/ruleLog.module';
import { GroupController } from './group.controller';
import { GroupService } from './group.service';
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
        RuleLogModule,
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
