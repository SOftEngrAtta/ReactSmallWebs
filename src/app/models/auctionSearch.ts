import { Year } from "./year";
import { Mileage } from "./mileage";
import { Engine } from "./engine";
import { Chassis } from "./chassis";
import { Color } from "./color";

export class AuctionSearch{
  Page: number
  Count : number
  SearchType: string = "Auction"
  SortBy: string = "Year"
  SortOrder: string = "DESC"
  ModelId: number
  LotNo: string
  // MLotNo: string
  Year = new Year()
  Mileage = new Mileage()
  Engine = new Engine()
  Chassis: string[]=[]
  Conditions: string[]=[]
  Colors: number[]=[]
  Status: string[]=[]
  Days: number[]=[]
  Transmissions: string[]=[]
  Type:string
  IsSelectedLotNumber: boolean = true
  AuctionHouses : Array<any> = [] ;
}