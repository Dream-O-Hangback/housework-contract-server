import { ShareMethodType, StartDayType } from '@common/constants';
import { IsString, IsNotEmpty, IsNumber, IsIn, IsOptional } from 'class-validator';

export class HouseworkOptionUpdateDto {
    @IsNotEmpty()
    @IsNumber()
    @IsIn(Object.values(StartDayType))
    readonly startDay: number;

    @IsNotEmpty()
    @IsString()
    @IsIn(Object.values(ShareMethodType))
    readonly shareMethod: string;

    @IsOptional()
    @IsNumber()
    readonly skipLimit: number;

    constructor(startDay: number, shareMethod: string, skipLimit: number) {
        this.startDay = startDay;
        this.shareMethod = shareMethod;
        this.skipLimit = skipLimit;
    }
}
                  