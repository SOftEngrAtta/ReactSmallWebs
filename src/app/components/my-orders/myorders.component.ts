// Importing Internal Modules
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

// Importing Models
import { IncompleteOrders } from './../../models/incompleteOrder';
import { MyOrder, UtilizationRequest, UtilizationDetail } from './../../models/myOrder';
import { AvailableCurrency } from './../../models/currency';
import { CustomerAddress } from './../../models/CustomerAddress';
import { CustomerAddressDetail } from './../../models/CustomerAddressDetail';

// Importing Services
import { DataService } from '../../Services/data.service';
import { HelperService } from '../../Services/helper.service';
import { StorageService } from './../../Services/storage.service';

// Importing Directive
import { OnlyNumber } from './../../shared/NumberOnly';

// Plug-ins
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';

// enum
import { WonLostInProgressAll } from './../../enums/wonlostprogress';
import { setTimeout } from 'timers';

declare var $;

@Component({
    selector: 'app-home',
    templateUrl: './myorders.component.html',
    styleUrls: ['./myorders.component.css']
})

export class MyOrders implements OnInit {
    valid: boolean = true;
    OrderDetId: number = 0;
    customerDetailsConsignee = new CustomerAddressDetail();
    customerDetailsNotifier = new CustomerAddressDetail();
    customerDetailsCourier = new CustomerAddressDetail();
    customerAddress = new CustomerAddress();
    objMyOrders: Array<IncompleteOrders> = new Array<IncompleteOrders>();
    objOrdersByAgent: Array<MyOrder> = new Array<MyOrder>();
    public isCustomerLogin = false;
    public IsSubmitEnabled = true;
    public IsCourierEnabled = true;
    selectedCurrency: string;
    SelectedOrderDetailId: any;
    Description: string;
    objAvailableCurrency: AvailableCurrency[] = [];
    objUtilizationRequest: UtilizationRequest = new UtilizationRequest();
    objUtilizationDetail: UtilizationDetail = new UtilizationDetail();

    slideConfig = { "slidesToShow": 1, "slidesToScroll": 1 };


   public showsubmitbtn : boolean = false     

    public loadersliderOne: boolean;
    public loadersliderTwo: boolean;
    public loadersliderThree: boolean;

    public is_mant_country_code : any ;
    // public IsBlSurrender : boolean = false 

    public order_condition : any = 'All'; 

    public emailsendloader : boolean = false;

    constructor(private router: Router,
        private dataService: DataService,
        private helperservice: HelperService,
        private storageservice: StorageService,
        private spinnerService: Ng4LoadingSpinnerService,
        private activatedRoute: ActivatedRoute) { }


    ngOnInit() {

        $('body').removeClass('main_login');
        let loginInCustomer = this.storageservice.get('customerlogin');
        if (loginInCustomer) {
            this.isCustomerLogin = true;
        }
        this.activatedRoute.queryParams.subscribe(params => {
            if(params && params.status){
                this.order_condition = params.status;
                this.getMyOrders();
            }else{
                this.getMyOrders();
            }
        })
        this.LoadJs();
        $(".iti-flag").css("margin-left", "6px");


    }

    getOrdersDetail(e){
        if(e == this.order_condition){
            this.helperservice.displayMsg('error','Already selected');
            return false;
        }
        this.order_condition = e;
        this.getMyOrders();
    }
    getMyOrders() {
        // if (this.isCustomerLogin) {
        //     this.dataService.getMyOrders()
        //         .subscribe(res => {

        //             this.objMyOrders = res.Data;
        //             setTimeout(() => {
        //                 this.helperservice.callaccordingtoggle();
        //             }, 200);
        //         });
        // } else {
        //     this.dataService.getOrdersByAgent()
        //         .subscribe(res => {
        //             this.objOrdersByAgent = res.Data;
        //             setTimeout(() => {
        //                 this.helperservice.callaccordingtoggle();
        //             }, 200);
        //         });
        // }


        this.dataService.getOrdersByAgent(WonLostInProgressAll[this.order_condition])
        .subscribe(res => {
            this.objOrdersByAgent = res.Data;
            setTimeout(() => {
                this.helperservice.callaccordingtoggle();
            }, 200);
        });
        
    }

    showUtilizationPopup(OrderDetailId) {
        this.SelectedOrderDetailId = OrderDetailId;
        this.objUtilizationRequest.EncryptedOrderDetailId = OrderDetailId;
        this.dataService.getUtilizationDetail(OrderDetailId)
            .subscribe(res => {
                this.objAvailableCurrency = res.Data.listCurrencies;
                this.selectedCurrency = res.Data.listCurrencies[0].EncryptedCurrencyId;
                this.objUtilizationRequest.EncryptedCurrencyId = res.Data.listCurrencies[0].EncryptedCurrencyId;
                this.objUtilizationDetail = res.Data;
                $.fancybox.open({
                    src: '#RequestUtilizationPop',
                    modal: true
                });
            });
    }

    generateUtilizationRequest() {
        $.fancybox.close();

        if (this.objUtilizationRequest.Amount == 0 || this.objUtilizationRequest.Amount == null) {
            this.helperservice.displayMsg('error','Please enter valid amount!');return false;
        }
        if (this.objUtilizationRequest.Description == null ||
            this.objUtilizationRequest.Description.trim() == '') {
            this.helperservice.displayMsg('error' , 'Please enter description!');return false;
        }
        if (this.objUtilizationRequest.Amount > this.objUtilizationDetail.RequestLimit) {
            this.helperservice.displayMsg('error','Amount requested is greater than available request limit!');
            return false;
        }
        if (this.objUtilizationRequest.Amount > (this.objUtilizationDetail.CNF - this.objUtilizationDetail.RequestedUtilizationAmount
            - this.objUtilizationDetail.AmountReceived)) {
            this.helperservice.displayMsg('error' , 'Amount requested is greater than available CNF limit!');
            return false;
        }
        this.dataService.generateUtilizationRequest(this.objUtilizationRequest)
            .subscribe(res => {
                this.getMyOrders();
                if (res.Data) {
                    $.fancybox.open({
                        src: '#finalpop',
                        modal: true
                    });
                }
                else {
                    $.fancybox.open({
                        src: '#finalpop',
                        modal: true
                    });
                }
            });
        this.objUtilizationRequest = new UtilizationRequest();
        this.objUtilizationRequest.Description = '';
        this.objUtilizationRequest.EncryptedCurrencyId = this.selectedCurrency;
        this.objUtilizationRequest.Amount = null;
    }    

