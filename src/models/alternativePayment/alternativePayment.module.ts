import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AlternativePaymentService } from './alternativePayment.service';
import AlternativePayment from './entities';

@Module({
    imports: [TypeOrmModule.forFeature([AlternativePayment])],
    controllers: [],
    providers: [
        ConfigService,
        AlternativePaymentService,
    ],
    exports: [AlternativePaymentService],
})
export class AlternativePaymentModule {}
