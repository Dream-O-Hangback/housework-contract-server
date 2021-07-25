import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
    DefaultHousework,
    DefaultAward,
    DefaultAlternativePaymentType,
    DefaultGroupType,
} from '../default/entities';

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
        return this.defaultGroupTypeRepository.find();
    }
    getAllActiveDefaultGroupTypes() {
        return this.defaultGroupTypeRepository.find({ active: true });
    }
    updateDefaultGroupType({ id, title, displayTitle }) {
        return this.defaultGroupTypeRepository.update({ id }, { title, displayTitle });
    }
    createDefaultAlternativePaymentType({ title, displayTitle }) {
        return this.defaultAlternativePaymentTypeRepository.save({ title, displayTitle });
    }
    getAllDefaultAlternativePaymentTypes() {
        return this.defaultAlternativePaymentTypeRepository.find();
    }
    getAllActiveDefaultAlternativePaymentTypes() {
        return this.defaultAlternativePaymentTypeRepository.find({ active: true });
    }
    updateDefaultAlternativePaymentType({ id, title, displayTitle }) {
        return this.defaultAlternativePaymentTypeRepository.update({ id }, { title, displayTitle });
    }
    createDefaultHousework({ type, title, description }) {
        return this.defaultHouseworkRepository.save({ type, title, description });
    }
    getAllDefaultHousework() {
        return this.defaultHouseworkRepository.find();
    }
    getAllActiveDefaultHousework() {
        return this.defaultHouseworkRepository.find({ active: true });
    }
    updateDefaultHousework({ id, type, title, description }) {
        return this.defaultHouseworkRepository.update({ id }, { type, title, description });
    }
    createDefaultAward({ type, title, description }) {
        return this.defaultAwardRepository.save({ type, title, description });
    }
    getAllDefaultAwards() {
        return this.defaultAwardRepository.find();
    }
    getAllActiveDefaultAwards() {
        return this.defaultAwardRepository.find({ active: true });
    }
    updateDefaultAward({ id, type, title, description }) {
        return this.defaultAwardRepository.update({ id }, { type, title, description });
    }
}
