import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MoreThan, Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { generateKey } from '../common/lib';
import Account from '../models/account/entities';
import CertificationCode from '../models/certificationCode/entities';
import AccountDto from './dto/account.dto';
import CodeDto from './dto/code.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Account) private accountRepository: Repository<Account>,
    @InjectRepository(CertificationCode) private certificationCodeRepository: Repository<CertificationCode>,
  ) {
    this.accountRepository = accountRepository;
    this.certificationCodeRepository = certificationCodeRepository;
  }
  getActiveAccountByEmail({ email }) {
    return this.accountRepository.findOne({ email, active: true });
  }
  getAccountByEmail({ email }) {
    return this.accountRepository.findOne({ email });
  }
  async createAccount(accountDto: AccountDto) {
    const hashedPassword = await bcrypt.hash(accountDto.password, 10);
    const currentDate = new Date();

    return this.accountRepository.save({
      ...accountDto,
      password: hashedPassword,
      notificationOpenDate: currentDate,
      emailOpenDate: currentDate,
      lastUpdateDate: currentDate
    });
  }
  updateAccountActive({ id }) {
    return this.accountRepository.update({ id }, { active: true });
  }
  deleteAccount({ id }) {
    return this.accountRepository.delete({ id: id });
  }
  getCeritificationCode(codeDto: CodeDto) {
    const { email, code } = codeDto;

    return this.certificationCodeRepository.findOne({
      email,
      code,
      expireDate: MoreThan(new Date())
    });
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
