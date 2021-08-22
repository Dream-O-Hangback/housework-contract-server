import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class AlternativePaymentUpdateDto {
    @IsNotEmpty()
    @IsString()
    readonly type: string;

    @IsNotEmpty()
    @IsString()
    readonly name: string;

    @IsOptional()
    @IsString()
    readonly reason: string;

    constructor(type: string, name: string, reason: string) {
        this.type = type;
        this.name = name;
        this.reason = reason;
    }
}