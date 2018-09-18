// modules
import {Component,OnInit,Input,Output,EventEmitter} from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
// ---

// services 
import { DataService } from '../../Services/data.service';
import { UnitDetailService } from '../../Services/unit-detail.service';
import { HelperService } from '../../Services/helper.service';

// models
import { BidPriceOrderDetail } from '../../models/bidpriceorder';
import { Evaluate } from '../../models/bidpricecal';
import { MakeValues } from '../../models/makevalues';

import { Subject } from 'rxjs/Subject';
import { setTimeout } from 'timers';

declare var $;
declare var moment: any;

@Component({
	selector: 'app-birpriceorder',
	templateUrl: './bidpriceorder.component.html',
	styleUrls: ['./bidpriceorder.component.css']
})
export class BidPriceOrder implements OnInit {

	public orderdetail: BidPriceOrderDetail = new BidPriceOrderDetail();
	public carImages: Array<any> = [];

	public currenc_code;

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
		isDrivableActive : false ,
		meterReversal: null,
		totalalterationamount: 0,
		quotationId: 0,
		quotationItemId: 0,
		quotationDetailId: 0,
		ModelId : 0,
		PackageId : 0,
		PackageName : '',
		VehicleStartPrice : 0,
		PreferredShipping : ''
	}
	public alertationdata: Array<any> = [];
	public selectedalteration: number[];
	public displayloader : boolean = false ; 
	public onlynumbersallow = /^\d+$/; // regx expression ;
	public displayMeterReversal : boolean = false ;
	public allplans : Array<any> = [];
	public plans : Array<any> = [];
	public selectedplan : any = {
		index : ''
	}


	public displayerrormsg : boolean = false ;

	public preferred_shipping = [{ id:1 , name : 'Armacup'},{ id:2 , name : 'Mol'},{ id:3 , name : 'Toyofuji'},{ id:4 , name : 'Autohub'},{ id:5 , name : 'Jacanna'},{ id:6 , name : 'NYK LINE'}];

	public make_values =  new MakeValues();
	public manufact_detail : any = {month : '',year : '',message : ''};
	public checkChassiValueLoader : boolean = false;
	@Input()
	set pricingorder(value) {

		if (value) {
			this.manufact_detail['message'] = '';
			this.manufact_detail['month'] = '';
			this.manufact_detail['year'] = '';
			
			this.displayerrormsg = false ;
			this.allplans= value.row;
			this.plans = [];
			
			if(this.allplans && this.allplans.length){
				for(let i = 0 ; i < this.allplans.length ; i++){

					this.plans.push({
						plan_name : this.allplans[i]['PlanName'],
						plan_Id : this.allplans[i]['PlanId'] ,
						index : i
					})

					if(this.allplans[i]['DefaultPlan']){

						this.selectedplan.index = i ;

						this.orderdetail = Object.assign({} , this.allplans[i]);
						this.userdetail.quotationDetailId = value.quotationDetailId;
						this.userdetail.quotationId = value.quotationId;
						this.userdetail.quotationItemId = value.quotationItemId
						this.currenc_code = this.orderdetail.CurrencyCode;
						if(this.orderdetail.PricingTypeId == 2){
							this.userdetail.bidprice = this.orderdetail.CNF;					
						}else{
							this.userdetail.bidprice = this.orderdetail.BidPrice;
							// round of thousand
							let _bid_price = parseInt(this.userdetail.bidprice);
                            this.userdetail.bidprice = Math.round(_bid_price/1000)*1000;

						}
						this.userdetail.ModelId = value.row.ModelId ;
						this.userdetail.PackageId = value.row.PackageId ;
						this.userdetail.PackageName = value.row.PackageName ;
						this.userdetail.VehicleStartPrice = value.row.StartPrice?value.row.StartPrice:0;

						this.userdetail.chassisnumber = this.orderdetail.ChassisNumber;
			
						this.carImages = this.splitImages(this.orderdetail['AuctionImage']);
						
						this.getAlterationData(this.orderdetail);
						$.fancybox.close();
						$.fancybox.open({
							src: '#sendlinkpopup',
							type: 'inline',
						});
					}

				}
			}
	
		}

	}

	constructor(private dataservice: DataService, 
		private route: Router , 
		private unitdetailservice : UnitDetailService ,
		private helpherservice : HelperService) { }
	ngOnInit() {
		// payment history new popup jquery
		$("body").on("click", ".rdbtninput-are-u input[type='checkbox']", function () {
			if ($(this).prop("checked")) {
				$(this).parent().next("input[type='text']").removeAttr("disabled");
			}
			else {
				$(this).parent().next("input[type='text']").prop("disabled", "true");
			}
		});


		let currentYear = parseInt(moment().format('YYYY'));
		for (let i = 1910; i <= currentYear ; i++) {
			this.userdetail.years.push(i);
		}
		this.userdetail.years = this.userdetail.years.reverse();
	}

	getAlterationData(data) {
		let _data_ = {
			CountryCode: data.CountryCode,
			CurrencyCode: data.CurrencyCode
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


	splitImages(data) {
		if (data) {
			let images = data.split("#");
			return images;
		}
	}

	addCustomUser = (term) => ({ id: term, name: term });

	addremovealteration() {
		this.displayMeterReversal = false;
		this.userdetail.totalalterationamount = 0;
		if (this.alertationdata.length) {
			for (let i = 0; i < this.alertationdata.length; i++) {
				if (this.selectedalteration && this.selectedalteration.length) {
					for (let j = 0; j < this.selectedalteration.length; j++) {

						if(this.selectedalteration[j] == 1){
							this.displayMeterReversal = true ; 
						}

						if (this.selectedalteration[j] == this.alertationdata[i]['id']) {
							this.userdetail.totalalterationamount = this.userdetail.totalalterationamount + this.alertationdata[i]['amount']
						}
					}
				}
			}
		}
	}

	activecheckornot(item){
		if(item == 'negotiation'){
			this.userdetail.isNegotiationActive = (this.userdetail.isNegotiationActive)?false:true;
			this.calculate();
		}
		else 
		if(item == 'numberplate'){ this.userdetail.isNumberPlateActive = (this.userdetail.isNumberPlateActive)?false:true;}
		else 
		if(item == 'drivable'){this.userdetail.isDrivableActive = (this.userdetail.isDrivableActive)?false:true;}
	}

	proceedtoorder() {

		if(this.displayerrormsg){this.helpherservice.displayMsg('error','Please calculate amount');return false ;}

		if(!this.userdetail.bidprice){ this.helpherservice.displayMsg('error',"Please enter bid price value ");return false ;}

		if(this.orderdetail.PricingTypeId == 2){}
		else{
			if(this.userdetail.bidprice != this.orderdetail.BidPrice){this.helpherservice.displayMsg('error','Please calculate amount');return false ;}
		}


		if(!this.userdetail.chassisnumber){this.helpherservice.displayMsg('error','PLease enter chassis value');return false ;}

		if(this.userdetail.chassisnumber){
			if(this.userdetail.chassisnumber.length < 8){this.helpherservice.displayMsg('error','Please enter complete chassis value');return false;}
		}

		if(this.orderdetail.CountryCode != 'NZL' && this.orderdetail.CountryCode != 'UGA' && !this.userdetail.selectedmonth){
			this.helpherservice.displayMsg('error','Please select month');return false;
		}

		if(this.orderdetail.CountryCode != 'NZL' && this.orderdetail.CountryCode != 'UGA' && !this.userdetail.selectedYear){
			this.helpherservice.displayMsg('error','Please select year'); return false;
		}
		
		let _data_ = {
			PlanData : {
				shipmentType_Id : this.orderdetail.ShipmentTypeId,
				package_Id : this.userdetail.PackageId,
				plan_Id : this.orderdetail.PlanId,
				port_Id : this.orderdetail.PortId,
				currencyCode : this.currenc_code,
				countryCode : this.orderdetail.CountryCode,
				PricingTypeId : this.orderdetail.PricingTypeId,
				portName : '',
				shipmentTerm_Id : this.orderdetail.ShipmentTermId ,
				customerOrders : [{
					model_Id : this.userdetail.ModelId,
					unitPrice : this.userdetail.bidprice,
					auctionHouse_Id : this.orderdetail.AuctionHouseId,
					year : this.orderdetail.Year,
					auctionType : this.orderdetail.AuctionTypeId,
					altertations : this.selectedalteration
				}]
			},
			QuotationData: {
				AuctionId: this.orderdetail.AuctionId,
				TypeId: 1,
				QuotationId: this.userdetail.quotationId,
				QuotationItemId: this.userdetail.quotationItemId,
				QuotationDetailId: this.userdetail.quotationDetailId,
				CountryId: this.orderdetail.CountryId,
				PortId: this.orderdetail.PortId,
				ShipmentTermId: this.orderdetail.ShipmentTermId,
				ShipmentTypeId: this.orderdetail.ShipmentTypeId,
				PlanId: this.orderdetail.PlanId,
				AgentId: this.orderdetail.AgentId,
				CurrencyId: this.orderdetail.CurrencyId,
				CurrencyRate: this.orderdetail.CurrencyRate,
				UpateIp: null,
				AuctionHouseId: this.orderdetail.AuctionHouseId,
				BidPrice: this.userdetail.bidprice,
				ServiceCharges: this.orderdetail.ServiceCharges,
				RikusoFee: this.orderdetail.RikusoFee,
				ExtraFee: this.orderdetail.ExtraFee,
				OnePriceFee: this.orderdetail.OnePriceFee,
				AlterationCharges: this.orderdetail.AlterationCharges,
				InspectionCharges: this.orderdetail.InspectionCharges,
				ContainerCharges: this.orderdetail.ContainerCharges,
				VanningCharges: this.orderdetail.VanningCharges,
				InsuranceFee: this.orderdetail.InsuranceFee,
				FOB: this.orderdetail.FOB,
				FreightCharges: this.orderdetail.FreightCharges,
				CNF: this.orderdetail.CNF,
				totalAlterationAmount: this.userdetail.AlterationCharges,
				meterReading: this.userdetail.meterReversal?this.userdetail.meterReversal:null,
				meterCube: this.orderdetail.MeterCube,
				bidComments: this.orderdetail.BidComments,
				isNumberPlate: this.userdetail.isNumberPlateActive,
				numberPlate: (this.userdetail.isNumberPlateActive == true )?this.userdetail.numberplate:null,
				isCustomerNegotiation: this.userdetail.isNegotiationActive,
				NonDrivable : this.userdetail.isDrivableActive,
				chassisNumber: this.userdetail.chassisnumber,
				manufacturingMonth: this.userdetail.selectedmonth?this.userdetail.selectedmonth:null,
				manufacturingYear: this.userdetail.selectedYear?this.userdetail.selectedYear:null,
				ModelId : this.orderdetail.ModelId,
				PricingTypeId : this.orderdetail.PricingTypeId,
				ShippingLineId : this.userdetail.PreferredShipping,
				CreaterTypeId : 1
			},
			AlterationData: []
		}


		if (this.alertationdata && this.alertationdata.length) {
			for (let i = 0; i < this.alertationdata.length; i++) {
				if (this.selectedalteration) {
					for (let j = 0; j < this.selectedalteration.length; j++) {
						if (this.alertationdata[i]['id'] == this.selectedalteration[j]) {
							_data_.AlterationData.push({
								AlterationId : this.alertationdata[i]['id'],
								Amount : this.alertationdata[i]['amount']
							})
						}
					}
				}
			}
		}
		this.displayloader = true  ;
		this.dataservice
			.proceedtoorder(_data_)
			.subscribe(res => {
				this.displayloader = false ;
				
				if (res.IsSuccess) {
					$.fancybox.close();
					$.fancybox.open({
						src: '#order_incomplete',
						type: 'inline',
					})
					this.route.navigate(['/incomplete-order'])
				}
			})
	}

	calculate() {
		this.displayerrormsg = false ;
		if(!this.userdetail.bidprice){this.helpherservice.displayMsg('error','Please enter bid price');return false ;}

		if(!this.onlynumbersallow.test(this.userdetail.bidprice)){this.helpherservice.displayMsg('error','Please enter valid bid price');return false ;}

		if(this.orderdetail.PricingTypeId == 1 ){
			if(parseInt(this.userdetail.bidprice) < this.userdetail.VehicleStartPrice){
				this.helpherservice.displayMsg('error','Bid Price must be greater than JPY ' + this.userdetail.VehicleStartPrice.toLocaleString());
				return false ;
			}
		}
		

		let _data_ = {
			shipmentType_Id : this.orderdetail.ShipmentTypeId,
			package_Id : this.userdetail.PackageId,
			plan_Id : this.orderdetail.PlanId,
			port_Id : this.orderdetail.PortId,
			currencyCode : this.currenc_code,
			countryCode : this.orderdetail.CountryCode,
			PricingTypeId : this.orderdetail.PricingTypeId,
			portName : '',
			shipmentTerm_Id : this.orderdetail.ShipmentTermId ,
			customerOrders : [{
				model_Id : this.userdetail.ModelId,
				unitPrice : this.userdetail.bidprice,
				auctionHouse_Id : this.orderdetail.AuctionHouseId,
				year : this.orderdetail.Year,
				auctionType : this.orderdetail.AuctionTypeId?this.orderdetail.AuctionTypeId:1,
				altertations : this.selectedalteration,
				IsNotDriveable : this.userdetail.isDrivableActive,
				IsNegotiable : this.userdetail.isNegotiationActive
			}]
		}

		this.displayloader = true  ;
		this.dataservice
		.evaluateamount(_data_)
		.subscribe(res=>{
			this.displayloader = false ;

			if(res.IsSuccess){
				let _data_ = res.Data.CustomerOrders[0];

				if(_data_.ExMessage == 'Calculation Issue' || _data_.FinalPrice == null){
					this.displayerrormsg = true ;
				}
				// update original and local plan copy  
				this.allplans[this.selectedplan.index]['BidPrice'] = _data_.UnitPrice;
				this.allplans[this.selectedplan.index]['ServiceCharges'] = _data_.ServiceCharges;
				this.allplans[this.selectedplan.index]['InspectionCharges'] = _data_.InspectionCharges;
				this.allplans[this.selectedplan.index]['RikusoFee'] = _data_.RikusoFee;
				this.allplans[this.selectedplan.index]['ExtraFee'] = _data_.ExtraFee;
				this.allplans[this.selectedplan.index]['AlterationCharges'] = _data_.AlterationCharges;	
				this.allplans[this.selectedplan.index]['NegotiableAmount'] = _data_.NegotiableAmount;												
				this.allplans[this.selectedplan.index]['FOB'] = _data_.FOBCharges;
				this.allplans[this.selectedplan.index]['FreightCharges'] = _data_.FreightCharges;
				this.allplans[this.selectedplan.index]['CNF'] = _data_.FinalPrice;
				

				this.orderdetail.BidPrice = _data_.UnitPrice;
				this.orderdetail.ServiceCharges = _data_.ServiceCharges;
				this.orderdetail.InspectionCharges = _data_.InspectionCharges;
				this.orderdetail.RikusoFee = _data_.RikusoFee;
				this.orderdetail.ExtraFee = _data_.ExtraFee;
				this.orderdetail.AlterationCharges = _data_.AlterationCharges;
				this.orderdetail.VanningCharges = _data_.VanningCharges;
				this.orderdetail.NegotiableAmount = _data_.NegotiableAmount;				
				this.orderdetail.FOB = _data_.FOBCharges;
				this.orderdetail.FreightCharges = _data_.FreightCharges;
				this.orderdetail.CNF = _data_.FinalPrice;

			}
		})

	}

	// plan selected functionality 
	changedplan(){
		
		this.orderdetail = Object.assign( {} , this.allplans[this.selectedplan.index]);
		this.currenc_code = this.orderdetail.CurrencyCode;
		this.userdetail.bidprice = this.orderdetail.BidPrice;
		this.carImages = this.splitImages(this.orderdetail['AuctionImage']);
		this.calculate();
	}

	// only numbers are allow in input field functionality 
	onlyNumberKey(event) {
		return (event.charCode == 8 || event.charCode == 0) ? null : event.charCode >= 48 && event.charCode <= 57;
	}

	// open view detail page 
	openviewdetail(){
		// window.open('https://area.autorod.com/unit-detail?source='+this.orderdetail.AuctionTypeId+'&lotNum='+this.orderdetail.LotNo+'&id='+this.orderdetail.ReferenceId , '_blank')
		window.open('http://devserver:600/unit-detail?source='+this.orderdetail.AuctionTypeId+'&lotNum='+this.orderdetail.LotNo+'&id='+this.orderdetail.ReferenceId , '_blank')
	}

	// check chassis detail functionality 
	checkchassis(){
		if(!this.userdetail.chassisnumber){ this.helpherservice.displayMsg('error','Please enter chassis value'); return false;}

		this.manufact_detail['message'] = '';
		this.checkChassiValueLoader = true;
		
		let data = {
			makerId : this.make_values[this.orderdetail.Make.toUpperCase()] ,
			chassisNo : this.userdetail.chassisnumber
		}

		if(!data['makerId']){data['makerId']='0,0'}

		this.unitdetailservice
		.getChassisDetail(data)
		.subscribe(res => {
			this.checkChassiValueLoader = false;
			let _res : any  = res;
			if(_res){
				this.manufact_detail['message'] = (_res.message)?_res.message:'';
				this.manufact_detail['month'] = (_res.month)?_res.month:this.userdetail.selectedmonth;
				this.manufact_detail['year'] = (_res.year)?_res.year:this.userdetail.selectedYear;
				this.userdetail.selectedYear = this.manufact_detail['year'];
                this.userdetail.selectedmonth = this.manufact_detail['month'];
			}

			if(_res == null){
				this.manufact_detail['message'] = 'Not found';
			}
		})
	}

	
	// round of thousand functionality 
	focusOut(e){
		this.userdetail.bidprice = Math.round(this.userdetail.bidprice/1000)*1000;
	}

	// alphabets into capital letters functionality 
	alphabeticCapsOn(e){
		if(this.userdetail.chassisnumber){
			this.userdetail.chassisnumber =this.userdetail.chassisnumber.replace(/[^a-zA-Z 0-9 \-\/]/g, "").toUpperCase();	
		}
	}

	// open auction sheet functionality 
	openAuctionSheet(){
		$.fancybox.open({src: '#auctionsheetpopn',type: 'inline',});
	}

}
