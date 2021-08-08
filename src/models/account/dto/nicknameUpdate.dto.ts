import { IsString, IsNotEmpty } from 'class-validator';

export class NicknameUpdateDto {
    @IsNotEmpty()
    @IsString()
    readonly nickname: string;

    constructor(nickname: string) {
        this.nickname = nickname;
    }
}
