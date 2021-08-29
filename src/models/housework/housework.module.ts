import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HouseworkService } from './housework.service';
import Housework from './entities';

@Module({
    imports: [TypeOrmModule.forFeature([Housework])],
    controllers: [],
    providers: [
        ConfigService,
        HouseworkService,
    ],
    exports: [HouseworkService],
})
export class HouseworkModule {}
