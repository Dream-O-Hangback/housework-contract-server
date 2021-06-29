import { IsBoolean, IsEmail, IsNotEmpty, IsString, IsOptional } from 'class-validator';

export default class AccountDto {
    @IsNotEmpty()
    @IsEmail()
    @IsString()
    readonly email: string;

    @IsNotEmpty()
    @IsString()
    readonly name: string;

    @IsNotEmpty()
    @IsString()
    readonly password: string;

    @IsNotEmpty()
    @IsString()
    readonly nickname: string;

    @IsOptional()
    @IsString()
    readonly profile?: string;
    
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
        name: string,
        password: string,
        nickname: string,
        profile: string,
        type: string,
        notificationOpen: boolean,
        emailOpen: boolean,
    ) {
        this.email = email;
        this.name = name;
        this.password = password;
        this.nickname = nickname;
        this.profile = profile;
        this.type = type;
        this.notificationOpen = notificationOpen;
        this.emailOpen = emailOpen;
    }
}