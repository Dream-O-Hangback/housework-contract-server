import { IsBoolean, IsEmail, IsNotEmpty, IsString, IsOptional } from 'class-validator';

export class AccountDto {
    @IsNotEmpty()
    @IsEmail()
    @IsString()
    readonly email: string;

    @IsNotEmpty()
    @IsString()
    readonly password: string;

    @IsNotEmpty()
    @IsString()
    readonly name: string;

    @IsNotEmpty()
    @IsString()
    readonly nickname: string;

    @IsOptional()
    @IsString()
    readonly profile: string;
    
    @IsNotEmpty()
    @IsString()
    readonly type: string;

    @IsNotEmpty()
    @IsBoolean()
    readonly notificationOpen: boolean;

    @IsNotEmpty()
    @IsBoolean()
    readonly emailOpen: boolean;

    constructor(
        email: string,
        password: string,
        name: string,
        nickname: string,
        profile: string,
        type: string,
        notificationOpen: boolean,
        emailOpen: boolean,
    ) {
        this.email = email;
        this.password = password;
        this.name = name;
        this.nickname = nickname;
        this.profile = profile;
        this.type = type;
        this.notificationOpen = notificationOpen;
        this.emailOpen = emailOpen;
    }
}
