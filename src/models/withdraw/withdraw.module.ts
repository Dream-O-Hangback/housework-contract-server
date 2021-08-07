import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WithdrawService } from './withdraw.service';
import Withdraw from './entities';

@Module({
    imports: [
        TypeOrmModule.forFeature([Withdraw]),
    ],
    controllers: [],
    providers: [WithdrawService],
    exports: [WithdrawService],
})
export class WithdrawModule {}
