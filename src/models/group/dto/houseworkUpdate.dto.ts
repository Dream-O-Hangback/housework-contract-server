import { IsString, IsNotEmpty, IsNumber } from 'class-validator';

export class HouseworkUpdateDto {
    @IsNotEmpty()
    @IsString()
    readonly title: string;

    @IsNotEmpty()
    @IsString()
    readonly description: string;

    @IsNotEmpty()
    @IsNumber()
    readonly deployCount: number;

    @IsNotEmpty()
    @IsNumber()
    readonly frequency: number;

    constructor(title: string, description: string, deployCount: number, frequency: number) {
        this.title = title;
        this.description = description;
        this.deployCount = deployCount;
        this.frequency = frequency;
    }
}