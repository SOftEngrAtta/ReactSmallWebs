
export class IncompleteOrders {
    EncryptedOrderId: string;
    OrderDisplayId: string;
    CarGroups: Array<IncompleteOrderGroups> = [new IncompleteOrderGroups()];
}

export class IncompleteOrderGroups {
    EncryptedOrderItemId: string;
    GroupName: string;
    ItemsRequired: number;
    GroupItems: Array<IncompleteOrderGroupItems> = [new IncompleteOrderGroupItems()];
}

export class IncompleteOrderGroupItems {
    EncryptedOrderId: string;
    EncryptedOrderItemId: string;
    EncryptedOrderDetailId: string;
    EncryptedAuctionId: string;
    OrderDisplayId: string;
    MakerName: string;
    ModelName: string;
    ModelYear: number;
    ChassisNumber: string;
    Mileage: number;
    CarImage: string;
    CNF: string;
    BidPrice: number;
    FreightCharges: number;
    InspectionCharges: number;
    M3: number;
    ServiceCharges: number;
    OrderDetailStatus: string;
}
