import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeepPartial, DeleteResult, Repository } from 'typeorm/index';
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
  save(accountDto: AccountDto) {
    return this.accountRepository.save(accountDto);
  }
  delete(id: string) {
    return this.accountRepository.delete({ id: id });
  }
}
