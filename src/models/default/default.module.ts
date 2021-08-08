import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DefaultAdminController } from './admin.default.controller';
import { DefaultController } from './default.controller';
import { DefaultService } from './default.service';
import {
    DefaultHousework,
    DefaultAward,
    DefaultAlternativePaymentType,
    DefaultGroupType,
} from '../default/entities';

@Module({
    imports: [
        ConfigModule,
        TypeOrmModule.forFeature([
            DefaultHousework,
            DefaultAward,
            DefaultAlternativePaymentType,
            DefaultGroupType,
        ]),
    ],
    controllers: [
        DefaultAdminController,
        DefaultController,
    ],
    providers: [DefaultService],
})
export class DefaultModule {}
