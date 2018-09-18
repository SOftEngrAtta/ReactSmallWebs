// Importing Internal Modules
import { Component, OnInit } from '@angular/core';
import { window } from 'rxjs/operators/window';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';

// Importing Models
import { QuotationDetail } from './../../models/quotationDetail';
import { Pricing } from './../../models/pricing';
import { QuotationPricing } from './../../models/quotationPricing';

// Importing Services
import { DataService } from '../../Services/data.service';
import { UnitDetailService } from './../../Services/unit-detail.service';
import { ToastrService } from './../../Services/toastr.service';
import { StorageService } from './../../Services/storage.service';

// Importing Route
import { ActivatedRoute, Params, Router  } from '@angular/router';

// Importing Pipe
import { RoundPipe } from './../../shared/roundoff';

declare var $;

@Component({
  selector: 'app-quotation-detail',
  templateUrl: './quotation-detail.component.html',
  styleUrls: ['./quotation-detail.component.css']
})
export class QuotationDetailComponent implements OnInit {
  quotationId: string;
  details: QuotationDetail[] = [];
  quotationItemId: string;
  minPrice = 955999;
  maxPrice = 2040000;
  pricing = new Pricing();
  priceDetail: any;
  maxDiff: number;
  givenDiff: number;
  bidWinChance: number;
  userBidPrice: number;
  popupMake: string;
  popupModel: string;
  popupYear: string;
  popupChassis: string;
  popupCarImage: string;
  pricingRequestModel = new QuotationPricing();
  shortUrl: string;
  selectedQuotationPricing: QuotationPricing;

  constructor(
    private dataService: DataService,
    private unitDetailService: UnitDetailService,
    private route: ActivatedRoute,
    private loaderService: Ng4LoadingSpinnerService,
    private roundoffnumber: RoundPipe ,
    private toastrService : ToastrService ,
    private router : Router ,
    private storageservice : StorageService
  ) { }

  ngOnInit() {
    $('body').removeClass('main_login');
    this.quotationId = this.route.snapshot.queryParams['id'];
    this.getQuotationDetail(this.quotationId);
    // this.generateShortUrl(this.quotationId);
    this.userBidPrice = this.maxPrice;
  }

  getQuotationDetail(quotationId) {
    this.dataService.getQuotationDetail(quotationId)
      .subscribe(res => {
        this.details = res.Data;
      });
  }

  showDeleteConfirmPopup(quotationItemId) {
    $.fancybox.open({
      src: '#qi_confirm_delete',
      modal: true
    });
    this.quotationItemId = quotationItemId;
  }

  showEditBidPricePopup(quotationItem) {
    this.popupMake = quotationItem.MakerName;
    this.popupModel = quotationItem.ModelName;
    this.popupYear = quotationItem.ModelYear;
    this.popupChassis = quotationItem.ChassisNumber;
    this.popupCarImage = quotationItem.CarImage;
    this.pricingRequestModel.customerOrders[0].unitPrice = this.userBidPrice;
    this.pricingRequestModel.port_Id = quotationItem.PortId;
    this.pricingRequestModel.shipmentTerm_Id = quotationItem.ShipmentTermId;
    this.pricingRequestModel.shipmentType_Id = quotationItem.ShipmentTypeId;
    this.pricingRequestModel.countryCode = quotationItem.CountryCode;
    this.pricingRequestModel.customerOrders[0].auctionHouse_Id = quotationItem.AuctionHouseId;
    this.pricingRequestModel.customerOrders[0].year = quotationItem.ModelYear;
    this.pricingRequestModel.customerOrders[0].model_Id = quotationItem.ModelId;
    this.pricingRequestModel.customerOrders[0].auctionHouseName = quotationItem.AuctionHouseName;
    this.pricingRequestModel.package_Id = quotationItem.PackageId;
    this.getUnitPrice();
    this.quotationItemId = quotationItem.EncryptedQuotationItemId;
    $.fancybox.open({
      src: '#qi_bid_update',
      modal: true
    });
  }

  deleteQuotationItem() {
    this.dataService.deactivateQuotationItem(this.quotationItemId)
      .subscribe(res => {
        $.fancybox.close();
        if (res.Data) {
          this.getQuotationDetail(this.quotationId);
          $.fancybox.open({
            src: '#qi_success',
            modal: true
          });
        }
      });
  }

  getUnitPrice() {
    this.pricingRequestModel.customerOrders[0].unitPrice = this.userBidPrice;
    return this.unitDetailService
      ._getUnitPrices(this.pricingRequestModel)
      .subscribe(res => {
        this.loaderService.hide();
        this.priceDetail = res;
        if (this.priceDetail.isSuccess) {
          if (this.priceDetail.data) {
            const customer_order = this.priceDetail.data.customerOrders[0];
            this.pricing.cnfCharges = customer_order['cnfCharges'] ? customer_order['cnfCharges'] : 0;
            this.pricing.fob = customer_order['fobCharges'] ? customer_order['fobCharges'] : 0;
            this.pricing.freightCharges = customer_order['freightCharges'] ? customer_order['freightCharges'] : 0;
            this.pricing.cnfCharges = customer_order['cnfCharges'] ? customer_order['cnfCharges'] : 0;
            this.pricing.serviceCharges = customer_order['serviceCharges'] ? customer_order['serviceCharges'] : 0;
            this.pricing.inspection = customer_order['inspectionCharges'] ? customer_order['inspectionCharges'] : 0;
            this.maxDiff = this.maxPrice - this.minPrice;
            this.givenDiff = this.maxPrice - this.userBidPrice;
            this.bidWinChance = this.roundoffnumber.transform((100 - ((this.givenDiff / this.maxDiff) * 100)));
            if (this.bidWinChance === 100) {
              this.bidWinChance = 99;
            }
          }
        }
      });
  }

  generateShortUrl(quotationId) {
    this.dataService.generateShortUrl(quotationId)
      .subscribe(res => {
        this.shortUrl = res.Data;
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
    // quotationPricing.AuctionTime = row.AuctionTime;
    quotationPricing.AuctionHouse = row.AuctionHouseName;
    quotationPricing.AuctionSheet = row.AuctionSheet;
    quotationPricing.PricingTypeId = row.PricingTypeId;
    quotationPricing.QuotationId = this.quotationId;
    quotationPricing.QuotationItemId = row.EncryptedQuotationItemId;
    quotationPricing.StartPrice = row.PriceStart;
    quotationPricing.Images = [{
      id : 1,
      Title : row.CarImage
    },{
      id : 2,
      Title : row.CarImage
    }];
    quotationPricing.customerOrders.push({
      model_Id: row.ModelId,
      auctionHouse_Id: row.AuctionHouseId,
      year: row.ModelYear,
      auctionType: row.AuctionTypeId
    });

    this.selectedQuotationPricing = quotationPricing;
  }

  // link copy show message successfull
	copylink(){
		this.toastrService.clear();
    this.toastrService.success("Quotation link copied to clipboard");
    setTimeout(()=>{this.toastrService.clear()},4000);
  }
  
  updatedBidPrice(e){
    if( e && e.data == 'updated' ){
      this.getQuotationDetail(this.quotationId);
    }
  }

  // open auction page functionality 
  openAuctionPage(){
    this.storageservice.setEncrypted('order_or_quotation','quotation');
    this.storageservice.setEncrypted('pric_id' , this.details[0]['PricingTypeId']);
    this.router.navigate(['/auction-car-search'] , {
      queryParams : {
        quotationid: this.quotationId
      }
    })
  }

}
