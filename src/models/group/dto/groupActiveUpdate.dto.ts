import { IsString, IsBoolean, IsNotEmpty, IsOptional } from 'class-validator';

export class GroupActiveUpdateDto {
    @IsNotEmpty()
    @IsBoolean()
    readonly value: boolean;

    @IsOptional()
    @IsString()
    readonly reason: string;

    constructor(value: boolean, reason: string) {
        this.value = value;
        this.reason = reason;
    }
}