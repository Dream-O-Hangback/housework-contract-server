import { IsString, IsNotEmpty, Length } from 'class-validator';

export default class IdParams {
    @IsNotEmpty()
    @IsString()
    @Length(36)
    readonly id: string;

    constructor(id: string) {
        this.id = id;
    }
}