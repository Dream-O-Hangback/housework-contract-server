import { IsNumber, IsString, IsNotEmpty } from 'class-validator';

export default class ContentUpdateDto {
    @IsNotEmpty()
    @IsNumber()
    readonly id: number;

    @IsNotEmpty()
    @IsString()
    readonly type: string;

    @IsNotEmpty()
    @IsString()
    readonly title: string;

    @IsNotEmpty()
    @IsString()
    readonly description: string;

    constructor(id: number, type: string, title: string, description: string) {
        this.id = id;
        this.type = type;
        this.title = title;
        this.description = description;
    }
}