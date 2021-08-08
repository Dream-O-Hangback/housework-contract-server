import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { MailModule } from '@mails/mails.module';
import { AccountModule } from '@models/account/account.module';
import { CertificationCodeModule } from '@models/certificationCode/certificationCode.module';
import { RefreshTokenModule } from '@models/refreshToken/refreshToken.module';
import Account from '@models/account/entities';
import CertificationCode from '@models/certificationCode/entities';
import RefreshToken from '@models/refreshToken/entities';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { LocalStrategy, JwtStrategy } from './strategies';

@Module({
    imports: [
        ConfigModule,
        MailModule,
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
        ]),
        AccountModule,
        CertificationCodeModule,
        RefreshTokenModule,
    ],
    controllers: [AuthController],
    providers: [
        AuthService,
        LocalStrategy,
        JwtStrategy,
    ],
    exports: [
        AuthService,
        JwtModule,
    ],
})
export class AuthModule {}
