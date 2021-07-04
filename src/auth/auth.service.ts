import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm/index';
import * as bcrypt from 'bcrypt';
import { generateKey } from '../common/lib';
import Account from '../models/account/entities';
import CertificationCode from '../models/certificationCode/entities';
import AccountDto from './dto/account.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Account) private accountRepository: Repository<Account>,
    @InjectRepository(CertificationCode) private certificationCodeRepository: Repository<CertificationCode>,
  ) {
    this.accountRepository = accountRepository;
    this.certificationCodeRepository = certificationCodeRepository;
  }
  getAccountByEmail({ email }) {
    return this.accountRepository.findOne({ email });
  }
  async createAccount(accountDto: AccountDto) {
    const hashedPassword = await bcrypt.hash('SeCrEtPaSsWoRd', 10);
    const currentDate = new Date();

    return this.accountRepository.save({
      ...accountDto,
      password: hashedPassword,
      notificationOpenDate: currentDate,
      emailOpenDate: currentDate,
      lastUpdateDate: currentDate
    });
  }
  deleteAccount({ id }) {
    return this.accountRepository.delete({ id: id });
  }
  async upsertCertificationCode({ accountId, email }) {
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
      expireDate
    });
  }
}