    OpenConsigneePopup(OrderDetailId, CountryCode, Email, PhoneNumber, OrderDetailStatusId, ShipmentStatusId) {        

        this.IsConsigneeSubmitEnabled(OrderDetailStatusId, ShipmentStatusId);        

        this.spinnerService.show();
        this.RefreshPopUpContent();
        this.loadersliderOne = true;
        this.loadersliderTwo = true;

        setTimeout(() => {
            this.dataService.getAllShipmentAddress(OrderDetailId)
                .subscribe(res => {
                    this.loadersliderOne = false;
                    this.loadersliderTwo = false;
                    this.customerAddress.ConsigneeList = res.Data.CustomerAddress.ConsigneeAddresses.Address;
                    this.customerAddress.NotifierList = res.Data.CustomerAddress.NotifierAddresses.Address;

                    if (res.Data.CustomerOrderAddress.ConsigneeAddresses.Address.length) {
                        this.customerDetailsConsignee = res.Data.CustomerOrderAddress.ConsigneeAddresses.Address[0];
                        if (this.customerDetailsConsignee.CountryCode) {

                            this.is_mant_country_code = this.customerDetailsConsignee.CountryCode;

                            $(".consignee .phone").intlTelInput("setCountry", this.customerDetailsConsignee.CountryCode);
                        }

                        
                    }
                    else {

                        this.is_mant_country_code = CountryCode ;

                        $(".consignee .phone").intlTelInput("setCountry", CountryCode);
                        this.customerDetailsConsignee.Contact = PhoneNumber;
                        this.customerDetailsConsignee.Email = Email;

                    }

                    if (res.Data.CustomerOrderAddress.NotifierAddresses.Address.length) {
                        this.customerDetailsNotifier = res.Data.CustomerOrderAddress.NotifierAddresses.Address[0];                        
                        if (this.customerDetailsNotifier.CountryCode) {
                            $(".notifier .phone").intlTelInput("setCountry", this.customerDetailsNotifier.CountryCode);
                        }
                    }
                    else {
                        $(".notifier .phone").intlTelInput("setCountry", CountryCode);
                        this.customerDetailsNotifier.Contact = PhoneNumber;
                        this.customerDetailsNotifier.Email = Email;
                    }
                    
                    this.OrderDetId = OrderDetailId;

                    $.fancybox.open({
                        src: '#consigneedet-pop',
                        modal: true
                    });

                });
        }, 1000)
    }

    OpenCourierPopup(OrderDetailId, CountryCode, Email, PhoneNumber, OrderDetailStatusId, IsCourierVerified) {

        this.IsCourierSubmitEnabled(OrderDetailStatusId, IsCourierVerified);

        this.spinnerService.show();
        this.RefreshPopUpContent();
        this.loadersliderThree = true;

        setTimeout(() => {
            this.dataService.getAllShipmentAddress(OrderDetailId)
                .subscribe(res => {
                    this.loadersliderThree = false;

                    this.customerAddress.CourierList = res.Data.CustomerAddress.CourierAddresses.Address;

                    if (res.Data.CustomerOrderAddress.CourierAddresses.Address.length) {
                        this.customerDetailsCourier = res.Data.CustomerOrderAddress.CourierAddresses.Address[0];
                        if (this.customerDetailsCourier.CountryCode) {
                            $(".courier .phone").intlTelInput("setCountry", this.customerDetailsCourier.CountryCode);
                        }
                    }
                    else {
                        $(".courier .phone").intlTelInput("setCountry", CountryCode);
                        this.customerDetailsCourier.Contact = PhoneNumber;
                        this.customerDetailsCourier.Email = Email;
                    }

                    this.OrderDetId = OrderDetailId;

                });
        }, 1000)

    }

    LoadJs() {

        $(".phone").intlTelInput({
            initialCountry: "us",
            separateDialCode: true,
            geoIpLookup: function (callback) {
                $.get("https://ipinfo.io", function () { }, "jsonp").always(function (resp) {
                    var countryCode = (resp && resp.country) ? resp.country : "";
                    callback(countryCode);
                });
            }
        });
    }

    // check checkIsBlSurrender functionality 
    // checkIsBlSurrender(){
    //     if(this.IsBlSurrender) this.IsBlSurrender = false;
    //     else this.IsBlSurrender = true ;
    // }

