import { Directive } from '@angular/core';
// Importing Internal Modules
import { Component, OnInit } from '@angular/core';

// Importing Models
import { PaymentHistoryModel } from './../../models/paymentHistory';
import { DepositFundType, FundDepositRequestModel } from './../../models/depositFundType';
import { AvailableCurrency } from './../../models/currency';
import { PaymentMethod } from './../../models/paymentMethod';
import { OrderDetail } from './../../models/orderDetail';

// Importing Services
import { DataService } from '../../Services/data.service';
import { ToastrService } from '../../Services/toastr.service';
import {
    StorageService
} from './../../Services/storage.service';

// Importing Directive
import { OnlyNumber } from './../../shared/NumberOnly';

declare var $;

@Component({
    selector: 'app-home',
    templateUrl: './paymenthistory.component.html',
    styleUrls: ['./paymenthistory.component.css']
})
export class PaymentHistory implements OnInit {
    objPaymentHistoryModel: PaymentHistoryModel[] = [];
    objDepositFundType: DepositFundType[] = [];
    objAvailableCurrency: AvailableCurrency[] = [];
    objPaymentMethod: PaymentMethod[] = [];
    objOrderDetail: OrderDetail[] = [];
    paymentUrl: string;
    objFundDepositRequestModel: FundDepositRequestModel = new FundDepositRequestModel();
    selectedCurrency: string;
    isCustomerLogin: boolean = false;
    MaxPaypalDepositLimitUSD: number;
    MaxPaypalDepositLimitJPY: number;

    paymentMethord: {payThrough: string } = { payThrough : ''};
    constructor(
        private dataService: DataService,
        private toastrService: ToastrService,
        private storageservice: StorageService
    ) { }

    ngOnInit() {
        $('body').removeClass('main_login');
        let loginInCustomer = this.storageservice.get('customerlogin');
        if (loginInCustomer) {
            this.isCustomerLogin = true;
        }
        this.getPaymentHistory();
        this.getFundDepositType();
        this.getAvailableCurrency();
        this.getPaymentMethod();
        this.getOrderDetailForLC();
        this.objFundDepositRequestModel.EncryptedCurrencyId = this.selectedCurrency;
        this.objFundDepositRequestModel.EncryptedFundDepositTypeId = '0';
        this.objFundDepositRequestModel.EncryptedPaymentMethodId = '';
        this.objFundDepositRequestModel.OrderDetailId = 0;
    }

    getPaymentHistory() {
        this.dataService.getPaymentHistory()
            .subscribe(res => {
                this.objPaymentHistoryModel = res.Data;
            });
    }

    getFundDepositType() {
        this.dataService.getDepositFundType()
            .subscribe(res => {
                this.objDepositFundType = res.Data;
            });
    }

    getAvailableCurrency() {
        this.dataService.getAvailableCurrency()
            .subscribe(res => {
                this.objAvailableCurrency = res.Data;
                this.selectedCurrency = res.Data[0].EncryptedCurrencyId;
                this.objFundDepositRequestModel.EncryptedCurrencyId = this.selectedCurrency;
                this.MaxPaypalDepositLimitUSD = res.Data[0].MaxPaypalDepositLimitUSD;
                this.MaxPaypalDepositLimitJPY = res.Data[0].MaxPaypalDepositLimitJPY;
            });
    }

    getPaymentMethod() {
        this.dataService.getPaymentMethod()
            .subscribe(res => {
                this.objPaymentMethod = res.Data;
                this.objFundDepositRequestModel.EncryptedPaymentMethodId = res.Data[0].EncryptedPaymentMethodId;
            });
    }

    getOrderDetailForLC() {
        this.dataService.getOrderDetailForLC()
            .subscribe(res => {
                this.objOrderDetail = res.Data;
            });
    }

    getPaymentUrl(PaymentOrderId, PaymentMethodId) {
        this.dataService.getPaymentRedirectorUrl(PaymentOrderId, PaymentMethodId)
            .subscribe(res => {
                this.paymentUrl = res.Data;
                $.fancybox.open({
                    src: '#payment_link',
                    modal: true
                });
            });
    }

    generateFundDeposit() {
        $.fancybox.close();
        if (this.objFundDepositRequestModel.EncryptedFundDepositTypeId == '0') {
            this.toastrService.clear();
            this.toastrService.error('Please select deposit fund type!');
            return false;
        }
        if (this.objFundDepositRequestModel.Amount == 0 || this.objFundDepositRequestModel.Amount == null) {
            this.toastrService.clear();
            this.toastrService.error('Please enter valid amount!');
            return false;
        }
        if (this.objFundDepositRequestModel.Description == null ||
            this.objFundDepositRequestModel.Description.trim() == '') {
            this.toastrService.clear();
            this.toastrService.error('Please enter description!');
            return false;
        }
        if (this.objFundDepositRequestModel.EncryptedPaymentMethodId == '') {
            this.toastrService.clear();
            this.toastrService.error('Please select payment method!');
            return false;
        }

        if (this.objFundDepositRequestModel.EncryptedPaymentMethodId == 'RK8uWJ3f/AE='
            && this.MaxPaypalDepositLimitUSD < this.objFundDepositRequestModel.Amount &&
            this.objFundDepositRequestModel.EncryptedCurrencyId == '7f7tOIA7rjo=') {
            this.toastrService.clear();
            this.toastrService.error('Exceeding maximum paypal deposit limit.');
            return false;
        }

        if (this.objFundDepositRequestModel.EncryptedPaymentMethodId == 'RK8uWJ3f/AE='
            && this.MaxPaypalDepositLimitJPY < this.objFundDepositRequestModel.Amount &&
            this.objFundDepositRequestModel.EncryptedCurrencyId == 'xEOualYVSR0=') {
            this.toastrService.clear();
            this.toastrService.error('Exceeding maximum paypal deposit limit.');
            return false;
        }
        if ((!this.objFundDepositRequestModel.OrderDetailId ||
            this.objFundDepositRequestModel.OrderDetailId == null)
            && this.objFundDepositRequestModel.EncryptedPaymentMethodId == '30p4VY07014=') {
           this.toastrService.clear();
           this.toastrService.error('Please select order for LC!');
           return false;
       }

        this.dataService.generateFundDeposit(this.objFundDepositRequestModel)
            .subscribe(res => {
                this.paymentUrl = res.Data;
                this.getPaymentHistory();
                $.fancybox.open({
                    src: '#payment_link',
                    modal: true
                });
            });
        this.objFundDepositRequestModel = new FundDepositRequestModel();
        this.objFundDepositRequestModel.Description = '';
        this.objFundDepositRequestModel.EncryptedCurrencyId = this.selectedCurrency;
        this.objFundDepositRequestModel.EncryptedFundDepositTypeId = '0';
        this.objFundDepositRequestModel.EncryptedPaymentMethodId = '';
        this.objFundDepositRequestModel.Amount = null;
        this.objFundDepositRequestModel.OrderDetailId = 0;
    }

    // link copy show message successfull
    copylink() {
        this.toastrService.clear();
        this.toastrService.success("Link copied to clipboard")
    }

    openurl(url) {
        window.open(url, 'blank')
    }

    showOrderList(key){
        this.paymentMethord.payThrough = key
    }
}
