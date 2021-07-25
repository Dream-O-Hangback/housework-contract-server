import { IsString, IsNotEmpty } from 'class-validator';

export default class NicknameUpdateDto {
    @IsNotEmpty()
    @IsString()
    readonly nickname: string;

    constructor(email: string) {
        this.nickname = email;
    }
}