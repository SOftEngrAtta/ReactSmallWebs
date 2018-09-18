import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { AppConfig } from '../app.config';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class SpecificQuotation {
    public apiBaseUrl : any ;
    constructor(
        private apiService: ApiService,
        private config: AppConfig,
        private http: HttpClient
    ) { this.apiBaseUrl = this.config.getEnv('env'); }


    /**
     * 
     * @param id // quotation id  
     */ 

    getquotationdetail(id , currency){
        var queryparam = "Quotation/GetQuotationById?QuotationId="+id+'&Currency='+currency;
        return this.apiService.get(this.apiBaseUrl.chjPort850+queryparam);
    }

    /**
     * 
     * @param id 
     */ 
    bookorder(id){
        var queryparam = 'Quotation/BookQuotation?quotationDetailId='+id;
        return this.apiService.post(this.apiBaseUrl.chjPort850+queryparam , '');
    }


    /**
     * 
     * @param data {Object}
     */ 
    inquiredetail(data){
        return this.apiService.post(this.apiBaseUrl.chjPort850+'Inquiry/AddInquiry',data);
    }

    StockFilter(data:any){
        return this.apiService.post(this.apiBaseUrl.chjPortADMIN+'Search/Filter',data)
    }

}
