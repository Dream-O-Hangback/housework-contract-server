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
    createDefaultAlternativePaymentType({ title, displayTitle }) {
        return this.defaultAlternativePaymentTypeRepository.save({ title, displayTitle });
    }
    getAllDefaultAlternativePaymentTypes() {
        return this.defaultAlternativePaymentTypeRepository.find();
    }
    createDefaultHousework({ type, title, description }) {
        return this.defaultHouseworkRepository.save({ type, title, description });
    }
    getAllDefaultHousework() {
        return this.defaultHouseworkRepository.find();
    }
    createDefaultAward({ type, title, description }) {
        return this.defaultAwardRepository.save({ type, title, description });
    }
    getAllDefaultAwards() {
        return this.defaultAwardRepository.find();
    }
}
