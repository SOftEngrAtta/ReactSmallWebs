import { BidPriceOrderDetail } from './bidpriceorder'

export class CompleteOrder {
  CountryCode: string
  CountryName: string
  CreditLimit: string
  Membership: string
  OrderDisplayId: string
  OrderId: string
  OrderItems: OrderItem[] = []
  OrderStatusId: string
  PlanName: string
  PortName: string
  PricingTypeId: string
  ShipmentTerm: string
  ShipmentType: string
}

export class OrderItem {
  OrderDetails: any[] = []
  OrderItemCount: number
  OrderItemId: number
  OrderPurchaseCount: number
}
