import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

//services
import { DataService } from '../../Services/data.service';
import { HelperService } from '../../Services/helper.service';
import { StorageService } from '../../Services/storage.service';
import { SpecificQuotation } from '../../Services/quotation.service';
import { DashboardServices } from '../../Services/dashboard.service';

//enum 
import { SourceType } from '../../enums/sourceType';

import { element } from 'protractor';

//models
import { Transmission } from '../../models/transmission';
import { AuctionSearchResponse } from '../../models/auctionSearchResponse';
import { CustomerShipmentDetail } from '../../models/customerShipmentDetail';
import { Make } from '../../models/make';
import { VehicleModel } from '../../models/vehicleModels';
import { SearchVehicle } from '../../models/searchVehicle';
import { AuctionSearch } from '../../models/auctionSearch';
import { Condition } from '../../models/condition';
import { Status } from '../../models/status';
import { day } from '../../models/day';
import { month } from '../../models/month';
import { Page } from '../../models/page';
import { ShipmentDetail } from '../../models/shipmentDetail';
import { QuotationPricing } from '../../models/quotationPricing';
import { CustomerInformation } from '../../models/customerInformation';
import { QuotationSlideData } from '../../models/quotation-slide-date';
import { SearchStockResponse } from '../../models/SearchStockResponse';
import { StockDetail } from '../../models/stockmodel';
import { InquireData } from '../../models/inquiredata';

declare var $: any;
declare var moment: any;

@Component({
  selector: 'app-auction-car-search',
  templateUrl: './auction-car-search.component.html',
  styleUrls: ['./auction-car-search.component.css']
})
export class AuctionCarSearchComponent implements OnInit {
  makes: Make[] = [];
  selectedMake = new Make();
  models: Array<any> = [];
  vehicleModels: VehicleModel[] = [];
  vehicleAuctionHouses: any = [];
  _selectedauctionHouses: any = [];
  selectedVehicleModel = new VehicleModel();
  selectedVehicleMake = new VehicleModel();
  searchVehicle = new SearchVehicle();
  years: any[] = [];
  conditions: Condition[] = [];
  statuses: Status[] = [];
  transmissions: Transmission[] = [];
  auctionSearch = new AuctionSearch();
  auctionSearchResponses: AuctionSearchResponse[] = [];
  days: day[] = [];
  page = new Page();
  customerShipmentDetail = new CustomerShipmentDetail();
  _customerShipmentDetailStock = new CustomerShipmentDetail();
  selectedQuotationPricing: QuotationPricing;
  customerInformation: CustomerInformation = new CustomerInformation();
  quotationId: string;
  imageRefresh = false;
  refreshQuotationTitleBar: boolean = false;
  selectedsource: string = 'Auction';
  months: month[] = [];
  selectedmonths: Array<any> = [];

  isCustomerLogin: boolean = false;
  _bidallow: boolean = false;

  public selectedauctionsource: number = 1;

  public hideshowtaskList: boolean = false;
  public quotationSlideData: QuotationSlideData[] = [];
  public new_order_or_quotation: string;
  slideConfig: any;


  public activeandunactivetextarea: boolean = false; // temperorary key 
  public searchListEmprty: boolean = false;

  public countryRestrictionDetail: String = '';

  public cntryRstrtnPopUp: boolean = false;
  public cntryRstrctnPlcyId: number = 0;

  public selectedinquireitem: any;


  public displayYearsMont = {
    year: [],
    month: []
  }

  shipmentDetail = new ShipmentDetail();
  // _customerShipmentDetail = new CustomerShipmentDetail();
  _minPrice: number = null;
  _maxPrice: number = null;
  _minEngineCC: number = null;
  _maxEngineCC: number = null;
  _minMileage: number = null;
  _maxMileage: number = null;
  _minYear: number = 0;
  _maxYear: number = 0;
  _searchStockResponse = new SearchStockResponse();
  _makes: any
  _models: any;

  makesBrandIds: any = [];
  featuresList: any = [];
  priceRanges: any = [];

  filterDropDown: any = [];
  _selectedSortFilter: any = 0;
  _colors: any = [];
  _bodyType: any = [];
  _selectedColor: any = 0;
  _selectedTransmission: any = 0;
  _paginationCheck: boolean = true;

  // stock popup vaiables declare 
  public stockdetail = new StockDetail();
  public _stockdetail: StockDetail;

  public _inquireData = new InquireData();
  public inquirenow: InquireData;

  public openStockTabByCustomer : boolean = false ; 
  public customerCountryId : any ;

