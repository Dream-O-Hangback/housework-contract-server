import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Routine } from './entities';

@Injectable()
export class RoutineService {
    constructor(
        @InjectRepository(Routine) private routineRepository: Repository<Routine>,
    ) {
        this.routineRepository = routineRepository;
    }
    createItem({ groupId, startDay, shareMethod }) {
        return this.routineRepository.save({ groupId, startDay, shareMethod });
    }
    getItem({ groupId }) {
        return this.routineRepository.findOne( groupId );
    }
    updateItem({ groupId, startDay, shareMethod, startDayLastValue, shareMethodLastValue }) {
        return this.routineRepository.update({ groupId }, { startDay, shareMethod, startDayLastValue, shareMethodLastValue });
    }
}
