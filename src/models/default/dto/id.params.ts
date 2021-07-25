import { IsString, IsNotEmpty } from 'class-validator';

export default class IdParams {
    @IsNotEmpty()
    @IsString()
    readonly id: string;

    constructor(id: string) {
        this.id = id;
    }
}