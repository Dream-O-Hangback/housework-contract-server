import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RuleLogService } from './ruleLog.service';
import RuleLog from './entities';

@Module({
    imports: [TypeOrmModule.forFeature([RuleLog])],
    controllers: [],
    providers: [
        ConfigService,
        RuleLogService,
    ],
    exports: [RuleLogService],
})
export class RuleLogModule {}
