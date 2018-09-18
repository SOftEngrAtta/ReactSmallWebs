// modules
import {
    Component,
    OnInit
} from '@angular/core';
import {
    window
} from 'rxjs/operators/window';
import {
    Router,
    ActivatedRoute,
    Params
} from '@angular/router';
// end


// services
import {
    DashboardServices
} from '../../Services/dashboard.service';
import {
    StorageService
} from '../../Services/storage.service';
import {
    HelperService
} from '../../Services/helper.service';
import {
    DataService
} from '../../Services/data.service';
import {
    ToastrService
} from '../../Services/toastr.service';

// end 

// models 
import {
    IndividualDealer
} from '../../models/individualdealer';
import { CustomerAddress } from './../../models/CustomerAddress';
import { CustomerAddressDetail } from './../../models/CustomerAddressDetail';
import { CustomerInformation } from './../../models/customerInformation';
import { CustomerShipmentDetail } from '../../models/customerShipmentDetail';
import { ShipmentDetail } from '../../models/shipmentDetail';
import { CustomerProfileDetail } from '../../models/customerProfile';
import { setTimeout } from 'timers';



declare var $;
declare var moment;

@Component({
    selector: 'app-profile',
    templateUrl: './userprofile.component.html',
    styleUrls: ['./userprofile.component.css']
})
export class UserProfile implements OnInit {

    customerDetailsConsignee = new CustomerAddressDetail();
    customerDetailsNotifier = new CustomerAddressDetail();
    customerDetailsCourier = new CustomerAddressDetail();
    customerDetailsThirdParty = new CustomerAddressDetail();
    customerAddress = new CustomerAddress();
    CustomerInformation = new CustomerInformation();
    shipmentDetail = new ShipmentDetail();
    customerShipmentDetail = new CustomerShipmentDetail();
    removeCustomerAddress = new CustomerAddressDetail();

    IsValidiation: boolean = true;
    ObjConsigneeAddress: any;
    ObjNotifierAddress: any;
    ObjCourierAddress: any;
    ObjThirdPartyAddress: any;


    CurrencyNameWitdIds = [{ id: 1, key: 'USD', sign: '$' }, { id: 2, key: 'JPY', sign: '¥' }]
    public loaders: { CountryLoader: boolean, DestinationPortLoader: boolean, makeLoader: boolean, modelloader: boolean } = { CountryLoader: false, DestinationPortLoader: false, makeLoader: false, modelloader: false }

    public customerProfile = new CustomerProfileDetail();
    public HeaderInformation : any ;
    
    // profile personal information varibales declare 

    public shipmentCountryPort: { country: any, port: any } = { country: null, port: null };
    public filteredShipmentPorts: any;
    public countrieswithport: any;

    public date_of_birth = { day: [], month: [], year: [] };
    public selected_date_of_birth: any = { day: '', month: '', year: '' };


    // Preference tab individual portion vairables assign 
    public preferenceVehicleList: any = [{ MakeId: '',MakeName: '', ModelId: '',ModelName: '', Year: '', BudgetMinAmount: '', BudgetMaxAmount: '', CurrencyId: 1 }]
    public makes: any; public models: any;
    public preferYears = [];

    // Business Details variables declare 
    public businessDetail: any = [
        { id: 1, name: 'Construction Machinery', isChecked: 'No' },
        { id: 2, name: 'Line of business', isChecked: 'No' },
        { id: 3, name: 'Damaged Car', isChecked: 'No' },
        { id: 4, name: 'Used Car', isChecked: 'No' },
        { id: 5, name: 'Truck', isChecked: 'No' },
        { id: 6, name: 'Auto Parts', isChecked: 'No' },
        { id: 7, name: 'Bus', isChecked: 'No' },
        { id: 8, name: 'Forklifts Farm Machine', isChecked: 'No' }
    ];
    public businessStructure: any = [];


    ProfileTypes = { '1': 'Individual', '2': 'Dealer' };

    profileTypeMembershipPackage = { profileType: '', membershipPackage: '', profileTypeId: 0 };

    public paramType : number = 0; // type individual or dealer;


    constructor(
        private route: ActivatedRoute, private dashboardservice: DashboardServices,
        private storageservice: StorageService, private helperservice: HelperService,
        private dataservice: DataService, private toasterservice: ToastrService,
        private router: Router) { }

