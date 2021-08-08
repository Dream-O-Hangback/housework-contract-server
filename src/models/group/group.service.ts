import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import Group from './entities';
import { UpdateItemActiveQuery } from './interfaces';

@Injectable()
export class GroupService {
    constructor(
        @InjectRepository(Group) private groupRepository: Repository<Group>,
    ) {
        this.groupRepository = groupRepository;
    }
    createItem({ type, name, managerPermissionActive }) {
        return this.groupRepository.save({ type, name, managerPermissionActive });
    }
    getItem({ id }) {
        return this.groupRepository.findOne({ id });
    }
    getInfo({ id }) {
        return this.groupRepository.findOne({ id });
    }
    updateItem({ id, name, managerPermissionActive }) {
        return this.groupRepository.update({ id }, { name, managerPermissionActive });
    }
    updateItemActive({ id, active, lastInactivateReason }) {
        const updateQuery: UpdateItemActiveQuery = { active };
        if (!active) {
            updateQuery.lastInactivateReason = lastInactivateReason;
            updateQuery.lastInactivateDate = new Date();
        }
        
        return this.groupRepository.update({ id }, updateQuery);
    }
}
