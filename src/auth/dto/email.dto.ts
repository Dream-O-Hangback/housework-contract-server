import { IsEmail, IsString, IsNotEmpty } from 'class-validator';

export class EmailDto {
    @IsNotEmpty()
    @IsEmail()
    @IsString()
    readonly email: string;

    constructor(email: string) {
        this.email = email;
    }
}
