import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { AppConfig } from '../app.config';


@Injectable()
export class DashboardServices {
    public apiBaseUrl : any ;
    public pricing_v2_key : any ;
    constructor(
        private apiService: ApiService,
        private config : AppConfig
    ) { this.apiBaseUrl = this.config.getEnv('env');this.pricing_v2_key = this.config.getV2('env');}

    // get dashboard detail 
    getDashboardDetail():any{
        return this.apiService.get(this.apiBaseUrl.chjPort850+'Dashboard/GetAllDashboardDetailsV2')    
    }
    
    getShipmentDetail(packageId: number){
        return this.apiService.get(this.apiBaseUrl.chjPort8051 + 'FetchData/GetPortWithCountryAndShipmentTypeMetaData?key='+this.pricing_v2_key.key+'&packageid='+ packageId)
	}
		
    getagentdetail(param){
        return this.apiService.get(this.apiBaseUrl.chjPort850+"Authentication/AgentSignup?Url="+param)
    }

}
