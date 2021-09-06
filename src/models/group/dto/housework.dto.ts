import { HouseworkType } from '@common/constants';
import { IsString, IsNotEmpty, IsNumber, IsIn } from 'class-validator';

export class HouseworkDto {
    @IsNotEmpty()
    @IsString()
    @IsIn(Object.values(HouseworkType))
    readonly type: string;

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

    constructor(type: string, title: string, description: string, deployCount: number, frequency: number) {
        this.type = type;
        this.title = title;
        this.description = description;
        this.deployCount = deployCount;
        this.frequency = frequency;
    }
}