  constructor(
    private dataService: DataService,
    private helperService: HelperService,
    private storageService: StorageService,
    private route: ActivatedRoute,
    private router: Router,
    private dashboardService: DashboardServices,
    private quotationservice: SpecificQuotation
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

    this.filterDropDown.push({ Value: 'MakeAscending', Name: "Make - A to Z" })
    this.filterDropDown.push({ Value: 'MakeDescending', Name: "Make - Z to A" })
    this.filterDropDown.push({ Value: 'PriceAscending', Name: "Price - Low To High" })
    this.filterDropDown.push({ Value: 'PriceDescending', Name: "Price - High To Low" })
    this.filterDropDown.push({ Value: 'EngineAscending', Name: "CC - Low To High" })
    this.filterDropDown.push({ Value: 'EngineDescending', Name: "CC - High To Low" })
    this.filterDropDown.push({ Value: 'YearAscending', Name: "Year - Old To New" })
    this.filterDropDown.push({ Value: 'YearDescending', Name: "Year - New To Old" })
    this.filterDropDown.push({ Value: 'MileageAscending', Name: "Mileage - Low To High" })
    this.filterDropDown.push({ Value: 'MileageDescending', Name: "Mileage - High To Low" })
  }

  ngOnInit() {

    this.helperService.calljsresp();

    this.openStockTabByCustomer = (this.route.snapshot.queryParams['action'] && this.route.snapshot.queryParams['action'] == 'stock')?true:false;

    this.new_order_or_quotation = this.storageService.getDecrypted('order_or_quotation');
    this.isCustomerLogin = this.storageService.get('customerlogin');
    const bidallow = this.storageService.getDecrypted('_a');
    this.quotationId = this.route.snapshot.queryParams['quotationid'];

    let curr_year = moment().format('YYYY');

    for (let i = 1; i <= 12; i++) { this.displayYearsMont.month.push(i); }
    for (let i = curr_year; i >= 1900; i--) { this.displayYearsMont.year.push(i); }

    if (this.quotationId) {
      this.getParamsId();
    }
    if (bidallow == 'true') {
      this._bidallow = true;
    }

    if(!this.openStockTabByCustomer){this.getMakes();}
    this._getAuctionSearchMonths();
    this.getAuctionSearchDays();
    this.page.Index = 0;
    this.page.Size = 10;


    if (!this.isCustomerLogin || this._bidallow) {
      this.customerShipmentDetail = this.storageService.getDecrypted('customerShipmentDetail');
      this._customerShipmentDetailStock = this.storageService.getDecrypted('customerShipmentDetail');
    }
    this.customerInformation = this.storageService.getDecrypted('customerInformation');
    this.storageService.setEncrypted('source', this.selectedsource);

    this.customerCountryId = this.customerInformation.CountryId;
    
    if(this.openStockTabByCustomer){ 
      this.searchCarData('OwnStock') 
    }
    if(!this.openStockTabByCustomer){ this.getCountryRestrictionDetail();}

  }


  getCountryRestrictionDetail() {
    if (!this.isCustomerLogin || this._bidallow) {
      this.dataService._getCountryRestrictionDetail(this.customerShipmentDetail.ShipmentCountry.id).subscribe(res => {
        if (res.Data) {
          this.countryRestrictionDetail = (res.Data) ? res.Data : '';
          this.cntryRstrctnPlcyId = (res.Data) ? res.Data['PolicyTypeId'] : '';
        }
      })
    }
  }

  getParamsId() {

    if (this.new_order_or_quotation == 'order') {
      this.getOrderTaskBarList(this.quotationId);
    }
    if (this.new_order_or_quotation == 'quotation') {
      this.getQuotationList(this.quotationId);
    }

    if (!this.quotationId) {
      this.storageService.setEncrypted('pric_id', 0)
    }
  }

  getMakes() {
    this._selectedauctionHouses = [];
    this.dataService.getMakes().subscribe(res => {
      this.makes = res.Data;
      this.selectedVehicleMake.Id = 0;
      this.selectMake(this.makes[0]);
      this.helperService.calljsresp();
    });
  }

  _getMakes() {
    this.dataService.getMakes().subscribe(res => {
      this.makes = res.Data;
      this.selectedVehicleMake.Id = (this.makes && this.makes.length) ? this.makes[0]['Id'] : 0;
      this.getModels();
      this.helperService.calljsresp();
    });
  }

  getModels() {
    $(".makelst > ul > li").removeClass('act');
    this.makesBrandIds = [];
    this.dataService
      .getmodels(this.selectedVehicleMake.Id)
      .subscribe(res => {
        let _data_: any = res;
        if (_data_.isSuccess) {
          this.models = _data_.data;
          this.selectedVehicleModel.Id = 0;
          this._makes = Object.assign([], this.makes.find(x => x.Id == this.selectedVehicleMake.Id));
          this.selectedVehicleMake = this._makes;

        }
      })
  }

  onModelChange(Id) {
    this._models = this.models.find(x => x.id == Id);
    this.selectedVehicleModel.Id = this._models.id;
    this.selectedVehicleModel.Title = this._models.name;
  }

  selectMake(make: Make) {
    this._selectedauctionHouses = [];
    this.selectedMake = make;
    this.selectedMake.Selected = true;
    this.getMakeModels(make); // get models
    setTimeout(() => {
      this.helperService.loadModelFunctions();
    }, 500);
  }

