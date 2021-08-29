import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CertificationCodeService } from './certificationCode.service';
import CertificationCode from './entities';

@Module({
    imports: [TypeOrmModule.forFeature([CertificationCode])],
    controllers: [],
    providers: [CertificationCodeService],
    exports: [CertificationCodeService],
})
export class CertificationCodeModule {}
