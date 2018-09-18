import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

// services 
import { DataService } from '../../Services/data.service';
import { HelperService } from '../../Services/helper.service';


// models
import { StockDetail } from '../../models/stockmodel';
import { StockInputObjt } from '../../models/stockinput';

declare var $;

@Component({
	selector: 'app-stockprice',
	templateUrl: './stockprice.component.html',
	styleUrls: ['./stockprice.component.css']
})
export class StockPrice implements OnInit {


	public getStockDetailFromParents = new StockDetail();
	public stockdetails: any
	public stockInputObj = new StockInputObjt();

	public vehicleImages = [];

	public displanPackageAmount : boolean = false;

	public _selectedplan: any ;


	@Input()
	set StockDetail(value: StockDetail) {
		if (value) {

			this.displanPackageAmount = false; 
			this.stockInputObj = new StockInputObjt();
			this.getStockDetailFromParents = value;

			let _data = {
				ClientId: value.ClientId,
				ProductId: value.ProductId,
				ReferenceId: value.ReferenceId,
				LotNo: value.LotNumber,
				CountryId: [value.ShipmentCountryId]
			}
			this.getStockPriceDetail(_data)

		}
	}

	constructor(private dataservice: DataService, private helperservice: HelperService,private route: ActivatedRoute,private router: Router) { }

	ngOnInit() { }


	/*****************************************************************************
	 * get stock detail functionality ( call when popup is open , initial call )
	 ****************************************************************************/
	getStockPriceDetail(data) {
		this.dataservice._getStockDetail(data)
			.subscribe(res => {

				if (res.IsSuccess) {
					if (res.Message) { this.helperservice.displayMsg('error', res.Message); }
					else {
						this.stockdetails = res.Data;
						this.stockInputObj.StockPrice = this.stockdetails.PercentagePrice100;
						this.vehicleImages = this.stockdetails.AuctionImage.split("#");
						$.fancybox.open({ src: '#stockpricepopup', type: 'inline', });
					}
				}
			})
	}



	/****************************
	 * Change Plan functionality 
	 ***************************/
	changePlan() {
		if (this.stockInputObj.SelectedPlan == '10') { this.stockInputObj.StockPrice = this.stockdetails.PercentagePrice50 }
		else this.stockInputObj.StockPrice = this.stockdetails.PercentagePrice100;
	}



	/*********************************************
	 * Calculate Amount Functionality 
	 *********************************************/
	calculateAmount() {
		this.focusOut('');

		if(this.stockInputObj.SelectedPlan == '11'){
			if(this.stockInputObj.StockPrice < this.stockdetails.PercentagePrice100  ){
				this.helperservice.displayMsg('error','Price must be greater than '+this.stockdetails.PercentagePrice100);
				return false;
			}
		}

		if(this.stockInputObj.SelectedPlan == '10'){
			if(this.stockInputObj.StockPrice < this.stockdetails.PercentagePrice50  ){
				this.helperservice.displayMsg('error','Price must be greater than '+this.stockdetails.PercentagePrice50);
				return false;
			}
		}

		this.displanPackageAmount = false;

		this._selectedplan = this.stockInputObj.SelectedPlan;

		let _data_ = 
		{
			shipmentType_Id: this.getStockDetailFromParents.ShipmentTypeId,
			package_Id: this.getStockDetailFromParents.PackageId,
			plan_Id: parseInt(this.stockInputObj.SelectedPlan),
			port_Id: this.getStockDetailFromParents.ShipmentPortId,
			currencyCode: 'JPY',
			countryCode: this.getStockDetailFromParents.CountryCode,
			PricingTypeId: 1,
			portName: '',
			shipmentTerm_Id: this.getStockDetailFromParents.ShipmentTermId,
			customerOrders: [{
				model_Id: this.getStockDetailFromParents.ModelId,
				unitPrice: this.stockInputObj.StockPrice,
				auctionHouse_Id: this.getStockDetailFromParents.AuctionHouseId,
				year: this.getStockDetailFromParents.Year,
				auctionType: this.stockdetails.AuctionTypeId,
				IsNotDriveable: this.getStockDetailFromParents.IsNotDriveable,
				IsNegotiable: this.getStockDetailFromParents.IsNegotiable
			}]
		}

		this.dataservice
			.evaluateamount(_data_)
			.subscribe(res => {
				if(res.IsSuccess){
					if(res.Message){this.helperservice.displayMsg('error' , res.Message)}
					else{
						this.displanPackageAmount = true ;
						let data = (res.Data)?res.Data:null
						this.stockInputObj.CurrencyRate = data['CurrencyRate'];
						this.stockInputObj.PlanClass = data['PlanClass'];
						this.stockInputObj.PlanName = data['PlanName'];
						this.stockInputObj.StockPriceDisplay = this.stockInputObj.StockPrice;
						this.stockInputObj.InspectionCharges = (data['CustomerOrders'])?data['CustomerOrders'][0]['InspectionCharges']:0;
						this.stockInputObj.FreightCharges = (data['CustomerOrders'])?data['CustomerOrders'][0]['FreightCharges']:0;
						this.stockInputObj.FOB = this.stockInputObj.StockPrice + this.stockInputObj.InspectionCharges;
						this.stockInputObj.VehiclePrice = this.stockInputObj.StockPrice;
						this.stockInputObj.CNF = this.stockInputObj.VehiclePrice + this.stockInputObj.FreightCharges + this.stockInputObj.InspectionCharges;

					}
				}

			})
	}