  getMakeModels(make: Make) {
    this.vehicleModels = [];
    this.auctionSearchResponses = [];
    this.selectedVehicleModel = new VehicleModel();
    this.dataService
      .getMakesModels(make, this.selectedsource)
      .subscribe(res => {
        this.helperService.calljsresp();
        if (res.Data.length > 0) {
          this.vehicleModels = res.Data;
          this.selectVehicleModel(this.vehicleModels[0]);
          return;
        }
      });
  }

  selectVehicleModel(vehicleModel: VehicleModel) {
    this.selectedVehicleModel = vehicleModel;
    this.selectedVehicleModel.Selected = true;
    this.auctionSearch.ModelId = vehicleModel.Id;
    this.searchVehicleModel(vehicleModel);
  }

  searchVehicleModel(vehicleModel: VehicleModel) {
    this.dataService.searchVehicleModel(vehicleModel, this.selectedsource)
      .subscribe(res => {
        this.searchVehicle = res.Data;
        this.vehicleAuctionHouses = this.searchVehicle['AuctionHouses'];
        this.years = this.helperService.getMinMaxArray(
          parseInt(this.searchVehicle.Year.Min),
          parseInt(this.searchVehicle.Year.Max),
          1
        );
        this.auctionSearch.Year.Min = this.years[0].Title;
        this.auctionSearch.Year.Max = this.years[this.years.length - 1].Title;
        this.conditions = this.helperService.arrayGenerator(
          this.searchVehicle.Conditions
        );
        this.statuses = this.helperService.arrayGenerator(
          this.searchVehicle.Status
        );
        this.transmissions = this.helperService.arrayGenerator(
          this.searchVehicle.Transmissions
        );
        setTimeout(() => {
          this.helperService.loadOtherAuctionSerachFunction();
        }, 500);
      });
  }

  searchAuctioncars(pagenumber) {

    this.searchListEmprty = false;

    if (pagenumber == '0') {
      this.page.Index = 0;
    }

    this.auctionSearch.AuctionHouses = [];
    this._selectedauctionHouses.forEach(element => {
      this.auctionSearch.AuctionHouses.push(element.Id);
    });

    let chassis = this.searchVehicle.Chassis.filter(x => x.Selected);
    this.auctionSearch.Chassis = [];
    chassis.forEach(element => {
      this.auctionSearch.Chassis.push(element.Id);
    });

    let conditions = this.conditions.filter(x => x.Selected);
    this.auctionSearch.Conditions = [];
    conditions.forEach(element => {
      this.auctionSearch.Conditions.push(element.Title);
    });

    let colors = this.searchVehicle.Colors.filter(x => x.Selected);
    this.auctionSearch.Colors = [];
    colors.forEach(element => {
      this.auctionSearch.Colors.push(element.Id);
    });

    let statuses = this.statuses.filter(x => x.Selected);
    this.auctionSearch.Status = [];
    statuses.forEach(element => {
      this.auctionSearch.Status.push(element.Title);
    });

    let transmissions = this.transmissions.filter(x => x.Selected);
    this.auctionSearch.Transmissions = [];
    transmissions.forEach(element => {
      this.auctionSearch.Transmissions.push(element.Title);
    });

    let days = this.days.filter(x => x.Selected);
    this.auctionSearch.Days = [];
    days.forEach(element => {
      this.auctionSearch.Days.push(element.EnumVal);
    });

    if (this.selectedsource == 'Stock') {
      this.auctionSearch.Days = [];
      if (this.selectedmonths.length) {
        for (let i = 0; i < this.selectedmonths.length; i++) {
          this.auctionSearch.Days.push(this.selectedmonths[i]);
        }
      }
    }

    this.auctionSearch.Mileage = this.searchVehicle.Mileage;
    this.auctionSearch.Engine = this.searchVehicle.Engine;
    if (this.auctionSearch.Type != null) {
      this.IsLotNumber(this.auctionSearch.IsSelectedLotNumber);
    }

    this.auctionSearch.Page = this.page.Index + 1;
    this.auctionSearch.Count = this.page.Size;

    this.auctionSearch.SearchType = this.selectedsource;

    $('.datatable-row-wrapper').removeClass('blocked');

    this.dataService.searchAuction(this.auctionSearch).subscribe(res => {
      this.auctionSearchResponses = res.Data.Results;
      this.searchListEmprty = (this.auctionSearchResponses.length > 0) ? false : true;
      this.page.TotalRecords = res.Data.Count;
      this.auctionSearchResponses.forEach((element, index) => {
        let date = moment(element.AuctionDate).format('d.MM.YYYY');
        let time = moment(element.AuctionDateTime / 1000).format('HH:mm');
        element.AuctionDateTime = date;
        element.AuctionTime = time;
        if (element.Images.length > 1) {
          let images = this.helperService.arrayGenerator(element.Images);
          element.Images = images;
        }

        if (this.countryRestrictionDetail['PolicyTypeId'] == 5 || this.countryRestrictionDetail['PolicyTypeId'] == 6 || this.countryRestrictionDetail['PolicyTypeId'] == 7) {
          if (this.countryRestrictionDetail['FromYear'] <= element.Year && element.Year <= this.countryRestrictionDetail['ToYear']) {
            element['Ristriction'] = false;
          } else {
            let _index = index + 1;
            element['Ristriction'] = true
            setTimeout(() => { $('.datatable-row-wrapper:nth-child(' + _index + ')').addClass('blocked'); }, 200)
          };
        }
      });
      this.helperService.calljsresp();
      this.imageLoader();
    });
  }

