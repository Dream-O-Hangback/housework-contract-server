import { Type } from 'class-transformer';
import { IsString, IsNotEmpty, IsNumber, IsOptional, Length } from 'class-validator';

export default class SearchQuery {
    @IsNotEmpty()
    @IsString()
    @Length(2)
    @Type(() => String)
    readonly search_word: string;
    
    @IsNumber()
    @Type(() => Number)
    @IsOptional()
    readonly offset: number;
    
    @IsNumber()
    @Type(() => Number)
    @IsOptional()
    readonly limit: number;

    constructor(search_word: string, offset: number, limit: number) {
        this.search_word = search_word;
        this.offset = offset;
        this.limit = limit;
    }
}