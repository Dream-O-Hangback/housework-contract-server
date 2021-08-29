import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
    DefaultHousework,
    DefaultAward,
    DefaultAlternativePaymentType,
    DefaultGroupType,
} from './entities';

@Injectable()
export class DefaultService {
    constructor(
        @InjectRepository(DefaultHousework) private defaultHouseworkRepository: Repository<DefaultHousework>,
        @InjectRepository(DefaultAward) private defaultAwardRepository: Repository<DefaultAward>,
        @InjectRepository(DefaultAlternativePaymentType) private defaultAlternativePaymentTypeRepository: Repository<DefaultAlternativePaymentType>,
        @InjectRepository(DefaultGroupType) private defaultGroupTypeRepository: Repository<DefaultGroupType>,
    ) {
        this.defaultHouseworkRepository = defaultHouseworkRepository;
        this.defaultAwardRepository = defaultAwardRepository;
        this.defaultAlternativePaymentTypeRepository = defaultAlternativePaymentTypeRepository;
        this.defaultGroupTypeRepository = defaultGroupTypeRepository;
    }
    createDefaultGroupType({ title, displayTitle }) {
        return this.defaultGroupTypeRepository.save({ title, displayTitle });
    }
    getAllDefaultGroupTypes() {
        return this.defaultGroupTypeRepository.find({ order: { displayTitle: 1, createDate: -1 } });
    }
    getAllActiveDefaultGroupTypes() {
        return this.defaultGroupTypeRepository.find({
            where: { active: true },
            order: { displayTitle: 1, createDate: -1 },
        });
    }
    updateDefaultGroupType({ id, title, displayTitle }) {
        return this.defaultGroupTypeRepository.update({ id }, { title, displayTitle });
    }
    deleteDefaultGroupType({ id }) {
        return this.defaultGroupTypeRepository.update({ id }, { active: false });
    }
    createDefaultAlternativePaymentType({ title, displayTitle }) {
        return this.defaultAlternativePaymentTypeRepository.save({ title, displayTitle });
    }
    getAllDefaultAlternativePaymentTypes() {
        return this.defaultAlternativePaymentTypeRepository.find({ order: { displayTitle: 1, createDate: -1 } });
    }
    getAllActiveDefaultAlternativePaymentTypes() {
        return this.defaultAlternativePaymentTypeRepository.find({
            where: { active: true },
            order: {
                displayTitle: 1,
                createDate: -1,
            },
        });
    }
    updateDefaultAlternativePaymentType({ id, title, displayTitle }) {
        return this.defaultAlternativePaymentTypeRepository.update({ id }, { title, displayTitle });
    }
    deleteAlternativePaymentType({ id }) {
        return this.defaultAlternativePaymentTypeRepository.update({ id }, { active: false });
    }
    createDefaultHousework({ type, title, description }) {
        return this.defaultHouseworkRepository.save({ type, title, description });
    }
    getAllDefaultHousework() {
        return this.defaultHouseworkRepository.find({ order: { type: 1, title: 1 } });
    }
    getAllActiveDefaultHousework() {
        return this.defaultHouseworkRepository.find({
            where: { active: true },
            order: {
                type: 1,
                title: 1,
            },
        });
    }
    updateDefaultHousework({ id, type, title, description }) {
        return this.defaultHouseworkRepository.update({ id }, { type, title, description });
    }
    deleteDefaultHousework({ id }) {
        return this.defaultHouseworkRepository.update({ id }, { active: false });
    }
    createDefaultAward({ type, title, description }) {
        return this.defaultAwardRepository.save({ type, title, description });
    }
    getAllDefaultAwards() {
        return this.defaultAwardRepository.find({ order: { type: 1, title: 1 } });
    }
    getAllActiveDefaultAwards() {
        return this.defaultAwardRepository.find({
            where: { active: true },
            order: {
                type: 1,
                title: 1,
            },
        });
    }
    updateDefaultAward({ id, type, title, description }) {
        return this.defaultAwardRepository.update({ id }, { type, title, description });
    }
    deleteDefaultAward({ id }) {
        return this.defaultAwardRepository.update({ id }, { active: false });
    }
}