    InsertCustomerAddress() {            

        this.customerDetailsConsignee.OrderDetailId = this.OrderDetId;
        this.customerDetailsNotifier.OrderDetailId = this.OrderDetId;
        this.customerDetailsConsignee.IsBlSurrender = this.customerDetailsNotifier.IsBlSurrender;
        this.customerDetailsConsignee.AddressTypeId = 1;
        this.customerDetailsNotifier.AddressTypeId = 2;
        this.customerDetailsConsignee.CountryCode = $(".consignee .phone").intlTelInput("getSelectedCountryData").iso2.toUpperCase();
        this.customerDetailsNotifier.CountryCode = $(".notifier .phone").intlTelInput("getSelectedCountryData").iso2.toUpperCase();        

        this.valid = this.ValidateAndSetShipmentAddressData();
        
        if (this.valid != false) {



            // if(this.customerAddress &&  this.customerAddress.CustomerAddressRequest && this.customerAddress.CustomerAddressRequest.length){
            //     for(let i = 0 ; i < this.customerAddress.CustomerAddressRequest.length ; i++){
            //         this.customerAddress.CustomerAddressRequest[i]['IsBlSurrender'] = this.IsBlSurrender ;
            //     }
            // }

            this.dataService.InsertShipmentAddress(this.customerAddress.CustomerAddressRequest)
                .subscribe(res => {
                    // this.IsBlSurrender = false ;
                    this.helperservice.displayMsg('success','Consignee detail saved successfully');
                    this.customerDetailsConsignee = new CustomerAddressDetail();
                    this.customerDetailsNotifier = new CustomerAddressDetail();
                    $.fancybox.close();
                });
        }

    }

    InsertCourierAddress() {

        // this.spinnerService.show();
        this.customerDetailsCourier.OrderDetailId = this.OrderDetId;
        this.customerDetailsCourier.AddressTypeId = 3;
        this.customerDetailsCourier.CountryCode = $(".courier .phone").intlTelInput("getSelectedCountryData").iso2.toUpperCase();

        this.valid = this.ValidateAndSetCourierShipmentAddress();

        if (this.valid != false) {

            this.showsubmitbtn = true;

            this.dataService.InsertShipmentAddress(this.customerAddress.CustomerAddressRequest)
                .subscribe(res => {
                    this.showsubmitbtn = false ;
                    this.helperservice.displayMsg('success','Courier details saved successfully');
                    this.customerDetailsCourier = new CustomerAddressDetail();                    
                    $.fancybox.close();
                });
        }

    }


    afterChange(e) {
    }


    UseThisAddressForConsignee(Fullname, Address, Contact, Email, City, State, Zip, Terminal, CountryCode) {
        this.customerDetailsConsignee.Fullname = Fullname;
        this.customerDetailsConsignee.Address = Address;
        this.customerDetailsConsignee.Contact = Contact;
        this.customerDetailsConsignee.Email = Email;
        this.customerDetailsConsignee.City = City;
        this.customerDetailsConsignee.State = State;
        this.customerDetailsConsignee.Zip = Zip;
        this.customerDetailsConsignee.Terminal = Terminal;
        $(".consignee .phone").intlTelInput("setCountry", CountryCode);
    }

    UseThisAddressForNotifier(Fullname, Address, Contact, Email, City, State, Zip, Terminal, CountryCode) {
        this.customerDetailsNotifier.Fullname = Fullname;
        this.customerDetailsNotifier.Address = Address;
        this.customerDetailsNotifier.Contact = Contact;
        this.customerDetailsNotifier.Email = Email;
        this.customerDetailsNotifier.City = City;
        this.customerDetailsNotifier.State = State;
        this.customerDetailsNotifier.Zip = Zip;
        this.customerDetailsNotifier.Terminal = Terminal;
        $(".notifier .phone").intlTelInput("setCountry", CountryCode);
    }

    UseThisAddressForCourier(Fullname, Address, Contact, Email, City, State, Zip, Terminal, CountryCode) {
        this.customerDetailsCourier.Fullname = Fullname;
        this.customerDetailsCourier.Address = Address;
        this.customerDetailsCourier.Contact = Contact;
        this.customerDetailsCourier.Email = Email;
        this.customerDetailsCourier.City = City;
        this.customerDetailsCourier.State = State;
        this.customerDetailsCourier.Zip = Zip;
        this.customerDetailsCourier.Terminal = Terminal;
        $(".courier .phone").intlTelInput("setCountry", CountryCode);
    }

    SameAsConsignee() {

        $(".notifier .phone").intlTelInput("setCountry", $(".consignee .phone").intlTelInput("getSelectedCountryData").iso2.toLowerCase());

        this.customerDetailsNotifier.Fullname = this.customerDetailsConsignee.Fullname;
        this.customerDetailsNotifier.Address = this.customerDetailsConsignee.Address;
        this.customerDetailsNotifier.Contact = this.customerDetailsConsignee.Contact;
        this.customerDetailsNotifier.Email = this.customerDetailsConsignee.Email;
        this.customerDetailsNotifier.City = this.customerDetailsConsignee.City;
        this.customerDetailsNotifier.State = this.customerDetailsConsignee.State;
        this.customerDetailsNotifier.Zip = this.customerDetailsConsignee.Zip;
        this.customerDetailsNotifier.Terminal = this.customerDetailsConsignee.Terminal;
    }

    RefreshPopUpContent() {

        $(".consignee-name").css("border", "1px solid #c2c2c2");
        $(".consignee-address").css("border", "1px solid #c2c2c2");
        $(".consignee-email").css("border", "1px solid #c2c2c2");
        $(".consignee-city").css("border", "1px solid #c2c2c2");
        $(".consignee .phone").css("border", "1px solid #c2c2c2");
        $(".consignee .phone").intlTelInput("setCountry", "us");

        $(".notifier-name").css("border", "1px solid #c2c2c2");
        $(".notifier-address").css("border", "1px solid #c2c2c2");
        $(".notifier-email").css("border", "1px solid #c2c2c2");
        $(".notifier-city").css("border", "1px solid #c2c2c2");
        $(".notifier .phone").css("border", "1px solid #c2c2c2");
        $(".notifier .phone").intlTelInput("setCountry", "us");

        $(".courier-name").css("border", "1px solid #c2c2c2");
        $(".courier-address").css("border", "1px solid #c2c2c2");
        $(".courier .phone").css("border", "1px solid #c2c2c2");
        $(".courier-email").css("border", "1px solid #c2c2c2");
        $(".courier-city").css("border", "1px solid #c2c2c2");
        $(".courier-zip").css("border", "1px solid #c2c2c2");
        $(".courier .phone").intlTelInput("setCountry", "us");

        this.customerDetailsConsignee = new CustomerAddressDetail();
        this.customerDetailsNotifier = new CustomerAddressDetail();
        this.customerDetailsCourier = new CustomerAddressDetail();
    }


