import { ShipmentCountry } from "./shipmentCountry";
import { ShipmentTerm } from "./shipmentTerm";
import { ShipmentType } from "./shipmentType";
import { ShipmentPort } from "./shipmentPort";

export class ShipmentDetail{
  country: ShipmentCountry[]=[]
  port: ShipmentPort[]=[]
  shipmentterm: ShipmentTerm[]=[]
  shipmenttype: ShipmentType[]=[]
}