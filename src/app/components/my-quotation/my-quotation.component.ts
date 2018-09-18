// Importing Internal Modules
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

// Importing Models
import { MyQuotation } from './../../models/myQuotation';
import { QuotationPricing } from './../../models/quotationPricing';
import { CustomerShipmentDetail } from '../../models/customerShipmentDetail';

// Importing Services
import { DataService } from '../../Services/data.service';
import { HelperService } from '../../Services/helper.service';
import { StorageService } from '../../Services/storage.service';
import { setTimeout } from 'timers';

// import { setTimeout } from 'timers';

declare var $;

@Component({
  selector: 'app-my-quotation',
  templateUrl: './my-quotation.component.html',
  styleUrls: ['./my-quotation.component.css']
})
export class MyQuotationComponent implements OnInit {
  objQuotations: MyQuotation = new MyQuotation();
  quotationId: string;
  quotationItemId: string;
  quotationDetailId: string;
  selectedQuotationPricing: QuotationPricing;
  shortUrl: string;

  hideshowtable = {
    senttable: false,
    unsendtable: false,
    bookedItems: false
  };

  displaytable = {
    senttable : false ,
    unsendtable : false ,
    bookedtable : false 
  }
  
  pricingorderdetail: any;
  openbidpricepopup: number = 0;

  public customerShipmentDetail: CustomerShipmentDetail = new CustomerShipmentDetail();

  public keysDelete = {
      itemId: null,
      detailId: null
  };

  constructor(
    private dataService: DataService,
    private helperservice: HelperService,
    private router: Router,
    private storageservice: StorageService
  ) {}

  ngOnInit() {

    let customerlogin = this.storageservice.get('customerlogin')
    
    if(customerlogin){
        this.router.navigate(['/dashboard']);
    }

    $('body').removeClass('main_login');
    $('#tabs li a:not(:first)').addClass('inactive');
    $('.tabcontainer').hide();
    $('.tabcontainer:first').show();
    $('#tabs li a').click(function() {
      
      let t = $(this).attr('id');
      if ($(this).hasClass('inactive')) {
        $('#tabs li a').addClass('inactive');
        $(this).removeClass('inactive');
        $('.tabcontainer').hide();
        $('#' + t + 'C').fadeIn('slow');
      }
    });

    this.customerShipmentDetail = new CustomerShipmentDetail();
    this.getMyQuotation();
  }

  getMyQuotation() {
    this.hideshowtable.senttable = false;
    this.hideshowtable.unsendtable = false;

    this.displaytable = {
      senttable : false ,
      unsendtable : false ,
      bookedtable : false 
    }

    this.dataService.getMyQuotation().subscribe(res => {


      

      if (res.Data == null || res.Data.SentQuotationList.length == 0) {
        this.hideshowtable.senttable = true;
      }
      if (res.Data == null || res.Data.UnSentQuotationList.length == 0) {
        this.hideshowtable.unsendtable = true;
      }
      if (res.Data == null || res.Data.BookedQuotationList.length == 0) {
        this.hideshowtable.bookedItems = true;
      }

      if (res.Data && res.Data.SentQuotationList.length > 0) {
        this.displaytable.senttable = true;
      }
      if (res.Data && res.Data.UnSentQuotationList.length > 0) {
        this.displaytable.unsendtable = true ;
      }
      if (res.Data &&  res.Data.BookedQuotationList.length > 0) {
        this.displaytable.bookedtable = true ;
      }

      this.objQuotations = res.Data;
      setTimeout(() => {
        this.helperservice.callaccordingtoggle();
      }, 200);
    });
  }

  showDeleteConfirmPopup(quotationItemId) {
    $.fancybox.open({
      src: '#qi_confirm_delete',
      modal: true
    });
    this.quotationItemId = quotationItemId;
  }

  deleteQuotationItem() {
    this.dataService
      .deactivateQuotationItem(this.quotationItemId)
      .subscribe(res => {
        $.fancybox.close();
        if (res.Data) {
          this.getMyQuotation();
          this.helperservice.displayMsg('success' , 'vehicle has been removed successfully');
        }
      });
  }

  showMoveConfirmPopup(quotationId, quotationItemId) {
    $.fancybox.open({
      src: '#qi_confirm_move',
      modal: true
    });
    this.quotationItemId = quotationItemId;
    this.quotationId = quotationId;
  }

  moveQuotationItem() {
    this.dataService
      .moveQuotationItem(this.quotationId, this.quotationItemId)
      .subscribe(res => {
        $.fancybox.close();
        if (res.Data) {
          this.getMyQuotation();
          this.helperservice.displayMsg('success' , 'Vehicle has been moved from this quotation');
        }
      });
  }

