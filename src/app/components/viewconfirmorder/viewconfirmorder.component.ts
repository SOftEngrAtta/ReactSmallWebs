import { CreditLimit } from './../../models/creditLimit';
// modules 
import {
    Component,
    OnInit,
    Input
} from '@angular/core';
import {
    Router,
    ActivatedRoute,
    Params,
    NavigationEnd
} from '@angular/router';

// end 

// services
import {
    DataService
} from '../../Services/data.service';
import {
    HelperService
} from '../../Services/helper.service';
import {
    StorageService
} from '../../Services/storage.service';
import {
    ToastrService
} from '../../Services/toastr.service';
import {
    UnitDetailService
} from '../../Services/unit-detail.service';
// end

// models
import {
    BidPriceUpdateObj
} from '../../models/bidpriceupdatepopup'
import {
    MakeValues
} from '../../models/makevalues'

import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import { Subject } from 'rxjs/Subject';
import { setTimeout } from 'timers';

declare var $;
declare var moment: any;

@Component({
    selector: 'app-view-confirm-order',
    templateUrl: './viewconfirmorder.component.html',
    styleUrls: ['./viewconfirmorder.component.css']
})
export class ViewConfirmOrder implements OnInit {

    objCreditLimit: CreditLimit = new CreditLimit();
    keysDelete = {
        itemId: null,
        detailId: null
    };

    purchaseCounts = {
        inputCount: null,
        totalCount: null,
        itemId: null
    };

    public headerdetail: any;
    public orderId: any;
    public orderDetail: any;

    public creditLimit: number = 0;

    public groupsdetail: any = [];
    public selectedmovegroup: any;

    public hidepage: boolean = false;

    modelChanged: Subject<string> = new Subject<string>();
    hideshownewgroupbtn: boolean = false;

    public customerInformation: any;
    public isCustomerLogin: boolean = false;

    public requestSkipComment: string;

    // update order variables 
    public alertationdata: Array<any> = [];
    public displayMeterReversal: boolean = false;
    public selectedalteration: number[] = [];
    public getallplans: Array<any> = [];
    public displayPlanDetail: boolean = false;
    public onlynumbersallow = /^\d+$/; // regx expression ;
    public displayloader: boolean = false;
    public displayerrormsg: boolean = false;
    public selectedorder: any;
    public plan: any = { selectedplanId: '', parent_plan: 'Select Plan', parent_plan_obj: null };
    public pricingtypes : any = { pricingTypeId : 0 , pricingTypeName : ''}
    public orderUpdate: any = new BidPriceUpdateObj();

    // end

    public current_index = 0;
    public parent_index = 0;
    public last_index: boolean = false;
    public calculate_bidprice_or_not: boolean = false;
    public isDefaultPlanIdActive: boolean = false;

    public preferred_shipping = [{ id: 1, name: 'Armacup' }, { id: 2, name: 'Mol' }, { id: 3, name: 'Toyofuji' }, { id: 4, name: 'Autohub' }, { id: 5, name: 'Jacanna' }, { id: 6, name: 'NYK LINE' }];

    public make_values = new MakeValues();
    public manufact_detail: any = { month: '', year: '', message: '' };
    public checkChassiValueLoader: boolean = false;

    public _saveBidPrice = {
        OrderId : '',
        PlanId: 0,
        BidPrice : null,
        OrderDetailId: []
    }

    hidefieldInStockorder : number = 0 ;


