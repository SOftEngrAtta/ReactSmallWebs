import { CustomerAddressDetail } from "./CustomerAddressDetail";

export class CustomerAddress
{        
    ConsigneeList : CustomerAddressDetail[] = []
    NotifierList : CustomerAddressDetail[] = []
    CourierList : CustomerAddressDetail[] = []
    ThirdPartyList : CustomerAddressDetail[] = []

    Consignee : CustomerAddressDetail
    Notifier : CustomerAddressDetail
    Courier : CustomerAddressDetail
    ThirdParty : CustomerAddressDetail

    CustomerAddressRequest : CustomerAddressDetail[] = []
}