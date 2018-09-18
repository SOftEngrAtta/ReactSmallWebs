export class BidPriceOrderDetail {
  AuctionId: String
  OrderId: any
  OrderItemId: any
  OrderDetailId: any
  QuotationId: String
  QuotationItemId: String
  QuotationDetailId: String
  CountryId: number
  PortId: number
  ShipmentTermId: number
  ShipmentTypeId: number
  PlanId: number
  AgentId: number
  CurrencyId: number
  CurrencyRate: number
  Make: String
  Model: String
  ModelId: any
  Year: number
  Body: String
  LotNo: String
  AuctionHouseId: number
  AuctionHouse: String
  AuctionImage: any
  AuctionDate: any
  AuctionSheet: String
  BidPrice: number
  ServiceCharges: number
  RikusoFee: number = 0
  ExtraFee: number = 0
  OnePriceFee: any
  AlterationCharges: number = 0
  InspectionCharges: number
  ContainerCharges: any
  VanningCharges: any
  InsuranceFee: number
  NegotiableAmount: number
  FOB: number
  FreightCharges: number
  CNF: number
  CIF: number
  TotalAlterationAmount: number
  MeterReading: any
  MeterCube: any
  BidComments: any
  IsNumberPlate: boolean
  NumberPlate: any
  IsCustomerNegotiation: boolean
  ChassisNumber: any
  ManufacturingMonth: any
  ManufacturingYear: any
  AlterationId: number
  CurrencyCode: String
  CountryCode: String
  PlanClass: String
  PlanName: String
  PlanPercentage: any
  PackageId: any
  PackageName: String
  AuctionTypeId: any
  IsBooked: any
  DefaultPlan: any
  OrderDetailCarStatus?: string
  Mileage?: string
  Chassis?: string
  PricingTypeId : number ;
  BidWonPrice?: number
  ReferenceId : any ;
}
