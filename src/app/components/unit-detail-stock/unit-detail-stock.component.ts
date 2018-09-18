import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

//Services
import { HelperService } from '../../Services/helper.service';
import { DataService } from '../../Services/data.service';
import { StorageService } from'../../Services/storage.service';
import { UnitDetailService } from '../../Services/unit-detail.service'


//Models
import { StockDetail } from '../../models/stockmodel';
import { StockInputObjt } from '../../models/stockinput';
import { CustomerShipmentDetail } from '../../models/customerShipmentDetail';
import { InquireData } from '../../models/inquiredata';
import { CustomerInformation } from '../../models/customerInformation';
import { FavouriteCar } from '../../models/favourite';


declare var $: any;


@Component({
  selector: 'app-unit-detail-stock',
  templateUrl: './unit-detail-stock.component.html',
  styleUrls: ['./unit-detail-stock.component.css']
})
export class UnitDetailStockComponent implements OnInit {
    
  public getStockDetailFromParents = new StockDetail();
	public stockdetails: any
	public stockInputObj = new StockInputObjt();

  public vehicleImages = [];
  public productFeaturesList = [];
  FeaturesList1 = [
    { Id: '1', Name: "Air Bag", IsActive : false },{ Id: '2', Name: "Dual Air Bags", IsActive : false },
    { Id: '3', Name: "Anti-Lock Brake System", IsActive : false },{ Id: '4', Name: "Air Conditioner", IsActive : false },
    { Id: '5', Name: "Alloy Wheels", IsActive : false },{ Id: '6', Name: "Back Tire", IsActive : false },
    { Id: '7', Name: "Fog Lights", IsActive : false },{ Id: '8', Name: "Grill Guard", IsActive : false },
    { Id: '9', Name: "Leather Seats", IsActive : false }
  ];


  FeaturesList2 = [
    { Id: '10', Name: "Navigation", IsActive : false },{ Id: '11', Name: "Power Steering", IsActive : false },
    { Id: '12', Name: "Power Windows", IsActive : false },{ Id: '13', Name: "Roof Rails", IsActive : false },
    { Id: '14', Name: "Rear Spoiler", IsActive : false },{ Id: '15', Name: "Sun Roof", IsActive : false },
    { Id: '16', Name: "TV", IsActive : false },{ Id: '17', Name: "Sound System", IsActive : false },
    { Id: '18', Name: "HID", IsActive : false }
  ];
  
  public stockdetail = new StockDetail();
  public _stockdetail : StockDetail ;

  public customerShipmentDetail = new CustomerShipmentDetail();
  public customerInformation: CustomerInformation = new CustomerInformation();

  public _inquireData = new InquireData();
  public inquirenow : InquireData;

  public isCarFavourite : boolean = false ;
  public isCustomerLogin : boolean = false ;

  public _clientId = 'c4mxXFACb6I=';

  constructor(private helperService: HelperService,
    private route: ActivatedRoute,
    private dataservice: DataService, 
    private storageservice : StorageService,
    private unitdetailservice : UnitDetailService) {}

  ngOnInit() {
    $('body').removeClass('main_login');
    // this.helperService.calljsresp();

    this.isCustomerLogin = this.storageservice.get('customerlogin');

    this.getStockDetailFromParents.ProductId = this.route.snapshot.queryParams['ProductId'];
    this.getStockDetailFromParents.ClientId = this._clientId;
    this.getStockDetailFromParents.ShipmentCountryId = this.route.snapshot.queryParams['CountryId'];
    this.getStockDetailFromParents.LotNumber = this.route.snapshot.queryParams['LotNo'];
    this.getStockDetailFromParents.ReferenceId = this.route.snapshot.queryParams['ReferenceId'];
    this.getStockDetailFromParents.AuctionHouseId = this.route.snapshot.queryParams['AuctionHouseId'];   
    this.isCarFavourite = this.route.snapshot.queryParams['IsCarFavourite'];   

    this.customerShipmentDetail = this.storageservice.getDecrypted('customerShipmentDetail');
    this.customerInformation = this.storageservice.getDecrypted('customerInformation');

    let value : any = this.getStockDetailFromParents;

    let _data = {
      ClientId: this._clientId,
      ProductId: value.ProductId,
      ReferenceId: value.ReferenceId,
      LotNo: value.LotNumber,
      CountryId: [value.ShipmentCountryId]
    }

    this.getStockPriceDetail(_data)
    
  }

	/*****************************************************************************
	 * get stock detail functionality ( call when popup is open , initial call )
	 ****************************************************************************/
	getStockPriceDetail(data) {
		this.dataservice._getStockDetail(data)
			.subscribe(res => {

				if (res.IsSuccess) {
					if (res.Message) { this.helperService.displayMsg('error', res.Message); }
					else {
            
						this.stockdetails = res.Data;
						this.stockInputObj.StockPrice = this.stockdetails.PercentagePrice100;
            this.vehicleImages = this.stockdetails.AuctionImage.split("#");
            this.productFeaturesList = this.stockdetails.ProductFeatureList;
            
            this.FeaturesList1 = this.updatefeatureList(this.productFeaturesList , this.FeaturesList1);
            this.FeaturesList2 = this.updatefeatureList(this.productFeaturesList , this.FeaturesList2);
            setTimeout( ()=> {this.helperService.loadstockdetails();},200)

					}
				}
      })
      
	}