  IsLotNumber(bit: boolean) {
    this.auctionSearch.Type = this.auctionSearch.Type.trim();
    if (bit) {
      let _lot_number: any = (this.auctionSearch.Type) ? this.auctionSearch.Type.split('\n') : '';
      _lot_number = (_lot_number) ? _lot_number.join(",") : '';
      this.auctionSearch.LotNo = _lot_number;
      this.auctionSearch.Chassis = [];
      return;
    }
    this.auctionSearch.Chassis = [];
    let chassis = this.searchVehicle.Chassis.filter(x => x.Selected);
    chassis.forEach(element => {
      element.Selected = false;
    });
    let _chassis_number: any = (this.auctionSearch.Type) ? this.auctionSearch.Type.split('\n') : '';
    this.auctionSearch.Chassis = (_chassis_number.length) ? _chassis_number : [];
    this.auctionSearch.LotNo = '';
  }

  _getAuctionSearchMonths() {
    this.months = this.helperService.getAuctionSearchMonths();
  }

  getAuctionSearchDays() {
    this.days = this.helperService.getAuctionSerachDays();
  }

  setPage(pageInfo) {
    this.page.Index = pageInfo.offset;
    this.searchAuctioncars('');
    this.imageLoader();
  }

  imageLoader() {
    this.imageRefresh = true;
    setTimeout(() => {
      this.imageRefresh = false;
    }, 1000);
  }
  sorting(column: any) {
    if (column) {
      this.auctionSearch.SortOrder = column.sorts[0].dir;
      this.auctionSearch.SortBy =
        column.sorts[0].prop == 'startSolidFor'
          ? 'SoldPrice'
          : column.sorts[0].prop;
      this.searchAuctioncars('');
    }
  }

  selectedVehicleLink(row: AuctionSearchResponse) {

    let carRstrctMeterReading = (this.countryRestrictionDetail['MeterReading'] && this.countryRestrictionDetail['MeterReading'] != null) ? parseInt(this.countryRestrictionDetail['MeterReading']) : 0;
    if (carRstrctMeterReading && (carRstrctMeterReading >= row['Mileage'])) {
      this.helperService.displayMsg('error', 'Car Mileage must bhi less than MeterReading');
      return false;
    }

    if (row['Ristriction']) {
      $.fancybox.open({
        src: '#restrictionpopup',
        type: 'inline',
      });
      return false;
    }


    let quotationPricing: QuotationPricing = new QuotationPricing();
    quotationPricing.shipmentType_Id = this.customerShipmentDetail.ShipmentType.id;
    quotationPricing.countryId = this.customerShipmentDetail.ShipmentCountry.id;
    quotationPricing.package_Id = this.customerInformation.MembershipId;
    quotationPricing.plan_Id = null;
    quotationPricing.port_Id = this.customerShipmentDetail.ShipmentPort.port_Id;
    quotationPricing.portName = this.customerShipmentDetail.ShipmentPort.name;
    quotationPricing.countryCode = this.customerShipmentDetail.ShipmentCountry.code;
    quotationPricing.shipmentTerm_Id = this.customerShipmentDetail.ShipmentTerm.id;
    quotationPricing.referenceId = row.ReferenceId;
    quotationPricing.ModelId = row.ModelId;
    quotationPricing.Model = row.Model;
    quotationPricing.Make = row.Make;
    quotationPricing.Transmission = row.Transmission;
    quotationPricing.Year = row.Year;
    quotationPricing.Chassis = row.Chassis;
    quotationPricing.LotNo = row.LotNo;
    quotationPricing.AuctionDate = row.AuctionDate;
    quotationPricing.AuctionDateTime = row.AuctionDateTime;
    quotationPricing.AuctionTime = row.AuctionTime;
    quotationPricing.AuctionHouseId = row.AuctionHouseId;
    quotationPricing.AuctionHouse = row.AuctionHouse;
    quotationPricing.Images = row.Images;
    quotationPricing.AuctionSheet = row.AuctionSheet;
    quotationPricing.averagePrice = row.AveragePrice;
    quotationPricing.StartPrice = row.StartPrice;

    if (this.selectedsource == 'Auction') {
      quotationPricing.SourceType = 1;
    }
    if (this.selectedsource == 'OnePrice') {
      quotationPricing.SourceType = 2;
    }
    if (this.selectedsource == 'Stock') {
      quotationPricing.SourceType = 3;
    }

    quotationPricing.IsRedirectPage = {
      path: 'search'
    };
    let auctiontype: number = 0;

    if (this.selectedsource == 'Auction') auctiontype = 1;
    else if (this.selectedsource == 'OnePrice') auctiontype = 2;
    else if (this.selectedsource == 'Stock') auctiontype = 3;

    quotationPricing.customerOrders.push({
      model_Id: row.ModelId,
      auctionHouse_Id: row.AuctionHouseId,
      year: row.Year,
      auctionType: auctiontype
    });
    this.selectedQuotationPricing = quotationPricing;
  }