    ngOnInit() {
        this.route.queryParams.subscribe(params => {
            this.profileTypeMembershipPackage.profileType = (params && params.id) ? this.ProfileTypes[params.id] : '';
            this.profileTypeMembershipPackage.profileTypeId = (params && params.id) ? params.id : 0;
            this.customerProfile.CustomerTypeId = (params && params.id) ? params.id : 0;
            this.paramType = (params && params.id) ? params.id : 0;
        })

        this.CustomerInformation = this.storageservice.getDecrypted('customerInformation');
        
        

        this.profileTypeMembershipPackage.membershipPackage = this.CustomerInformation['MembershipName'];

        let curr_year = moment().format('YYYY');

        for (let i = 1; i <= 31; i++) { this.date_of_birth.day.push(i); }
        for (let i = 1; i <= 12; i++) { this.date_of_birth.month.push(i); }
        for (let i = curr_year ; i >= 1900; i--) { this.date_of_birth.year.push(i); this.preferYears.push(i) }


        this.changetabs(1);
        this.Get_CustomerShipmentAddresses();
        this.Get_CountryList();
        this.customerProfileFieldsUpdate();
        this.getMakes();

    }

    /**************************
     * tabs open functionality 
     **************************/
    changetabs(_index) {
        if (_index == 1) {
            setTimeout(() => { this.helperservice.loadprofilejs(this.CustomerInformation.CountryCode); }, 200)
        }
        else {
            if(!this.customerProfile.PermitDate){
                setTimeout(() => {
                    let curr_date = moment().format('MM/DD/YYYY');
                    this.helperservice.loadprofilejs(this.CustomerInformation.CountryCode);
                    if (this.profileTypeMembershipPackage.profileTypeId == 1) this.helperservice.openDatePicker('indpermitdate', curr_date);
                    if (this.profileTypeMembershipPackage.profileTypeId == 2) this.helperservice.openDatePicker('dealpermitdate', curr_date);
                }, 200)
            }
        }
    }

    changeType(typeId) {
        this.profileTypeMembershipPackage.profileType = this.ProfileTypes[typeId];
        this.profileTypeMembershipPackage.profileTypeId = typeId;
        this.customerProfile.CustomerTypeId = typeId;
        setTimeout(() => {
            let curr_date = moment().format('MM/DD/YYYY');
            if (typeId == 1) this.helperservice.openDatePicker('indpermitdate' , curr_date);
            if (typeId == 2) this.helperservice.openDatePicker('dealpermitdate' , curr_date);
        }, 200)
    }

    Get_CustomerShipmentAddresses() {
        this.dataservice.Get_CustomerShipmentAddress(this.CustomerInformation.Id)
            .subscribe(res => {

                this.customerAddress.ConsigneeList = res.Data.CustomerAddress.ConsigneeAddresses.Address;
                this.ObjConsigneeAddress = this.customerAddress.ConsigneeList;

                this.customerAddress.NotifierList = res.Data.CustomerAddress.NotifierAddresses.Address;
                this.ObjNotifierAddress = this.customerAddress.NotifierList;

                this.customerAddress.CourierList = res.Data.CustomerAddress.CourierAddresses.Address;
                this.ObjCourierAddress = this.customerAddress.CourierList;

                this.customerAddress.ThirdPartyList = res.Data.CustomerAddress.ThirdPartyAddresses.Address;
                this.ObjThirdPartyAddress = this.customerAddress.ThirdPartyList;

            })
    }

    Get_CountryList() {

        this.loaders.CountryLoader = true; // personal information tab loader
        this.loaders.DestinationPortLoader = true; // personal information tab loader
        this.dashboardservice.getShipmentDetail(this.CustomerInformation.MembershipId)
            .subscribe(res => {

                this.countrieswithport = res.data; // personal information tab vailable 
                this.getCustomerCountryPort(); // personal information tab function 

                this.shipmentDetail = res.data;
                let customer: any = this.CustomerInformation
                if (this.shipmentDetail && this.shipmentDetail.country.length) {
                    for (let i = 0; i < this.shipmentDetail.country.length; i++) {
                        if (customer.ShipmentCountryId) {
                            if (customer.ShipmentCountryId == this.shipmentDetail.country[i]['id']) {
                                this.customerShipmentDetail.ShipmentCountry = this.shipmentDetail.country[i];
                            }
                        }

                        if (customer.CountryId) {
                            if (customer.CountryId == this.shipmentDetail.country[i]['id']) {
                                this.customerShipmentDetail.ShipmentCountry = this.shipmentDetail.country[i];
                            }
                        }

                    }
                }
            })
    }

