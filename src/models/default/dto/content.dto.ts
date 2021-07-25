import { IsString, IsNotEmpty } from 'class-validator';

export default class ContentDto {
    @IsNotEmpty()
    @IsString()
    readonly type: string;

    @IsNotEmpty()
    @IsString()
    readonly title: string;

    @IsNotEmpty()
    @IsString()
    readonly description: string;

    constructor(type: string, title: string, description: string) {
        this.type = type;
        this.title = title;
        this.description = description;
    }
}