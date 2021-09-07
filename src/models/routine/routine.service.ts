import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Routine, RoutineFullCharge, RoutineRotation } from './entities';

@Injectable()
export class RoutineService {
    constructor(
        @InjectRepository(Routine) private routineRepository: Repository<Routine>,
        @InjectRepository(RoutineFullCharge) private routineFullChargeRepository: Repository<RoutineFullCharge>,
        @InjectRepository(RoutineRotation) private routineRotationRepository: Repository<RoutineRotation>,
    ) {
        this.routineRepository = routineRepository;
        this.routineFullChargeRepository = routineFullChargeRepository;
        this.routineRotationRepository = routineRotationRepository;
    }
    createItem({ groupId, startDay, shareMethod }) {
        return this.routineRepository.save({ groupId, startDay, shareMethod });
    }
    getItem({ groupId }) {
        return this.routineRepository.findOne({ groupId });
    }
    updateItem({ groupId, startDay, shareMethod, startDayLastValue, shareMethodLastValue }) {
        return this.routineRepository.update({ groupId }, { startDay, shareMethod, startDayLastValue, shareMethodLastValue });
    }
    createFullChargeItem({ groupId, groupMemberId, houseworkId, startDate }) {
        return this.routineFullChargeRepository.save({ groupId, groupMemberId, houseworkId, startDate });
    }
    async getFullChargeList({ groupId }) {
        const [list, count] = await this.routineFullChargeRepository.findAndCount({
            where: { groupId },
            order: { createDate: -1 }
        });

        return { list, count };
    }
    getFullChargeItem({ groupId, groupMemberId, houseworkId }) {
        return this.routineFullChargeRepository.findOne({ groupId, groupMemberId, houseworkId });
    }
    updateFullChargeItem({ groupId, id, endDate }) {
        return this.routineFullChargeRepository.update({ groupId, id }, { endDate });
    }
    deleteFullChargeItem({ groupId, id }) {
        return this.routineFullChargeRepository.delete({ groupId, id });
    }
    createRotationItem({ groupId, groupMemberId, houseworkId, cycle }) {
        return this.routineRotationRepository.save({ groupId, groupMemberId, houseworkId, cycle });
    }
}