    /***********************************
     * Personal Information Portion
     **********************************/
    getCustomerCountryPort() {

        if (this.countrieswithport && this.countrieswithport.country.length) {
            for (let i = 0; i < this.countrieswithport.country.length; i++) {
                if (this.CustomerInformation.ShipmentCountryId) {
                    if (this.CustomerInformation.ShipmentCountryId == this.countrieswithport.country[i]['id']) {
                        this.shipmentCountryPort.country = this.countrieswithport.country[i];

                        this.selectedShipmentCountry(this.countrieswithport.country[i]);
                    }
                }

                if (this.CustomerInformation.CountryId) {
                    if (this.CustomerInformation.CountryId == this.countrieswithport.country[i]['id']) {
                        this.shipmentCountryPort.country = this.countrieswithport.country[i];
                        this.selectedShipmentCountry(this.countrieswithport.country[i]);
                    }
                }

            }
            this.loaders.CountryLoader = false;
            this.loaders.DestinationPortLoader = false;
        }
    }

    selectedShipmentCountry(country) {
        this.filteredShipmentPorts = this.countrieswithport.port.filter(x => x.countryCode == country.code)
        if (this.filteredShipmentPorts.length) {
            this.shipmentCountryPort.port = this.filteredShipmentPorts[0];
            for (let i = 0; i < this.filteredShipmentPorts.length; i++) {
                if (this.CustomerInformation.PortId == this.filteredShipmentPorts[i]['id']) {
                    this.shipmentCountryPort.port = this.filteredShipmentPorts[i];
                    break;
                }
            }
        }

    }

