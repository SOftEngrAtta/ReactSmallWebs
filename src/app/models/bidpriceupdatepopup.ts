export class BidPriceUpdateObj {
    auctionTypeId : number ;
    bidprice =  null
    chassisnumber =  null
    months =  [{ id: 1, name: "January" }, { id: 2, name: "February" }, { id: 3, name: "March" }, { id: 4, name: "April" }, { id: 5, name: "May" }, { id: 6, name: "June" }, { id: 7, name: "July" }, { id: 8, name: "August" }, { id: 9, name: "September" }, { id: 10, name: "October" }, { id: 11, name: "November" }, { id: 12, name: "December" }]
    years =  []
    selectedmonth =  ''
    selectedYear =  ''
    isNumberPlateActive =  false
    numberplate =  null
    isNegotiationActive =  false
    isDrivableActive = false
    meterReversal = null
    totalalterationamount = 0
    quotationId = 0
    quotationItemId = 0
    quotationDetailId = 0
    ModelId = 0
    PackageId = 0
    PackageName = ''
    PlanName = ''
    PlanAmount = ''
    PlanClass = ''
    comment = ''
    CurrencyRate = ''
    PreferredShipping = ''
    prices = {
        BidPrice : 0,
        FOB : 0,
        ServiceCharges: 0,
        FreightCharges: 0,
        InspectionCharges: 0,
        AlterationCharges: 0,
        RikusoFee: 0,
        InsuranceFee: 0,
        ExtraFee: 0,
        OnePriceFee: 0,
        ContainerCharges: 0,
        VanningCharges: 0,
        CNF: 0,
        CIF: 0,
        TotalAlterationAmount: 0,
    }
}