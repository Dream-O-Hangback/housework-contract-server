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
    createItem({ groupId, content }) {
        return this.ruleRepository.save({ groupId, content });
    }
    updateItem({ groupId, id, content }) {
        return this.ruleRepository.update({ groupId, id }, { content });
    }
    deleteItem({ groupId, id }) {
        return this.ruleRepository.delete({ groupId, id });
    }
    async getList({ groupId }) {
        const [list, count] = await this.ruleRepository.findAndCount({ groupId });

        return { list, count };
    }
}
