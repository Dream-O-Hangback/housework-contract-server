import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GroupMemberService } from './groupMember.service';
import GroupMember from './entities';

@Module({
    imports: [
        ConfigModule,
        TypeOrmModule.forFeature([GroupMember]),
    ],
    controllers: [],
    providers: [GroupMemberService],
    exports: [GroupMemberService],
})
export class GroupMemberModule {}
