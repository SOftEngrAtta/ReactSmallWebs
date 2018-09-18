export class CustomerOrder{
    id?: number
    orderId?: number
    model_Id?: number
    chassisNumber?: string
    unitPrice?: number
    serviceCharges?: number
    fobCharges?: number
    freightCharges?: number
		inspectionCharges?: number
		insuranceCharges?: number
    cnfCharges?: number
    vehicleName?: string
    cifCharges?: number
    isNegotiable?: boolean = false;
    negotiableAmount?: number
    alterationCharges?: number
    extraChargesVehilce?: number
    extraChargesSize?: number
    auctionHouse_Id?: number
		auctionHouseName?: string
    auctionHouseAmount?: number
    auctionTypeAmount?: number
		auctionType?: number
    unitDeposit?: number
    ask?: boolean = false;
    year?: number
    extraFee?: number
		containerCharges?: number
		vanningCharges?: number
		rikusoFee?: number
		onePriceFee?: number
		finalPrice?: number
}
