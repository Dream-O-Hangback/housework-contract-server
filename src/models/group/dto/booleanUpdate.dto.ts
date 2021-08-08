import { IsBoolean, IsNotEmpty } from 'class-validator';

export default class BooleanUpdateDto {
    @IsNotEmpty()
    @IsBoolean()
    readonly value: boolean;

    constructor(value: boolean) {
        this.value = value;
    }
}