import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import Rule from './entities';

@Injectable()
export class RuleService {
    constructor(
        @InjectRepository(Rule) private ruleRepository: Repository<Rule>,
    ) {
        this.ruleRepository = ruleRepository;
    }
    createItem({ groupId, content, createDate }) {
        return this.ruleRepository.save({ groupId, content, createDate });
    }
    updateItem({ groupId, id, content }) {
        return this.ruleRepository.update({ groupId, id }, { content });
    }
    deleteItem({ groupId, id }) {
        return this.ruleRepository.update({ groupId, id }, { active: false });
    }
    async getList({ groupId }) {
        const [list, count] = await this.ruleRepository.findAndCount({
            where: { groupId, active: true },
            order: { updateDate: -1 }
        });

        return { list, count };
    }
}
