import { Type } from 'class-transformer';
import { IsString, IsNotEmpty } from 'class-validator';

export class EmailQuery {
    @IsNotEmpty()
    @IsString()
    @Type(() => String)
    readonly email: string;

    constructor(email: string) {
        this.email = email;
    }
}
