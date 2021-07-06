import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccountController } from './account.controller';
import { AccountService } from './account.service';
import Account from '../account/entities';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Account,
    ],
  )],
  controllers: [AccountController],
  providers: [
    AccountService,
  ],
})
export class AccountModule {}
