import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { AuctionSearchResponse } from '../../models/auctionSearchResponse';
import { HelperService } from '../../Services/helper.service';
import { QuotationPricing } from '../../models/quotationPricing';
import { BidPriceService } from '../../Services/bid-price.service';
import { CustomerShipmentDetail } from '../../models/customerShipmentDetail';
import { StorageService } from '../../Services/storage.service';
import { PricePlan } from '../../models/pricePlan';
import { SingleQuotation } from '../../models/singleQuotation';
import { Currency } from '../../models/currency';
import { QuotationType } from '../../enums/quotationType';
import { SourceType } from '../../enums/sourceType';
import { QuotationLinkGenerateResponse } from '../../models/quotationLinkGenerateResponse';
import { PaymentPlan } from '../../models/paymentPlan';
import { DataService } from '../../Services/data.service';

import { Subject } from 'rxjs/Subject';
import { setTimeout } from 'timers';
declare var $;

@Component({
	selector: 'app-bidprice',
	templateUrl: './bidprice.component.html',
	styleUrls: ['./bidprice.component.css']
})
export class BidPrice implements OnInit {

	@Output()
	updated: EventEmitter<any> = new EventEmitter<any>();

	quotationPricing = new QuotationPricing();
	unitPrice: any
	isUpdate: boolean = false
	closeResult: string;
	pricePlans: PricePlan[] = []
	bidPriceCurrencyCodes: Currency[] = []
	selectedBidPriceCurrencyName: string = "JPY";
	quotationResponse: QuotationLinkGenerateResponse = new QuotationLinkGenerateResponse();
	showSCBQuotation = false
	singleQuotation: SingleQuotation = new SingleQuotation();

	showloader: boolean = false;
	calculateloader: boolean = false;
	displayerrormessage: boolean = false;
	displayerrormessageSB : boolean = false ;

	metercube: number;

	// paymentPlans = new PaymentPlan();
	paymentPlans : any = [];
	
	showCNFQuotation = false;
	selectedPaymentPlan = '0';
	cnfBidPrice: number;
	// IsCnfBased: boolean = false;
	PricingType : number = 0;

	inputunitprice : any = 0 ;

	hideAndDisplayCnf : boolean = false ;

	vehicleStartPrice : number = 0;
	isCnfBasedActive : boolean = false;


	@Input()
	set quotationPricingInput(value: QuotationPricing) {
		this.showSCBQuotation = false;
		this.showCNFQuotation = false;
		if (value) {
			let prcvalue : any = value 
			if(prcvalue && prcvalue.PricingTypeId == 1){
				this.hideAndDisplayCnf = true;
			}


			this.vehicleStartPrice = (value.StartPrice)?value.StartPrice:0;


			this.unitPrice = value.averagePrice;
			this.inputunitprice = JSON.stringify(value.averagePrice);
			this.quotationPricing = value
			this.selectedPaymentPlan = '0'
			this.displayerrormessage = false;
			this.displayerrormessageSB = false ;

			this.getPaymentPlans();
			$.fancybox.open({
				src: '#sendlinkpop',
				type: 'inline',
			});
		}
	}
	@Input() set isUpdateInput(value: boolean) {
		this.isUpdate = value;
	}

	constructor(
		private router: Router,
		private helperService: HelperService,
		private bidPriceService: BidPriceService,
		private storageService: StorageService,
		private dataService: DataService
	) { }

	ngOnInit() {
		
		this.helperService.loadBidPricePopUp();
		let pric_id = parseInt(this.storageService.getDecrypted('pric_id'));
		this.hideAndDisplayCnf = (pric_id == 1)? true : false;
	}

	evaluate() {
		if (!this.unitPrice || this.unitPrice == null || this.unitPrice === "0") {
			this.helperService.displayMsg('error','Please enter a value');
			return false;
		}

		if(this.unitPrice < this.vehicleStartPrice){
			this.helperService.displayMsg('error','Bid Price must be greater than JPY ' + this.vehicleStartPrice.toLocaleString());
			return false ;
		}

		this.quotationPricing.currencyCode = this.selectedBidPriceCurrencyName
		this.quotationPricing.customerOrders[0].unitPrice = this.unitPrice
		// this.IsCnfBased = false;
		this.PricingType = 1 ; 
		this.quotationPricing.plan_Id = null;
		this.getMultipleQuotation(this.quotationPricing);
	}

	evaluateCnf() {
		if (!this.unitPrice || this.unitPrice == null || this.unitPrice === "0") {
			this.helperService.displayMsg('error' , 'Please enter a value');
			return false;
		}
		
		if (this.selectedPaymentPlan == '0') {
			this.helperService.displayMsg('error','Please select a payment plan');
			return false;
		}
		this.quotationPricing.currencyCode = this.selectedBidPriceCurrencyName
		this.quotationPricing.customerOrders[0].unitPrice = this.unitPrice
		this.quotationPricing.plan_Id = this.selectedPaymentPlan;
		// this.IsCnfBased = true;
		this.PricingType = 2;
		this.getCnfBasedQuotation(this.quotationPricing);
	}

