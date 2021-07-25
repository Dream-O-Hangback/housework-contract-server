import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { MailService } from '../mails/mails.service';
import { AccountService } from '../models/account/account.service';
import { CertificationCodeService } from '../models/certificationCode/certificationCode.service';
import { RefreshTokenService } from '../models/refreshToken/refreshToken.service';
import { LocalStrategy } from './strategies/local.strategy';
import { JwtStrategy } from './strategies/jwt.strategy';
import Account from '../models/account/entities';
import CertificationCode from '../models/certificationCode/entities';
import RefreshToken from '../models/refreshToken/entities';

@Module({
    imports: [
        ConfigModule,
        PassportModule,
        JwtModule.registerAsync({
            imports: [ConfigModule],
            useFactory: async (configService: ConfigService) => {
                return {
                    secret: configService.get<string>('JWT_SECRET'),
                    signOptions: { expiresIn: configService.get<string>('JWT_EXPIRES_IN') },
                };
            },
            inject: [ConfigService]
        }),
        TypeOrmModule.forFeature([
            Account,
            CertificationCode,
            RefreshToken,
        ],
    )],
    controllers: [AuthController],
    providers: [
        AuthService,
        MailService,
        AccountService,
        CertificationCodeService,
        RefreshTokenService,
        LocalStrategy,
        JwtStrategy,
    ],
    exports: [
        AuthService,
        JwtModule,
    ],
})
export class AuthModule {}