    ValidateAndSetShipmentAddressData() {        
        
        $(".consignee-name").css('border' , "1px solid rgb(194, 194, 194)");
        $(".consignee-address").css('border' , "1px solid rgb(194, 194, 194)");
        $(".consignee .phone").css('border' , "1px solid rgb(194, 194, 194)");
        $(".consignee-email").css('border' , "1px solid rgb(194, 194, 194)");
        $(".consignee-city").css('border' , "1px solid rgb(194, 194, 194)");
        $(".consignee-zip").css('border' , "1px solid rgb(194, 194, 194)");

        $(".notifier-name").css('border' , "1px solid rgb(194, 194, 194)");
        $(".notifier-address").css('border' , "1px solid rgb(194, 194, 194)");
        $(".notifier .phone").css('border' , "1px solid rgb(194, 194, 194)");
        $(".notifier-email").css('border' , "1px solid rgb(194, 194, 194)");
        $(".notifier-city").css('border' , "1px solid rgb(194, 194, 194)");
        $(".notifier-zip").css('border' , "1px solid rgb(194, 194, 194)");                        

        
        if (
            this.customerDetailsConsignee.CountryCode != "PK" && this.customerDetailsNotifier.CountryCode != "PK" && this.customerDetailsNotifier.Address != null && this.customerDetailsNotifier.Address != "" && this.customerDetailsNotifier.Address != "undefined" && this.customerDetailsNotifier.Fullname != null && this.customerDetailsNotifier.Fullname != "" && this.customerDetailsNotifier.Fullname != "undefined" && this.customerDetailsConsignee.Address != null && this.customerDetailsConsignee.Address != "" && this.customerDetailsConsignee.Address != "undefined" && this.customerDetailsConsignee.Fullname != null && this.customerDetailsConsignee.Fullname != "" && this.customerDetailsConsignee.Fullname != "undefined" && this.customerDetailsNotifier.Contact != null && this.customerDetailsNotifier.Contact != "" && this.customerDetailsNotifier.Contact != "undefined" && this.customerDetailsConsignee.Contact != null && this.customerDetailsConsignee.Contact != "" && this.customerDetailsConsignee.Contact != "undefined" &&
            this.customerDetailsNotifier.Email != null && this.customerDetailsNotifier.Email != "" && this.customerDetailsNotifier.Email != "undefined" && this.customerDetailsNotifier.City != null && this.customerDetailsNotifier.City != "" && this.customerDetailsNotifier.City != "undefined" && // && this.customerDetailsNotifier.Zip != null && this.customerDetailsNotifier.Zip != "" && this.customerDetailsNotifier.Zip != "undefined"
            this.customerDetailsConsignee.Email != null && this.customerDetailsConsignee.Email != "" && this.customerDetailsConsignee.Email != "undefined" && this.customerDetailsConsignee.City != null && this.customerDetailsConsignee.City != "" && this.customerDetailsConsignee.City != "undefined" // && this.customerDetailsConsignee.Zip != null && this.customerDetailsConsignee.Zip != "" && this.customerDetailsConsignee.Zip != "undefined"
        ) {
            this.customerAddress.CustomerAddressRequest[0] = this.customerDetailsConsignee;
            this.customerAddress.CustomerAddressRequest[1] = this.customerDetailsNotifier;
            this.valid = true;
        }
        else if (
            this.customerDetailsConsignee.CountryCode == "PK" && this.customerDetailsNotifier.CountryCode == "PK" && this.customerDetailsNotifier.Address != null && this.customerDetailsNotifier.Address != "" && this.customerDetailsNotifier.Address != "undefined" && this.customerDetailsNotifier.Fullname != null && this.customerDetailsNotifier.Fullname != "" && this.customerDetailsNotifier.Fullname != "undefined" && this.customerDetailsConsignee.Address != null && this.customerDetailsConsignee.Address != "" && this.customerDetailsConsignee.Address != "undefined" && this.customerDetailsConsignee.Fullname != null && this.customerDetailsConsignee.Fullname != "" && this.customerDetailsConsignee.Fullname != "undefined" &&
            this.customerDetailsNotifier.City != null && this.customerDetailsNotifier.City != "" && this.customerDetailsNotifier.City != "undefined" && 
            this.customerDetailsConsignee.City != null && this.customerDetailsConsignee.City != "" && this.customerDetailsConsignee.City != "undefined"
        )
        {
            this.customerAddress.CustomerAddressRequest[0] = this.customerDetailsConsignee;
            this.customerAddress.CustomerAddressRequest[1] = this.customerDetailsNotifier;
            this.valid = true;
        }
        else if (
            this.customerDetailsConsignee.CountryCode == "PK" && this.customerDetailsNotifier.CountryCode != "PK" && this.customerDetailsNotifier.Address != null && this.customerDetailsNotifier.Address != "" && this.customerDetailsNotifier.Address != "undefined" && this.customerDetailsNotifier.Fullname != null && this.customerDetailsNotifier.Fullname != "" && this.customerDetailsNotifier.Fullname != "undefined" && this.customerDetailsConsignee.Address != null && this.customerDetailsConsignee.Address != "" && this.customerDetailsConsignee.Address != "undefined" && this.customerDetailsConsignee.Fullname != null && this.customerDetailsConsignee.Fullname != "" && this.customerDetailsConsignee.Fullname != "undefined" &&
            this.customerDetailsNotifier.City != null && this.customerDetailsNotifier.City != "" && this.customerDetailsNotifier.City != "undefined" && 
            this.customerDetailsConsignee.City != null && this.customerDetailsConsignee.City != "" && this.customerDetailsConsignee.City != "undefined" &&
            this.customerDetailsNotifier.Email != null && this.customerDetailsNotifier.Email != "" && this.customerDetailsNotifier.Email != "undefined" &&
            this.customerDetailsNotifier.Contact != null && this.customerDetailsNotifier.Contact != "" && this.customerDetailsNotifier.Contact != "undefined"
        )
        {
            this.customerAddress.CustomerAddressRequest[0] = this.customerDetailsConsignee;
            this.customerAddress.CustomerAddressRequest[1] = this.customerDetailsNotifier;
            this.valid = true;
        }
        else if (
            this.customerDetailsConsignee.CountryCode != "PK" && this.customerDetailsNotifier.CountryCode == "PK" && this.customerDetailsNotifier.Address != null && this.customerDetailsNotifier.Address != "" && this.customerDetailsNotifier.Address != "undefined" && this.customerDetailsNotifier.Fullname != null && this.customerDetailsNotifier.Fullname != "" && this.customerDetailsNotifier.Fullname != "undefined" && this.customerDetailsConsignee.Address != null && this.customerDetailsConsignee.Address != "" && this.customerDetailsConsignee.Address != "undefined" && this.customerDetailsConsignee.Fullname != null && this.customerDetailsConsignee.Fullname != "" && this.customerDetailsConsignee.Fullname != "undefined" &&
            this.customerDetailsNotifier.City != null && this.customerDetailsNotifier.City != "" && this.customerDetailsNotifier.City != "undefined" && 
            this.customerDetailsConsignee.City != null && this.customerDetailsConsignee.City != "" && this.customerDetailsConsignee.City != "undefined" &&
            this.customerDetailsConsignee.Email != null && this.customerDetailsConsignee.Email != "" && this.customerDetailsConsignee.Email != "undefined" &&
            this.customerDetailsConsignee.Contact != null && this.customerDetailsConsignee.Contact != "" && this.customerDetailsConsignee.Contact != "undefined"
        )
        {
            this.customerAddress.CustomerAddressRequest[0] = this.customerDetailsConsignee;
            this.customerAddress.CustomerAddressRequest[1] = this.customerDetailsNotifier;
            this.valid = true;
        }

        if (
            ((this.customerDetailsConsignee.CountryCode != "PK" && this.customerDetailsNotifier.CountryCode != "PK") && (this.customerDetailsNotifier.Address == null || this.customerDetailsNotifier.Address == "" || this.customerDetailsNotifier.Address == "undefined" || this.customerDetailsNotifier.Fullname == null || this.customerDetailsNotifier.Fullname == "" || this.customerDetailsNotifier.Fullname == "undefined" || this.customerDetailsNotifier.Contact == null || this.customerDetailsNotifier.Contact == "" || this.customerDetailsNotifier.Contact == "undefined" || this.customerDetailsNotifier.Email == null || this.customerDetailsNotifier.Email == "" || this.customerDetailsNotifier.Email == "undefined" || this.customerDetailsNotifier.City == null || this.customerDetailsNotifier.City == "" || this.customerDetailsNotifier.City == "undefined" || //|| this.customerDetailsNotifier.Zip == null || this.customerDetailsNotifier.Zip == "" || this.customerDetailsNotifier.Zip == "undefined"
            this.customerDetailsConsignee.Address == null || this.customerDetailsConsignee.Address == "" || this.customerDetailsConsignee.Address == "undefined" || this.customerDetailsConsignee.Fullname == null || this.customerDetailsConsignee.Fullname == "" || this.customerDetailsConsignee.Fullname == "undefined" || this.customerDetailsConsignee.Contact == null || this.customerDetailsConsignee.Contact == "" || this.customerDetailsConsignee.Contact == "undefined" || this.customerDetailsConsignee.Email == null || this.customerDetailsConsignee.Email == "" || this.customerDetailsConsignee.Email == "undefined" || this.customerDetailsConsignee.City == null || this.customerDetailsConsignee.City == "" || this.customerDetailsConsignee.City == "undefined")) // || this.customerDetailsConsignee.Zip == null || this.customerDetailsConsignee.Zip == "" || this.customerDetailsConsignee.Zip == "undefined"
        ) {

            this.ValidateCommonAddressFields();

            this.ValidateConsigneeEmail();
            this.ValidateConsigneePhone();
            this.ValidateNotifierEmail();
            this.ValidateNotifierPhone();

            this.valid = false;
        }
        else if (
            ((this.customerDetailsConsignee.CountryCode == "PK" && this.customerDetailsNotifier.CountryCode == "PK") && (this.customerDetailsNotifier.Address == null || this.customerDetailsNotifier.Address == "" || this.customerDetailsNotifier.Address == "undefined" || this.customerDetailsNotifier.Fullname == null || this.customerDetailsNotifier.Fullname == "" || this.customerDetailsNotifier.Fullname == "undefined" || this.customerDetailsNotifier.City == null || this.customerDetailsNotifier.City == "" || this.customerDetailsNotifier.City == "undefined" ||
            this.customerDetailsConsignee.Address == null || this.customerDetailsConsignee.Address == "" || this.customerDetailsConsignee.Address == "undefined" || this.customerDetailsConsignee.Fullname == null || this.customerDetailsConsignee.Fullname == "" || this.customerDetailsConsignee.Fullname == "undefined" || this.customerDetailsConsignee.City == null || this.customerDetailsConsignee.City == "" || this.customerDetailsConsignee.City == "undefined"))
        )
        {
            
            this.ValidateCommonAddressFields();

            this.valid = false;
        }
        else if (
            ((this.customerDetailsConsignee.CountryCode == "PK" && this.customerDetailsNotifier.CountryCode != "PK") && (this.customerDetailsNotifier.Address == null || this.customerDetailsNotifier.Address == "" || this.customerDetailsNotifier.Address == "undefined" || this.customerDetailsNotifier.Fullname == null || this.customerDetailsNotifier.Fullname == "" || this.customerDetailsNotifier.Fullname == "undefined" || this.customerDetailsNotifier.City == null || this.customerDetailsNotifier.City == "" || this.customerDetailsNotifier.City == "undefined" ||
            this.customerDetailsConsignee.Address == null || this.customerDetailsConsignee.Address == "" || this.customerDetailsConsignee.Address == "undefined" || this.customerDetailsConsignee.Fullname == null || this.customerDetailsConsignee.Fullname == "" || this.customerDetailsConsignee.Fullname == "undefined" || this.customerDetailsConsignee.City == null || this.customerDetailsConsignee.City == "" || this.customerDetailsConsignee.City == "undefined"
            || this.customerDetailsNotifier.Contact == null || this.customerDetailsNotifier.Contact == "" || this.customerDetailsNotifier.Contact == "undefined" || this.customerDetailsNotifier.Email == null || this.customerDetailsNotifier.Email == "" || this.customerDetailsNotifier.Email == "undefined"
        ))
        )
        {
            this.ValidateCommonAddressFields();

            this.ValidateNotifierEmail();
            this.ValidateNotifierPhone();

            this.valid = false;
        }
        else if (
            ((this.customerDetailsConsignee.CountryCode != "PK" && this.customerDetailsNotifier.CountryCode == "PK") && (this.customerDetailsNotifier.Address == null || this.customerDetailsNotifier.Address == "" || this.customerDetailsNotifier.Address == "undefined" || this.customerDetailsNotifier.Fullname == null || this.customerDetailsNotifier.Fullname == "" || this.customerDetailsNotifier.Fullname == "undefined" || this.customerDetailsNotifier.City == null || this.customerDetailsNotifier.City == "" || this.customerDetailsNotifier.City == "undefined" ||
            this.customerDetailsConsignee.Address == null || this.customerDetailsConsignee.Address == "" || this.customerDetailsConsignee.Address == "undefined" || this.customerDetailsConsignee.Fullname == null || this.customerDetailsConsignee.Fullname == "" || this.customerDetailsConsignee.Fullname == "undefined" || this.customerDetailsConsignee.City == null || this.customerDetailsConsignee.City == "" || this.customerDetailsConsignee.City == "undefined"
            || this.customerDetailsConsignee.Contact == null || this.customerDetailsConsignee.Contact == "" || this.customerDetailsConsignee.Contact == "undefined" || this.customerDetailsConsignee.Email == null || this.customerDetailsConsignee.Email == "" || this.customerDetailsConsignee.Email == "undefined"
        ))
        )
        {
            this.ValidateCommonAddressFields();
            
            this.ValidateConsigneeEmail();
            this.ValidateConsigneePhone();

            this.valid = false;
        }

        return this.valid;
    }


