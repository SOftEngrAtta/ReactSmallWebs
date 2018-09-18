import { ShipmentTerm } from "./shipmentTerm";
import { ShipmentCountry } from "./shipmentCountry";
import { ShipmentPort } from "./shipmentPort";
import { ShipmentType } from "./shipmentType";
import { QuatationType } from "./qutationType";

export class CustomerShipmentDetail{
  QuatationType: QuatationType
  ShipmentCountry: ShipmentCountry
  ShipmentPort: ShipmentPort
  ShipmentType: ShipmentType
  ShipmentTerm: ShipmentTerm;
}