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
    async createItem({ groupId, type, name, reason }) {
        return this.alternativePaymentRepository.save({ groupId, type, name, reason });
    }
}
