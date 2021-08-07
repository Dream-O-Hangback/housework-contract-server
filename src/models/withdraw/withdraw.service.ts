import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import Account from '@models/account/entities';
import Withdraw from '@models/withdraw/entities';

@Injectable()
export class WithdrawService {
    constructor(
        @InjectRepository(Withdraw) private withdrawRepository: Repository<Withdraw>,
    ) {
        this.withdrawRepository = withdrawRepository;
    }
    createItem(account: Account) {
        return this.withdrawRepository.save({ ...account });
    }
}