    ValidateAndSetCourierShipmentAddress() {
        
        // var CourierCountryName = $(".courier .phone").intlTelInput("getSelectedCountryData").name.toLowerCase();

        if (this.customerDetailsCourier.Address != null && this.customerDetailsCourier.Address != "" && this.customerDetailsCourier.Address != "undefined" && this.customerDetailsCourier.Fullname != null && this.customerDetailsCourier.Fullname != "" && this.customerDetailsCourier.Fullname != "undefined" && this.customerDetailsCourier.Contact != "undefined" && this.customerDetailsCourier.Contact != "" && this.customerDetailsCourier.Contact != null && this.customerDetailsCourier.Email != "undefined" && this.customerDetailsCourier.Email != "" && this.customerDetailsCourier.Email != null && this.customerDetailsCourier.City != "undefined" && this.customerDetailsCourier.City != "" && this.customerDetailsCourier.City != null && this.customerDetailsCourier.Zip != "undefined" && this.customerDetailsCourier.Zip != "" && this.customerDetailsCourier.Zip != null ) { //&& this.customerDetailsCourier.Address.trim().toLowerCase().indexOf(this.customerDetailsCourier.City.trim().toLowerCase()) === -1 && this.customerDetailsCourier.Address.trim().toLowerCase().indexOf(CourierCountryName) === -1 && this.customerDetailsCourier.Address.trim().toLowerCase().indexOf(this.customerDetailsCourier.State.trim().toLowerCase()) === -1
            this.customerAddress.CustomerAddressRequest[0] = this.customerDetailsCourier;
            this.valid = true;
        }

        if (this.customerDetailsCourier.Address == null || this.customerDetailsCourier.Address == "" || this.customerDetailsCourier.Address == "undefined" || this.customerDetailsCourier.Fullname == null || this.customerDetailsCourier.Fullname == "" || this.customerDetailsCourier.Fullname == "undefined" || this.customerDetailsCourier.Contact == null || this.customerDetailsCourier.Contact == "" || this.customerDetailsCourier.Contact == "undefined" || this.customerDetailsCourier.Email == null || this.customerDetailsCourier.Email == "" || this.customerDetailsCourier.Email == "undefined" || this.customerDetailsCourier.City == null || this.customerDetailsCourier.City == "" || this.customerDetailsCourier.City == "undefined" || this.customerDetailsCourier.Zip == null || this.customerDetailsCourier.Zip == "" || this.customerDetailsCourier.Zip == "undefined" ) { //|| this.customerDetailsCourier.Address.trim().toLowerCase().indexOf(this.customerDetailsCourier.City.trim().toLowerCase()) !== -1 || this.customerDetailsCourier.Address.trim().toLowerCase().indexOf(CourierCountryName) !== -1 || this.customerDetailsCourier.Address.trim().toLowerCase().indexOf(this.customerDetailsCourier.State.trim().toLowerCase()) !== -1

            if (this.customerDetailsCourier.Fullname == null || this.customerDetailsCourier.Fullname == "" || this.customerDetailsCourier.Fullname == "undefined") {
                $(".courier-name").css("border", "1px solid red");
            }
            else {
                $(".courier-name").css("border", "1px solid #c2c2c2");
            }

            if (this.customerDetailsCourier.Address == null || this.customerDetailsCourier.Address == "" || this.customerDetailsCourier.Address == "undefined") {
                $(".courier-address").css("border", "1px solid red");
            }
            else {
                $(".courier-address").css("border", "1px solid #c2c2c2");
            }

            if (this.customerDetailsCourier.Contact == null || this.customerDetailsCourier.Contact == "" || this.customerDetailsCourier.Contact == "undefined") {
                $(".courier .phone").css("border", "1px solid red");
            }
            else {
                $(".courier .phone").css("border", "1px solid #c2c2c2");
            }

            if (this.customerDetailsCourier.Zip == null || this.customerDetailsCourier.Zip == "" || this.customerDetailsCourier.Zip == "undefined") {
                $(".courier-zip").css("border", "1px solid red");
            }
            else {
                $(".courier-zip").css("border", "1px solid #c2c2c2");
            }

            if (this.customerDetailsCourier.City == null || this.customerDetailsCourier.City == "" || this.customerDetailsCourier.City == "undefined") {
                $(".courier-city").css("border", "1px solid red");
            }
            else {
                $(".courier-city").css("border", "1px solid #c2c2c2");
            }

            if (this.customerDetailsCourier.Email == null || this.customerDetailsCourier.Email == "" || this.customerDetailsCourier.Email == "undefined") {
                $(".courier-email").css("border", "1px solid red");
            }
            else {
                $(".courier-email").css("border", "1px solid #c2c2c2");
            }

            // if (this.customerDetailsCourier.Address.trim().toLowerCase().indexOf(CourierCountryName) !== -1 || this.customerDetailsCourier.Address.trim().toLowerCase().indexOf(this.customerDetailsCourier.State.trim().toLowerCase()) !== -1 || this.customerDetailsCourier.Address.trim().toLowerCase().indexOf(this.customerDetailsCourier.City.trim().toLowerCase()) !== -1) {

            //     var ErrorVal = [];

            //     if (this.customerDetailsCourier.Address.trim().toLowerCase().indexOf(CourierCountryName) !== -1) {
            //         ErrorVal.push("Country");
            //     }

            //     if (this.customerDetailsCourier.Address.trim().toLowerCase().indexOf(this.customerDetailsCourier.State.trim().toLowerCase()) !== -1) {
            //         ErrorVal.push("State");
            //     }

            //     if (this.customerDetailsCourier.Address.trim().toLowerCase().indexOf(this.customerDetailsCourier.City.trim().toLowerCase()) !== -1) {
            //         ErrorVal.push("City");
            //     }


            //     if (ErrorVal.length > 0) {
            //         var ErrorMsg = "* Address Box Cannot Contain ";
            //         for (var i = 0; i < ErrorVal.length; i++) {
            //             if (i == 0) {
            //                 ErrorMsg = ErrorMsg + ErrorVal[i];
            //             }
            //             else if (i == 2) {
            //                 ErrorMsg = ErrorMsg + " and " + ErrorVal[i];
            //             }
            //             else {
            //                 ErrorMsg = ErrorMsg + ", " + ErrorVal[i];
            //             }

            //         }
            //     }

            //     $(".Error-Msg").text(ErrorMsg);

            // }
            this.valid = false;
        }

        return this.valid;
    }

