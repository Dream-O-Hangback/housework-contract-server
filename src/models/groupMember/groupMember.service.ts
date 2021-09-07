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
    createItem({ accountId, groupId, nickname, isManager }) {
        return this.groupMemberRepository.save({ accountId, groupId, nickname, isManager });
    }
    getListByGroupId({ groupId }) {
        return this.groupMemberRepository.find({ groupId });
    }
    getGroupMemberListAndGroupInfo({ groupId }) {
        return this.groupMemberRepository
            .createQueryBuilder('gm')
            .select([
                'gm.id',
                'gm.groupId',
                'gm.nickname',
                'gm.isManager',
                'a.id',
                'a.profileImageUrl',
            ])
            .where({ groupId })
            .leftJoin('gm.account', 'a')
            .orderBy('gm.updateDate', 'DESC')
            .getMany();
    }
    getInfoByAccountId({ groupId, accountId }) {
        return this.groupMemberRepository
            .createQueryBuilder('gm')
            .select([
                'gm.selectAwardId',
                'gm.nickname',
                'gm.isManager',
                'gm.active',
                'gm.updateDate',
                'gm.createDate',
                'a.id',
                'a.type',
                'a.title',
                'a.description',
                'a.defaultAwardId',
                'a.includeContent',
            ])
            .where({ groupId, accountId })
            .leftJoin('gm.selectAward', 'a')
            .getOne();
    }
    getItem({ groupId, id }) {
        return this.groupMemberRepository.findOne({ groupId, id });
    }
    getItemByAccountId({ groupId, accountId }) {
        return this.groupMemberRepository.findOne({ groupId, accountId });
    }
    getItemByNickname({ groupId, nickname }) {
        return this.groupMemberRepository.findOne({ groupId, nickname });
    }
    updateItem({ accountId, groupId, selectAwardId }) {
        return this.groupMemberRepository.update({ accountId, groupId }, { selectAwardId, updateDate: new Date() });
    }
    updateItemActive({ accountId, groupId, value }) {
        return this.groupMemberRepository.update({ accountId, groupId }, { active: value, updateDate: new Date() });
    }
    updateItemNickname({ accountId, groupId, nickname }) {
        return this.groupMemberRepository.update({ accountId, groupId }, { nickname, updateDate: new Date() });
    }
    async getMyGroups({ accountId, skip, take }) {
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
            .where({ accountId })
            .leftJoin('gm.group', 'g')
            .orderBy('gm.updateDate', 'DESC')
            .skip(skip)
            .take(take)
            .getManyAndCount();
        
        return { list, count };
    }
    deleteItemByAccountId({ groupId, accountId }) {
        return this.groupMemberRepository.delete({ groupId, accountId, isManager: false });
    }
}
