import { IsString, IsNotEmpty } from 'class-validator';

export class NicknameDto {
    @IsNotEmpty()
    @IsString()
    readonly nickname: string;

    constructor(nickname: string) {
        this.nickname = nickname;
    }
}