    IsRequestUtilizationVisible(OrderDetailStatusId, RemainingAmount) {
        if (!(OrderDetailStatusId >= 1120 && OrderDetailStatusId <= 1160) && ((OrderDetailStatusId >= 1080 && OrderDetailStatusId <= 1100) || (OrderDetailStatusId >= 1080 && RemainingAmount > 0) || (OrderDetailStatusId == 3001 && RemainingAmount > 0))) {
            return true;
        } else {
            return false;
        }
    }

    IsConsigneeSubmitEnabled(OrderDetailStatusId, ShipmentStatusId) {
        if (OrderDetailStatusId == 1080 || OrderDetailStatusId == 1090 || OrderDetailStatusId == 1100 || OrderDetailStatusId == 1110) {
            if(ShipmentStatusId  && ShipmentStatusId != null && ShipmentStatusId != 60010){                
                this.IsSubmitEnabled = false;
            }
            else{
                this.IsSubmitEnabled = true;
            }
        }
        else{
            this.IsSubmitEnabled = true;
        }
    }

    IsCourierSubmitEnabled(OrderDetailStatusId, IsCourierVerified) {        

        if (OrderDetailStatusId == 1080 || OrderDetailStatusId == 1090  || OrderDetailStatusId == 1100  ) {
            if(!IsCourierVerified || IsCourierVerified == null) {
                this.IsCourierEnabled = true;
            }
            else{
                this.IsCourierEnabled = false;
            }
        } else {
            this.IsCourierEnabled = false;
        }
    }