    customerProfileFieldsUpdate() {

        // bind alternate number 
        if(this.CustomerInformation['ContactDetails'] && this.CustomerInformation['ContactDetails'].length){            
            this.customerProfile.TelephoneNo = this.CustomerInformation['ContactDetails'][0]['Number'];
            this.customerProfile.Phone2No = (this.CustomerInformation['ContactDetails'].length > 1 )?this.CustomerInformation['ContactDetails'][1]['Number']:'';                
        }

        // birthday 
        let checkbirthdate = moment(this.CustomerInformation['BirthDate']).format('YYYY');
        if(checkbirthdate != '0001' && checkbirthdate != null){
            this.customerProfile.BirthDate = (this.CustomerInformation['BirthDate'])?moment(this.CustomerInformation['BirthDate']).format('YYYY-MM-DD'):'';
            this.selected_date_of_birth.day = (this.customerProfile.BirthDate)?moment(this.customerProfile.BirthDate).format('D'):'';
            this.selected_date_of_birth.month = (this.customerProfile.BirthDate)?moment(this.customerProfile.BirthDate).format('M'):'';
            this.selected_date_of_birth.year = (this.customerProfile.BirthDate)?moment(this.customerProfile.BirthDate).format('Y'):'';
        }

        
        // field business detail list 
        if(this.CustomerInformation['BussniessDetailsList'] && this.CustomerInformation['BussniessDetailsList'].length){
            for(let i = 0 ; i < this.CustomerInformation['BussniessDetailsList'].length ; i++){
                for(let k = 0 ; k < this.businessDetail.length;k++){
                    if(this.businessDetail[k]['id'] == this.CustomerInformation['BussniessDetailsList'][i]){
                        this.businessDetail[k]['isChecked'] = 'Yes' ;
                    }
                }
            }
        }

        // permit date 
        if(this.CustomerInformation['PermitDate']  && this.CustomerInformation['PermitDate'] != null){
            this.customerProfile.PermitDate = moment(this.CustomerInformation['PermitDate']).format('YYYY-MM-DD');     
        }else this.customerProfile.PermitDate = moment().format('YYYY-MM-DD');
        
        if(this.customerProfile.PermitDate){
            let curr_date = moment(this.customerProfile.PermitDate).format('MM/DD/YYYY');
            setTimeout(()=>{
                if (this.profileTypeMembershipPackage.profileTypeId == 1) this.helperservice.openDatePicker('indpermitdate' , curr_date);
                if (this.profileTypeMembershipPackage.profileTypeId == 2) this.helperservice.openDatePicker('dealpermitdate' , curr_date);
            },200)

        }

        // IntrestedVehicleDetailsList
        if(this.CustomerInformation['IntrestedVehicleDetailsList'] && this.CustomerInformation['IntrestedVehicleDetailsList'].length){
            this.preferenceVehicleList = this.CustomerInformation['IntrestedVehicleDetailsList'];
            for(let i = 0 ; i < this.preferenceVehicleList.length;i++){
                if(this.preferenceVehicleList[i]['MakeId']){
                    this.getModels(i);
                }
            }    
        }
        

        // field keys 
        this.customerProfile.AgentCode = (this.storageservice.get('agentcode'))?this.storageservice.get('agentcode'):0;
        this.customerProfile.MembershipId = this.CustomerInformation.MembershipId;
        this.customerProfile.Id = this.CustomerInformation.Id;
        this.customerProfile.CustomerId = this.CustomerInformation.CustomerId;
        this.customerProfile.FirstName = this.CustomerInformation['FirstName'];
        this.customerProfile.LastName = this.CustomerInformation['LastName'];
        this.customerProfile.FullName = this.CustomerInformation['FullName'];
        this.customerProfile.Gender = this.CustomerInformation['Gender'] ;
        this.customerProfile.Address = this.CustomerInformation['Address'];
        this.customerProfile.CompanyName = this.CustomerInformation['CompanyName'];
        this.customerProfile.BusinessName  = this.CustomerInformation['BussniessName'];
        this.customerProfile.CompanyWebsite = this.CustomerInformation['CompanyWebsite'];
        this.customerProfile.Phone1No = this.CustomerInformation['Phone1No'];
        this.customerProfile.MonthlyVehicles = this.CustomerInformation['MonthlyVehicles'];
        this.customerProfile.Message = this.CustomerInformation['Message'];
        this.customerProfile.Occupation = this.CustomerInformation['Occupation'];
        this.customerProfile.FirstTimeImport = this.CustomerInformation['FirstTimeImport'];
        this.customerProfile.BusinessStructure = this.CustomerInformation['BussniessStructure'];
        this.customerProfile.PreferedSteering = this.CustomerInformation['PreferedSteering'];
        this.customerProfile.ReceiveNotificationForAutorod = (this.CustomerInformation['ReceiveNotificationForAutorod'] == true)?'Yes':'No';
        this.customerProfile.PermitType = this.CustomerInformation['PermiTtype'];
        this.customerProfile.PreferBuying = this.CustomerInformation['PreferBuying'];
        this.customerProfile.Phone1CountryCode = this.CustomerInformation.CountryCode;
        this.customerProfile.Phone2CountryCode = this.CustomerInformation.CountryCode;
        this.customerProfile.TelePhoneDialCode = this.CustomerInformation.CountryCode;
        this.customerProfile.CountryCode = this.CustomerInformation.CountryCode;
    }



    saveInfo() {

        this.customerProfile.ShipmentCountryId = this.shipmentCountryPort.country.id;
        this.customerProfile.PortId = this.shipmentCountryPort.port.id;
        let ImagePath = $('#uploadimage').attr('src');

        if (this.profileTypeMembershipPackage.profileTypeId == 1) {
            if (!this.customerProfile.FirstName) { this.helperservice.displayMsg('error', 'Please enter first name'); return false; }
            if (!this.customerProfile.LastName) { this.helperservice.displayMsg('error', 'Please enter last name'); return false; }

        }
        if (!this.customerProfile.Gender) { this.helperservice.displayMsg('error', 'Please select gender'); return false; }
        if (!this.customerProfile.Address) { this.helperservice.displayMsg('error', 'Please enter address'); return false; }

        if (!this.customerProfile.Phone1No && !this.customerProfile.Phone2No) {
            this.helperservice.displayMsg('error', 'Please enter atleast one contact number');return false;
        }

        if (!this.customerProfile.Occupation) { this.helperservice.displayMsg('error', 'Please enter occupation detail'); return false;}

        if (this.selected_date_of_birth.day || this.selected_date_of_birth.month || this.selected_date_of_birth.year) {

            let day_B = parseInt(this.selected_date_of_birth.day);
            let month_B = parseInt(this.selected_date_of_birth.month);
            let year_B = parseInt(this.selected_date_of_birth.year);

            if (!day_B) { this.helperservice.displayMsg('error', 'Please select complete date of birth'); return false; }
            if (!month_B) { this.helperservice.displayMsg('error', 'Please select complete date of birth'); return false; }
            if (!year_B) { this.helperservice.displayMsg('error', 'Please select complete date of birth'); return false; }

            this.customerProfile.BirthDate = this.selected_date_of_birth.year + '-' + this.selected_date_of_birth.month + '-' + this.selected_date_of_birth.day;

        }

        this.saveProfileCompleteDeatail(); // generic profile function call 

    }


