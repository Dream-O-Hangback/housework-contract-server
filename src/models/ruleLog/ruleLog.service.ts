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
}
