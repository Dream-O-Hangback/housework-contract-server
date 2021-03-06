import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import AlternativePayment from './entities';

@Injectable()
export class AlternativePaymentService {
    constructor(
        @InjectRepository(AlternativePayment) private alternativePaymentRepository: Repository<AlternativePayment>,
    ) {
        this.alternativePaymentRepository = alternativePaymentRepository;
    }
    createItem({ groupId, type, name, reason }) {
        return this.alternativePaymentRepository.save({ groupId, type, name, reason });
    }
    updateItem({ groupId, id, type, name, reason }) {
        return this.alternativePaymentRepository.update({ groupId, id }, { type, name, reason });
    }
    deleteItem({ groupId, id }) {
        return this.alternativePaymentRepository.update({ groupId, id }, { active: false });
    }
    async getList({ groupId }) {
        const [list, count] = await this.alternativePaymentRepository.findAndCount({
            where: { groupId, active: true },
            order: { updateDate: -1 },
        });

        return { list, count };
    }
}
