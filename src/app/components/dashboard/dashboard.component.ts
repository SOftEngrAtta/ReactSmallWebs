import { Component, OnInit , ChangeDetectorRef, ChangeDetectionStrategy} from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

// services
import { DashboardServices } from '../../Services/dashboard.service';
import { StorageService } from '../../Services/storage.service';
import { HelperService } from '../../Services/helper.service';
// import { CountriesAndPorts } from '../../Services/ports.services';

// models
import { Token } from '../../models/token';
import { CustomerInformation } from '../../models/customerInformation';
import { CustomerShipmentDetail } from '../../models/customerShipmentDetail';
import { QuatationType } from '../../models/qutationType';
import { ShipmentDetail } from '../../models/shipmentDetail';
import { ShipmentCountry } from '../../models/shipmentCountry';
import { ShipmentPort } from '../../models/shipmentPort';
import { ShipmentTerm } from '../../models/shipmentTerm';
import { DashBoard } from '../../models/dashboard';

// pipes
import { RoundPipe } from './../../shared/roundoff'

declare var $;
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush  
})
export class DashboardComponent implements OnInit {

  dashboard = new DashBoard()
  customerInformation: CustomerInformation;
  customerShipmentDetail = new CustomerShipmentDetail();
  shipmentDetail = new ShipmentDetail();
  quatationTypes: QuatationType[] = []
  filteredShipmentPorts: ShipmentPort[] = []
  filterFreightType: ShipmentTerm[] = []
  selectedCountry: any = {};
  queryparam: string;
  presignupstatusid: number;
  customer_information = new CustomerInformation();


  displaycurrency: any = "JPY";

  isCustomerLogin: boolean = false;
  showAuctionSearchBtn: boolean = false;
  bidallowtocustomer: boolean = false;

  recentActivities: Array<any> = [];

  selectedquotationtype: any;

  neworderorquotation : string = '';

  constructor(private router: Router,
    private modalService: NgbModal,
    private dashboardService: DashboardServices,
    private roundPipe: RoundPipe,
    private storageService: StorageService,
    private activatedRoute: ActivatedRoute,
    private ref: ChangeDetectorRef ,
    private helperservice : HelperService
  ) {
    this.quatationTypes.push({ Id: 1, Name: "Auction", Selected: true })
    this.quatationTypes.push({ Id: 2, Name: "Manual", Selected: false })
    setInterval(() => {
      this.ref.markForCheck();
    }, 1000);
  }



  ngOnInit() {
    $('body').removeClass('main_login');
    $('.pay-upc-det').slick({
      infinite: true,
      speed: 1000,
      fade: true,
      autoplaySpeed: 2000,
      autoplay: true,
      arrows: false,
      dots: true,
    });
    $('html, body').animate({
      scrollTop: 0
    }, 'fast');

    this.selectedquotationtype = this.quatationTypes[0];
    let customerlogin = this.storageService.get('customerlogin');
    this.storageService.remove('pric_id');

    if (customerlogin) {
      this.isCustomerLogin = true;
    }



    this.activatedRoute.queryParams.subscribe(params => {
      this.queryparam = params.data;
      if (this.queryparam) {
        let agent_check_query = this.storageService.get('agent_query')
        if (this.queryparam == agent_check_query) this.dashboardDetail();
        else this.getagentDetail(this.queryparam)
      } else {
        let checktoken = this.storageService.getDecrypted('token');
        if (!checktoken) {
          this.router.navigate(['/login'])
          return false
        }
        this.dashboardDetail();
      }

    })

    // this.addNewOrder();
  }

  // get aganet detail functionality 
  getagentDetail(query) {
    this.storageService.clear();
    this.dashboardService
      .getagentdetail(query)
      .subscribe(res => {
        let _data_ = res;
        if (_data_.IsSuccess) {

          this.presignupstatusid = _data_.Data.StatusId;

          if (_data_.Data.AgentTypeCode) {
            this.storageService.set('agent_type', _data_.Data.AgentTypeCode);
          }

          if (_data_.Data && _data_.Data.AgentId) {
            this.storageService.set('agentcode', _data_.Data.AgentId)
          }
          if (_data_.Data && _data_.Data.UserId != -1) {
            this.storageService.set('user_id', _data_.Data.UserId)
          }

          if (_data_.Data.UserId == -1) {
            this.router.navigate(['/pre-signup']);
          }


          this.customer_information.AccessToken = _data_.Data.Token;
          this.storageService.setEncrypted('token', this.customer_information);
          this.dashboardDetail()
        }

      })
  }

