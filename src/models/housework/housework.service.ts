import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import Housework from './entities';

@Injectable()
export class HouseworkService {
    constructor(
        @InjectRepository(Housework) private houseworkRepository: Repository<Housework>,
    ) {
        this.houseworkRepository = houseworkRepository;
    }
    createItem({ groupId, type, title, description, deployCount, frequency }) {
        return this.houseworkRepository.save({ groupId, type, title, description, deployCount, frequency });
    }
    updateItem({ groupId, id, type, title, description, deployCount, frequency }) {
        return this.houseworkRepository.update({ groupId, id }, { type, title, description, deployCount, frequency });
    }
    deleteItem({ groupId, id }) {
        return this.houseworkRepository.update({ groupId, id }, { active: false });
    }
    async getList({ groupId }) {
        const [list, count] = await this.houseworkRepository.findAndCount({
            where: { groupId, active: true },
            order: { updateDate: -1 },
        });

        return { list, count };
    }
    getCount({ groupId }) {
        return this.houseworkRepository.count({ groupId, active: true });
    }
    getItem({ groupId, id }) {
        return this.houseworkRepository.findOne({ groupId, id });
    }
}
