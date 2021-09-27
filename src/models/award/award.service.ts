import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import Award from './entities';

@Injectable()
export class AwardService {
    constructor(
        @InjectRepository(Award) private awardRepository: Repository<Award>,
    ) {
        this.awardRepository = awardRepository;
    }
    createItem({ groupId, type, title, description, defaultAwardId, includeContent }) {
        return this.awardRepository.save({ groupId, type, title, description, defaultAwardId, includeContent });
    }
    updateItem({ groupId, id, type, title, description, defaultAwardId, includeContent }) {
        return this.awardRepository.update({ groupId, id }, { type, title, description, defaultAwardId, includeContent });
    }
    deleteItem({ groupId, id }) {
        return this.awardRepository.update({ groupId, id }, { active: false });
    }
    async getList({ groupId }) {
        const [list, count] = await this.awardRepository.findAndCount({
            where: { groupId, active: true },
            order: { updateDate: -1 },
        });

        return { list, count };
    }
}
