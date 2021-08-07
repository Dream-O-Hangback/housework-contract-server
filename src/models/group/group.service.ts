import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import Group from './entities';

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
}
