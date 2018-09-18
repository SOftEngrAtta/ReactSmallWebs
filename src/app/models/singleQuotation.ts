import { QuotationData } from "./quotationData";
import { QuotationItemData } from "./quotationItemData";
import { QuotationDetailDataDTO } from "./quotationDetailDataDTO";
import { AuctionData } from "./auctionData";
import { UnitInspection } from './unitinspection';

export class SingleQuotation{
	QuotationTypeId: number;
	IsCnfBased: boolean;
	PricingTypeId  : number ;
	AuctionData: AuctionData = new AuctionData();
	QuotationData: QuotationData = new QuotationData();
	QuotationItemData: QuotationItemData = new QuotationItemData();
	QuotationDetailDataDTO : QuotationDetailDataDTO[]=[];
	UnitInspection : Array<any>=[];
}