    constructor(private helperservice: HelperService,
        private dataservice: DataService,
        private activatedRoute: ActivatedRoute,
        private router: Router,
        private storageservice: StorageService,
        private unitdetailservice: UnitDetailService) {
        this.modelChanged.debounceTime(1500).distinctUntilChanged()
            .subscribe(model => {
                if (this.purchaseCounts.inputCount > 0 && this.purchaseCounts.inputCount <= this.purchaseCounts.totalCount) {

                    let _data_ = {
                        orderId: this.orderId,
                        itemId: this.purchaseCounts.itemId,
                        count: this.purchaseCounts.inputCount
                    }

                    this.dataservice
                        .purchasedcarcount(_data_)
                        .subscribe(res => {
                            let _data_ = res;
                            if (_data_.IsSuccess) {
                                this.helperservice.displayMsg('success', 'successfully updated');
                            }
                        })
                } else {
                    if (this.purchaseCounts.inputCount == 0) {
                        this.helperservice.displayMsg('error', 'Purchased car number should be greater than zaro');
                        return false;
                    }

                    if (this.purchaseCounts.inputCount) {
                        this.helperservice.displayMsg('error', 'Please enter purchased car number');
                    } else {
                        this.helperservice.displayMsg('error', 'Purchased number of car must be equal or less than total items');
                    }

                }
            });
    }

    ngOnInit() {
        $('body').removeClass('main_login');
        this.customerInformation = this.storageservice.getDecrypted('customerInformation')
        let customer_login = this.storageservice.get('customerlogin');
        if (customer_login) {
            this.isCustomerLogin = customer_login;
        }

        this.activatedRoute.queryParams.subscribe(params => {
            this.orderId = params.id;
            this.getorderdetail(this.orderId);

        })

        setTimeout(() => {
            $("body").on("click", ".hlp-icon a", function () {
                $(this).parent().next(".popshd").fadeIn(600);
            });
        }, 200)

        this.setYears()
    }

    setYears() {
        let currentYear = parseInt(moment().format('YYYY'));
        for (let i = 1910; i <= currentYear; i++) {
            this.orderUpdate.years.push(i);
        }
        this.orderUpdate.years = this.orderUpdate.years.reverse();
    }
    getorderdetail(id) {
        this.dataservice
            .getorderdetail(id)
            .subscribe(res => {
                let _data_ = res;
                if (_data_.IsSuccess) {
                    this.creditLimit = _data_.Data.CreditLimit;
                    this.orderDetail = _data_.Data;
                    this.pricingtypes.pricingTypeName = (this.orderDetail.PricingTypeId == 1)?'Service Based':'CNF Based';
                    this.pricingtypes.pricingTypeId = this.orderDetail.PricingTypeId;
                    if(this.orderDetail.OrderItems && this.orderDetail.OrderItems.length){
                        this.hidefieldInStockorder = this.orderDetail.OrderItems[0]['OrderDetails'][0]['AuctionTypeId'];                
                    }
                    if (!this.orderDetail.OrderItems || this.orderDetail.OrderItems == null) {
                        this.hidepage = true;
                    }
                    if (this.orderDetail && this.orderDetail.OrderItems && this.orderDetail.OrderItems != null && (this.orderDetail.OrderItems != null && this.orderDetail.OrderItems.length > 1 || this.orderDetail.OrderItems[0].OrderDetails.length > 1)) {
                        this.hideshownewgroupbtn = true;
                    }


                }
                setTimeout(() => {
                    this.helperservice.callaccordingtoggle();
                }, 200)
                this.plans({ CountryCode: this.orderDetail.CountryCode, MembershipId: this.customerInformation.MembershipId });
                this.getmovegroups()
            })
    }

    // move groups functionality 
    getmovegroups() {
        this.dataservice
            ._getmovegroups(this.orderId)
            .subscribe(res => {
                let _data_ = res;
                if (_data_.IsSuccess) {
                    this.groupsdetail = _data_.Data;
                }
            })
    }

    movegroupselected(itemId, detailId) {
        this.selectedmovegroup = {
            orderItemId: itemId,
            orderDetailId: detailId
        };
    }

    moveditem() {
        this.dataservice
            .changeorderintoanothergroup(this.selectedmovegroup)
            .subscribe(res => {
                let _data_ = res;
                if (_data_.IsSuccess) {
                    this.helperservice.displayMsg('success', 'updated');
                    this.getorderdetail(this.orderId);
                }
            })
    }