  onlyNumberKey(event) {
    return event.charCode == 8 || event.charCode == 0
      ? null
      : event.charCode >= 48 && event.charCode <= 57;
  }

  searchCarData(data) {
    this.helperService.calljsresp();
    if (data == 'Auction') {
      this.getMakes();
      // SearchStockFilter(1,10,'','',false)
      this.selectedauctionsource = 1;
    }

    if (data == 'OnePrice') {
      this.getMakes();
      this.selectedauctionsource = 2;
    }

    if (data == 'Stock') {
      this.getMakes();
      this.selectedauctionsource = 3;
    }

    if (data == 'OwnStock') {
      $(".makelst > ul > li").removeClass('act');
      this.makesBrandIds = [];
      this._searchStockResponse = new SearchStockResponse();
      this._getMakes();
      this.GetOGDataAPI();
      this._bodyType = this.helperService.getBodyType();
      this.selectedauctionsource = 4;
      this.getCountryPortDetails();
    }

    this.selectedsource = data;
    this.storageService.setEncrypted('source', this.selectedsource);
    this.vehicleModels = [];
    this.vehicleAuctionHouses = [];
    this._selectedauctionHouses = [];
    this.selectedVehicleModel = new VehicleModel();
    this.auctionSearchResponses = [];
    this.makes = [];
    $('.removeactiveclass').removeClass('active');


    this.auctionSearch = new AuctionSearch();
  }

  openunitdetailpage(row) {

    let sourceId = 0;
    if (this.selectedsource == 'Auction') {
      sourceId = 1;
    }

    if (this.selectedsource == 'OnePrice') {
      sourceId = 2;
    }

    if (this.selectedsource == 'Stock') {
      sourceId = 3;
    }
    // window.open('https://area.autorod.com/unit-detail?source='+sourceId+'&lotNum='+row.LotNo+'&id='+row.ReferenceId , '_blank')
    window.open('http://devserver:600/unit-detail?source=' + sourceId + '&lotNum=' + row.LotNo + '&id=' + row.ReferenceId, '_blank')
    // window.open('http://localhost:4200/unit-detail?source=' + sourceId + '&lotNum=' + row.LotNo + '&id=' + row.ReferenceId, '_blank');
  }

  // select or un select month functionality
  selectmonth(data) {
    if (this.selectedmonths.length) {
      let checkmonth: boolean = true;
      for (let i = 0; i < this.selectedmonths.length; i++) {
        if (data.Id == this.selectedmonths[i]) {
          this.selectedmonths.splice(i, 1);
          checkmonth = false;
          break;
        }
      }
      if (checkmonth) {
        this.selectedmonths.push(data.Id);
      }
    } else[this.selectedmonths.push(data.Id)];
  }

  // add order functionality 
  addOrder(row, index) {


    let carRstrctMeterReading = (this.countryRestrictionDetail['MeterReading'] && this.countryRestrictionDetail['MeterReading'] != null) ? parseInt(this.countryRestrictionDetail['MeterReading']) : 0;
    if (carRstrctMeterReading && (carRstrctMeterReading >= row['Mileage'])) {
      this.helperService.displayMsg('error', 'Car Mileage must bhi less than MeterReading');
      return false;
    }

    if (row['Ristriction']) {
      $.fancybox.open({
        src: '#restrictionpopup',
        type: 'inline',
      });
      return false;
    }

    let _data_ = {
      OrderPlanData:
        {
          shipmentType_Id: this.customerShipmentDetail.ShipmentType.id,
          package_Id: this.customerInformation.MembershipId,
          plan_Id: null,
          port_Id: this.customerShipmentDetail.ShipmentPort.port_Id,
          currencyCode: "JPY",
          countryCode: this.customerShipmentDetail.ShipmentCountry.code,
          PricingTypeId: 1,
          portName: this.customerShipmentDetail.ShipmentPort.name,
          shipmentTerm_Id: this.customerShipmentDetail.ShipmentTerm.id,
          customerOrders: [{
            model_Id: row.ModelId,
            unitPrice: null,
            auctionHouse_Id: row.AuctionHouseId,
            year: row.Year,
            auctionType: this.selectedauctionsource
          }]
        },
      OrderData:
        {
          TypeId: 1,
          CountryId: this.customerShipmentDetail.ShipmentCountry.id,
          PortId: this.customerShipmentDetail.ShipmentPort.port_Id,
          ShipmentTermId: this.customerShipmentDetail.ShipmentTerm.id,
          ShipmentTypeId: this.customerShipmentDetail.QuatationType.Id,
          PlanId: null,
          AgentId: 0,
          CurrencyId: 2,
          CurrencyRate: null,
          UpateIp: null,
          AuctionHouseId: row.AuctionHouseId,
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
        Source: this.selectedauctionsource,
        APIUniqueId: row.ReferenceId,
        LotNo: row.LotNo,
      },
      OrderAlterationData: []
    }

    this.dataService
      .proceedOrderCustomer(_data_)
      .subscribe(res => {
        if (res.IsSuccess) {
          let OrderId = res.Data;
          if (res.Message && res.Message != null) {
            this.helperService.displayMsg('error', res.Message);
          } else {
            this.router.navigate(['/auction-car-search'], { queryParams: { 'quotationid': OrderId } })
            this.getOrderTaskBarList(OrderId)
          }
        }
      })

  }

