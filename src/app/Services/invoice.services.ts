import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { AppConfig } from '../app.config';

@Injectable()
export class InvoiceServices {
    public apiBaseUrl : any ;
    public pricing_v2_key : any ;
    constructor(
        private apiService: ApiService,
        private config: AppConfig
    ) { this.apiBaseUrl = this.config.getEnv('env');this.pricing_v2_key = this.config.getV2('env');}

    // generate invoice
    getInvoiceDetail(){
        return this.apiService.get(this.apiBaseUrl.chjPort850+'Invoice/AuctionDepositInvoiceDetail')
    }
    
    getShipmentDetail(packageId: number){
        return this.apiService.get(this.apiBaseUrl.chjPort8051 + 'FetchData/GetPortWithCountryAndShipmentTypeMetaData?key='+this.pricing_v2_key['key']+'&packageid='+ packageId)
	}
		
    getagentdetail(param){
        return this.apiService.get(this.apiBaseUrl.chjPort850+"Authentication/AgentSignup?Url="+param)
    }

    UpdateAuctionDepositInvoiceDetail(depositInvoice: any){
        return this.apiService.post(this.apiBaseUrl.chjPort850+'Invoice/UpdateAuctionDepositInvoiceDetail',depositInvoice)
    }

    InvoiceHTMLtoPDF(InvoiceHTMLtoPDFRequest: any){
        return this.apiService.post(this.apiBaseUrl.chjPort850+'Invoice/InvoiceHTMLtoPDF/', InvoiceHTMLtoPDFRequest);
        // return this.apiService.post(this.apiBaseUrl.chjPort850+'Invoice/InvoiceHTMLtoPDF',InvoiceHTMLtoPDFRequest)
    }

    // get invoice history functionality 
    getinvoiceshistory(){
        return this.apiService.get(this.apiBaseUrl.chjPort850+'Invoice/InvoiceHistory')        
    }

    get_generated_AuctionDepositInvoice(OrderInvoiceDetailId:any){
        return this.apiService.get(this.apiBaseUrl.chjPort850+'Invoice/Generate_AuctionDepositInvoiceDetail?data='+OrderInvoiceDetailId)
    }

    Update_generated_AuctionDepositInvoice(UnitDetailsModel:any){
        return this.apiService.post(this.apiBaseUrl.chjPort850+'Invoice/Update_GeneratedAuctionDepositInvoice',UnitDetailsModel)
    }

    SendEmail(InvoiceEmailResponse){
        return this.apiService.post(this.apiBaseUrl.chjPort850+'Invoice/SendEmailInvoice',InvoiceEmailResponse)
    }

    Get_CustomerAddresses(){
        return this.apiService.get(this.apiBaseUrl.chjPort850+'Invoice/GetCustomerAddressList')
    }

}