    // -------

    // purchased car number functionality 
    stoptoggle(e) {
        e.stopPropagation();
    }
    itemCountChange(e, inputcount, totalcount, itemId) {
        this.purchaseCounts.inputCount = inputcount;
        this.purchaseCounts.totalCount = totalcount;
        this.purchaseCounts.itemId = itemId;
        this.modelChanged.next(e);
    }

    decNumber(index) {
        if (this.orderDetail.OrderItems[index].OrderPurchaseCount) {
            this.orderDetail.OrderItems[index].OrderPurchaseCount = this.orderDetail.OrderItems[index].OrderPurchaseCount - 1;

            if (this.orderDetail.OrderItems[index].OrderPurchaseCount == 0) {
                this.helperservice.displayMsg('error', 'Purchased car number should be greater than zero');
                return false;
            }

            let _data_ = {
                orderId: this.orderId,
                itemId: this.orderDetail.OrderItems[index].OrderItemId,
                count: this.orderDetail.OrderItems[index].OrderPurchaseCount
            }
            this.dataservice
                .purchasedcarcount(_data_)
                .subscribe(res => {
                    let _data_ = res;
                    if (_data_.IsSuccess) {
                        this.helperservice.displayMsg('success', _data_.Data);
                    }
                })
        } else {
            this.helperservice.displayMsg('error', 'Purchased car number should be greater than zero');
            return false;
        }
    }
    incNumber(index) {
        if (this.orderDetail.OrderItems[index].OrderPurchaseCount < this.orderDetail.OrderItems[index].OrderDetails.length) {
            this.orderDetail.OrderItems[index].OrderPurchaseCount = 1 + this.orderDetail.OrderItems[index].OrderPurchaseCount

            let _data_ = {
                orderId: this.orderId,
                itemId: this.orderDetail.OrderItems[index].OrderItemId,
                count: this.orderDetail.OrderItems[index].OrderPurchaseCount
            }
            this.dataservice
                .purchasedcarcount(_data_)
                .subscribe(res => {
                    let _data_ = res;
                    if (_data_.IsSuccess) {
                        this.helperservice.displayMsg('success', _data_.Data);
                    }
                })
        } else {
            this.helperservice.displayMsg('error', 'Purchased number of car must be equal or less than total items');
            return false;
        }
    }
    // -----

    // place order functionality 
    placeorderstock(){
        this.dataservice
        ._placeorder(this.orderId)
        .subscribe(res => {
            let _data_ = res;
            if (_data_.IsSuccess) {

                if (_data_.Message) {
                    this.helperservice.displayMsg('error', _data_.Message);
                } else {
                    this.helperservice.displayMsg('success', 'Order has been placed');
                    this.router.navigate(['/my-orders'])
                }

            }
        })
        
    }
    placeOrder() {
        this.dataservice
            .getCustomerOrderCreditLimit(this.orderId)
            .subscribe(res => {
                let _data_ = res;
                this.objCreditLimit = res.Data;
                if (_data_.IsSuccess) {
                    if (this.objCreditLimit.IsError) {
                        this.helperservice.displayMsg('error', this.objCreditLimit.Message);
                        return false;
                    }
                    if (this.objCreditLimit.IsOrderAllowed) {
                        this.dataservice
                            ._placeorder(this.orderId)
                            .subscribe(res => {
                                let _data_ = res;
                                if (_data_.IsSuccess) {

                                    if (_data_.Message) {
                                        this.helperservice.displayMsg('error', _data_.Message);
                                    } else {
                                        this.helperservice.displayMsg('success', 'Order has been placed');
                                        this.router.navigate(['/my-orders'])
                                    }

                                }
                            })
                    } else {
                        $.fancybox.open({
                            src: '#credit_error',
                            modal: true
                        });
                    }
                }
            })
    }

    RequestCreditCheckSkip() {
        $.fancybox.open({
            src: '#credit_skip',
            modal: true
        });
    }

