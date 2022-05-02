import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HouseworkLogService } from './houseworkLog.service';
import HouseworkLog from './entities';

@Module({
    imports: [TypeOrmModule.forFeature([HouseworkLog])],
    controllers: [],
    providers: [HouseworkLogService],
    exports: [HouseworkLogService],
})
export class HouseworkLogModule {}
