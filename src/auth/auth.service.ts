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
  create(account: Account): Account {
    return this.accountRepository.create(account);
  }
  findAll(): Promise<Account[]> {
    return this.accountRepository.find();
  }
  findOne(id: string): Promise<Account> {
    return this.accountRepository.findOne({ id: id });
  }
  save(accountDto: AccountDto): Promise<Account> {
    return this.accountRepository.save({ ...accountDto as DeepPartial<Account> });
  }
  delete(id: string): Promise<DeleteResult> {
    return this.accountRepository.delete({ id: id });
  }
}
