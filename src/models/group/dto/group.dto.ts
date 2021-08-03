import { IsString, IsBoolean, IsNotEmpty, IsArray, Length } from 'class-validator';

export default class GroupDto {
    @IsNotEmpty()
    @IsString()
    readonly type: string;

    @IsNotEmpty()
    @IsString()
    readonly name: string;

    @IsNotEmpty()
    @IsBoolean()
    readonly managerPermissionActive: boolean;

    @IsArray()
    readonly groupMembers: string[];

    constructor(type: string, name: string, managerPermissionActive: boolean, groupMembers: string[]) {
        this.type = type;
        this.name = name;
        this.managerPermissionActive = managerPermissionActive;
        this.groupMembers = groupMembers;
    }
}