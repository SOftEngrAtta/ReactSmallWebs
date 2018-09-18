// modules
import {Component , OnInit} from '@angular/core';

// services
import { InvoiceServices } from '../../Services/invoice.services';
import { StorageService } from '../../Services/storage.service';
import { HelperService } from '../../Services/helper.service';

import { InvoiceEmailResponse } from '../../models/InvoiceEmailResponse';

declare var $;

@Component({
    selector: 'app-incomplete-order',
    templateUrl: './invoicehistory.component.html',
    styleUrls: ['./invoicehistory.component.css']
})
export class InvoiceHistory implements OnInit {

    public invoices : Array<any> = [];
    invoiceResponseVM = new InvoiceEmailResponse();
    public isCustomerLogin : boolean = false ;

    constructor(private invoiceservices : InvoiceServices,
    private storageservice : StorageService,
    private helpherservice : HelperService
    ){} 
    ngOnInit(){
        $('body').removeClass('main_login');
        let loginInCustomer = this.storageservice.get('customerlogin');
        if(loginInCustomer){
          this.isCustomerLogin = true;
        }
        this.getInvoices();
        
    }
    
    getInvoices(){
        this.invoiceservices
        .getinvoiceshistory()
        .subscribe(res=>{
            let _data_ = res;
            if(_data_.IsSuccess){
                this.invoices = _data_.Data;
            }
        })
    }

    openpdf(url){ window.open(url , '_blank'); }

    sendEmail(EncrptdOrderdetailId:any){
    this.invoiceResponseVM.OrderInvoiceId = EncrptdOrderdetailId;
    this.invoiceservices.SendEmail(this.invoiceResponseVM)
      .subscribe( res => {
          let IsSent : any  = res;
          if(IsSent) this.helpherservice.displayMsg('success','Email successfully sent.');
          else this.helpherservice.displayMsg('error','Something went wrong.');
          
      });
    }

}
