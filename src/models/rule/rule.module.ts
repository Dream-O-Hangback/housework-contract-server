import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RuleService } from './rule.service';
import Rule from './entities';

@Module({
    imports: [TypeOrmModule.forFeature([Rule])],
    controllers: [],
    providers: [
        ConfigService,
        RuleService,
    ],
    exports: [RuleService],
})
export class RuleModule {}
