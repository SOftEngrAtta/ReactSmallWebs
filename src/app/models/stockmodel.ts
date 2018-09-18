export class StockDetail{
    ClientId : String 
    ReferenceId : String 
    LotNumber : String 
    ProductId : String
    ShipmentTypeId : Number
    ShipmentCountryId : Number
    ShipmentCountryName : String 
    ShipmentPortName : String
    ShipmentPortId : Number
    ShipmentTermId : Number
    PackageId : Number
    PlanId : Number
    PortName : String = ''
    CurrencyCode : String
    CountryCode : String
    ModelId : Number
    AuctionHouseId : Number
    Year : String
    AutionType : String
    Alteration : any[] = []
    IsNotDriveable : Boolean = false
    IsNegotiable : Boolean = false 
    MeterCube : any 
}