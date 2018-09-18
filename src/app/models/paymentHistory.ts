export class PaymentHistoryModel {
    PaymentOrderDisplayId: string;
    OrderDate: string;
    OrderAmount: number;
    PaymentMethodName: string;
    PreConfirmDate: any;
    ConfirmDate: any;
    PaymentStatus: string;
    EncryptedPaymentOrderId: string;
    EncryptedPaymentMethodId: string;
    CurrencyCode: string;
    CurrencySymbol: string;
    PaymentStatusCode: number;
}
