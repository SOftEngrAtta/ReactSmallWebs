import { CustomerOrder } from "./customerOrder";

export class PricePlan{
	countryCode: string
	currencyCode: string
	currencyId: number
	currencyRate: number
	customerOrders: CustomerOrder[]=[]
	package_Id: number
	planName: string
	planClass: string
	plan_Amount: number
	plan_Id: number
	portCharges: number 
	portName: string
	port_Id: number
	currencySymbol: string
	shipmentTerm_Id: number 
	shipmentType_Id: number 
	transactionType: string
	unitInspection: string
}