  /******************************************
   * update feature list functionality 
   ******************************************/  
  updatefeatureList(data , list ){
    for(let i = 0 ; i < data.length ; i++){
      for(let j = 0 ; j < list.length ; j++){
        if(data[i]['FeatureId'] == list[j]['Id']){
          list[j]['IsActive'] =  true ;
        }
      }
    }
    return list 
  }

  /****************************************
   * Open Stock Price POP UP functionality 
   ****************************************/
  openstockpricepopup(){

    this.stockdetail.ClientId = this._clientId;
    this.stockdetail.ShipmentCountryId = this.customerShipmentDetail.ShipmentCountry.id;
    this.stockdetail.ShipmentCountryName = this.customerShipmentDetail.ShipmentCountry.name;
    this.stockdetail.ShipmentPortName = this.customerShipmentDetail.ShipmentPort.name;
    this.stockdetail.ShipmentPortId = this.customerShipmentDetail.ShipmentPort.port_Id;
    this.stockdetail.ShipmentTermId = this.customerShipmentDetail.ShipmentTerm.id;
    this.stockdetail.ShipmentTypeId = this.customerShipmentDetail.ShipmentType.id;
    this.stockdetail.PackageId = this.customerInformation.MembershipId;
    this.stockdetail.PlanId = 0;
    this.stockdetail.CountryCode = this.customerShipmentDetail.ShipmentCountry.code;
    this.stockdetail.CurrencyCode = (this.customerInformation.CurrencyCode)?this.customerInformation.CurrencyCode:'JPY';
    this.stockdetail.ModelId = this.stockdetails.ModelId ;
    this.stockdetail.ReferenceId = this.getStockDetailFromParents.ReferenceId//data.ReferenceId;
    this.stockdetail.LotNumber = this.getStockDetailFromParents.LotNumber;
    this.stockdetail.AuctionHouseId = this.getStockDetailFromParents.AuctionHouseId;
    this.stockdetail.ProductId = this.getStockDetailFromParents.ProductId //data.ProductId
    this.stockdetail.Year = this.stockdetails.Year ;
    this.stockdetail.MeterCube = this.stockdetails.Metercube;
    let copyStockDetail = Object.assign({}, this.stockdetail);
    this.stockdetail = new StockDetail();
    this._stockdetail = copyStockDetail;
  } 
 

  /*******************************************
   * open inquire detail popup functionality 
   *********************************************/ 
  openInquireDetail(){
    this._inquireData.Images = (this.stockdetails['AuctionImage'])?this.stockdetails['AuctionImage'].split("#"):'';
    this._inquireData.LotNo = this.getStockDetailFromParents['LotNumber'];
    this._inquireData.Make = this.stockdetails['Make'];
    this._inquireData.Model = this.stockdetails['Model'];
    this._inquireData.Engine = this.stockdetails['EngineCC'];
    this._inquireData.ReferenceId = this.getStockDetailFromParents['ReferenceId'];
    this._inquireData.Mileage = this.stockdetails['Mileage'];
    this._inquireData.Year = this.stockdetails['Year'];
    this._inquireData.ClientId = this._clientId;
    this._inquireData.ProductId = this.getStockDetailFromParents.ProductId;
    this._inquireData.AuctionSource = 5;
    this._inquireData.CountryId = this.getStockDetailFromParents.ShipmentCountryId;
    this._inquireData.Port = (this.customerShipmentDetail && this.customerShipmentDetail.ShipmentPort && this.customerShipmentDetail.ShipmentPort.name) ? this.customerShipmentDetail.ShipmentPort.name : '';
    this._inquireData.Location = (this.customerShipmentDetail && this.customerShipmentDetail.ShipmentCountry && this.customerShipmentDetail.ShipmentCountry.name) ? this.customerShipmentDetail.ShipmentCountry.name:'';
    let inquiredatacomplete = Object.assign({},this._inquireData);
    this._inquireData = new InquireData();
    this.inquirenow = inquiredatacomplete;
  }

  /******************************************
   * favourite and Un favourite functionality 
   ******************************************/
  
  favUnfav(type){
    let _fav = new FavouriteCar();
    _fav.AddRemoveType = type ;
    _fav.AuctionId = null ;
    _fav.ClientId = this._clientId;
    _fav.CountryId = this.route.snapshot.queryParams['CountryId'];
    _fav.LotNumber = this.route.snapshot.queryParams['LotNo'];
    _fav.ProductId = this.route.snapshot.queryParams['ProductId'];
    _fav.ReferenceId = this.route.snapshot.queryParams['ReferenceId'];
    _fav.Source = 5;

    this.unitdetailservice.favourite(_fav)
    .subscribe(res=>{
      if(res.Message){
        this.helperService.displayMsg('error',res.Message);
      }else{
        this.helperService.displayMsg('success','car added to favourite');
      }
    })
  }

}
