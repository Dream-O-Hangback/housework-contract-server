import { IsString, IsNotEmpty, IsUUID } from 'class-validator';

export class GroupMemberUpdateDto {
    @IsNotEmpty()
    @IsString()
    @IsUUID()
    readonly selectAwardId: string;

    constructor(selectAwardId: string) {
        this.selectAwardId = selectAwardId;
    }
}