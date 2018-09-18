export class DepositFundType {
    EncryptedDepositTypeId: string;
    DepositTypeName: string;
}

export class FundDepositRequestModel {
    EncryptedPaymentMethodId: string;
    EncryptedFundDepositTypeId: string;
    EncryptedCurrencyId: string;
    Description: string;
    Amount: number;
    OrderDetailId: number;
}