	getPaymentPlans() {
		this.dataService.getPaymentPlans(this.quotationPricing.countryCode, this.quotationPricing.package_Id)
			.subscribe(res => {
				this.paymentPlans = res.data;
			});
	}

	getCnfBasedQuotation(quotationPricing: QuotationPricing) {

		this.displayerrormessage = false;
		this.calculateloader = true;
		this.bidPriceService.getCnfBasedQuotation(quotationPricing)
			.subscribe(res => {

				if(res.Message){this.helperService.displayMsg('error',res.Message);return false;}

				this.pricePlans = [];
				this.pricePlans.push(res.data);
				this.calculateloader = false;
				if (this.pricePlans) {
					this.showCNFQuotation = true;
					this.metercube = res.data['customerOrders'][0]['vehicleVolume'];
					this.cnfBidPrice = res.data['customerOrders'][0]['unitPrice'];
					if (res.data['customerOrders'][0]['exMessage'] == "Model not found") {
						this.displayerrormessage = true;
						this.showCNFQuotation = false;
					}
					if (res.data['customerOrders'][0]['exMessage'] == "Calculation Issue") {
						this.displayerrormessage = true;
						this.showCNFQuotation = false;
					}
				}
			})
	}

	SubmitCnfBased(type) {
		this.unitPrice = this.cnfBidPrice;
		if (type == 1) {
			this.submitQuotation(1);
		}
		else {
			this.updateQuotation();
		}
	}

	getMultipleQuotation(quotationPricing: QuotationPricing) {
		
		this.displayerrormessage = false;
		this.displayerrormessageSB = false;
		this.calculateloader = true;
		this.bidPriceService.getMultiplePlanByData(quotationPricing)
			.subscribe(res => {

				if(res.Message){ this.helperService.displayMsg('error',res.Message);return false;}

				this.pricePlans = res.data;
				this.calculateloader = false;
				if (this.pricePlans && this.pricePlans.length) {

					this.metercube = this.pricePlans[0]['customerOrders'][0]['vehicleVolume'];
					if (this.pricePlans[0]['customerOrders'][0]['finalPrice'] == null) {
						this.displayerrormessageSB = true;
					}
					if (this.pricePlans[0]['customerOrders'][0]['exMessage'] == "Model not found") {
						this.displayerrormessage = true;
					}
				}

				this.showSCBQuotation = true;
				this.showCNFQuotation = false;
			})
	}

	submitQuotation(quotationTypeId: number) {
		this.singleQuotation.QuotationTypeId = quotationTypeId;
		// this.singleQuotation.IsCnfBased = this.IsCnfBased;
		this.singleQuotation.PricingTypeId = this.PricingType ;
		this.singleQuotation.AuctionData = {
			APIUniqueId: this.quotationPricing.referenceId,
			LotNo: this.quotationPricing.LotNo,
			Source: this.quotationPricing.SourceType
		}
		this.singleQuotation.QuotationData = {
			CountryId: this.quotationPricing.countryId,
			PortId: this.quotationPricing.port_Id,
			ShipmentTermId: this.quotationPricing.shipmentTerm_Id,
			ShipmentTypeId: this.quotationPricing.shipmentType_Id,
			CurrencyId: this.pricePlans[0].currencyId,
			CurrencyRate: this.pricePlans[0].currencyRate,
			CurrencyCode: this.quotationPricing.currencyCode,
			QuotationId: this.quotationPricing.QuotationId
		}
		this.singleQuotation.QuotationItemData = {
			//AuctionId: this.quotationPricing.AuctionHouseId,
			AuctionId: null,
			BidPrice: this.unitPrice,
			AgentTranslation: 0,
			CustomerTranslation: 0,
			MeterCube: this.metercube,
			QuotationItemId: this.quotationPricing.QuotationItemId
		}
		if (this.pricePlans[0]['unitInspection'] && this.pricePlans[0]['unitInspection'].length) {
			this.singleQuotation.UnitInspection.push(this.pricePlans[0]['unitInspection'][0])
		}
		this.pricePlans.forEach(element => {
			this.singleQuotation.QuotationDetailDataDTO.push({
				PlanId: element.plan_Id,
				ServiceCharges: element.customerOrders[0].serviceCharges,
				RikusoFee: element.customerOrders[0].rikusoFee,
				ExtraFee: element.customerOrders[0].extraFee,
				OnePriceFee: element.customerOrders[0].auctionType == SourceType.OnePrice ? element.customerOrders[0].auctionTypeAmount : null,
				IsNegotiation: element.customerOrders[0].isNegotiable,
				NegotiationCharges: element.customerOrders[0].negotiableAmount,
				AlterationCharges: element.customerOrders[0].alterationCharges,
				InspectionCharges: element.customerOrders[0].inspectionCharges,
				ContainerCharges: element.customerOrders[0].containerCharges,
				VanningCharges: element.customerOrders[0].vanningCharges,
				InsuranceFee: element.customerOrders[0].insuranceCharges,
				FOB: element.customerOrders[0].fobCharges,
				FreightCharges: element.customerOrders[0].freightCharges,
				CNF: element.customerOrders[0].finalPrice
			})
		});
		this.addToQuotation(this.singleQuotation, quotationTypeId)
		this.singleQuotation = new SingleQuotation()
	}

