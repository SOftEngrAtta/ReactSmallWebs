export class PaymentPlan {
    id: number;
    package_Id: number;
    plan_Id: number;
    countryCode: string;
    upFrontAmount: number;
    plan: Plan;
    package?: any;
    shipmentTerms?: any;
}

export class Plan {
    id: number;
    name: string;
    description: string;
    percentOff: number;
}
