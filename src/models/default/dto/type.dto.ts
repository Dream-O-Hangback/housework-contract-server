import { IsString, IsNotEmpty } from 'class-validator';

export default class TypeDto {
    @IsNotEmpty()
    @IsString()
    readonly title: string;

    @IsNotEmpty()
    @IsString()
    readonly displayTitle: string;

    constructor(title: string, displayTitle: string) {
        this.title = title;
        this.displayTitle = displayTitle;
    }
}