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
    createItem({ accountId, groupId, nickname }) {
        return this.groupMemberRepository.save({ accountId, groupId, nickname });
    }
    getItemByNickname({ groupId, nickname }) {
        return this.groupMemberRepository.findOne({ groupId, nickname });
    }
    updateItemActive({ accountId, groupId, value }) {
        return this.groupMemberRepository.update({ accountId, groupId }, { active: value, updateDate: new Date() });
    }
    async getMyGroups({ accountId: id, skip, take }) {
        const [list, count] = await this.groupMemberRepository
            .createQueryBuilder('gm')
            .select([
                'gm.id',
                'gm.nickname',
                'gm.isManager',
                'gm.active',
                'gm.updateDate',
                'gm.createDate',
                'g.id',
                'g.type',
                'g.name',
                'g.logoImageUrl',
                'g.managerPermissionActive',
                'g.active',
                'g.lastInactivateDate',
                'g.createDate',
            ])
            .leftJoin('gm.groupId', 'g', 'gm.accountId = :id', { id })
            .skip(skip)
            .take(take)
            .getManyAndCount();
        
        return { list, count };
    }
}
