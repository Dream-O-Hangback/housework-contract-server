import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GroupController } from './group.controller';
import { GroupService } from './group.service';
import { GroupMemberModule } from '../groupMember/groupMember.module';
import Group from './entities';

@Module({
    imports: [
        ConfigModule,
        TypeOrmModule.forFeature([Group]),
        GroupMemberModule,
    ],
    controllers: [GroupController],
    providers: [GroupService],
})
export class GroupModule {}
