import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoutineService } from './routine.service';
import { Routine } from './entities';
import { RoutineController } from './routine.controller';

@Module({
    imports: [TypeOrmModule.forFeature([Routine])],
    controllers: [RoutineController],
    providers: [
        ConfigService,
        RoutineService,
    ],
    exports: [RoutineService],
})
export class RoutineModule {}
