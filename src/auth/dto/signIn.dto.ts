import { IsEmail, IsString, IsNotEmpty } from 'class-validator';

export default class SignInDto {
    @IsNotEmpty()
    @IsEmail()
    @IsString()
    readonly id: string;

    @IsNotEmpty()
    @IsString()
    readonly password: string;

    constructor(id: string, password: string) {
        this.id = id;
        this.password = password;
    }
}