import { AwardType } from '@common/constants';
import { IsString, IsNotEmpty, IsNumber, IsOptional, IsUUID, IsIn, IsBoolean } from 'class-validator';

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
    @IsString()
    @IsUUID()
    readonly defaultAwardId: string;

    @IsNotEmpty()
    @IsBoolean()
    readonly includeContent: boolean;

    constructor(type: string, title: string, description: string, defaultAwardId: string, includeContent: boolean) {
        this.type = type;
        this.title = title;
        this.description = description;
        this.defaultAwardId = defaultAwardId;
        this.includeContent = includeContent;
    }
}