import { IsNotEmpty, IsArray } from 'class-validator';

export class RuleDto {
    @IsNotEmpty()
    @IsArray()
    readonly rules: string[];

    constructor(rules: string[]) {
        this.rules = rules;
    }
}