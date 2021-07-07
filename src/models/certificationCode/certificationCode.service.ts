import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MoreThan, Repository } from 'typeorm';
import { generateKey } from '../../common/lib';
import CertificationCode from './entities';

@Injectable()
export class CertificationCodeService {
  constructor(
    @InjectRepository(CertificationCode) private certificationCodeRepository: Repository<CertificationCode>,
  ) {
    this.certificationCodeRepository = certificationCodeRepository;
  }
  getItem({ email, code }) {
    return this.certificationCodeRepository.findOne({
      email,
      code,
      expireDate: MoreThan(new Date()),
    });
  }
  async upsertItem({ accountId, email }) {
    const code = generateKey();
    const expireDate = new Date();
    expireDate.setDate(expireDate.getDate() + 1);

    const duplicatedCertificationCode = await this.certificationCodeRepository.findOne({ email });
    
    if (duplicatedCertificationCode) {
      duplicatedCertificationCode.code = code;
      duplicatedCertificationCode.expireDate = expireDate;
      return this.certificationCodeRepository.save(duplicatedCertificationCode);
    }
    return this.certificationCodeRepository.save({
      accountId,
      email,
      code,
      expireDate,
    });
  }
}