    /**** End *****/

    /***********************************
     * Preference Portion
     * *********************************/

    getMakes() {
        this.loaders.makeLoader = true;
        this.dataservice.getMakes()
            .subscribe(res => {
                this.loaders.makeLoader = false;
                if (res.Data && res.Data.length) { 
                    this.makes = res.Data; 
                    
                    if(this.preferenceVehicleList && this.preferenceVehicleList.length){
                        for(let i = 0 ; i < this.preferenceVehicleList.length ; i++){
                            let selectMakeDetail = this.makes.find(e => e.Id == this.preferenceVehicleList[i]['MakeId']);
                            this.preferenceVehicleList[i]['MakeName'] = (selectMakeDetail && selectMakeDetail['Title'])?selectMakeDetail['Title']:'';
                        }
                    }
                
                }
            })
    }

    getModels(index) {
        
        this.loaders.modelloader = true;

        if(this.makes && this.makes.length){
            let selectMakeDetail = this.makes.find(e => e.Id == this.preferenceVehicleList[index]['MakeId']);
            this.preferenceVehicleList[index]['MakeName'] = selectMakeDetail['Title'];
        }

        this.dataservice.getmodels(this.preferenceVehicleList[index]['MakeId'])
            .subscribe(res => {
                this.loaders.modelloader = false;
                let _data_: any = res;
                if (_data_.isSuccess) { 
                    this.preferenceVehicleList[index]['Models'] = Object.assign([], _data_.data) 
                    this.getmodelname(index);
                }
            })
    }

    getmodelname(index){
        let selectedModelDetail = this.preferenceVehicleList[index]['Models'].find( e => e.id == this.preferenceVehicleList[index]['ModelId']);
        this.preferenceVehicleList[index]['ModelName'] = selectedModelDetail.name;
    }

    addMoreVehicleOption() { this.preferenceVehicleList.push({ MakeId: '',MakeName: '', ModelId: '',ModelName: '', Year: '', BudgetMinAmount: '', BudgetMaxAmount: '', CurrencyId: 1 }) }
    
    deleteVehicleList(index) { this.preferenceVehicleList.splice(index, 1); }

    savePreference() {

        this.customerProfile.PermitDate = (this.profileTypeMembershipPackage.profileTypeId == 1) ? $("input[name='indpermitdate']").val() : $("input[name='dealpermitdate']").val();
        this.customerProfile.PermitDate = moment(this.customerProfile.PermitDate).format('YYYY-MM-DD');
        
        if (!this.customerProfile.FirstTimeImport) { this.helperservice.displayMsg('error', 'Please select japanese used car option'); return false; }
        if (!this.customerProfile.PreferBuying) { this.helperservice.displayMsg('error', 'Please select prefer buying option'); return false; }

        let updatedVehicleList: any = this.preferenceVehicleList.map(item => {
            return {
                'MakeId': item['MakeId'],
                'ModelId': item['ModelId'],
                'Year': item['Year'],
                'BudgetMinAmount': item['BudgetMinAmount'],
                'BudgetMaxAmount': item['BudgetMaxAmount'],
                'CurrencyId': item['CurrencyId']
            }
        })
        this.customerProfile.InterestedVehicleDetailsList = updatedVehicleList;
        this.saveProfileCompleteDeatail(); // generic save profile function call 
    }

    /**** End *****/

    /***********************************
     * Courier Detail Portion
     **********************************/

