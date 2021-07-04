import { IsEmail, IsString, IsNotEmpty } from 'class-validator';

export default class EmailCodeDto {
    @IsNotEmpty()
    @IsEmail()
    @IsString()
    readonly email: string;

    @IsNotEmpty()
    @IsString()
    readonly code: string;

    constructor(email: string, code: string) {
        this.email = email;
        this.code = code;
    }
}