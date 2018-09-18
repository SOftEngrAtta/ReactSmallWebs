export class OrderDetail {
    OrderDetailId: string;
    AuctionImage: string;
    Chassis: string;
    Year: number;
    Model: string;
    Make: string;
    ModelId: number;
    MakeId: number;
    ServiceCharges: number;
    BidPrice: number;
    FOB: number;
    FreightCharges: number;
    RikusoCharges?: any;
    InspectionCharges: number;
    CNF: number;
    Dimension: number;
    Mileage: number;
    Transmission: string;
    CurrencySymbol: string;
    CurrencyCode: string;
    AuctionHouse?: any;
    Color: string;
    EngineCC: number;
    PreConfirmedAmount?: any;
    ReceivedAmount?: any;
    RemainingAmount: number;
    RequestedUtilied?: any;
    PurchaseDate?: any;
    PurchaseAmount?: any;
    OrderDetailStatusId: number;
    OrderDetailDisplayId: string;
    Status: string;
    AuctionTypeId: number;
    AuctionTypeName: string;
    OrderDetailStatus: string;
}

export class OrderItem {
    OrderItemId: string;
    OrderDetails: OrderDetail[];
    OrderItemCount: number;
    OrderPurchaseCount: number;
}

export class MyOrder {
    OrderId: string;
    CreditLimit?: any;
    OrderItems: OrderItem[];
    Membership: string;
    CountryName: string;
    CountryCode: string;
    Email: string;
    PhoneNumber: string;
    PortName: string;
    PlanName: string;
    ShipmentTerm: string;
    ShipmentType: string;
    OrderStatusId: number;
    OrderDisplayId: string;
    PricingTypeId : number;
}

export class UtilizationRequest {
    EncryptedOrderDetailId: string;
    EncryptedCurrencyId: string;
    Description: string;
    Amount: number;
}

export class UtilizationDetail {
    TotalFundAmount: number;
    TotalUtilizedAmount: number;
    TotalRemainingAmount: number;
    CNF: number;
    RequestnUtilized: number;
    RequestedUtilizationAmount: number;
    AmountReceived: number;
    CurrencySymbol: string;
    RequestLimit: number;
}
