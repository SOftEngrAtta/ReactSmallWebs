import { Component, OnInit} from '@angular/core';
import { Router, ActivatedRoute, Params} from '@angular/router';

import { DataService } from './../../Services/data.service';
import { HelperService } from '../../Services/helper.service';
import { InvoiceServices } from '../../Services/invoice.services';
import { StorageService } from '../../Services/storage.service';

import { Invoice } from '../../models/invoice';
import { membershipemail } from '../../models/membershipemail';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
declare var $;

@Component({
    selector: 'app-dashboard',
    templateUrl: './membership-invoice.component.html',
    styleUrls: ['./membership-invoice.component.css']
})
export class MembershipInvoice implements OnInit {
    OrderInvoiceId: string;
    InvoicePath: string;
    invoicedetails = new Invoice();
    EmailData = new membershipemail();
    isDataLoad: boolean = false;
    isCustomerLogin : boolean = false;
    constructor(private router: Router
        , private dataService: DataService
        , private invoiceService: InvoiceServices
        , private spinnerService: Ng4LoadingSpinnerService
        , private route: ActivatedRoute
        , private helpherservice : HelperService
        , private storageService: StorageService
    ) { }

    ngOnInit() {
        this.OrderInvoiceId = this.route.snapshot.queryParams['id'];
        $('body').removeClass('main_login');
        this.GetMemberShipInvoiceData(this.OrderInvoiceId);

        let customerlogin = this.storageService.get('customerlogin');
        
        if(customerlogin){
            this.isCustomerLogin = true;
        }

    }

    viewMemverShip(mode) {this.router.navigate(['/membership', mode]);}

    GetMemberShipInvoiceData(OrderInvoiceId) {
        this.spinnerService.show();
        this.dataService.getMembershipInvoiceData(OrderInvoiceId)
            .subscribe(res => {                
                if (res.IsSuccess) {

                    this.invoicedetails = res.Data;
                    this.invoicedetails.CustomerDetail = res.Data.CustomerDetail;
                    this.invoicedetails.BankDetail = res.Data.BankDetail;
                    this.invoicedetails.InvoiceNumber = res.Data.InvoiceNumber;
                    this.invoicedetails.CreationDate = res.Data.CreationDate;
                    this.invoicedetails.MembershipUrlDetail = res.Data.MembershipUrlDetail;                    

                    if (!this.isCustomerLogin)
                    {
                        if (this.invoicedetails.MembershipUrlDetail.DoExist)
                        {
                            this.InvoicePath = this.invoicedetails.MembershipUrlDetail.DocPath;
                            window.open(this.InvoicePath , "_blank");                            
                        }
                        else
                        {
                            setTimeout(() => {
                                this.GenerateHTMLtoPDF(res.Data.OrderInvId);
                            }, 1000);
                        }
                        
                    }
                    
                }
            }
            );
    }

    SendEmailToCustomer(){
        this.EmailData.OrderInvoiceId = this.OrderInvoiceId;
        this.dataService.sendEmailToCustomer(this.EmailData)
        .subscribe(res => {
                if (res) {
                    this.helpherservice.displayMsg('error','Email Has been sent to customer');
                }
            }
        );
    }

    GenerateHTMLtoPDF(OrderInvoiceId) {
        $("#btnGenerate").text('Downloading...');
        $("#btnGenerate").prop('disabled', true)

        let InvoiceHTMLtoPDFRequest: any = {};
        let pdfHTML: any = '<html class="no-js" lang=""> <head>'
            + '<meta charset="utf-8">'
            + '<meta http-equiv="x-ua-compatible" content="ie=edge">'
            + '<title>Auction Deposit Invoice</title>'
            + '<meta name="viewport" content="width=device-width, initial-scale=1">'
            + '<link href="https://fonts.googleapis.com/css?family=Open+Sans:300,400,400i,600,600i,700,800" rel="stylesheet">'
            + '<link rel="stylesheet" href="https://www.autorod.com/Assets/css/style-invoice.css">'
            + '<link rel="stylesheet" href="https://www.autorod.com/Assets/css/membership-style.css">'
            + '<link rel="stylesheet" href="https://www.autorod.com/Assets/css/normalize.css">'
            // + '<style> .cont-uper-lft .top-lft {font-weight: 700 !important;font-size: 12px !important;vertical-align: top !important;} </style>'
            + '</head>';
        pdfHTML += $(".cont-pdfHTML").html();
        pdfHTML += '<script src="https://www.autorod.com/Assets/js/modernizr-3.5.0.min.js"> '
                 + '<script src="https://www.autorod.com/Assets/js/jquery-3.2.1.min.js">  </html>';

        InvoiceHTMLtoPDFRequest.GridHtml = pdfHTML;
        InvoiceHTMLtoPDFRequest.OrderInvoiceID = OrderInvoiceId;
        InvoiceHTMLtoPDFRequest.DocumentTypID = 25;
        
        this.invoiceService.InvoiceHTMLtoPDF(InvoiceHTMLtoPDFRequest)
            .subscribe(res => {
                let path: any = res;
                this.InvoicePath = path;
                $("#btnGenerate").text('Download');
                window.open(path, "_blank");
                $("#btnGenerate").prop('disabled', false)

                this.spinnerService.hide();
            })
       
    }
    OpenInvoiceInNewTab(){window.open(this.InvoicePath, "_blank");}

}
