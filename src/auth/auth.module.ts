import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { MailService } from '../mails/mails.service';
import { AccountService } from 'src/models/account/account.service';
import { CertificationCodeService } from 'src/models/certificationCode/certificationCode.service';
// import { RefreshTokenService } from 'src/models/refreshToken/refreshToken.service';
import { LocalStrategy } from './strategies/jwt.strategy';
import Account from '../models/account/entities';
import CertificationCode from '../models/certificationCode/entities';
// import RefreshToken from 'src/models/refreshToken/entities';

@Module({
  imports: [
    PassportModule,
    TypeOrmModule.forFeature([
      Account,
      CertificationCode,
      // RefreshToken,
    ],
  )],
  controllers: [AuthController],
  providers: [
    AuthService,
    MailService,
    AccountService,
    CertificationCodeService,
    // RefreshTokenService,
    LocalStrategy,
  ],
})
export class AuthModule {}
