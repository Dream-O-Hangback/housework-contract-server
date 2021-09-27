import { AwardType } from '@common/constants';
import { IsString, IsNotEmpty, IsNumber, IsOptional, IsIn, IsBoolean } from 'class-validator';

export class AwardDto {
    @IsNotEmpty()
    @IsString()
    @IsIn(Object.values(AwardType))
    readonly type: string;
    
    @IsNotEmpty()
    @IsString()
    readonly title: string;

    @IsNotEmpty()
    @IsString()
    readonly description: string;

    @IsOptional()
    @IsNumber()
    readonly defaultAwardId: number;

    @IsNotEmpty()
    @IsBoolean()
    readonly includeContent: boolean;

    constructor(type: string, title: string, description: string, defaultAwardId: number, includeContent: boolean) {
        this.type = type;
        this.title = title;
        this.description = description;
        this.defaultAwardId = defaultAwardId;
        this.includeContent = includeContent;
    }
}