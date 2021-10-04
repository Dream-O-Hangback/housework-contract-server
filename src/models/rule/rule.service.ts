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
    async getList({ groupId }, { skip, take, all }) {
        const where: { groupId: string, active?: boolean } = { groupId };
        if (all === true) where.active = true

        const [list, count] = await this.ruleRepository.findAndCount({ where, order: { updateDate: -1 }, skip, take });

        return { list, count };
    }
    getItem({ id }) {
        return this.ruleRepository.findOne({ id, isConfirm: true, active: true });
    }
}