	addToQuotation(singleQuotation: SingleQuotation, quotationTypeId: number) {
		this.showloader = true;
		this.bidPriceService.addToQuotation(singleQuotation)
			.subscribe(res => {
				this.showloader = false;

				if(res.Message){this.helperService.displayMsg('error',res.Message);return false ;}

				if (res.IsSuccess) {
					if (quotationTypeId == QuotationType.AddToQuotation) {
						this.quotationResponse = res.Data
						$.fancybox.close({
							src: '#sendlinkpop-1',
							type: 'inline',
						});
						this.helperService.setRefreshQuotationBar(true);
						if (this.quotationPricing.IsRedirectPage.path == 'unitdetail') {
							this.updated.emit({
								data: this.quotationResponse.QuotationId
							})
						} else {
							this.updated.emit({
								data: this.quotationResponse.QuotationId
							})
						}

					}
					if (quotationTypeId == QuotationType.LinkGenerate) {
						this.quotationResponse = res.Data
						$.fancybox.close({
							src: '#sendlinkpop-1',
							type: 'inline',
						});
						$.fancybox.open({
							src: '#generate_bid_popup-1',
							type: 'inline',
						});
					}
				}
			})
	}

	updateQuotation() {
		
		this.singleQuotation.QuotationData = {
			CountryId: this.quotationPricing.countryId,
			PortId: this.quotationPricing.port_Id,
			ShipmentTermId: this.quotationPricing.shipmentTerm_Id,
			ShipmentTypeId: this.quotationPricing.shipmentType_Id,
			CurrencyId: this.pricePlans[0].currencyId,
			CurrencyRate: this.pricePlans[0].currencyRate,
			CurrencyCode: this.quotationPricing.currencyCode,
			QuotationId: this.quotationPricing.QuotationId
		}
		this.singleQuotation.QuotationItemData = {
			AuctionId: this.quotationPricing.AuctionHouseId,
			BidPrice: this.unitPrice,
			AgentTranslation: 0,
			CustomerTranslation: 0,
			MeterCube: this.metercube,
			QuotationItemId: this.quotationPricing.QuotationItemId
		}
		if (this.pricePlans[0]['unitInspection'] && this.pricePlans[0]['unitInspection'].length) {
			this.singleQuotation.UnitInspection.push(this.pricePlans[0]['unitInspection'][0])
		}
		this.pricePlans.forEach(element => {
			this.singleQuotation.QuotationDetailDataDTO.push({
				PlanId: element.plan_Id,
				ServiceCharges: element.customerOrders[0].serviceCharges,
				RikusoFee: element.customerOrders[0].rikusoFee,
				ExtraFee: element.customerOrders[0].extraFee,
				OnePriceFee: element.customerOrders[0].auctionType == SourceType.OnePrice ? element.customerOrders[0].auctionTypeAmount : null,
				IsNegotiation: element.customerOrders[0].isNegotiable,
				NegotiationCharges: element.customerOrders[0].negotiableAmount,
				AlterationCharges: element.customerOrders[0].alterationCharges,
				InspectionCharges: element.customerOrders[0].inspectionCharges,
				ContainerCharges: element.customerOrders[0].containerCharges,
				VanningCharges: element.customerOrders[0].vanningCharges,
				InsuranceFee: element.customerOrders[0].insuranceCharges,
				FOB: element.customerOrders[0].fobCharges,
				FreightCharges: element.customerOrders[0].freightCharges,
				CNF: (element.customerOrders[0].cifCharges)?element.customerOrders[0].cifCharges:element.customerOrders[0].cnfCharges
			})
		});

		this.showloader = true;
		this.bidPriceService.updateQuotation(this.singleQuotation)
			.subscribe(res => {
				this.showloader = false;

				if(res.Message){ this.helperService.displayMsg('error',res.Message);return false;}

				this.updated.emit({
					data: 'updated'
				})
				if (res.IsSuccess) {
					this.helperService.displayMsg('success','record updated');
					$.fancybox.close({
						src: '#sendlinkpop-1',
						type: 'inline',
					});
					$.fancybox.open({
						src: '#q_update',
						type: 'inline',
					});
				}
			});
		this.singleQuotation = new SingleQuotation();
	}
	// only numbers are allow in input field functionality 
	onlyNumberKey(event) {
		return (event.charCode == 8 || event.charCode == 0) ? null : event.charCode >= 48 && event.charCode <= 57;
	}

	// link copy show message successfull
	copylink() { this.helperService.displayMsg('success','Quotation link copied to clipboard');}


	displayCNFQuotation(e){
		
		this.pricePlans = [];
		this.displayerrormessageSB = false;

		if(e == 'CBQ'){
			this.isCnfBasedActive = true ;
			// this.unitPrice = 0;
		}else{
			this.unitPrice = JSON.parse(this.inputunitprice);
			this.isCnfBasedActive = false ;
		}
		

	}


	focusOut($event){
		this.unitPrice = Math.round(this.unitPrice/1000)*1000;
	}
}
