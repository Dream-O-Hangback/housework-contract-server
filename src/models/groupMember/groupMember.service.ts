import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import GroupMember from './entities';

@Injectable()
export class GroupMemberService {
    constructor(
        @InjectRepository(GroupMember) private groupMemberRepository: Repository<GroupMember>,
    ) {
        this.groupMemberRepository = groupMemberRepository;
    }
    createGroupMember({ accountId, groupId, nickname }) {
        return this.groupMemberRepository.save({ accountId, groupId, nickname });
    }
}
