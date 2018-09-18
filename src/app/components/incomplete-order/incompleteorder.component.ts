// Importing Internal Modules
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

// Importing Models
import { IncompleteOrders } from './../../models/incompleteOrder';

// Importing Services
import { DataService } from '../../Services/data.service';
import { HelperService } from '../../Services/helper.service';
import { StorageService } from '../../Services/storage.service';

// import { setTimeout } from 'timers';
declare var $;

@Component({
    selector: 'app-incomplete-order',
    templateUrl: './incompleteorder.component.html',
    styleUrls: ['./incompleteorder.component.css']
})
export class IncompleteOrder implements OnInit {
    objIncompleteOrders: Array<IncompleteOrders> = new Array<IncompleteOrders>();
    public isCustomerLogin = false;


    constructor(private router: Router,
        private dataService: DataService,
        private helperservice: HelperService,
        private storageservice: StorageService,) { }

    ngOnInit() {
        $('body').removeClass('main_login');
        this.getIncompleteOrders();
        let is_bit_allow = this.storageservice.getDecrypted('_a');
        let customerlogin = this.storageservice.get('customerlogin')
        if (customerlogin && is_bit_allow == 'true') {
            this.isCustomerLogin = true;
        }

        if (customerlogin && is_bit_allow != 'true') {
            this.router.navigate(['/dashboard']);
        }

    }

    getIncompleteOrders() {
        this.dataService.getIncompleteOrders()
            .subscribe(res => {
                this.objIncompleteOrders = res.Data;
                setTimeout(() => {
                    this.helperservice.callaccordingtoggle()
                }, 200)
            });
    }

    GenerateAuctionDepositInvoice() {
        var checkedValues = $('.chkOrderDetail:checkbox:checked').map(function () {
            return this.value;
        }).get();

        if (checkedValues.length) {
            var orderDetailId = checkedValues.toString();
            window.open("deposit-invoice?data=" + orderDetailId, "_blank")
        }
        else {this.helperservice.displayMsg('error','Please select atleast one order to make invoice.');}
    }

    numberEven(num){
        let result =  num % 2;
        return (result == 0)?true : false;
    }

    numberOdd(num){
        let result =  num % 2;
        return (result == 1)?true : false;
    }

}



