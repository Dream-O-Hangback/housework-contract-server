import { IsOptional } from 'class-validator';

export class HouseworkListQuery {
    @IsOptional()
    readonly offset: number;
    
    @IsOptional()
    readonly limit: number;

    @IsOptional()
    readonly all: boolean;

    constructor(offset: number, limit: number, all: boolean) {
        this.offset = offset;
        this.limit = limit;
        this.all = all;
    }
}