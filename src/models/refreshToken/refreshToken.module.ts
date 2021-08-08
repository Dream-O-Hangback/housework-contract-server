import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RefreshTokenService } from './refreshToken.service';
import RefreshToken from './entities';

@Module({
    imports: [TypeOrmModule.forFeature([RefreshToken])],
    controllers: [],
    providers: [RefreshTokenService],
    exports: [RefreshTokenService],
})
export class RefreshTokenModule {}
