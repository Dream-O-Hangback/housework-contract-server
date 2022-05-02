
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import HouseworkLog from './entities';

@Injectable()
export class HouseworkLogService {
  constructor(
    @InjectRepository(HouseworkLog) private houseworkLogRepository: Repository<HouseworkLog>,
  ) {
    this.houseworkLogRepository = houseworkLogRepository;
  }
  completeItem({ id, groupId, workerId }) {
    return this.houseworkLogRepository.update(
      { id, groupId, workerId },
      { isComplete: true, completeTime: new Date() }
    );
  }
  skipItem({ id, groupId, workerId }) {
    return this.houseworkLogRepository.update(
      { id, groupId, workerId },
      { isSkip: true }
    );
  }
}
