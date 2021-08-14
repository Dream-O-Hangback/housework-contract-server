import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MoreThan, Repository } from 'typeorm';
import { keyGenerator } from '@common/lib';
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
  getItemByAccountId({ accountId }) {
    return this.certificationCodeRepository.findOne({ accountId });
  }
  upsertItem({ accountId, email }) {
    const code = keyGenerator();
    const expireDate = new Date();
    expireDate.setDate(expireDate.getDate() + 1);

    return this.certificationCodeRepository
      .createQueryBuilder()
      .insert()
      .values({
        accountId,
        email,
        code,
        expireDate,
      })
      .orUpdate({ conflict_target: ['email'], overwrite: ['account_id', 'code', 'expire_date'] })
      .execute();
  }
}
