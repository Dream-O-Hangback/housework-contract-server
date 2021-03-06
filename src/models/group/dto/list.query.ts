import { Type } from 'class-transformer';
import { IsNumber, IsOptional } from 'class-validator';

export class ListQuery {
    @IsOptional()
    readonly offset: number;
    
    @IsOptional()
    readonly limit: number;

    constructor(offset: number, limit: number) {
        this.offset = offset;
        this.limit = limit;
    }
}