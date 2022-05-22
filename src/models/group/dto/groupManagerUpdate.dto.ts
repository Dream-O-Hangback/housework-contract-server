import { IsString, IsNotEmpty, IsUUID } from 'class-validator';

export class GroupManagerUpdateDto {
    @IsNotEmpty()
    @IsString()
    @IsUUID()
    readonly targetId: string;

    constructor(targetId: string) {
        this.targetId = targetId;
    }
}