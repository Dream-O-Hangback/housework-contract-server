import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm/index';
import * as bcrypt from 'bcrypt';
import { generateKey } from '../common/lib';
import Account from '../models/account/entities';
import CertificationCode from '../models/certificationCode/entities';
import AccountDto from './dto/account.dto';
import EmailCodeDto from './dto/emailCode.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Account) private accountRepository: Repository<Account>,
    @InjectRepository(CertificationCode) private certificationCodeRepository: Repository<CertificationCode>,
  ) {
    this.accountRepository = accountRepository;
    this.certificationCodeRepository = certificationCodeRepository;
  }
  findAccountList() {
    return this.accountRepository.find();
  }
  findAccount(id: string) {
    return this.accountRepository.findOne({ id: id });
  }
  async saveAccount(accountDto: AccountDto) {
    const hashedPassword = await bcrypt.hash('SeCrEtPaSsWoRd', 10);

    return this.accountRepository.save({ ...accountDto, password: hashedPassword });
  }
  deleteAccount(id: string) {
    return this.accountRepository.delete({ id: id });
  }
  async upsertCertificationCode(emailCodeDto: EmailCodeDto) {
    const { email } = emailCodeDto

    const account = await this.accountRepository.findOne({ email });
    if (!account) return null;

    const { id: accountId } = account;

    const key = generateKey();
    const expireDate = new Date();
    expireDate.setDate(expireDate.getDate() + 1);

    return this.certificationCodeRepository.query(`
        INSERT INTO certification_code (
          "account_id",
          "email",
          "key",
          "expire_date"
        )
        VALUES (
          $1,
          $2,
          $3,
          $4
        )
        ON CONFLICT("email")
          DO UPDATE
            SET
              "account_id" = $1,
              "key" = $3,
              "expire_date" = $4
            WHERE
              "certification_code"."email" = $2
        RETURNING *
    `, [
      accountId,
      email,
      key,
      expireDate
    ]);
  }
}
