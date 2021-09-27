import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class RuleUpdateDto {
    @IsNotEmpty()
    @IsString()
    readonly content: string;

    constructor(content: string) {
        this.content = content;
    }
}