import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm/index';
import * as bcrypt from 'bcrypt';
import Account from '../models/account/entities';
import AccountDto from './dto/account.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Account) private accountRepository: Repository<Account>,
  ) {
    this.accountRepository = accountRepository;
  }
  findAll() {
    return this.accountRepository.find();
  }
  findOne(id: string) {
    return this.accountRepository.findOne({ id: id });
  }
  async save(accountDto: AccountDto) {
    accountDto.password = await bcrypt.hash('SeCrEtPaSsWoRd', 10);
    return this.accountRepository.save(accountDto);
  }
  delete(id: string) {
    return this.accountRepository.delete({ id: id });
  }
}