    IsShipmentFormVisible(OrderDetailStatusId) {        
        if (OrderDetailStatusId == 1080 || OrderDetailStatusId == 1090 || OrderDetailStatusId == 1100) {
            return true;
        } else {
            return false;
        }
    }

    IsCourierForm(OrderDetailStatusId) {
        if (OrderDetailStatusId == 1080 || OrderDetailStatusId == 1090  || OrderDetailStatusId == 1100  ) {
            return true;            
        } else {
            return false;
        }
    }

    ValidateCommonAddressFields()
    {
        if (this.customerDetailsConsignee.Fullname == null || this.customerDetailsConsignee.Fullname == "" || this.customerDetailsConsignee.Fullname == "undefined") {
            $(".consignee-name").css("border", "1px solid red");
        }
        else {
            $(".consignee-name").css("border", "1px solid #c2c2c2");
        }

        if (this.customerDetailsConsignee.Address == null || this.customerDetailsConsignee.Address == "" || this.customerDetailsConsignee.Address == "undefined") {
            $(".consignee-address").css("border", "1px solid red");
        }
        else {
            $(".consignee-address").css("border", "1px solid #c2c2c2");
        }
        
        if (this.customerDetailsConsignee.City == null || this.customerDetailsConsignee.City == "" || this.customerDetailsConsignee.City == "undefined") {
            $(".consignee-city").css("border", "1px solid red");
        }
        else {
            $(".consignee-city").css("border", "1px solid #c2c2c2");
        }

        if (this.customerDetailsNotifier.Fullname == null || this.customerDetailsNotifier.Fullname == "" || this.customerDetailsNotifier.Fullname == "undefined") {
            $(".notifier-name").css("border", "1px solid red");
        }
        else {
            $(".notifier-name").css("border", "1px solid #c2c2c2");
        }

        if (this.customerDetailsNotifier.Address == null || this.customerDetailsNotifier.Address == "" || this.customerDetailsNotifier.Address == "undefined") {
            $(".notifier-address").css("border", "1px solid red");
        }
        else {
            $(".notifier-address").css("border", "1px solid #c2c2c2");
        }

        if (this.customerDetailsNotifier.City == null || this.customerDetailsNotifier.City == "" || this.customerDetailsNotifier.City == "undefined") {
            $(".notifier-city").css("border", "1px solid red");
        }
        else {
            $(".notifier-city").css("border", "1px solid #c2c2c2");
        }
    }

