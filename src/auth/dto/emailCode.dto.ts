import { IsEmail, IsString, IsNotEmpty } from 'class-validator';

export default class EmailCodeDto {
    @IsNotEmpty()
    @IsEmail()
    @IsString()
    readonly email: string;

    constructor(email: string) {
        this.email = email;
    }
}