  // updated taskbar functionality 
  getOrderTaskBarList(id) { this.dataService.getOrdersList(id).subscribe(res => { if (res.IsSuccess) { this.addActiveKey(res.Data); } }); }

  getQuotationList(quotationId: string) { this.dataService.getQuotationList(quotationId).subscribe(res => { if (res.IsSuccess) { this.addActiveKey(res.Data); } }); }

  updatequotationtaskbar(e) {
    if (e && e.data) {
      this.quotationId = e.data;
      this.router.navigate(['/auction-car-search'], { queryParams: { 'quotationid': e.data } })
      this.getQuotationList(e.data);
    }
  }

  addActiveKey(data) {
    this.quotationSlideData = data; this.quotationSlideData.forEach((e) => { e['active'] = false });
    if (this.quotationSlideData && this.quotationSlideData.length > 0) { this.hideshowtaskList = true; }
  }
  // end 

  selectunselectday(index, day) {
    this.days[index]['Selected'] = (this.days[index]['Selected']) ? false : true;
  }
  // active or not active footer car 
  activeftrCar(index) { this.quotationSlideData.forEach((e) => { e['active'] = false }); this.quotationSlideData[index]['active'] = (this.quotationSlideData[index]['active']) ? false : true; }

  // select or unselect auction house functionality 
  selectedauctionhouse(data) {
    let checkAuctionHouse: boolean = false;
    if (this._selectedauctionHouses.length) {
      for (let i = 0; i < this._selectedauctionHouses.length; i++) {
        if (this._selectedauctionHouses[i]['Id'] == data['Id']) {
          this._selectedauctionHouses.splice(i, 1);
          checkAuctionHouse = true;
          break;
        }
      }
      if (!checkAuctionHouse) this._selectedauctionHouses.push(data);
    } else this._selectedauctionHouses.push(data);
  }

  // tabs search data functionality 
  searhData() {
    this.helperService.calljsresp();
  }

  // Search STOCK 

  getCountryPortDetails() {
    var customerInformation: CustomerInformation = this.customerInformation;
    this.dashboardService.getShipmentDetail(customerInformation.MembershipId)
      .subscribe(res => {
        this.shipmentDetail = res.data;
        this.SearchStockFilter(1, 10, '', '', false);
      })
  }

  GetOGDataAPI() {

    this.dataService.GetOGDatasetForddl()
      .subscribe(res => {
        let data = res;
        if (data) {
          let _data: any = data.Data;
          this._colors = _data;
        }

      });

  }

