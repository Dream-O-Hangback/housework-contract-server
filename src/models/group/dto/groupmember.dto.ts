import { IsString, IsNotEmpty, Length } from 'class-validator';

export class GroupMemberUpdateDto {
    @IsNotEmpty()
    @IsString()
    @Length(36, 36)
    readonly selectAwardId: string;

    constructor(selectAwardId: string) {
        this.selectAwardId = selectAwardId;
    }
}