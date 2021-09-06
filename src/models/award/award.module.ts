import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AwardController } from './award.controller';
import { AwardService } from './award.service';
import Award from './entities';

@Module({
    imports: [TypeOrmModule.forFeature([Award])],
    controllers: [AwardController],
    providers: [
        ConfigService,
        AwardService,
    ],
    exports: [AwardService],
})
export class AwardModule {}
