// modules 
import { Component,OnInit,Injectable,NgZone} from '@angular/core';
import { Http } from "@angular/http";
import { NgbModal,ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { Router,ActivatedRoute,Params,NavigationEnd } from '@angular/router';

import 'rxjs/add/operator/pairwise';

// services
import { UnitDetailService } from './../../Services/unit-detail.service';
import { SpecificQuotation } from './../../Services/quotation.service';

// models
import { SalesStatics } from './../../models/salesStatistics';
import { Page } from '../../models/page';
import { ManufactureDetail } from './../../models/manufactureDetail';
import { CustomerShipmentDetail } from './../../models/customerShipmentDetail';
import { QuotationPricing } from '../../models/quotationPricing';
import { QuotationSlideData } from '../../models/quotation-slide-date';
import { InquireData } from '../../models/inquiredata';
import { FavouriteCar } from '../../models/favourite';

// services
import { HelperService } from './../../Services/helper.service';
import {StorageService } from './../../Services/storage.service';
import { DataService } from './../../Services/data.service'

// generic pipe
import { RoundPipe } from './../../shared/roundoff';

import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/filter';
import { Observable } from 'rxjs/Rx';


declare var $;
declare var moment: any;

@Component({
  selector: 'app-unit-detail',
  templateUrl: './unit-detail.component.html',
  styleUrls: ['./unit-detail.component.css']
})

export class UnitDetailComponent implements OnInit {

  public currencycode: string;

  public item_detail: any;

  public selectedBidWinValue: number; // store selected value from pop up in this variable 

  public selectedCheckBox: string;

  public manufactureYearCheck = {makerId: '',chassisNo: null}

  public salesStatistics = new SalesStatics();

  public _salesStatistics: any = { // this vairable will get data from sales statistics popup screens
    year: null,
    minMileage: null,
    maxMileage: null,
    condition: null
  }

  public page = new Page();

  public manufactureDetail: any = new ManufactureDetail();

  public addFavouriteData = new FavouriteCar();
  public addtofavouriteBtnClr = '';

  public customerInfo: any;


  public shipmentDetail = new CustomerShipmentDetail();

  public selectedQuotationPricing: QuotationPricing;

  public viewfavourite: boolean = false;

  public paramsObj: any;

  quotationId: string;

  order_id: string;

  isCustomerLogin: boolean = false;
  _bitallow: boolean = false;
  public quotationSlideData: QuotationSlideData[] = [];
  public hideshowtaskList: boolean = false;
  // bid price order popup
  public alertationdata: Array<any> = [];
  public displayMeterReversal: boolean = false;
  public selectedalteration: number[];
  public getallplans: Array<any> = [];
  public displayPlanDetail: boolean = false;
  public onlynumbersallow = /^\d+$/; // regx expression ;
  public displayloader: boolean = false;
  public displayerrormsg: boolean = false;

  // public bidopriceroundofthousand: Subject<string> = new Subject<string>();

  public userdetail: any = { // get complete bid process detail 
    bidprice: null,
    chassisnumber: null,
    months: [{ id: 1, name: "January" }, { id: 2, name: "February" }, { id: 3, name: "March" }, { id: 4, name: "April" }, { id: 5, name: "May" }, { id: 6, name: "June" }, { id: 7, name: "July" }, { id: 8, name: "August" }, { id: 9, name: "September" }, { id: 10, name: "October" }, { id: 11, name: "November" }, { id: 12, name: "December" }],
    years: [],
    selectedmonth: '',
    selectedYear: '',
    isNumberPlateActive: false,
    numberplate: null,
    isNegotiationActive: false,
    isDrivableActive: false,
    meterReversal: null,
    totalalterationamount: 0,
    quotationId: 0,
    quotationItemId: 0,
    quotationDetailId: 0,
    ModelId: 0,
    PackageId: 0,
    PackageName: '',
    PlanName: '',
    PlanAmount: '',
    PlanClass: '',
    comment: '',
    selectedplanId: '',
    CurrencyRate: '',
    PreferredShipping: '',
    prices: {
      BidPrice: 0,
      FOB: 0,
      ServiceCharges: 0,
      FreightCharges: 0,
      InspectionCharges: 0,
      AlterationCharges: 0,
      RikusoFee: 0,
      ExtraFee: 0,
      OnePriceFee: 0,
      ContainerCharges: 0,
      VanningCharges: 0,
      CNF: 0,
      CIF: 0,
      TotalAlterationAmount: 0,
    }
  }

  public productionloader: boolean = false;

  public requesttranslationOptions = [
    { name: "Select All", isSelected: false },
    { name: "Snow Tyres", isSelected: false, id: 1 },
    { name: "Cigarette burn/hole", isSelected: false, id: 2 },
    { name: "Rust or Corrosion", isSelected: false, id: 3 },
    { name: "Interior pet car", isSelected: false, id: 4 },
    { name: "Oil leakage", isSelected: false, id: 5 },
    { name: "Slide door/ (s) not working", isSelected: false, id: 6 },
    { name: "Power boot not working / not functional", isSelected: false, id: 7 },
    { name: "Power seats not working / not functional", isSelected: false, id: 8 },
    { name: "Power window not working", isSelected: false, id: 9 },
    { name: "A/C not working / not functional", isSelected: false, id: 10 },
    { name: "Knocking sound ENGINE (engine noise)", isSelected: false, id: 11 },
    { name: "Panel knocking sound", isSelected: false, id: 12 },
    { name: "Crack on dashboard / bumper", isSelected: false, id: 13 },
    { name: "Faded color bumper / rear spoiler", isSelected: false, id: 14 },
    { name: "Audio missing", isSelected: false, id: 15 },
    { name: "Stone chip on windscreen", isSelected: false, id: 16 },
    { name: "Under body corrosion", isSelected: false, id: 17 },
    { name: "Repair marks", isSelected: false, id: 18 },
    { name: "Floor matt missing", isSelected: false, id: 19 },
    { name: "Transmission Noise Or Failure ", isSelected: false, id: 20 },
    { name: "Bubbles on dashboard", isSelected: false, id: 21 },
    { name: "Check lamp On", isSelected: false, id: 22 }
  ]

  public new_order_or_quotation: string;
  public slideConfig: any;
  public preferred_shipping = [{ id: 1, name: 'Armacup' }, { id: 2, name: 'Mol' }, { id: 3, name: 'Toyofuji' }, { id: 4, name: 'Autohub' }, { id: 5, name: 'Jacanna' }];
  public countryRistrictionData: any;


  public _inquireData = new InquireData();
  public inquirenow : InquireData;

  // end 
  constructor(private modalService: NgbModal,
    private unitdetailservice: UnitDetailService,
    private roundoffnumber: RoundPipe,
    private loaderservice: Ng4LoadingSpinnerService,
    private helperservice: HelperService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private storageservice: StorageService,
    private dataservice: DataService ,
    private quotationservice : SpecificQuotation

  ) {
    this.slideConfig = {
      infinite: false,
      slidesToShow: 5,
      slidesToScroll: 1,
      responsive: [
        {
          breakpoint: 1024,
          settings: 'unslick'
        }
      ]
    };

  }

  ngOnInit() {
    $('body').removeClass('main_login');
    $('html, body').animate({ scrollTop: 0 }, 'fast');

    this.isCustomerLogin = this.storageservice.get('customerlogin');
    this.new_order_or_quotation = this.storageservice.getDecrypted('order_or_quotation');

    let bitallow = this.storageservice.getDecrypted('_a');
    if (bitallow == 'true') {
      this._bitallow = true;
    }
    Observable.interval(1000).subscribe(x => {
      if (this.item_detail && this.item_detail.Images.length) {
        this.helperservice.loaderunitdetailfunction();
      }
    });

    this.page.Index = 0;
    this.page.Size = 10;
    this.page.TotalRecords = 0;
    this.customerInfo = this.storageservice.getDecrypted('customerInformation');
    this.activatedRoute.queryParams.subscribe(params => {

      if (params.id && params.lotNum && params.source) {
        this.paramsObj = params;
        this.addFavouriteData.LotNumber = this.paramsObj.lotNum;
        this.addFavouriteData.ReferenceId = this.paramsObj.id;
        this.addFavouriteData.Source = this.paramsObj.source;
        this.viewfavourite = (this.paramsObj.hitby == 'favourite' || this.paramsObj.hitby == 'viewdetail') ? true : false;
        this.shipmentDetail = this.storageservice.getDecrypted('customerShipmentDetail');

        let currentYear = parseInt(moment().format('YYYY'));
        for (let i = 1910; i <= currentYear; i++) {
          this.userdetail.years.push(i);
        }

        this.userdetail.years = this.userdetail.years.reverse()


        this.getitemDetail(this.paramsObj); // ( hit uzair api )
        this.getcountryrestriction();
        if (!this.viewfavourite) {
          this.getAlterationData();
        }
        this.getParamsId()
      }
    })
  }

  getParamsId() {

    if (this.paramsObj && this.paramsObj.quotationid) {
      this.quotationId = this.paramsObj['quotationid'];
      if (this.new_order_or_quotation == 'order') {
        this.getOrderTaskBarList(this.quotationId);
      }

      if (this.new_order_or_quotation == 'quotation') {
        this.getQuotationList(this.quotationId);
      }
    }

    if (this.paramsObj && this.paramsObj.OrderId) {
      this.order_id = this.paramsObj['OrderId'];
      if (this.isCustomerLogin) {
        this.getOrderTaskBarList(this.order_id);
      }
    }


  }

  // get unit detail (hit uzair api)
  getitemDetail(data) {
    this.loaderservice.show();
    this.unitdetailservice
      .unitDetailData(data)
      .subscribe(res => {
        let _data_: any = res;
        if (_data_.IsSuccess) {

          if (_data_.Data) {
            this.item_detail = _data_.Data;

            this.item_detail.Mileage = this.item_detail.Mileage + ' km';

            this.manufactureYearCheck.chassisNo = this.item_detail.Chassis + '-';

            if (this.viewfavourite) {
              $('.adfvt').css('display', 'none');
              $(".fav-added").css('display', 'block');
            } else {
              if (this.item_detail.IsFavourite) {
                $('.adfvt').css('display', 'none');
                $(".fav-added").css('display', 'block');
              } else {
                $('.adfvt').css('display', 'block');
                $(".fav-added").css('display', 'none');
              }

              this.plans();

            }

            this.salesStatistics.queryParam.condition = this.item_detail.Condition;
            this.salesStatistics.queryParam.maxMileage = this.item_detail.Mileage;
            this.salesStatistics.queryParam.modelId = this.item_detail.Id;
            this.salesStatistics.queryParam.minMileage = this.item_detail.Mileage;
            this.salesStatistics.queryParam.year = this.item_detail.Year;

            this.addFavouriteData.AuctionId = this.item_detail.AuctionId ? this.item_detail.AuctionId : '';


            if (this.item_detail.IsFavourite) {
              this.addtofavouriteBtnClr = 'rgb(45, 45, 45)';
            }

            this.loaderservice.hide();
            this.getModalIdData(this.item_detail.ModelId); // get year , mileage and condition data ( hit sarosh api )
            this.getsalesDetail(); // get sales detail record (hit sarosh api )

          }

        }
      })
  }

  // generate quotaion or generate link 
  quotationGenerate() {
    let carRstrctMeterReading = (this.countryRistrictionData['MeterReading'] && this.countryRistrictionData['MeterReading'] != null) ? parseInt(this.countryRistrictionData['MeterReading']) : 0;
    if (carRstrctMeterReading && (carRstrctMeterReading >= this.item_detail['Mileage'])) {
      this.helperservice.displayMsg('error' , 'Car Mileage must bhi less than MeterReading');
      return false;
    }

    if (this.countryRistrictionData['ToYear'] && this.countryRistrictionData['ToYear'] != null && this.countryRistrictionData['FromYear'] && this.countryRistrictionData['FromYear'] != null) {
      if(this.countryRistrictionData['PolicyTypeId'] == 5 || this.countryRistrictionData['PolicyTypeId'] == 6 || this.countryRistrictionData['PolicyTypeId'] == 7){
        if (this.countryRistrictionData['FromYear'] <= this.item_detail.Year && this.item_detail.Year <= this.countryRistrictionData['ToYear']) { }
        else { $.fancybox.open({ src: '#restrictionpopup', type: 'inline', }); return false }
      }
    }


    let quotationPricing: QuotationPricing = new QuotationPricing();
    quotationPricing.shipmentType_Id = this.shipmentDetail.ShipmentType.id
    quotationPricing.countryId = this.shipmentDetail.ShipmentCountry.id
    quotationPricing.package_Id = this.customerInfo.MembershipId
    quotationPricing.plan_Id = null;
    quotationPricing.port_Id = this.shipmentDetail.ShipmentPort.port_Id
    quotationPricing.portName = this.shipmentDetail.ShipmentPort.name
    quotationPricing.countryCode = this.shipmentDetail.ShipmentCountry.code
    quotationPricing.shipmentTerm_Id = this.shipmentDetail.ShipmentTerm.id
    quotationPricing.Make = this.item_detail.Make;
    quotationPricing.Model = this.item_detail.Model;
    quotationPricing.ModelId = this.item_detail.ModelId;
    quotationPricing.SourceType = this.paramsObj.source;
    quotationPricing.averagePrice = this.item_detail.AveragePrice;
    quotationPricing.Transmission = this.item_detail.Transmission;
    quotationPricing.Year = this.item_detail.Year;
    quotationPricing.Chassis = this.item_detail.Chassis;
    quotationPricing.LotNo = this.item_detail.LotNo;
    quotationPricing.AuctionDate = this.item_detail.AuctionDate;
    quotationPricing.AuctionDateTime = moment(this.item_detail.AuctionDate).format("d.MM.YYYY");
    quotationPricing.AuctionTime = moment(this.item_detail.AuctionDate).format("HH:mm");
    quotationPricing.AuctionHouseId = this.item_detail.AuctionHouseId
    quotationPricing.AuctionHouse = this.item_detail.AuctionHouse;
    quotationPricing.referenceId = this.item_detail.ReferenceId;
    quotationPricing.MeterCube = this.item_detail.MeterCube;
    quotationPricing.AuctionSheet = this.item_detail.AuctionSheet;
    quotationPricing.StartPrice = this.item_detail.StartPrice;
    quotationPricing.SourceType = parseInt(this.paramsObj.source);
    quotationPricing.IsRedirectPage = {
      id: this.paramsObj.id,
      source: this.paramsObj.source,
      lotNum: this.paramsObj.lotNum,
      path: 'unitdetail'
    }
    if (this.item_detail.Images && this.item_detail.Images.length) {
      for (let i = 0; i < this.item_detail.Images.length; i++) {
        quotationPricing.Images.push({
          id: i + 1,
          Title: this.item_detail.Images[i]
        });
      }
    }
    quotationPricing.customerOrders.push({
      model_Id: this.item_detail.ModelId,
      auctionHouse_Id: this.item_detail.AuctionHouseId,
      year: this.item_detail.Year,
      auctionType: parseInt(this.paramsObj.source)
    });
    this.selectedQuotationPricing = quotationPricing
  }

  // sales statistics functonality portion 
  getModalIdData(id) {
    this.unitdetailservice
      .getmodeldetail(id)
      .subscribe(res => {
        this.loaderservice.hide();
        let _data_ = res;
        if (_data_.Data && _data_.Data.Year) {
          this.salesStatistics.year = _data_.Data.Year;
        }
        if (_data_.Data && _data_.Data.Mileage) {
          this._salesStatistics.minMileage = _data_.Data.Mileage.Min;
          this._salesStatistics.maxMileage = _data_.Data.Mileage.Max;
          this.salesStatistics.mileage = _data_.Data.Mileage;
        }
        if (_data_.Data && _data_.Data.Conditions) {
          this.salesStatistics.consditions = _data_.Data.Conditions;
        }
      })
  }

  getsalesDetail() {
    this.salesStatistics.queryParam.page = this.page.Index + 1;
    this.salesStatistics.queryParam.count = this.page.Size
    // api hit data 
    this.unitdetailservice
      .salesStatisticsRecords(this.salesStatistics.queryParam)
      .subscribe(res => {
        let _data_ = res.Data;
        this.page.TotalRecords = _data_.Count;
        this.salesStatistics.data = _data_.Results;
        this.salesStatistics.averageValue = this.roundoffnumber.transform(_data_.Average);
      })

  }

  setPage(pageInfo) {
    this.page.Index = pageInfo.offset;
    this.getsalesDetail();
  }

  chooseData() {
    if (!this._salesStatistics.year) {this.helperservice.displayMsg('error' , 'Please select year');return false;}
    if (!this._salesStatistics.minMileage) {this.helperservice.displayMsg('error','Please enter min mileage value');return false;}
    if (!this._salesStatistics.maxMileage) {this.helperservice.displayMsg('error','Please enter max mileage value');return false;}
    if (this._salesStatistics.minMilage <= this._salesStatistics.maxMileage) {this.helperservice.displayMsg('error','Min Mileage value should be less than Max Milage value');return false;}

    this.salesStatistics.queryParam.condition = this._salesStatistics.condition;
    this.salesStatistics.queryParam.maxMileage = this._salesStatistics.maxMileage;
    this.salesStatistics.queryParam.modelId = this.item_detail.ModelId;
    this.salesStatistics.queryParam.minMileage = this._salesStatistics.minMileage;
    this.salesStatistics.queryParam.year = this._salesStatistics.year;

    this.getsalesDetail();

  }
  // .....


  // add favourite functionality ( hit uzair api )
  addtofavourite(action) {
    this.addFavouriteData.AddRemoveType = action;
    this.addFavouriteData.ClientId = (this.addFavouriteData.Source == 5 )?'KXS0ZqjE6PU=':null;
    this.addFavouriteData.CountryId = null;
    this.addFavouriteData.ProductId = null;
    this.addFavouriteData.AuctionId = null;
    
    this.unitdetailservice
      .favourite(this.addFavouriteData)
      .subscribe(res => {
        let _data_: any = res;
        if (_data_.IsSuccess) {
          if(this.addFavouriteData.AddRemoveType){
            $('.adfvt').css('display', 'none');
            $(".fav-added").css('display', 'block');
            this.helperservice.displayMsg('success','car added to favourite')
          }else{
            $('.adfvt').css('display', 'block');
            $(".fav-added").css('display', 'none');
            this.helperservice.displayMsg('success','favourite removed');
          }
          
        } else {
          this.helperservice.displayMsg('error','bad request');
        }
      })
  }


  // open translation sheet 
  openTranSheet() {
    this.requesttranslationOptions.forEach(e => {
      e['isSelected'] = false;
    })
    $.fancybox.open({
      src: '#translate-inspect',
      type: 'inline',
    });
  }

  // selected all
  selectalltrans(_bol) {
    this.requesttranslationOptions.forEach(e => {
      e['isSelected'] = _bol;
    })
  }

  // translated api hit functionality 
  reqTranslatedSheet() {
    let selectedchecklist: any = [];
    this.requesttranslationOptions.forEach(e => {
      if (e['isSelected'] && e['name'] != "Selected All") {
        selectedchecklist.push(e['id'])
      }
    })

    let data = {
      VehicleId: this.paramsObj.id,
      Lotnum: this.paramsObj.lotNum,
      Source: this.paramsObj.source,
      AuctionId: null,
      QuotationItemId: null,
      OrderDetailId: null,
      IsBid: this.item_detail.IsBid ? this.item_detail.IsBid : false,
      IsHot: false,
      CheckList: (selectedchecklist.length) ? selectedchecklist.join(',') : '',
      country_Id: this.shipmentDetail.ShipmentCountry.id,
      port_Id: this.shipmentDetail.ShipmentPort.port_Id
    };
    this.unitdetailservice
      .translatedApi(data)
      .subscribe(res => {
        let _data_: any = res;
        if (_data_.IsSuccess) {
          $.fancybox.close();
          if (_data_.Data.TranslateId) {
            this.helperservice.displayMsg('success','translation request hit successfully');
          } else {this.helperservice.displayMsg('error','Translation already requested');}
        }

      })
  }

  // hit manufacture api 
  checkmanu() {
    $('#displaymessage').removeClass("message-cls");
    $('#displaymessage').empty();
    if (!this.manufactureYearCheck.makerId) {this.helperservice.displayMsg('error','Please select modal');return false;}

    if (!this.manufactureYearCheck.chassisNo) {this.helperservice.displayMsg('error','Please enter chassis Number');return false;}
    this.productionloader = true;
    this.unitdetailservice
      .getChassisDetail(this.manufactureYearCheck)
      .subscribe(res => {
        this.productionloader = false;
        if (res) {
          this.manufactureDetail = res;
          if (!this.manufactureDetail.message) {
            $.fancybox.open({
              src: '#manufyear',
              modal: true
            });
          }
          if (this.manufactureDetail.message) {
            $('#displaymessage').addClass("message-cls");
            $('#displaymessage').append(this.manufactureDetail.message);
          }

        }
      })
  }


  // only numbers are allow in input field functionality 
  onlyNumberKey(event) {
    return (event.charCode == 8 || event.charCode == 0) ? null : event.charCode >= 48 && event.charCode <= 57;
  }


  // sorting functionality 
  sorting(e) {
  }

  // open fancybox modal functionality 
  openpriceorderbox() {
    $.fancybox.open({
      src: '#sendlinkpopup',
      type: 'inline',
    });
  }

  // get alteration charges functionality 
  getAlterationData() {
    let _data_ = {
      CountryCode: (this.shipmentDetail) ? this.shipmentDetail.ShipmentCountry.code : '',
      CurrencyCode: 'JPY'
    }
    this.dataservice
      ._getalterationdata(_data_)
      .subscribe(res => {
        let _data: any = res;
        if (_data.isSuccess) {
          this.alertationdata = _data.data;
        }
      })
  }

  addremovealteration() {
    this.displayMeterReversal = false;
    this.userdetail.totalalterationamount = 0;
    if (this.alertationdata.length) {
      for (let i = 0; i < this.alertationdata.length; i++) {
        if (this.selectedalteration && this.selectedalteration.length) {
          for (let j = 0; j < this.selectedalteration.length; j++) {

            if (this.selectedalteration[j] == 1) {
              this.displayMeterReversal = true;
            }

            if (this.selectedalteration[j] == this.alertationdata[i]['id']) {
              this.userdetail.totalalterationamount = this.userdetail.totalalterationamount + this.alertationdata[i]['amount']
            }
          }
        }
      }
    }
  }

  activecheckornot(item) {
    if (item == 'negotiation') {
      if (this.userdetail.isNegotiationActive) this.userdetail.isNegotiationActive = false;
      else this.userdetail.isNegotiationActive = true;
    } else if (item == 'numberplate') {
      if (this.userdetail.isNumberPlateActive) this.userdetail.isNumberPlateActive = false;
      else this.userdetail.isNumberPlateActive = true;
    } else if (item == 'drivable') {
      if (this.userdetail.isDrivableActive) this.userdetail.isDrivableActive = false;
      else this.userdetail.isDrivableActive = true;
    }
  }

  addCustomUser = (term) => ({ id: term, name: term });

  // get all plans functionality 
  plans() {
    if (this.shipmentDetail && this.shipmentDetail.ShipmentCountry && this.shipmentDetail.ShipmentCountry.code && this.customerInfo && this.customerInfo.MembershipId) {
      this.dataservice
        .getPaymentPlans(this.shipmentDetail.ShipmentCountry.code, this.customerInfo.MembershipId)
        .subscribe(res => {
          let _data_: any = res;
          if (_data_.isSuccess) {
            this.getallplans = res.data;
          }
        })
    }
  }
  calculateOnPlanSelect() {
    if (this.userdetail.bidprice) {
      this.calculate();
    }
  }
  calculate() {

    this.displayerrormsg = false;

    if (!this.userdetail.selectedplanId) {this.helperservice.displayMsg('error','Please select plan');return false;}

    if (!this.userdetail.bidprice) {this.helperservice.displayMsg('error','Please enter bid price');return false;}

    if (!this.onlynumbersallow.test(this.userdetail.bidprice)) {this.helperservice.displayMsg('error', 'Please enter valid bid price');return false;}

    if (this.userdetail.bidprice < this.item_detail.StartPrice) {this.helperservice.displayMsg('error','Bid Price must be greater than JPY ' + this.item_detail.StartPrice.toLocaleString());return false;}

    let _data_ = {
      shipmentType_Id: this.shipmentDetail.ShipmentType.id,
      package_Id: this.customerInfo.MembershipId,
      plan_Id: this.userdetail.selectedplanId,
      port_Id: this.shipmentDetail.ShipmentPort.port_Id,
      currencyCode: 'JPY',
      countryCode: this.shipmentDetail.ShipmentCountry.code,
      PricingTypeId: 1,
      portName: '',
      shipmentTerm_Id: this.shipmentDetail.ShipmentTerm.id,
      customerOrders: [{
        model_Id: this.item_detail.ModelId,
        unitPrice: this.userdetail.bidprice,
        auctionHouse_Id: this.item_detail.AuctionHouseId,
        year: this.item_detail.Year,
        auctionType: this.paramsObj.source,
        altertations: this.selectedalteration
      }]
    }

    this.displayloader = true;
    this.dataservice
      .evaluateamount(_data_)
      .subscribe(res => {
        this.displayloader = false;
        this.displayPlanDetail = true;
        if (res.IsSuccess) {
          let _data_ = res.Data.CustomerOrders[0];

          this.userdetail['PlanName'] = res.Data['PlanName'];
          this.userdetail['PlanClass'] = res.Data['PlanClass'];
          this.userdetail['PlanAmount'] = res.Data['Plan_Amount'];
          this.userdetail['CurrencyRate'] = res.Data['CurrencyRate'];

          if (_data_.ExMessage == 'Calculation Issue' || _data_.FinalPrice == null) {
            this.displayerrormsg = true;
          }

          this.userdetail['prices']['BidPrice'] = this.userdetail.bidprice;
          this.userdetail['prices']['ServiceCharges'] = (_data_.ServiceCharges != null) ? _data_.ServiceCharges : 0;
          this.userdetail['prices']['InspectionCharges'] = (_data_.InspectionCharges != null) ? _data_.InspectionCharges : 0;
          this.userdetail['prices']['RikusoFee'] = (_data_.RikusoFee != null) ? _data_.RikusoFee : 0;
          this.userdetail['prices']['ExtraFee'] = (_data_.ExtraFee != null) ? _data_.ExtraFee : 0;
          this.userdetail['prices']['AlterationCharges'] = (_data_.AlterationCharges != null) ? _data_.AlterationCharges : 0;
          this.userdetail['prices']['FOB'] = (_data_.FOBCharges != null) ? _data_.FOBCharges : 0;
          this.userdetail['prices']['FreightCharges'] = (_data_.FreightCharges != null) ? _data_.FreightCharges : 0;
          this.userdetail['prices']['CNF'] = (_data_.FinalPrice != null) ? _data_.FinalPrice : 0;
          this.userdetail['prices']['OnePriceFee'] = (this.paramsObj.source == 2 && _data_.AuctionTypeAmount != null) ? _data_.AuctionTypeAmount : 0;
          this.userdetail['prices']['VanningCharges'] = (_data_.VanningCharges != null) ? _data_.VanningCharges : 0;
        }
      })
  }

  // proceed to order functionality 
  proceedtobid() {

    if (!this.userdetail.selectedplanId) {this.helperservice.displayMsg('error','Please select plan and calculate bid price');return false;}

    if (this.userdetail.bidprice != this.userdetail.prices.BidPrice) {this.helperservice.displayMsg('error','Please calculate bid price');return false;}


    let _data_ = {
      OrderPlanData:
        {
          shipmentType_Id: this.shipmentDetail.ShipmentType.id,
          package_Id: this.customerInfo.MembershipId,
          plan_Id: this.userdetail.selectedplanId,
          port_Id: this.shipmentDetail.ShipmentPort.port_Id,
          currencyCode: "JPY",
          countryCode: this.shipmentDetail.ShipmentCountry.code,
          PricingTypeId: 1,
          portName: this.shipmentDetail.ShipmentPort.name,
          shipmentTerm_Id: this.shipmentDetail.ShipmentTerm.id,
          customerOrders: [{
            model_Id: this.item_detail.ModelId,
            unitPrice: this.userdetail.bidprice,
            auctionHouse_Id: this.item_detail.AuctionHouseId,
            year: this.item_detail.year,
            auctionType: this.paramsObj.source
          }]
        },
      OrderData:
        {
          TypeId: 1,
          CountryId: this.shipmentDetail.ShipmentCountry.id,
          PortId: this.shipmentDetail.ShipmentPort.port_Id,
          ShipmentTermId: this.shipmentDetail.ShipmentTerm.id,
          ShipmentTypeId: this.shipmentDetail.QuatationType.Id,
          PlanId: this.userdetail.selectedplanId,
          AgentId: 0,
          CurrencyId: 2,
          CurrencyRate: this.userdetail.CurrencyRate,
          UpateIp: null,
          AuctionHouseId: this.item_detail.AuctionHouseId,
          BidPrice: this.userdetail.prices.BidPrice,
          ServiceCharges: this.userdetail.prices.ServiceCharges,
          RikusoFee: this.userdetail.prices.RikusoFee,
          ExtraFee: this.userdetail.prices.ExtraFee,
          OnePriceFee: this.userdetail.prices.OnePriceFee,
          AlterationCharges: this.userdetail.prices.AlterationCharges,
          InspectionCharges: this.userdetail.prices.InspectionCharges,
          ContainerCharges: this.userdetail.prices.ContainerCharges,
          VanningCharges: this.userdetail.prices.VanningCharges,
          InsuranceFee: this.userdetail.prices.InsuranceFee,
          FOB: this.userdetail.prices.FOB,
          FreightCharges: this.userdetail.prices.FreightCharges,
          CNF: this.userdetail.prices.CNF,
          meterReading: this.userdetail.meterReversal,
          meterCube: this.item_detail.Metercube,
          bidComments: this.userdetail.comment,
          isNumberPlate: this.userdetail.isNumberPlateActive,
          numberPlate: this.userdetail.numberplate,
          isCustomerNegotiation: this.userdetail.isNegotiationActive,
          chassisNumber: this.userdetail.chassisnumber,
          manufacturingMonth: null,
          manufacturingYear: null,
          ShippingLine: this.userdetail.PreferredShipping,
          CreaterTypeId: 2
        },
      AuctionData: {
        Source: this.paramsObj.source,
        APIUniqueId: this.paramsObj.id,
        LotNo: this.paramsObj.lotNum,
      },
      OrderAlterationData: []
    }

    if (this.alertationdata && this.alertationdata.length) {
      for (let i = 0; i < this.alertationdata.length; i++) {
        if (this.selectedalteration) {
          for (let j = 0; j < this.selectedalteration.length; j++) {
            if (this.alertationdata[i]['id'] == this.selectedalteration[j]) {
              _data_.OrderAlterationData.push({
                AlterationId: this.alertationdata[i]['id'],
                Amount: this.alertationdata[i]['amount']
              })
            }
          }
        }
      }
    }

    this.displayloader = true;
    this.dataservice
      .proceedOrderCustomer(_data_)
      .subscribe(res => {
        this.displayloader = false;
        if (res.IsSuccess) {

          if (res.Data) {
            $.fancybox.close();
            let OrderId = res.Data;
            this.router.navigate(['/unit-detail'], { queryParams: { 'source': this.paramsObj.source, 'lotNum': this.paramsObj.lotNum, 'id': this.paramsObj.id, 'OrderId': OrderId } })
            this.getOrderTaskBarList(OrderId)
          }
          if (res.Message) {this.helperservice.displayMsg('error',res.Message);}
        }

      })
  }

  // add order functionality 
  addOrder() {

    let carRstrctMeterReading = (this.countryRistrictionData['MeterReading'] && this.countryRistrictionData['MeterReading'] != null) ? parseInt(this.countryRistrictionData['MeterReading']) : 0;
    if (carRstrctMeterReading && (carRstrctMeterReading >= this.item_detail['Mileage'])) {
      this.helperservice.displayMsg('error','Car Mileage must bhi less than MeterReading');
      return false;
    }

    if (this.countryRistrictionData['ToYear'] && this.countryRistrictionData['ToYear'] != null && this.countryRistrictionData['FromYear'] && this.countryRistrictionData['FromYear'] != null) {
      if(this.countryRistrictionData['PolicyTypeId'] == 5 || this.countryRistrictionData['PolicyTypeId'] == 6 || this.countryRistrictionData['PolicyTypeId'] == 7){
        if (this.countryRistrictionData['FromYear'] <= this.item_detail.Year && this.item_detail.Year <= this.countryRistrictionData['ToYear']) { }
        else { $.fancybox.open({ src: '#restrictionpopup', type: 'inline', }); return false }
      }
    }
    // if(this.countryRistrictionData['PolicyTypeId'] == 5 || this.countryRistrictionData['PolicyTypeId'] == 6 || this.countryRistrictionData['PolicyTypeId'] == 7){
    //   if (this.countryRistrictionData['FromYear'] <= this.item_detail.Year && this.item_detail.Year <= this.countryRistrictionData['ToYear']) { }
    //   else {
    //     $.fancybox.open({
    //       src: '#restrictionpopup',
    //       type: 'inline',
    //     });
    //     return false
    //   }
    // }


    let _data_ = {
      OrderPlanData:
        {
          shipmentType_Id: this.shipmentDetail.ShipmentType.id,
          package_Id: this.customerInfo.MembershipId,
          plan_Id: null,
          port_Id: this.shipmentDetail.ShipmentPort.port_Id,
          currencyCode: "JPY",
          countryCode: this.shipmentDetail.ShipmentCountry.code,
          PricingTypeId: 1,
          portName: this.shipmentDetail.ShipmentPort.name,
          shipmentTerm_Id: this.shipmentDetail.ShipmentTerm.id,
          customerOrders: [{
            model_Id: this.item_detail.ModelId,
            unitPrice: null,
            auctionHouse_Id: this.item_detail.AuctionHouseId,
            year: this.item_detail.Year,
            auctionType: this.paramsObj.source
          }]
        },
      OrderData:
        {
          TypeId: 1,
          CountryId: this.shipmentDetail.ShipmentCountry.id,
          PortId: this.shipmentDetail.ShipmentPort.port_Id,
          ShipmentTermId: this.shipmentDetail.ShipmentTerm.id,
          ShipmentTypeId: this.shipmentDetail.QuatationType.Id,
          PlanId: null,
          AgentId: 0,
          CurrencyId: 2,
          CurrencyRate: null,
          UpateIp: null,
          AuctionHouseId: this.item_detail.AuctionHouseId,
          BidPrice: null,
          ServiceCharges: null,
          RikusoFee: null,
          ExtraFee: null,
          OnePriceFee: null,
          AlterationCharges: null,
          InspectionCharges: null,
          ContainerCharges: null,
          VanningCharges: null,
          InsuranceFee: null,
          FOB: null,
          FreightCharges: null,
          CNF: null,
          meterReading: null,
          meterCube: null,
          bidComments: null,
          isNumberPlate: false,
          numberPlate: null,
          isCustomerNegotiation: false,
          chassisNumber: null,
          manufacturingMonth: null,
          manufacturingYear: null,
          CreaterTypeId: 1
        },
      AuctionData: {
        Source: this.paramsObj.source,
        APIUniqueId: this.item_detail.ReferenceId,
        LotNo: this.item_detail.LotNo,
      },
      OrderAlterationData: []
    }

    this.dataservice
      .proceedOrderCustomer(_data_)
      .subscribe(res => {
        if (res.IsSuccess) {
          let OrderId = res.Data;
          if (res.Message && res.Message != null) {this.helperservice.displayMsg('error',res.Message);} 
          else {
            this.router.navigate(['/unit-detail'], { queryParams: { 'source': this.paramsObj.source, 'lotNum': this.paramsObj.lotNum, 'id': this.paramsObj.id, 'quotationid': OrderId } })
            this.getOrderTaskBarList(OrderId)
          }

        }

      })

  }

  // updated taskbar functionality 
  getOrderTaskBarList(id) { this.dataservice.getOrdersList(id).subscribe(res => { if (res.IsSuccess) { this.addActiveKey(res.Data) } }); }

  getQuotationList(quotationId: string) { this.dataservice.getQuotationList(quotationId).subscribe(res => { if (res.IsSuccess) { this.addActiveKey(res.Data) } }); }

  updatequotationtaskbar(e) {
    if (e && e.data) {
      this.quotationId = e.data;
      this.router.navigate(['/unit-detail'], { queryParams: { 'source': this.paramsObj.source, 'lotNum': this.paramsObj.lotNum, 'id': this.paramsObj.id, 'quotationid': e.data } })
      this.getQuotationList(e.data);
    }
  }

  addActiveKey(data) {
    this.quotationSlideData = data; this.quotationSlideData.forEach((e) => { e['active'] = false });
    if (this.quotationSlideData && this.quotationSlideData.length > 0) { this.hideshowtaskList = true; }
  }

  // active or not active footer car 
  activeftrCar(index) { this.quotationSlideData.forEach((e) => { e['active'] = false }); this.quotationSlideData[index]['active'] = (this.quotationSlideData[index]['active']) ? false : true; }
  // end


  // country restriction functionality 
  getcountryrestriction() {
    this.dataservice._getCountryRestrictionDetail(this.shipmentDetail.ShipmentCountry.id)
      .subscribe(res => {
        if (res.Data) { this.countryRistrictionData = res.Data; }
      })
  }

  focusOut(e){
    this.userdetail.bidprice = Math.round(this.userdetail.bidprice / 1000) * 1000;
  }

      /*****************************************
   * open inquire now popup functionality 
   *******************************************/
  openInquireNowPopUp(){
    this._inquireData.Images = this.item_detail['Images'];
    this._inquireData.LotNo = this.item_detail['LotNo'];
    this._inquireData.Make = this.item_detail['Make'];
    this._inquireData.Model = this.item_detail['Model'];
    this._inquireData.Engine = this.item_detail['Engine'];
    this._inquireData.ReferenceId = this.item_detail['ReferenceId'];
    this._inquireData.Mileage = this.item_detail['Mileage'];
    this._inquireData.Year = this.item_detail['Year'];
    this._inquireData.AuctionSource = this.paramsObj.source;
    this._inquireData.CountryId = (this.shipmentDetail && this.shipmentDetail.ShipmentCountry && this.shipmentDetail.ShipmentCountry.id) ? this.shipmentDetail.ShipmentCountry.id : 0;
    this._inquireData.Port = (this.shipmentDetail && this.shipmentDetail.ShipmentPort && this.shipmentDetail.ShipmentPort.name) ? this.shipmentDetail.ShipmentPort.name : '';
    this._inquireData.Location = (this.shipmentDetail && this.shipmentDetail.ShipmentCountry && this.shipmentDetail.ShipmentCountry.name) ? this.shipmentDetail.ShipmentCountry.name:'';
    let inquiredatacomplete = Object.assign({},this._inquireData);
    this._inquireData = new InquireData();
    this.inquirenow = inquiredatacomplete;
  }

}
