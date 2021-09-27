import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class RuleLogDto {
    @IsNotEmpty()
    @IsString()
    @IsUUID()
    readonly ruleId: string;

    @IsNotEmpty()
    @IsString()
    @IsUUID()
    readonly targetId: string;

    @IsNotEmpty()
    @IsString()
    readonly reason: string;

    constructor(ruleId: string, targetId: string, reason: string) {
        this.ruleId = ruleId;
        this.targetId = targetId;
        this.reason = reason;
    }
}