  // dashboard detail functionality 
  dashboardDetail() {
    this.dashboardService.getDashboardDetail()
      .subscribe(res => {
        let _data_: any = res;

        if (_data_.IsSuccess) {

          this.dashboard = _data_.Data;
          if(this.isCustomerLogin && this.dashboard && this.dashboard.CustomerDetails && !this.dashboard.CustomerDetails.AreaEnabled){
            this.router.navigate(['/coming-soon']);
          }

          this.customerInformation = _data_.Data.CustomerDetails;
          this.customerInformation.japantime = this.dashboard['JDateTime'];
          this.customerInformation.currencyrate = this.dashboard['JCurrencyRate'];

          this.recentActivities = _data_.Data.RecentActivitylist;
          if (this.customerInformation.CarAuction) {
            this.showAuctionSearchBtn = true
          }
          if (this.customerInformation.IsBidAllow) {
            this.storageService.setEncrypted('_a', 'true');
            this.bidallowtocustomer = true;
          } else {
            this.storageService.setEncrypted('_a', '');
            this.bidallowtocustomer = false;
          }
          if (_data_.Data.CustomerDetails && _data_.Data.CustomerDetails.CurrencyCode) {
            this.displaycurrency = _data_.Data.CustomerDetails.CurrencyCode;
          }


          this.dashboard.FundsDetails.AvaliableFunds = this.roundPipe.transform(this.dashboard.FundsDetails.AvaliableFunds);
          this.dashboard.FundsDetails.CreditLimit = this.roundPipe.transform(this.dashboard.FundsDetails.CreditLimit);
          this.dashboard.FundsDetails.UtilizedFunds = this.roundPipe.transform(this.dashboard.FundsDetails.UtilizedFunds);

          if (this.customer_information['AccessToken']) {
            this.customer_information['Id'] = this.customerInformation['Id'];
            this.customer_information['FirstName'] = this.customerInformation['FirstName'] ? this.customerInformation['FirstName'] : '';
            this.customer_information['LastName'] = this.customerInformation['LastName'] ? this.customerInformation['LastName'] : '';
            this.customer_information['FullName'] = this.customerInformation['FullName'] ? this.customerInformation['FullName'] : '';
            this.customer_information['CustomerType'] = this.customerInformation['CustomerType'];
            this.customer_information['CurrencyName'] = this.customerInformation['CurrencyName'];
            this.customer_information['CountryCode'] = this.customerInformation['CountryCode'];
            this.customer_information['PhoneNumber'] = this.customerInformation['PhoneNumber'];
            this.customer_information['Message'] = this.customerInformation['Message'];
            this.customer_information['CountryId'] = this.customerInformation['CountryId'];
            this.customer_information['CustomerType'] = this.customerInformation['CustomerType'] ? this.customerInformation['CustomerType'] : 'Individual';
            this.customer_information['CustomerTypeId'] = this.customerInformation['CustomerTypeId'];
            this.customer_information['ProfileComplete'] = this.customerInformation['ProfileComplete'];
            this.customer_information['MembershipName'] = this.customerInformation['MembershipName'];
            this.customer_information['MembershipId'] = this.customerInformation['MembershipId'];
            this.customer_information['ShipmentCountryId'] = this.customerInformation['ShipmentCountryId'];
            this.customer_information['PortId'] = this.customerInformation['PortId'];
            this.customer_information['CompanyName'] = this.customerInformation['CompanyName'];
            this.customer_information['BussniessName'] = this.customerInformation['BussniessName'];
            this.customer_information['Address'] = this.customerInformation['Address'];
            this.customer_information['MonthlyVehicles'] = this.customerInformation['MonthlyVehicles'];
            this.customer_information['YearsInAutoTrading'] = this.customerInformation['YearsInAutoTrading'];
            this.customer_information['CompanyWebsite'] = this.customerInformation['CompanyWebsite'];
            this.customer_information['MinBudget'] = this.customerInformation['MinBudget'];
            this.customer_information['MaxBudget'] = this.customerInformation['MaxBudget'];
            this.customer_information['Gender'] = this.customerInformation['Gender'];
            this.customer_information['BirthDate'] = this.customerInformation['BirthDate'];
            this.customer_information['MakeId'] = this.customerInformation['MakeId'];
            this.customer_information['ModelId'] = this.customerInformation['ModelId'];
            this.customer_information['YearFrom'] = this.customerInformation['YearFrom'];
            this.customer_information['YearTo'] = this.customerInformation['YearTo'];
            this.customer_information['MembershipName'] = this.customerInformation['MembershipName'];
            

            this.storageService.setEncrypted('token', this.customer_information);
            this.customerInformation = this.customer_information;
            this.storageService.set('agent_query', this.queryparam);
          }

          if (this.presignupstatusid == 10000) {
            this.storageService.set('statusid', this.presignupstatusid);
            this.storageService.setEncrypted('presigncustomer', _data_.Data.CustomerDetails);
            this.router.navigate(['/pre-signup']);
          }

          this.addNewOrder()
        }
      })
  }

