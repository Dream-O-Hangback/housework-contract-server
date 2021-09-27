import { IsNotEmpty, IsNumber, IsOptional, IsBoolean, Min } from 'class-validator';

export class AwardOptionUpdateDto {
    @IsNotEmpty()
    @IsBoolean()
    readonly alternativePaymentActive: boolean;

    @IsNotEmpty()
    @IsBoolean()
    readonly paymentActive: boolean;

    @IsNotEmpty()
    @IsNumber()
    @Min(1)
    readonly awardStandard: number;

    @IsNotEmpty()
    @IsNumber()
    @Min(1)
    readonly penaltyStandard: number;

    @IsOptional()
    @IsNumber()
    @Min(1)
    readonly awardMoney: number;

    @IsOptional()
    @IsNumber()
    @Min(1)
    readonly penaltyMoney: number;

    @IsNotEmpty()
    @IsBoolean()
    readonly paymentComboActive: boolean;

    @IsOptional()
    @IsNumber()
    @Min(1)
    readonly awardPaymentCombo: number;

    @IsOptional()
    @IsNumber()
    @Min(1)
    readonly penaltyPaymentCombo: number;

    @IsOptional()
    @IsNumber()
    @Min(1)
    readonly awardPaymentComboStart: number;

    @IsOptional()
    @IsNumber()
    @Min(1)
    readonly penaltyPaymentComboStart: number;

    @IsOptional()
    @IsNumber()
    @Min(1)
    readonly awardPaymentComboLimit: number;

    @IsOptional()
    @IsNumber()
    @Min(1)
    readonly penaltyPaymentComboLimit: number;

    constructor(
        alternativePaymentActive: boolean,
        paymentActive: boolean,
        awardStandard: number,
        penaltyStandard: number,
        awardMoney: number,
        penaltyMoney: number,
        paymentComboActive: boolean,
        awardPaymentCombo: number,
        penaltyPaymentCombo: number,
        awardPaymentComboStart: number,
        penaltyPaymentComboStart: number,
        awardPaymentComboLimit: number,
        penaltyPaymentComboLimit: number,
    ) {
        this.alternativePaymentActive = alternativePaymentActive;
        this.paymentActive = paymentActive;
        this.awardStandard = awardStandard;
        this.penaltyStandard = penaltyStandard;
        this.awardMoney = awardMoney;
        this.penaltyMoney = penaltyMoney;
        this.paymentComboActive = paymentComboActive;
        this.awardPaymentCombo = awardPaymentCombo;
        this.penaltyPaymentCombo = penaltyPaymentCombo;
        this.awardPaymentComboStart = awardPaymentComboStart;
        this.penaltyPaymentComboStart = penaltyPaymentComboStart
        this.awardPaymentComboLimit = awardPaymentComboLimit;
        this.penaltyPaymentComboLimit = penaltyPaymentComboLimit
    }
}
