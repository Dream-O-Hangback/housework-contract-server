import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { MailService } from '../mails/mails.service';
import Account from '../models/account/entities';
import CertificationCode from '../models/certificationCode/entities';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Account,
      CertificationCode,
    ],
  )],
  controllers: [AuthController],
  providers: [
    AuthService,
    MailService,
  ],
})
export class AuthModule {}
