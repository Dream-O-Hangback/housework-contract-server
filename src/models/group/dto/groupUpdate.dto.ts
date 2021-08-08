import { IsString, IsBoolean, IsNotEmpty, IsArray, Length } from 'class-validator';

export class GroupUpdateDto {
    @IsNotEmpty()
    @IsString()
    readonly name: string;

    @IsNotEmpty()
    @IsBoolean()
    readonly managerPermissionActive: boolean;

    @IsArray()
    readonly groupMembers: string[];

    constructor(name: string, managerPermissionActive: boolean, groupMembers: string[]) {
        this.name = name;
        this.managerPermissionActive = managerPermissionActive;
        this.groupMembers = groupMembers;
    }
}