    AddCourierAddress(editEnable: boolean) {
        if (editEnable) {
            this.customerDetailsCourier.CountryCode = $("#new-couriermodaledit .phone").intlTelInput("getSelectedCountryData").iso2.toUpperCase();
        }
        else {
            this.customerDetailsCourier.CountryCode = $("#new-couriermodal2 .phone").intlTelInput("getSelectedCountryData").iso2.toUpperCase();
            this.customerDetailsCourier.AddressTypeId = 3;
        }
        this.Validate_CustomerShipmentAddressData(this.customerDetailsCourier);
        if (this.IsValidiation) {
            this.dataservice.Insert_CustomerShipmentAddress(this.customerDetailsCourier)
                .subscribe(res => {

                    if (res.IsSuccess) {
                        this.toasterservice.success(res.Message);
                        this.customerDetailsCourier = new CustomerAddressDetail();
                        this.Get_CustomerShipmentAddresses();

                        if (editEnable) {
                            $("#new-couriermodaledit").modal('hide');
                        } else {
                            $("#new-couriermodal2").modal('hide');
                        }

                    } else {
                        this.toasterservice.error(res.Message);
                    }

                });
        } else {
            this.toasterservice.error("Please fill required fields.");
            setTimeout(() => { this.toasterservice.clear(); }, 2000);
        }
    }

    EditCourierDetail(index) {
        this.customerDetailsCourier = Object.assign({}, this.ObjCourierAddress[index]);
        $("#new-couriermodaledit .phone").intlTelInput("setCountry", this.customerDetailsCourier.CountryCode);
        $("#new-couriermodaledit").modal('show');
    }

    /**** End *****/

    /**********************************
     * Business Detail Portion
    **********************************/

    saveBusinessDetail() {
        let updatedbusinesdetail = [];
        this.businessDetail.filter(item => {
            if (item['isChecked'] == 'Yes') { updatedbusinesdetail.push(item['id']); }
        });

        if (updatedbusinesdetail && updatedbusinesdetail.length) { this.customerProfile.BusinessDetailList = updatedbusinesdetail.join(","); }
        
        this.saveProfileCompleteDeatail(); // generic save profile function call
    }

    /**** End *****/

    /***********************************
     * Consignee & Notifier Detail Portion 
    ***********************************/

    AddConsigneeAddress(editEnable: boolean) {
        if (editEnable) {
            this.customerDetailsConsignee.CountryCode = $("#new-consigneemodaledit .phone").intlTelInput("getSelectedCountryData").iso2.toUpperCase();
        } else {
            this.customerDetailsConsignee.CountryCode = $("#new-consigneemodal2 .phone").intlTelInput("getSelectedCountryData").iso2.toUpperCase();
            this.customerDetailsConsignee.AddressTypeId = 1;
        }
        this.Validate_CustomerShipmentAddressData(this.customerDetailsConsignee);
        if (this.IsValidiation) {
            this.dataservice.Insert_CustomerShipmentAddress(this.customerDetailsConsignee)
                .subscribe(res => {

                    if (res.IsSuccess) {
                        this.toasterservice.success(res.Message);
                        this.Get_CustomerShipmentAddresses();
                        this.customerDetailsConsignee = new CustomerAddressDetail();
                        if (editEnable) {
                            $("#new-consigneemodaledit").modal('hide');
                        } else {
                            $("#new-consigneemodal2").modal('hide');
                        }

                    } else {
                        this.toasterservice.error(res.Message);
                    }

                });
        } else {
            this.toasterservice.error('Please fill required fields.')
            setTimeout(() => { this.toasterservice.clear(); }, 2000);
        }

    }

    EditConisgneeDetail(index) {

        this.customerDetailsConsignee = Object.assign({}, this.ObjConsigneeAddress[index]);
        $("#new-consigneemodaledit .phone").intlTelInput("setCountry", this.customerDetailsConsignee.CountryCode);
        $("#new-consigneemodaledit").modal('show');
    }

    AddNotifierAddress(editEnable: boolean) {
        if (editEnable) {
            this.customerDetailsNotifier.CountryCode = $("#new-notifiermodaledit .phone").intlTelInput("getSelectedCountryData").iso2.toUpperCase();
        } else {
            this.customerDetailsNotifier.CountryCode = $("#new-notifiermodal2 .phone").intlTelInput("getSelectedCountryData").iso2.toUpperCase();
            this.customerDetailsNotifier.AddressTypeId = 2;
        }
        this.Validate_CustomerShipmentAddressData(this.customerDetailsNotifier);
        if (this.IsValidiation) {
            this.dataservice.Insert_CustomerShipmentAddress(this.customerDetailsNotifier)
                .subscribe(res => {

                    if (res.IsSuccess) {
                        this.toasterservice.success(res.Message);
                        this.Get_CustomerShipmentAddresses();
                        this.customerDetailsNotifier = new CustomerAddressDetail();
                        if (editEnable) {
                            $("#new-notifiermodaledit").modal('hide');
                        } else {
                            $("#new-notifiermodal2").modal('hide');
                        }

                    } else {
                        this.toasterservice.error(res.Message);
                    }

                });
        } else {
            this.toasterservice.error('Please fill required fields.');
            setTimeout(() => { this.toasterservice.clear(); }, 2000);
        }

    }

