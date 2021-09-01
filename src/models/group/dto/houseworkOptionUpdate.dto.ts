import { ShareMethodType } from '@common/constants';
import { IsString, IsNotEmpty, IsNumber, IsIn } from 'class-validator';

export class HouseworkOptionUpdateDto {
    @IsNotEmpty()
    @IsNumber()
    readonly startDay: number;

    @IsNotEmpty()
    @IsString()
    @IsIn(Object.values(ShareMethodType))
    readonly shareMethod: string;

    @IsNotEmpty()
    @IsNumber()
    readonly skipLimit: number;

    constructor(startDay: number, shareMethod: string, skipLimit: number) {
        this.startDay = startDay;
        this.shareMethod = shareMethod;
        this.skipLimit = skipLimit;
    }
}
                  