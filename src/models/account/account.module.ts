import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccountController } from './account.controller';
import { AccountService } from './account.service';
import Account from '../account/entities';

@Module({
    imports: [TypeOrmModule.forFeature([Account])],
    controllers: [AccountController],
    providers: [
        ConfigService,
        AccountService,
    ],
    exports: [AccountService],
})
export class AccountModule {}
