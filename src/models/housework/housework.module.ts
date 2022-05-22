import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HouseworkController } from './housework.controller';
import { HouseworkService } from './housework.service';
import { HouseworkLogModule } from '../houseworkLog/houseworkLog.module';
import Housework from './entities';

@Module({
    imports: [
        TypeOrmModule.forFeature([Housework]),
        HouseworkLogModule,
    ],
    controllers: [HouseworkController],
    providers: [
        ConfigService,
        HouseworkService,
    ],
    exports: [HouseworkService],
})
export class HouseworkModule {}
