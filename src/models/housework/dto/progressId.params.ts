import { IsString, IsNotEmpty, IsUUID } from 'class-validator';

export class ProgressIdParams {
    @IsNotEmpty()
    @IsString()
    @IsUUID()
    readonly groupId: string;

    @IsNotEmpty()
    @IsString()
    @IsUUID()
    readonly id: string;

    constructor(groupId: string, id: string) {
        this.groupId = groupId;
        this.id = id;
    }
}