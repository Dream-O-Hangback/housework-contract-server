import { IsString, IsNotEmpty } from 'class-validator';

export class HouseworkProgressDto {
    @IsNotEmpty()
    @IsString()
    readonly groupId: string;

    @IsNotEmpty()
    @IsString()
    readonly workerId: string;

    @IsNotEmpty()
    @IsString()
    readonly houseworkId: string;

    constructor(groupId: string, workerId: string, houseworkId: string) {
        this.groupId = groupId;
        this.workerId = workerId;
        this.houseworkId = houseworkId;
    }
}