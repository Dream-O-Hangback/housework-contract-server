import { Type } from 'class-transformer';
import { IsString, IsNotEmpty } from 'class-validator';

export default class SearchQuery {
    @IsNotEmpty()
    @IsString()
    @Type(() => String)
    readonly email: string;

    constructor(email: string) {
        this.email = email;
    }
}