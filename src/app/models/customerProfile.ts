export class CustomerProfileDetail{
    Id : Number ;
    CustomerId : Number = 0;
    FullName : String = '';
    FirstName : String = '';
    LastName : String = '';
    Phone1No : String = '';
    Phone1CountryCode : String = '';
    Phone2No : String = '';
    Phone2CountryCode : String = '';
    TelephoneNo : String = '';
    TelePhoneDialCode : String = '';
    Occupation : String = '';
    FirstTimeImport : String = ''; // Preference tab (key name preference) 
    PreferedSteering : String = ''; // Preference tab (Preferred Steering) 
    PreferBuying : String = ''; // Preference tab (Do You Prefer Buying from Stock or Auction?)
    CountryCode : String = ''; 
    CustomerTypeId : Number = 0;
    AgentCode : Number = 0;
    Gender : String = '';
    BirthDate : String = '';
    ShipmentCountryId : Number = 0;
    Address : String = '';
    PortId : Number = 0;
    ZipCode : String = '';
    State : String = '';
    Message : String = '';
    PermitType : String = '';
    PermitDate : any = null;
    BusinessDetailList : String = '';
    BusinessStructure : String = '';
    ReceiveNotificationForAutorod : any ;
    CompanyName : String = '';
    PurchasePurposeId : String = '';
    InterestedVehicleDetailsList : any = [];
    CompanyWebsite : String = '';
    MonthlyVehicles : String = '';
    BusinessName : String = '';
    profileupdated : boolean = false;
    MembershipId : Number
}

