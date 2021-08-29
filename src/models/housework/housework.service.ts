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
    createItem({ groupId, title, description, deployCount, frequency }) {
        return this.houseworkRepository.save({ groupId, title, description, deployCount, frequency });
    }
    updateItem({ groupId, id, title, description, deployCount, frequency }) {
        return this.houseworkRepository.update({ groupId, id }, { title, description, deployCount, frequency });
    }
    deleteItem({ groupId, id }) {
        return this.houseworkRepository.delete({ groupId, id });
    }
    async getList({ groupId }) {
        const [list, count] = await this.houseworkRepository.findAndCount({
            where: { groupId },
            order: { updateDate: -1 },
        });

        return { list, count };
    }
}
