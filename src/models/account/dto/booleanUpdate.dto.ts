import { IsBoolean, IsNotEmpty } from 'class-validator';

export class BooleanUpdateDto {
    @IsNotEmpty()
    @IsBoolean()
    readonly value: boolean;

    constructor(value: boolean) {
        this.value = value;
    }
}