  // open profile page
  openProfile() {
    this.router.navigate(['/user-profile'] , {queryParams : {id:this.dashboard.CustomerDetails.CustomerTypeId}});
  }
  // end

  addNewOrder() {
    var customerInformation: CustomerInformation = this.customerInformation;
    this.dashboardService.getShipmentDetail(customerInformation.MembershipId)
      .subscribe(res => {
        this.shipmentDetail = res.data;
        // let _checkCountryData : any = this.portsservices.countriesAndports();
        // this.shipmentDetail = _checkCountryData ;

        let customer: any = this.customerInformation
        if (this.shipmentDetail && this.shipmentDetail.country.length) {
          for (let i = 0; i < this.shipmentDetail.country.length; i++) {
            if (customer.ShipmentCountryId) {
              if (customer.ShipmentCountryId == this.shipmentDetail.country[i]['id']) {
                this.customerShipmentDetail.ShipmentCountry = this.shipmentDetail.country[i];
                this.selectedShipmentCountry(this.shipmentDetail.country[i]);
              }
            }

            if (customer.CountryId) {
              if (customer.CountryId == this.shipmentDetail.country[i]['id']) {
                this.customerShipmentDetail.ShipmentCountry = this.shipmentDetail.country[i];
                this.selectedShipmentCountry(this.shipmentDetail.country[i]);
              }
            }

          }
        }
      })
  }

  selectedShipmentCountry(country: ShipmentCountry) {
    
    this.filterFreightType = []
    this.filteredShipmentPorts = this.shipmentDetail.port.filter(x => x.countryCode == country.code)
    if (this.filteredShipmentPorts.length) {
      this.customerShipmentDetail.ShipmentPort = this.filteredShipmentPorts[0];
      for (let i = 0; i < this.filteredShipmentPorts.length; i++) {
        if (this.customerInformation.PortId == this.filteredShipmentPorts[i]['id']) {
          this.customerShipmentDetail.ShipmentPort = this.filteredShipmentPorts[i];
          break;
        }
      }
      this.selectFreightType();
    }


  }

  selectFreightType() {
    this.customerShipmentDetail.ShipmentTerm = new CustomerShipmentDetail().ShipmentTerm;
    this.filterFreightType = this.shipmentDetail.shipmentterm.filter(x => x.countryCode == this.customerShipmentDetail.ShipmentCountry.code && x.portId == this.customerShipmentDetail.ShipmentPort.id)
    if (this.filterFreightType.length == 1) {
      this.filterFreightType[0].selected = true
      this.customerShipmentDetail.ShipmentTerm = this.filterFreightType[0];
    }
  }

  onFreightType(shipementTerms: ShipmentTerm) {
    this.customerShipmentDetail.ShipmentTerm = shipementTerms;
  }

  // select or un select quotation type functionality 
  selectquotationtype(data, index) {
    for (let i = 0; i < this.quatationTypes.length; i++) {
      if (i != index) {
        this.quatationTypes[i]['Selected'] = false
      }
    }

    this.quatationTypes[index]['Selected'] = (this.quatationTypes[index]['Selected'] == true) ? false : true;
    this.selectedquotationtype = (this.quatationTypes[index]['Selected'] == true) ? this.quatationTypes[index] : '';
  }


  submitShipmentDetail() {

    if (!this.ShipmentDetailValidation()) {
      return
    }


    this.customerShipmentDetail.QuatationType = this.selectedquotationtype;
    this.storageService.setEncrypted('customerShipmentDetail', this.customerShipmentDetail);
    $.fancybox.close();

    if (this.selectedquotationtype && this.selectedquotationtype['Name'] == 'Manual') {
      this.router.navigate(['/manual-order'])
    } else {
      this.router.navigate(['/auction-car-search']);
    }

  }

  ShipmentDetailValidation(): boolean {
   
    if (!this.customerShipmentDetail.ShipmentCountry) {this.helperservice.displayMsg('error' , "Please select shipment country"); return false}
    if (!this.customerShipmentDetail.ShipmentPort) {this.helperservice.displayMsg('errror' , "Please select shipment port"); return false}
    if (!this.customerShipmentDetail.ShipmentType) {this.helperservice.displayMsg('error',"Please select shipment type"); return false;}
    if (!this.customerShipmentDetail.ShipmentTerm) {this.helperservice.displayMsg('error',"Please select freight type"); return false}
    if (!this.selectedquotationtype) {this.helperservice.displayMsg('error',"Please select quotation type"); return false;}
    return true
  }

  // open recent activity url functionality 
  openurl(url) {
    window.open(url, '_blank');
  }


  // addOrderOrQuotation functionality
  addOrderOrQuotation(_e_){
    this.neworderorquotation = _e_;
    $.fancybox.open({
      src: '#addnewc-ship-det',
      type: 'inline',
    })
    this.storageService.setEncrypted('order_or_quotation' , _e_);
  }
}
