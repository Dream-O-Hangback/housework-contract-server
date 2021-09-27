import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class RoutineFullChargeDto {
    @IsNotEmpty()
    @IsString()
    @IsUUID()
    readonly groupMemberId: string;

    @IsNotEmpty()
    @IsString()
    @IsUUID()
    readonly houseworkId: string;

    constructor(groupMemberId: string, houseworkId: string) {
        this.groupMemberId = groupMemberId;
        this.houseworkId = houseworkId;
    }
}
