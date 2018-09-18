import { CustomerOrder } from './customerOrder';

export class QuotationPricing {
	id?: number
	referenceId: string
	shipmentType_Id?: number
	package_Id?: number
	plan_Id?: string = null;
	port_Id?: number
	currencyId?: number
	currencyCode?: string = 'JPY';
	countryId?: number
	countryCode?: string
	averagePrice?: number
	portName?: string
	shipmentTerm_Id?: number
	customerOrders?: CustomerOrder[] = []
	Make?: string
	ModelId?: number
	Model?: string
	Transmission?: string
	Year?: number
	Chassis?: string
	LotNo?: string
	AuctionDate: any;
	AuctionDateTime?: string
	AuctionTime?: string
	AuctionHouseId?: number
	AuctionHouse?: string
	Images?: any[] = []
	SourceType?: number
	QuotationId?: string
	QuotationItemId?: string
	IsRedirectPage: any
	AuctionSheet: any
	MeterCube: any
	countryName?: string
	shipmentType?: string
	freightType?: string
	JapanTime?: string
	YenRate?: string
	PricingTypeId : number 
	StartPrice : any 
}
