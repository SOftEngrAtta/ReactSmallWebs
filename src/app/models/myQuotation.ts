import { QuotationDetail } from './quotationDetail';

export class MyQuotation {
    SentQuotationList: Array<MyQuotationObject> = [new MyQuotationObject()];
    UnSentQuotationList: Array<MyQuotationObject> = [new MyQuotationObject()];
    BookedQuotationList: Array<MyQuotationObject> = [new MyQuotationObject()];
}

export class MyQuotationObject {
    EncryptedQuotationId: string;
    QuotationCreatedDate: any;
    QuotationName: string;
    QuotationSentDate: any;
    QuotationDetailList: Array<QuotationDetail> = [new QuotationDetail()];
}
