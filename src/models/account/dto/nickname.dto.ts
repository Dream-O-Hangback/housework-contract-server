import { IsString, IsNotEmpty } from 'class-validator';

export default class NicknameDto {
    @IsNotEmpty()
    @IsString()
    readonly nickname: string;

    constructor(nickname: string) {
        this.nickname = nickname;
    }
}