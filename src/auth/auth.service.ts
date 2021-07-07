import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MoreThan, Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { generateKey } from '../common/lib';
import Account from '../models/account/entities';
import CertificationCode from '../models/certificationCode/entities';
import RefreshToken from '../models/refreshToken/entities';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Account) private accountRepository: Repository<Account>,
    @InjectRepository(CertificationCode) private certificationCodeRepository: Repository<CertificationCode>,
    @InjectRepository(RefreshToken) private refreshTokenRepository: Repository<RefreshToken>,
  ) {
    this.accountRepository = accountRepository;
    this.certificationCodeRepository = certificationCodeRepository;
    this.refreshTokenRepository = refreshTokenRepository;
  }
  getActiveAccountByEmail({ email }) {
    return this.accountRepository.findOne({ email, active: true });
  }
  getAccountByEmail({ email }) {
    return this.accountRepository.findOne({ email });
  }
  async createAccount({
    email,
    name,
    password,
    nickname,
    profile,
    type,
    notificationOpen,
    emailOpen,
  }) {
    const hashedPassword = await bcrypt.hash(password, 10);
    const currentDate = new Date();

    return this.accountRepository.save({
      email,
      name,
      password: hashedPassword,
      nickname,
      profile,
      type,
      notificationOpen,
      emailOpen,
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
  getCeritificationCode({ email, code }) {
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
  createRefreshToken({ accountId, token, expireDate }) {
    return this.refreshTokenRepository.save({
      accountId,
      token,
      expireDate
    });
  }
  getRefreshToken({ accountId }) {
    return this.refreshTokenRepository.findOne({ accountId }, { select: ['token', 'expireDate'] });
  }
  updateRefreshToken({ accountId, newToken, expireDate }) {
    return this.refreshTokenRepository.update({ accountId }, { token: newToken, expireDate });
  }
  deleteRefreshToken({ accountId }) {
    return this.refreshTokenRepository.delete({ accountId });
  }
}