  SearchStockFilter(page: number, count: number, sortby: any, sortorder: any, ismultiMakes: boolean, fromPaging = 'none') {

    let _ObjMileage: any = {
      Min: 0,
      Max: 0
    }

    let _ObjPrice: any = {
      Min: 0,
      Max: 0
    }

    let _ObjEngineCC: any = {
      Min: 0,
      Max: 0
    }

    let _ObjYear: any = {
      Min: 0,
      Max: 0
    }

    let _SortOrder: any;

    let _ClientId: any = 'c4mxXFACb6I=';
    let makeid: any = '';
    let multiMakeIds: any;
    let featureslist: string = '';
    if (ismultiMakes) {
      let _arrmakes: any[];
      multiMakeIds = this.makesBrandIds.toString();
      _arrmakes = multiMakeIds.split(',');
      makeid = multiMakeIds;
      this.selectedVehicleModel.Id = 0;
      if (_arrmakes.length == 1) {
        this._makes = Object.assign([], this.makes.find(x => x.Id == _arrmakes[0]));
      } else {
        this._makes = Object.assign([], this.makes.find(x => x.Title.trim() == 'Any'));
      }

      this.selectedVehicleMake = this._makes;
    } else {
      makeid = this.selectedVehicleMake.Id.toString();
    }

    if (this.priceRanges.length > 0) {
      _ObjPrice.Min = this.priceRanges[0].minprice;
      _ObjPrice.Max = this.priceRanges[0].maxprice;
    } else {
      _ObjPrice.Min = this._minPrice == null ? 0 : this._minPrice;
      _ObjPrice.Max = this._maxPrice == null ? 0 : this._maxPrice;
    }

    if (this.featuresList.length > 0) {
      featureslist = this.featuresList.toString();
    }

    if (sortorder != '' || this._selectedSortFilter != 0) {
      _SortOrder = this._selectedSortFilter;
    }

    _ObjMileage.Min = this._minMileage;
    _ObjMileage.Max = this._maxMileage;
    _ObjEngineCC.Min = this._minEngineCC;
    _ObjEngineCC.Max = this._maxEngineCC;
    _ObjYear.Min = this._minYear;
    _ObjYear.Max = this._maxYear;

    let _searchRequestModel: any = {
      MakeId: makeid,
      ModelId: this.selectedVehicleModel.Id,
      Page: page,
      Count: count,
      Mileage: _ObjMileage,
      Price: _ObjPrice,
      Engine: _ObjEngineCC,
      Year: _ObjYear,
      ClientId: _ClientId,
      TransmissionId: this._selectedTransmission,
      ColorId: this._selectedColor,
      DriveType: $("#ddlDriveType").val(),
      SteeringId: $("#ddlSteering").val(),
      DoorId: $("#ddlDoor").val(),
      SortBy: sortby,
      SortOrder: _SortOrder,
      Features: featureslist,
      ShipmentCountryId: (this._customerShipmentDetailStock && this._customerShipmentDetailStock.ShipmentCountry && this._customerShipmentDetailStock.ShipmentCountry.id )?this._customerShipmentDetailStock.ShipmentCountry.id : this.customerCountryId,
      // ShipmentCountryId: -1,
      ShipmentTypeId: 0,
      ShipmentTermId: 0,
      PortId: (this._customerShipmentDetailStock && this._customerShipmentDetailStock.ShipmentPort && this._customerShipmentDetailStock.ShipmentPort.id  )?this._customerShipmentDetailStock.ShipmentPort.id:0,
      // PortId : -1,
      CategoryId: 0
    }

    if (this.selectedVehicleMake.Id > 0) {

      this.quotationservice.StockFilter(_searchRequestModel)
        .subscribe(res => {

          if (res) {
            if (res.Data.Count > 0) {
              this._searchStockResponse = res.Data;
              if (fromPaging != 'fromPaging') {
                this.createPagination(this._searchStockResponse.Count, true);
              }

            } else {
              this._searchStockResponse = new SearchStockResponse();
              this.helperService.displayMsg('error', 'No record found');
              $('#pagination-dm2').twbsPagination('destroy')
            }
          } else {
            this.helperService.displayMsg('error', 'Something went wrong');
          }

        });

    } else {
      this._searchStockResponse = new SearchStockResponse();
      $('#pagination-dm2').twbsPagination('destroy')
      this.helperService.displayMsg('error', 'Please select Make');
    }


  }


  createPagination(count, isSearching) {
    this._paginationCheck = isSearching;
    let totalpages: number = count / 10;
    totalpages = Math.ceil(totalpages);
    if (totalpages > 1) {

      $('#pagination-dm2').show();
      $('#pagination-dm2').twbsPagination('destroy')

      $('#pagination-dm2').twbsPagination({
        totalPages: totalpages,
        visiblePages: 7,
        onPageClick: (event, page) => {

          if (!this._paginationCheck) {
            if (this.makesBrandIds.length > 0) {
              this.SearchStockFilter(page, 10, '', '', true, 'fromPaging')
            } else {
              this.SearchStockFilter(page, 10, '', '', false, 'fromPaging')
            }
          } else {
            this._paginationCheck = false;
          }

        }
      });
    } else {
      $('#pagination-dm2').hide();
    }

  }

  multimakeSelection(id) {

    if (this.makesBrandIds.length) {
      let checkId: boolean = false;
      for (let i = 0; i < this.makesBrandIds.length; i++) {
        if (id == this.makesBrandIds[i]) {
          checkId = true;
          this.makesBrandIds.splice(i, 1);
        }
      }

      if (!checkId) { this.makesBrandIds.push(id); }

    } else this.makesBrandIds.push(id);

    if (this.makesBrandIds.length > 0) {
      this.SearchStockFilter(1, 10, '', '', true)
    } else {
      this.selectedVehicleMake.Id = 0;
      this.SearchStockFilter(1, 10, '', '', false)
    }

  }

  PriceRangeSelection(minPrice, maxPrice) {

    if (this.priceRanges.length) {
      let checkId: boolean = false;

      for (let i = 0; i < this.priceRanges.length; i++) {
        if (this.priceRanges[i] != null) {
          checkId = true;
          this.priceRanges.splice(i, 1);
        }
      }

      if (!checkId) { this.priceRanges.push({ minprice: minPrice, maxprice: maxPrice }); }

    } else this.priceRanges.push({ minprice: minPrice, maxprice: maxPrice });

    if (this.priceRanges.length > 0 || this.makesBrandIds.length > 0) {
      this.SearchStockFilter(1, 10, '', '', true)
    } else {
      this.SearchStockFilter(1, 10, '', '', false)
    }

  }