    EditNotifierDetail(index) {

        this.customerDetailsNotifier = Object.assign({}, this.ObjNotifierAddress[index]);
        $("#new-notifiermodaledit .phone").intlTelInput("setCountry", this.customerDetailsNotifier.CountryCode);
        $("#new-notifiermodaledit").modal('show');
    }

    /**** End *****/

    /***********************************
    * Third Party Info Portion
    ***********************************/

    AddThirdPartyAddress(IsEdited: boolean) {
        if (IsEdited) {
            this.customerDetailsThirdParty.CountryCode = $("#newthirdpartyedit .phone").intlTelInput("getSelectedCountryData").iso2.toUpperCase();
        } else {
            this.customerDetailsThirdParty.CountryCode = $("#newthirdparty .phone").intlTelInput("getSelectedCountryData").iso2.toUpperCase();
            this.customerDetailsThirdParty.AddressTypeId = 4;
        }
        this.Validate_CustomerShipmentAddressData(this.customerDetailsThirdParty);
        if (this.IsValidiation) {
            this.dataservice.Insert_CustomerShipmentAddress(this.customerDetailsThirdParty)
                .subscribe(res => {

                    if (res.IsSuccess) {
                        this.toasterservice.success(res.Message);
                        this.Get_CustomerShipmentAddresses();
                        this.customerDetailsThirdParty = new CustomerAddressDetail();
                        if (IsEdited) {
                            $("#newthirdpartyedit").modal('hide');
                        } else {
                            $("#newthirdparty").modal('hide');
                        }

                    } else {
                        this.toasterservice.error(res.Message);
                    }

                });
        } else {
            this.toasterservice.error('Please fill required fields.')
            setTimeout(() => { this.toasterservice.clear(); }, 2000);
        }

    }

    EditThirdPartyAddress(index) {

        this.customerDetailsThirdParty = Object.assign({}, this.ObjThirdPartyAddress[index]);
        $("#newthirdpartyedit .phone").intlTelInput("setCountry", this.customerDetailsThirdParty.CountryCode);
        $("#newthirdpartyedit").modal('show');
    }

    /**** End *****/


    /**************************************************
     * save complete profile generic api functionality 
     ***************************************************/
    saveProfileCompleteDeatail() {
        this.customerProfile.InterestedVehicleDetailsList = (this.customerProfile.CustomerTypeId == 1 )?this.customerProfile.InterestedVehicleDetailsList:[];

        this.dataservice.updateprofile(this.customerProfile)
            .subscribe(res => {
                if (res.IsSuccess) { 
                    this.helperservice.displayMsg('success',res.Message); 
                    this.router.navigate(['/user-profile'] , {queryParams : { id : this.customerProfile.CustomerTypeId }});
                    this.dashboardservice.getDashboardDetail()
                    .subscribe(res=>{
                        if(res.IsSuccess){
                            this.HeaderInformation = (res.Data && res.Data.CustomerDetails)?res.Data.CustomerDetails:this.CustomerInformation;
                        }
                        this.storageservice.setEncrypted('customerInformation' , this.HeaderInformation);               
                    })
                    
                }
            })
    }



    RemoveCustomerShipmentAddress(_Id) {
        var _confirmer = confirm("Are you sure ?");

        if (_confirmer) {
            this.removeCustomerAddress.Id = _Id;
            this.dataservice.Remove_CustomerShipmentAddress(this.removeCustomerAddress)
                .subscribe(res => {
                    if (res.IsSuccess) {
                        this.toasterservice.success(res.Message);
                        this.Get_CustomerShipmentAddresses();
                        this.removeCustomerAddress = new CustomerAddressDetail();
                    } else {
                        this.toasterservice.error(res.Message);
                    }
                });
        }
    }

