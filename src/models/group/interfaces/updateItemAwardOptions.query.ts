export interface UpdateItemAwardOptionsQuery {
    alternativePaymentActive: boolean;
    paymentActive: boolean;
    awardStandard: number;
    penaltyStandard: number;
    paymentComboActive: boolean;
    awardMoney?: number;
    penaltyMoney?: number;
    awardPaymentCombo?: number;
    penaltyPaymentCombo?: number;
    awardPaymentComboStart?: number;
    penaltyPaymentComboStart?: number;
    awardPaymentComboLimit?: number;
    penaltyPaymentComboLimit?: number;
}
