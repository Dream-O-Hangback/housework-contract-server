import { IsString, IsNotEmpty, Length } from 'class-validator';

export class RuleIdParams {
    @IsNotEmpty()
    @IsString()
    @Length(36, 36)
    readonly groupid: string;

    @IsNotEmpty()
    @IsString()
    @Length(36, 36)
    readonly id: string;

    constructor(groupId: string, id: string) {
        this.groupid = groupId;
        this.id = id;
    }
}