  selectedVehicleLink(row) {
    let quotationPricing: QuotationPricing = new QuotationPricing();
    quotationPricing.shipmentType_Id = row.ShipmentTypeId;
    quotationPricing.package_Id = row.PackageId;
    quotationPricing.plan_Id = null;
    quotationPricing.port_Id = row.PortId;
    // quotationPricing.portName = this.customerShipmentDetail.ShipmentPort.name
    quotationPricing.countryCode = row.CountryCode;
    quotationPricing.shipmentTerm_Id = row.ShipmentTermId;
    quotationPricing.Make = row.MakerName;
    quotationPricing.Model = row.ModelName;
    quotationPricing.Transmission = row.ModelName;
    quotationPricing.Year = row.ModelYear;
    quotationPricing.Chassis = row.ChassisNumber;
    quotationPricing.LotNo = row.LotNumber;
    quotationPricing.AuctionDateTime = row.AuctionDate;
    quotationPricing.AuctionDate = row.AuctionDate;
    quotationPricing.AuctionSheet = row.AuctionSheet;
    // quotationPricing.AuctionTime = row.AuctionTime;
    quotationPricing.shipmentType = row.ShipmentTypeName;
    quotationPricing.countryName = row.ShipmentCountryName;
    quotationPricing.portName = row.ShipmentPortName;
    quotationPricing.AuctionHouse = row.AuctionHouseName;
    quotationPricing.freightType = row.ShipmentTermName;
    quotationPricing.AuctionHouseId = row.AuctionHouseId;
    quotationPricing.countryId = row.CountryId;
    quotationPricing.referenceId = row.ApiUniqueKey;
    quotationPricing.PricingTypeId = row.PricingTypeId;
    quotationPricing.StartPrice = row.PriceStart;
    quotationPricing.SourceType = 1; // For Auction - Setting for test
    quotationPricing.Images = [
      {
        id: 1,
        Title: row.CarImage
      },
      {
        id: 2,
        Title: row.CarImage
      }
    ];
    quotationPricing.QuotationId = row.EncryptedQuotationId;
    quotationPricing.QuotationItemId = row.EncryptedQuotationItemId;
    quotationPricing.customerOrders.push({
      model_Id: row.ModelId,
      auctionHouse_Id: row.AuctionHouseId,
      year: row.ModelYear,
      auctionType: row.AuctionTypeId ? row.AuctionTypeId : 1
    });

    this.selectedQuotationPricing = quotationPricing;
  }
  

  updatedBidPrice(e){
    if( e && e.data == 'updated' ){
      this.getMyQuotation();
    }
  }

  showGenerateLinkPopup(quotationId) {
    this.generateShortUrl(quotationId);
  }

  generateShortUrl(quotationId) {
    this.dataService.generateShortUrl(quotationId).subscribe(res => {
      this.shortUrl = res.Data;
      this.getMyQuotation();
      $.fancybox.open({
        src: '#generate_quotation_link',
        modal: true
      });
    });
  }

  showorderdetail(row) {
    

    
    let _data_ = {
      QuotationItemId: row.EncryptedQuotationItemId,
      QuotationId: row.EncryptedQuotationId,
      QuotationDetailId: row.EncryptedQuotationDetailId
    };
    this.dataService.proceedtoorderdetail(_data_).subscribe(res => {
      let _data_ = res;
      if (_data_.IsSuccess) {
        if(_data_.Message && _data_.Message != null ){
          this.helperservice.displayMsg('error',_data_.Message);
        }else{
          _data_.Data.Data['ModelId'] = row.ModelId;
          _data_.Data.Data['PackageId'] = row.PackageId;
          _data_.Data.Data['PackageName'] = row.PackageName;
          _data_.Data.Data['AuctionTypeId'] = row.AuctionTypeId;
          _data_.Data.Data['StartPrice'] = row.PriceStart;
          this.pricingorderdetail = {
            quotationItemId: row.EncryptedQuotationItemId,
            quotationId: row.EncryptedQuotationId,
            quotationDetailId: row.EncryptedQuotationDetailId,
            row: _data_.Data ? _data_.Data.Data : '',
            countr: this.openbidpricepopup + 1
          };
        }
      }
    });
  }


  // link copy show message successfull
  copylink() {this.helperservice.displayMsg('success', 'Quotation link copied to clipboard');}

  // open auction page
  openAuctionPage(item) {

    if(item.QuatationType){
      this.customerShipmentDetail.QuatationType = item.QuatationType;
    }

    
    if(item.ShipmentCountry){
      this.customerShipmentDetail.ShipmentCountry = item.ShipmentCountry;
    }

    
    if(item.ShipmentPort){
      this.customerShipmentDetail.ShipmentPort = item.ShipmentPort;
      this.customerShipmentDetail.ShipmentPort.port_Id = item.ShipmentPort['id'];
    }

    if(item.ShipmentTerm){
      this.customerShipmentDetail.ShipmentTerm = item.ShipmentTerm;
    }

    if(item.ShipmentType){
      this.customerShipmentDetail.ShipmentType = item.ShipmentType;
    }
    this.storageservice.setEncrypted('order_or_quotation','quotation');
    this.storageservice.setEncrypted('customerShipmentDetail',this.customerShipmentDetail);
    this.storageservice.setEncrypted('pric_id' , item.QuotationDetailList[0]['PricingTypeId'])
    this.router.navigate(['/auction-car-search'], {
      queryParams: {
        quotationid: item.EncryptedQuotationId 
      }
    });
  }

  
}