    Validate_CustomerShipmentAddressData(_model: CustomerAddressDetail) {
        $(".consform input").removeClass('error')
        this.IsValidiation = true;

        if (!_model.Fullname || _model.Fullname == null) {
            $(".name").addClass('error');
            this.IsValidiation = false;
        }
        if ((!_model.Email || _model.Email == null) && _model.CountryCode != "PK") {
            $(".email").addClass('error');
            this.IsValidiation = false;
        }
        if (!_model.Contact || _model.Contact == null) {
            $(".phone").addClass('error');
            this.IsValidiation = false;
        }

        if (!_model.Address || _model.Address == null) {
            $(".address").addClass('error');
            this.IsValidiation = false;
        }

        if (_model.AddressTypeId != 4) {

            if (!_model.City || _model.City == null) {
                $(".city").addClass('error');
                this.IsValidiation = false;
            }
            if ((!_model.Zip || _model.Zip == null) && _model.CountryCode != "PK") {
                $(".zip").addClass('error');
                this.IsValidiation = false;
            }
            if ((!_model.Terminal || _model.Terminal == null) && _model.CountryCode != "PK") {
                $(".terminal").addClass('error');
                this.IsValidiation = false;
            }
        }

    }

    hidePopUp(_AddresTypeId: any) {
        $(".consform input").removeClass('error')
        if (_AddresTypeId == 1) {
            this.customerDetailsConsignee = new CustomerAddressDetail();
            $("#new-consigneemodaledit").modal('hide');
            $("#new-consigneemodal2").modal('hide');
        } else if (_AddresTypeId == 2) {
            this.customerDetailsNotifier = new CustomerAddressDetail();
            $("#new-notifiermodaledit").modal('hide');
            $("#new-notifiermodal2").modal('hide');
        } else if (_AddresTypeId == 3) {
            this.customerDetailsCourier = new CustomerAddressDetail();
            $("#new-couriermodaledit").modal('hide');
            $("#new-couriermodal2").modal('hide');
        } else {
            this.customerDetailsThirdParty = new CustomerAddressDetail();
            $("#newthirdpartyedit").modal('hide');
            $("#newthirdparty").modal('hide');
        }
    }

    /* END  */


    // only numbers are allow in input field functionality 
    onlyNumberKey(event) {
        return (event.charCode == 8 || event.charCode == 0) ? null : event.charCode >= 48 && event.charCode <= 57;
    }


    // alphabets into capital letters functionality 
	alphabeticCapsOn(key){
        
        if(key == 'fullname' && this.customerDetailsConsignee.Fullname){
			this.customerDetailsConsignee.Fullname =this.customerDetailsConsignee.Fullname.replace(/[^a-zA-Z 0-9 \-\/]/g, "").toUpperCase();	
        }
        
        if(key == 'city' && this.customerDetailsConsignee.City){
			this.customerDetailsConsignee.City =this.customerDetailsConsignee.City.replace(/[^a-zA-Z 0-9 \-\/]/g, "").toUpperCase();	
        }

        if(key == 'city' && this.customerDetailsConsignee.City){
			this.customerDetailsConsignee.City =this.customerDetailsConsignee.City.replace(/[^a-zA-Z 0-9 \-\/]/g, "").toUpperCase();	
        }

        if(key == 'state' && this.customerDetailsConsignee.State){
			this.customerDetailsConsignee.State =this.customerDetailsConsignee.State.replace(/[^a-zA-Z 0-9 \-\/]/g, "").toUpperCase();	
        }

        if(key == 'address' && this.customerDetailsConsignee.Address){
			this.customerDetailsConsignee.Address =this.customerDetailsConsignee.Address.replace(/[^a-zA-Z 0-9 \-\/]/g, "").toUpperCase();	
        }

        if(key == 'zip' && this.customerDetailsConsignee.Zip){
			this.customerDetailsConsignee.Zip =this.customerDetailsConsignee.Zip.replace(/[^a-zA-Z 0-9 \-\/]/g, "").toUpperCase();	
        }

        if(key == 'terminal' && this.customerDetailsConsignee.Terminal){
			this.customerDetailsConsignee.Terminal =this.customerDetailsConsignee.Terminal.replace(/[^a-zA-Z 0-9 \-\/]/g, "").toUpperCase();	
        }
        
	}
    
}
