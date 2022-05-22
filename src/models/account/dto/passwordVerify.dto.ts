import { IsString, IsNotEmpty } from 'class-validator';

export class PasswordVerifyDto {
    @IsNotEmpty()
    @IsString()
    readonly password: string;

    constructor(password: string) {
        this.password = password;
    }
}
