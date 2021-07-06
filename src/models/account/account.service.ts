import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import Account from '../account/entities';

@Injectable()
export class AccountService {
  constructor(
    @InjectRepository(Account) private accountRepository: Repository<Account>,
  ) {
    this.accountRepository = accountRepository;
  }
  getAccountByNickname({ nickname }) {
    return this.accountRepository.findOne({ nickname });
  }
}
