import { IsNumber, IsString, IsNotEmpty } from 'class-validator';

export default class TypeUpdateDto {
    @IsNotEmpty()
    @IsNumber()
    readonly id: number;

    @IsNotEmpty()
    @IsString()
    readonly title: string;

    @IsNotEmpty()
    @IsString()
    readonly displayTitle: string;

    constructor(id: number, title: string, displayTitle: string) {
        this.id = id;
        this.title = title;
        this.displayTitle = displayTitle;
    }
}