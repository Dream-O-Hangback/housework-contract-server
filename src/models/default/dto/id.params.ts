import { IsString, IsNotEmpty, IsUUID } from 'class-validator';

export class IdParams {
    @IsNotEmpty()
    @IsString()
    @IsUUID()
    readonly id: string;

    constructor(id: string) {
        this.id = id;
    }
}
