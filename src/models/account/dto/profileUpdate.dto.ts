import { IsString, IsNotEmpty } from 'class-validator';

export default class ProfileUpdateDto {
    @IsNotEmpty()
    @IsString()
    readonly profile: string;

    constructor(profile: string) {
        this.profile = profile;
    }
}