	/*******************************************
	 * Reserve Stock Functionality 
	 ******************************************/
	reserveStockOrder() {
 

		if(!this.stockInputObj.StockPriceDisplay){this.helperservice.displayMsg('error','Please calculate amount');return false; }

		if(this._selectedplan != this.stockInputObj.SelectedPlan){ this.helperservice.displayMsg('error','Please calculate amount');return false; }

		let data = {
			OrderPlanData: {
				StockClientId : this.getStockDetailFromParents.ClientId,
				shipmentType_Id : this.getStockDetailFromParents.ShipmentTypeId,
				package_Id : this.getStockDetailFromParents.PackageId,
				plan_Id : parseInt(this.stockInputObj.SelectedPlan),
				port_Id : this.getStockDetailFromParents.ShipmentPortId,
				currencyCode : this.getStockDetailFromParents.CurrencyCode,
				countryCode : this.getStockDetailFromParents.CountryCode,
				PricingTypeId : 1,
				portName : this.getStockDetailFromParents.ShipmentPortName,
				shipmentTerm_Id : this.getStockDetailFromParents.ShipmentTermId,
				customerOrders : [{
					model_Id: this.getStockDetailFromParents.ModelId,
					unitPrice : this.stockInputObj.StockPrice,
					auctionHouse_Id : this.getStockDetailFromParents.AuctionHouseId,
					year : this.getStockDetailFromParents.Year,
					auctionType : 5
				}]
			},
			OrderData : {
				TypeId : 1,
				CountryId : this.getStockDetailFromParents.ShipmentCountryId,
				PortId : this.getStockDetailFromParents.ShipmentPortId,
				ShipmentTermId : this.getStockDetailFromParents.ShipmentTermId,
				ShipmentTypeId : this.getStockDetailFromParents.ShipmentTypeId,
				PlanId : parseInt(this.stockInputObj.SelectedPlan),
				AgentId : 0,
				CurrencyId : 2,
				CurrencyRate: null,
				UpateIp : null,
				AuctionHouseId : this.getStockDetailFromParents.AuctionHouseId,
				BidPrice : this.stockInputObj.StockPrice,
				ServiceCharges : null,
				RikusoFee : null,
				ExtraFee : null,
				OnePriceFee : null,
				AlterationCharges: null,
				InspectionCharges: this.stockInputObj.InspectionCharges,
				ContainerCharges : null,
				VanningCharges: null,
				InsuranceFee: null,
				FOB: this.stockInputObj.FOB,
				FreightCharges: this.stockInputObj.FreightCharges,
				CNF: this.stockInputObj.CNF,
				meterReading: null,
				meterCube: this.getStockDetailFromParents.MeterCube,
				bidComments: this.stockInputObj.Comment,
				isNumberPlate: false,
				numberPlate: null,
				isCustomerNegotiation: false,
				NonDrivable: false,
				chassisNumber: null,
				manufacturingYear: null,
				manufacturingMonth: null,
				CreaterTypeId: 1
			},
			AuctionData: {
				ProductId: this.getStockDetailFromParents.ProductId,
				Source: 5,
				APIUniqueId: this.getStockDetailFromParents.ReferenceId,
				LotNo: this.getStockDetailFromParents.LotNumber
			},
			OrderAlterationData: []
		}

		this.dataservice._reserveStockOrder(data)
			.subscribe(res => {

				if(res.IsSuccess){
					
					if(res.Message){this.helperservice.displayMsg('error' ,res.Message)}
					else{
						$.fancybox.close();
						$.fancybox.open({
							src: '#stockorder_incomplete',
							type: 'inline',
						})
						this.router.navigate(['/view-confirm-order'] , { queryParams : { id : res.Data }},)
					}
				}
			})
	}

	// only numbers allow functionality 
	onlyNumberKey(event) { return (event.charCode == 8 || event.charCode == 0) ? null : event.charCode >= 48 && event.charCode <= 57; }

	// round of thousand functionality 
	focusOut(e){ this.stockInputObj.StockPrice = Math.round(this.stockInputObj.StockPrice/1000)*1000; }

}