  featuresListSelection(id) {

    if (this.featuresList.length) {
      let checkId: boolean = false;
      for (let i = 0; i < this.featuresList.length; i++) {
        if (id == this.featuresList[i]) {
          checkId = true;
          this.featuresList.splice(i, 1);
        }
      }

      if (!checkId) { this.featuresList.push(id); }

    } else this.featuresList.push(id);

  }

  OnSortFilterChange(sortValue, isddlSelect: boolean) {

    if (isddlSelect) {
      if (sortValue != 0) {
        if (this.makesBrandIds.length > 0) {
          this.SearchStockFilter(1, 10, '', sortValue, true);
        } else {
          this.SearchStockFilter(1, 10, '', sortValue, false);
        }
      }
    } else {
      if (this.makesBrandIds.length > 0) {
        this.SearchStockFilter(1, 10, '', sortValue, true);
      } else {
        this.SearchStockFilter(1, 10, '', sortValue, false);
      }
    }


  }

  /**************************************
   * open stock detail page functionality 
   **************************************/
  openstocldetailpage(items) {

    let selectedCountryId = (this.customerShipmentDetail && this.customerShipmentDetail.ShipmentCountry && this.customerShipmentDetail.ShipmentCountry.id)?this.customerShipmentDetail.ShipmentCountry.id:this.customerCountryId;

    let _data_ = 'ProductId=' + items.ProductId + '&ReferenceId=' + items.ReferenceId + '&CountryId=' + selectedCountryId + '&AuctionHouseId=' + items.AuctionHouseId;
    // window.open('https://area.autorod.com/unit-detail-stock?'+_data_ , '_blank')
    window.open('http://devserver:600/unit-detail-stock?'+_data_, '_blank')
    // window.open('http://localhost:4200/unit-detail-stock?' + _data_, '_blank');
  }

  /*******************************************
   * open stockprice popup functionality 
   ******************************************/
  openstockpricepopup(data) {

    this.stockdetail.ClientId = data.ClientId;
    this.stockdetail.ShipmentCountryId = this.customerShipmentDetail.ShipmentCountry.id;
    this.stockdetail.ShipmentCountryName = this.customerShipmentDetail.ShipmentCountry.name;
    this.stockdetail.ShipmentPortName = this.customerShipmentDetail.ShipmentPort.name;
    this.stockdetail.ShipmentPortId = this.customerShipmentDetail.ShipmentPort.port_Id;
    this.stockdetail.ShipmentTermId = this.customerShipmentDetail.ShipmentTerm.id;
    this.stockdetail.ShipmentTypeId = this.customerShipmentDetail.ShipmentType.id;
    this.stockdetail.PackageId = this.customerInformation.MembershipId;
    this.stockdetail.PlanId = 0;
    this.stockdetail.CountryCode = this.customerShipmentDetail.ShipmentCountry.code;
    this.stockdetail.CurrencyCode = (this.customerInformation.CurrencyCode) ? this.customerInformation.CurrencyCode : 'JPY';
    this.stockdetail.ModelId = data.ModelId;
    this.stockdetail.ReferenceId = data.ReferenceId;
    this.stockdetail.LotNumber = data.LotNo;
    this.stockdetail.AuctionHouseId = data.AuctionHouseId;
    this.stockdetail.ProductId = data.ProductId
    this.stockdetail.Year = data.Year;
    this.stockdetail.MeterCube = data.Metercube;
    let copyStockDetail = Object.assign({}, this.stockdetail);
    this.stockdetail = new StockDetail();
    this._stockdetail = copyStockDetail;

  }

  /*****************************************
   * open inquire now popup functionality 
   *******************************************/
  openInquireNowPopUp(item, _surce) {
    this._inquireData.Images = item['Images'];
    this._inquireData.LotNo = item['LotNo'];
    this._inquireData.Make = item['Make'];
    this._inquireData.Model = item['Model'];
    this._inquireData.Engine = item['Engine'];
    this._inquireData.ReferenceId = item['ReferenceId'];
    this._inquireData.Mileage = item['Mileage'];
    this._inquireData.Year = item['Year'];
    this._inquireData.ClientId = (item['ClientId']) ? item['ClientId'] : null;
    this._inquireData.ProductId = (item['ProductId']) ? item['ProductId'] : null;
    this._inquireData.AuctionSource = _surce;
    this._inquireData.CountryId = (this.customerShipmentDetail && this.customerShipmentDetail.ShipmentCountry && this.customerShipmentDetail.ShipmentCountry.id) ? this.customerShipmentDetail.ShipmentCountry.id : 0;
    this._inquireData.Port = (this.customerShipmentDetail && this.customerShipmentDetail.ShipmentPort && this.customerShipmentDetail.ShipmentPort.name) ? this.customerShipmentDetail.ShipmentPort.name : '';
    this._inquireData.Location = (this.customerShipmentDetail && this.customerShipmentDetail.ShipmentCountry && this.customerShipmentDetail.ShipmentCountry.name) ? this.customerShipmentDetail.ShipmentCountry.name : '';
    let inquiredatacomplete = Object.assign({}, this._inquireData);
    this._inquireData = new InquireData();
    this.inquirenow = inquiredatacomplete;
  }

}