    PlaceCreditCheckSkipRequest() {
        if (this.requestSkipComment == null || this.requestSkipComment.length === 0) {
            this.helperservice.displayMsg('error', 'Please enter comment');
            return false;
        } else {
            this.dataservice
                .placeCreditSkipRequest(this.orderId, this.requestSkipComment)
                .subscribe(res => {
                    let _data_ = res;
                    if (_data_.Data) {
                        this.helperservice.displayMsg('success', 'Request for skipping credit check has been placed.');
                        this.requestSkipComment = '';
                    } else {
                        this.helperservice.displayMsg('error', 'Some error occurred while place your request. Please try again later.');
                    }
                });
        }
    }

    selectdeletekey(item_id, detail_id) {
        this.keysDelete.itemId = item_id;
        this.keysDelete.detailId = detail_id;
    }

    deleteItem() {
        this.dataservice
            .removeitem(this.keysDelete.itemId, this.keysDelete.detailId)
            .subscribe(res => {
                let _data_ = res;
                if (_data_.IsSuccess) {
                    this.getorderdetail(this.orderId)
                }
            })
    }

    addnewgroup() {
        this.dataservice
            .addnewgroup(this.orderId)
            .subscribe(res => {
                let _data_ = res;
                if (_data_.IsSuccess) {
                    if (_data_.Data != 'Record inserted successfully') {
                        this.helperservice.displayMsg('error', _data_.Data);
                    } else {
                        this.getmovegroups()
                    }
                }
            })
    }

    onlyNumberKey(event) {
        return (event.charCode == 8 || event.charCode == 0) ? null : event.charCode >= 48 && event.charCode <= 57;
    }


    // update order functionality 

    openorderupdatepopup(row, curr_index, par_index) {
        if (this.orderDetail.PlanId) {
            this.isDefaultPlanIdActive = true;
            this.plan.selectedplanId = this.orderDetail.PlanId;
        }

        this.current_index = curr_index;
        this.parent_index = par_index;
        this.displayPlanDetail = false;
        this.calculate_bidprice_or_not = false;
        this.displayMeterReversal = false;
        this.alertationdata = [];
        this.selectedalteration = [];
        this.orderUpdate = new BidPriceUpdateObj();
        this.setYears();
        this.getAlterationData(row);

        this.selectedorder = row;

        this.last_index = (this.orderDetail.OrderItems[this.parent_index]['OrderDetails'].length - 1 == curr_index) ? true : false;

        this.selectedorder['carImages'] = (this.selectedorder['AuctionImage']) ? this.selectedorder['AuctionImage'].split("#") : [];

        $.fancybox.open({
            src: '#updateorderpopup',
            type: 'inline',
        })
    }

    addCustomUser = (term) => ({ id: term, name: term });

