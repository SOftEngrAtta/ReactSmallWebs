export class AuctionSearchResponse{
  Id: number
  ReferenceId: string
  ClientId: string
  ProductId : string
	AuctionHouseId: number
	MakeId: number
	Make: string
	ModelId: number
  Model: string
  Year: number
  LotNo: string
	AuctionHouse: string
	AuctionDate: any
  AuctionDateTime: any
  AuctionTime: any
  Chassis: string
  Transmission: string
  Steering: string
  Engine: string
  Color: string
  Mileage: number
  Condition: string
  StartPrice: number
  SoldPrice: number
  AveragePrice: number
  Price50: number
  Price100: number
	AuctionSheet: string
	PW: number
	Status: string
  Images: string[] = []
  Ristriction: boolean = false
  Country:string
  Port: string
  CountryId : number
  PortId : number
}