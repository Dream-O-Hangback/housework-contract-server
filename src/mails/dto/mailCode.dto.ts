import { IsEmail, IsString, IsNotEmpty, IsDate } from 'class-validator';

export default class MailCodeDto {
    @IsNotEmpty()
    @IsEmail()
    @IsString()
    readonly email: string;

    @IsNotEmpty()
    @IsString()
    readonly code: string;

    @IsDate()
    readonly generatedAt: Date;

    constructor(email: string, code: string, generatedAt: Date) {
        this.email = email;
        this.code = code;
        this.generatedAt = generatedAt;
    }
}