    getAlterationData(data) {

        let _data_ = {
            CountryCode: this.orderDetail.CountryCode,
            CurrencyCode: 'JPY' //data.CurrencyCode
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
        this.orderUpdate.totalalterationamount = 0;
        if (this.alertationdata.length) {
            for (let i = 0; i < this.alertationdata.length; i++) {
                if (this.selectedalteration && this.selectedalteration.length) {
                    for (let j = 0; j < this.selectedalteration.length; j++) {

                        if (this.selectedalteration[j] == 1) {
                            this.displayMeterReversal = true;
                        }

                        if (this.selectedalteration[j] == this.alertationdata[i]['id']) {
                            this.orderUpdate.totalalterationamount = this.orderUpdate.totalalterationamount + this.alertationdata[i]['amount']
                        }
                    }
                }
            }
        }
    }


    plans(data) {
        if (data.MembershipId) {
            this.dataservice
                .getPaymentPlans(data.CountryCode, data.MembershipId)
                .subscribe(res => {
                    let _data_: any = res;
                    if (_data_.isSuccess) {
                        if(this.orderDetail['PlanId']){
                            for(let i = 0 ; i < res.data.length ; i++){
                                if(res.data[i]['plan_Id'] == this.orderDetail['PlanId']){
                                    this.plan.parent_plan_obj = res.data[i]; 
                                    this.plan.parent_plan = this.orderDetail['PlanName'];
                                    this.plan.selectedplanId = this.orderDetail['PlanId'];
                                }
                            }
                        }
                        this.getallplans = res.data;
                    }
                })
        }
    }


    calculateOnPlanSelect() {
        if (this.orderUpdate.bidprice) {
            this.calculate();
        }
    }
    activecheckornot(item){
        if(item == 'negotiation'){
            this.orderUpdate.isNegotiationActive = (this.orderUpdate.isNegotiationActive)?false:true;
            this.calculate();
        }
    }


    calculate() {

        this.displayerrormsg = false;

        if (!this.plan.selectedplanId) {
            this.helperservice.displayMsg('error', 'Please select plan');
            return false;
        }

        if (!parseInt(this.orderUpdate.bidprice)) {
            this.helperservice.displayMsg('error', 'Please enter bid price , value must be greater than zero');
            return false;
        }

        if (!this.onlynumbersallow.test(this.orderUpdate.bidprice)) {
            this.helperservice.displayMsg('error', 'Please enter valid bid price');
            return false;
        }

        if (this.orderUpdate.bidprice < this.selectedorder.PriceStart) {
            this.helperservice.displayMsg('error', "Bid Price must be greater than " + this.selectedorder.PriceStart);
            return false;
        }

        if (this.orderUpdate.bidprice < this.selectedorder.StartPrice) {
            this.helperservice.displayMsg('error', 'Bid Price must be greater than JPY ' + this.selectedorder.StartPrice.toLocaleString());
            return false;
        }

        let _data_ = {
            shipmentType_Id: this.orderDetail.ShipmentTypeId,
            package_Id: this.customerInformation.MembershipId,
            plan_Id: this.plan.selectedplanId,
            port_Id: this.orderDetail.PortId,
            currencyCode: this.selectedorder.CurrencyCode,
            countryCode: this.orderDetail.CountryCode,
            PricingTypeId: this.orderDetail.PricingTypeId,
            portName: "",
            shipmentTerm_Id: this.orderDetail.ShipmentTermId,
            customerOrders: [{
                IsNotDriveable: this.orderUpdate.isDrivableActive,
                model_Id: this.selectedorder.ModelId,
                unitPrice: this.orderUpdate.bidprice,
                auctionHouse_Id: this.selectedorder.AuctionHouseId,
                year: this.selectedorder.Year,
                auctionType: this.selectedorder.AuctionTypeId,
                IsNegotiable : this.orderUpdate.isNegotiationActive,
                altertations: this.selectedalteration
            }]
        }

        this.displayloader = true;
        this.dataservice
            .evaluateamount(_data_)
            .subscribe(res => {
                this.calculate_bidprice_or_not = true;
                this.displayloader = false;
                this.displayPlanDetail = true;
                if (res.IsSuccess) {
                    let _data_ = res.Data.CustomerOrders[0];

                    this.orderUpdate['PlanName'] = res.Data['PlanName'];
                    this.orderUpdate['PlanClass'] = res.Data['PlanClass'];
                    this.orderUpdate['PlanAmount'] = res.Data['Plan_Amount'];
                    this.orderUpdate['CurrencyRate'] = res.Data['CurrencyRate'];

                    if (_data_ && _data_.ExMessage == 'Calculation Issue' || _data_.FinalPrice == null) {
                        this.displayerrormsg = true;
                    }
                    this.orderUpdate['prices']['BidPrice'] = this.orderUpdate.bidprice;
                    this.orderUpdate['prices']['ServiceCharges'] = (_data_.ServiceCharges != null) ? _data_.ServiceCharges : 0;
                    this.orderUpdate['prices']['InspectionCharges'] = _data_.InspectionCharges;
                    this.orderUpdate['prices']['RikusoFee'] = (_data_.RikusoFee != null) ? _data_.RikusoFee : 0;
                    this.orderUpdate['prices']['ExtraFee'] = (_data_.ExtraFee != null) ? _data_.ExtraFee : 0;
                    this.orderUpdate['prices']['AlterationCharges'] = (_data_.AlterationCharges != null) ? _data_.AlterationCharges : 0;
                    this.orderUpdate['prices']['NegotiableAmount'] = (_data_.NegotiableAmount != null) ? _data_.NegotiableAmount : 0;
                    this.orderUpdate['prices']['FOB'] = (_data_.FOBCharges != null) ? _data_.FOBCharges : 0;                    
                    this.orderUpdate['prices']['FreightCharges'] = (_data_.FreightCharges != null) ? _data_.FreightCharges : 0;
                    this.orderUpdate['prices']['CNF'] = (_data_.FinalPrice != null) ? _data_.FinalPrice : 0;
                    this.orderUpdate['prices']['OnePriceFee'] = (this.selectedorder.AuctionTypeId == 2 && _data_.AuctionTypeAmount != null) ? _data_.AuctionTypeAmount : 0;
                    this.orderUpdate['prices']['VanningCharges'] = (_data_.VanningCharges != null) ? _data_.VanningCharges : 0;
                }
            })
    }

    saveandnextorder() {
        if (!this.plan.selectedplanId) {
            this.helperservice.displayMsg('error', 'Please select plan');
            return false;
        }

        if (!this.orderUpdate.bidprice) {
            this.helperservice.displayMsg('error', 'Please enter bid value');
            return false;
        }

        if (this.orderUpdate.bidprice != this.orderUpdate.prices.BidPrice) {
            this.helperservice.displayMsg('error', 'Please calculate bid price');
            return false;
        }

        if (!this.calculate_bidprice_or_not) {
            this.helperservice.displayMsg('error', 'Please calculate bid price');
            return false;
        }

        if (this.orderDetail.CountryCode != 'NZL' && !this.orderUpdate.selectedmonth) {
            if(this.orderDetail.CountryCode != 'UGA'){this.helperservice.displayMsg('error', 'Please select month');return false;}
            
        }

        if (this.orderDetail.CountryCode != 'NZL' && !this.orderUpdate.selectedYear) {
            if(this.orderDetail.CountryCode != 'UGA'){this.helperservice.displayMsg('error', 'Please select year');return false;}
        }

        if (!this.orderUpdate.chassisnumber) {
            this.helperservice.displayMsg('error', 'Please enter chassis values');
            return false;
        }

        if (this.orderUpdate.chassisnumber) {
            if (this.orderUpdate.chassisnumber.length < 8) {
                this.helperservice.displayMsg('error', 'Please enter complete chassis value');
                return false;
            }
        }

        let _data_ = {
            OrderPlanData:
                {
                    shipmentType_Id: this.orderDetail.ShipmentTypeId,
                    package_Id: this.customerInformation.MembershipId,
                    plan_Id: this.plan.selectedplanId,
                    port_Id: this.orderDetail.PortId,
                    currencyCode: this.selectedorder.CurrencyCode,
                    countryCode: this.orderDetail.CountryCode,
                    PricingTypeId: this.orderDetail.PricingTypeId,
                    portName: this.orderDetail.PortName,
                    shipmentTerm_Id: this.orderDetail.ShipmentTermId,
                    OrderId: this.orderDetail.OrderId,
                    customerOrders: [{
                        model_Id: this.selectedorder.ModelId,
                        unitPrice: this.orderUpdate.bidprice,
                        auctionHouse_Id: this.selectedorder.AuctionHouseId,
                        year: this.selectedorder.Year,
                        auctionType: this.selectedorder.AuctionTypeId
                    }]
                },
            OrderData:
                {
                    TypeId: 2,
                    CountryId: this.orderDetail.CountryId,
                    PortId: this.orderDetail.PortId,
                    ShipmentTermId: this.orderDetail.ShipmentTermId,
                    ShipmentTypeId: this.orderDetail.ShipmentTypeId,
                    PlanId: this.plan.selectedplanId,
                    AgentId: 0,
                    CurrencyId: this.selectedorder.CurrencyId,
                    CurrencyRate: this.orderUpdate.CurrencyRate,
                    UpateIp: null,
                    AuctionHouseId: this.selectedorder.AuctionHouseId,
                    BidPrice: this.orderUpdate.prices.BidPrice,
                    ServiceCharges: this.orderUpdate.prices.ServiceCharges,
                    RikusoFee: this.orderUpdate.prices.RikusoFee,
                    ExtraFee: this.orderUpdate.prices.ExtraFee,
                    OnePriceFee: this.orderUpdate.prices.OnePriceFee,
                    AlterationCharges: this.orderUpdate.prices.AlterationCharges,
                    InspectionCharges: this.orderUpdate.prices.InspectionCharges,
                    ContainerCharges: this.orderUpdate.prices.ContainerCharges,
                    VanningCharges: this.orderUpdate.prices.VanningCharges,
                    InsuranceFee: this.orderUpdate.prices.InsuranceFee,
                    FOB: this.orderUpdate.prices.FOB,
                    FreightCharges: this.orderUpdate.prices.FreightCharges,
                    CNF: this.orderUpdate.prices.CNF,
                    meterReading: this.orderUpdate.meterReversal,
                    meterCube: this.selectedorder.Dimension,
                    bidComments: this.orderUpdate.comment,
                    isNumberPlate: this.orderUpdate.isNumberPlateActive,
                    numberPlate: this.orderUpdate.numberplate,
                    isCustomerNegotiation: this.orderUpdate.isNegotiationActive,
                    NonDrivable: this.orderUpdate.isDrivableActive,
                    chassisNumber: this.orderUpdate.chassisnumber,
                    manufacturingYear: this.orderUpdate.selectedYear,
                    manufacturingMonth: this.orderUpdate.selectedmonth,
                    CreaterTypeId: 1,
                    EOrderDetailId: this.selectedorder.OrderDetailId,
                    ShippingLineId: this.orderUpdate.PreferredShipping
                },
            AuctionData: {
                Source: this.selectedorder.AuctionTypeId,
                APIUniqueId: this.selectedorder.ReferenceId,
                LotNo: this.selectedorder.LotNo,
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
                        this.isDefaultPlanIdActive = true;
                        this.getorderdetail(this.orderId);
                        $.fancybox.close();
                        if (this.orderDetail.OrderItems[this.parent_index]['OrderDetails'].length - 1 > this.current_index) {
                            this.last_index = (this.orderDetail.OrderItems[0]['OrderDetails'].length - 2 == this.current_index) ? true : false;
                            this.current_index = this.current_index + 1
                            this.openorderupdatepopup(this.orderDetail.OrderItems[this.parent_index]['OrderDetails'][this.current_index], this.current_index, this.parent_index)
                        }
                    }


                    if (res.Message) {
                        $.fancybox.close();
                        this.helperservice.displayMsg('error', res.Message);
                    }

                }

            })
    }
    

    // selected plan functionality 
    selectedplan(data) {
        this.plan.parent_plan_obj = data;
        this.plan.parent_plan = data.plan.name + ' ( ' + data.plan.percentOff + '% ) ';
    }

    // update plan functionality 
    saveplanfororder() {

        if (!this.plan.parent_plan_obj) {
            this.helperservice.displayMsg('error', 'Please select plan');
            return false;
        }


        this.dataservice.
            _saveorderplan({ OrderId: this.orderDetail.OrderId, PlanId: this.plan.parent_plan_obj.plan.id, PricingTypeId : this.pricingtypes.pricingTypeId })
            .subscribe(res => {
                if (res.IsSuccess) {
                    if (res.Data) {
                        this.getorderdetail(this.orderId);
                        this.helperservice.displayMsg('success', 'Plan updated successfully');
                    }
                    if (res.Message) {
                        this.helperservice.displayMsg('error', res.Message);
                    }
                }
            })
    }

    // chassis detail functionality
    checkchassis() {
        if (!this.orderUpdate.chassisnumber) {
            this.helperservice.displayMsg('error', 'Please enter chassis value');
            return false;
        }

        this.manufact_detail['message'] = '';
        this.checkChassiValueLoader = true;

        let data = {
            makerId: this.make_values[this.selectedorder.Make.toUpperCase()],
            chassisNo: this.orderUpdate.chassisnumber
        }

        if (!data['makerId']) { data['makerId'] = '0,0' }



        this.unitdetailservice
            .getChassisDetail(data)
            .subscribe(res => {
                this.checkChassiValueLoader = false;
                let _res: any = res;
                if (_res) {
                    this.manufact_detail['message'] = (_res.message) ? _res.message : '';
                    this.manufact_detail['month'] = (_res.month) ? _res.month : this.orderUpdate.selectedmonth;
                    this.manufact_detail['year'] = (_res.year) ? _res.year : this.orderUpdate.selectedYear;
                    this.orderUpdate.selectedYear = this.manufact_detail['year'];
                    this.orderUpdate.selectedmonth = this.manufact_detail['month'];

                }
                if (_res == null) {
                    this.manufact_detail['message'] = 'Not found';
                }
            })
    }


    checkOrderDetailId(id){
        if(this._saveBidPrice.OrderDetailId.length){
            let checkId : boolean = false ;
            for(let i = 0 ; i < this._saveBidPrice.OrderDetailId.length ; i++){
                if(this._saveBidPrice.OrderDetailId[i] == id){
                    this._saveBidPrice.OrderDetailId.splice(i,1);
                    checkId = true;
                }
            }
            if(!checkId){this._saveBidPrice.OrderDetailId.push(id)}
        }else this._saveBidPrice.OrderDetailId.push(id)
    }

    savebidprice() {

        this._saveBidPrice.PlanId = this.plan.selectedplanId;
        this._saveBidPrice.OrderId = this.orderDetail.OrderId;
        this._saveBidPrice.PlanId = (this.plan.parent_plan_obj && this.plan.parent_plan_obj.plan.id)?this.plan.parent_plan_obj.plan.id:'';

        if (!this._saveBidPrice.PlanId) {
            this.helperservice.displayMsg('error', 'Please select plan');
            return false;
        }

        if(!this._saveBidPrice.BidPrice){
            this.helperservice.displayMsg('error','Please enter price');
            return false;
        }

        this.dataservice.updatePrices(this._saveBidPrice)
        .subscribe(res=>{
            if(res.IsSuccess){
                if(res.Message && res.Message != null){
                    this.helperservice.displayMsg('error',res.Message);
                }
                if(res.Data && res.Data != null){
                    this.helperservice.displayMsg('success', 'Price updated successfully');
                    this.getorderdetail(this.orderId);
                }
            }
        })
    }

    focusOut(e){
        this.orderUpdate.bidprice = Math.round(this.orderUpdate.bidprice / 1000) * 1000;
    }
    focusOutPrice(e){
        this._saveBidPrice.BidPrice = Math.round(this._saveBidPrice.BidPrice / 1000) * 1000;
    }
    // alphabets into capital letters functionality 
	alphabeticCapsOn(e){
		if(this.orderUpdate.chassisnumber){
			this.orderUpdate.chassisnumber =this.orderUpdate.chassisnumber.replace(/[^a-zA-Z 0-9 \-\/]/g, "").toUpperCase();	
		}
    }
    
    // open auction house sheet functionlity 
    openAuctionHouseSheet(){
        $.fancybox.open({
            src: '#auctionsheetchassis',
            modal: true
        });
    }

}