    ValidateConsigneePhone()
    {
        if ( this.customerDetailsConsignee.Contact == null || this.customerDetailsConsignee.Contact == "" || this.customerDetailsConsignee.Contact == "undefined") {
            $(".consignee .phone").css("border", "1px solid red");
        }
        else {
            $(".consignee .phone").css("border", "1px solid #c2c2c2");
        }
    }

    ValidateNotifierPhone()
    {
        if ( this.customerDetailsNotifier.Contact == null || this.customerDetailsNotifier.Contact == "" || this.customerDetailsNotifier.Contact == "undefined") {
            $(".notifier .phone").css("border", "1px solid red");
        }
        else {
            $(".notifier .phone").css("border", "1px solid #c2c2c2");
        }
    }

    ValidateConsigneeEmail()
    {
        if ( this.customerDetailsConsignee.Email == null || this.customerDetailsConsignee.Email == "" || this.customerDetailsConsignee.Email == "undefined") {
            $(".consignee-email").css("border", "1px solid red");
        }
        else {
            $(".consignee-email").css("border", "1px solid #c2c2c2");
        }
    }

    ValidateNotifierEmail()
    {      
        if ( this.customerDetailsNotifier.Email == null || this.customerDetailsNotifier.Email == "" || this.customerDetailsNotifier.Email == "undefined") {
            $(".notifier-email").css("border", "1px solid red");
        }
        else {
            $(".notifier-email").css("border", "1px solid #c2c2c2");
        }
    }

    sendEmail(id){
        this.emailsendloader = true ;
        this.dataService
        .sendorderprocessemail(id)
        .subscribe(res=>{
            if(res){
                this.emailsendloader = false;
                this.helperservice.displayMsg('success' , 'Email has been send successfully');
            }else {
                this.emailsendloader = false;
                this.helperservice.displayMsg('error','Email not send');
            }
        })
    }


    // alphabetic caps functionality 
    alphabeticCapsOn(key){
        if(key == 'full name' && this.customerDetailsConsignee.Fullname){
			this.customerDetailsConsignee.Fullname = this.customerDetailsConsignee.Fullname.replace(/[^a-zA-Z 0-9 \-\/]/g, "").toUpperCase();	
        }
        
        if(key == 'city' && this.customerDetailsConsignee.City){
            this.customerDetailsConsignee.City = this.customerDetailsConsignee.City.replace(/[^a-zA-Z 0-9 \-\/]/g, "").toUpperCase();
        }

        if(key == 'state' && this.customerDetailsConsignee.State){
            this.customerDetailsConsignee.State = this.customerDetailsConsignee.State.replace(/[^a-zA-Z 0-9 \-\/]/g, "").toUpperCase();
        }

        if(key == 'zipcode' && this.customerDetailsConsignee.Zip){
            this.customerDetailsConsignee.Zip = this.customerDetailsConsignee.Zip.replace(/[^a-zA-Z 0-9 \-\/]/g, "").toUpperCase();
        }

        if(key == 'terminal' && this.customerDetailsConsignee.Terminal){
            this.customerDetailsConsignee.Terminal = this.customerDetailsConsignee.Terminal.replace(/[^a-zA-Z 0-9 \-\/]/g, "").toUpperCase();
        }

        if(key == 'address' && this.customerDetailsConsignee.Address){
            this.customerDetailsConsignee.Address = this.customerDetailsConsignee.Address.replace(/[^a-zA-Z 0-9 \-\/]/g, "").toUpperCase();
        }
        
    }

}
