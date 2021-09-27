import { IsString, IsNotEmpty, IsUUID } from 'class-validator';

export class AwardIdParams {
    @IsNotEmpty()
    @IsString()
    @IsUUID()
    readonly groupid: string;

    @IsNotEmpty()
    @IsString()
    @IsUUID()
    readonly id: string;

    constructor(groupId: string, id: string) {
        this.groupid = groupId;
        this.id = id;
    }
}