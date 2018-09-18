import { Color } from "./color";
import { Chassis } from "./chassis";
import { Engine } from "./engine";
import { Mileage } from "./mileage";
import { Year } from "./year";

export class SearchVehicle{
  Chassis: Chassis[]=[]
  Colors: Color[]=[]
  Conditions: string[]=[]
  Engine = new Engine()
  Mileage = new Mileage()
  Status: string[]=[]
  Transmissions: string[]=[]
  Year = new Year() 
}