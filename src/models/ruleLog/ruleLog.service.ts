import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import RuleLog from './entities';

@Injectable()
export class RuleLogService {
    constructor(
        @InjectRepository(RuleLog) private ruleLogRepository: Repository<RuleLog>,
    ) {
        this.ruleLogRepository = ruleLogRepository;
    }
    createItem({ groupId, ruleId, targetId, accuserId, reason }) {
        return this.ruleLogRepository.save({ groupId, ruleId, targetId, accuserId, reason });
    }
    cancelItem({ id, accuserId }) {
        return this.ruleLogRepository.update({ id, accuserId }, { isCancel: true });
    }
    getList({ groupId }) {
        return this.ruleLogRepository
            .createQueryBuilder('rlog')
            .select([
                'rlog.id',
                'rlog.reason',
                'rlog.isConfirm',
                'rlog.isCancel',
                'rlog.confirmDate',
                'rlog.createDate',
                'rule.id',
                'rule.groupId',
                'rule.content',
                'target.id',
                'target.nickname',
                // 'target.profileImageUrl',
                'accuser.id',
                'accuser.nickname',
                // 'accuser.profileImageUrl',
            ])
            .where({ groupId })
            .leftJoin('rlog.rule', 'rule')
            .leftJoin('rlog.target', 'target')
            .leftJoin('rlog.accuser', 'accuser')
            .orderBy('rlog.createDate', 'DESC')
            .getMany();
    }
    async getListByGroupMemberId({ groupId, groupMemberId }, { skip, take }) {
        const [list, count] = await this.ruleLogRepository
            .createQueryBuilder('rlog')
            .select([
                'rlog.id',
                'rlog.reason',
                'rlog.isConfirm',
                'rlog.isCancel',
                'rlog.confirmDate',
                'rlog.createDate',
                'rule.id',
                'rule.groupId',
                'rule.content',
                'target.id',
                'target.nickname',
                // 'target.profileImageUrl',
                'accuser.id',
                'accuser.nickname',
                // 'accuser.profileImageUrl',
            ])
            .where(`rlog.groupId = :groupId AND (rlog.targetId = :targetId OR rlog.accuserId = :accuserId)`, { groupId, targetId: groupMemberId, accuserId: groupMemberId })
            .skip(skip)
            .take(take)
            .leftJoin('rlog.rule', 'rule')
            .leftJoin('rlog.target', 'target')
            .leftJoin('rlog.accuser', 'accuser')
            .orderBy('rlog.createDate', 'DESC')
            .getManyAndCount();
        
        return { list, count };
    }
    getItem({ id, accuserId }) {
        return this.ruleLogRepository.findOne({ id, accuserId });
    }
}
