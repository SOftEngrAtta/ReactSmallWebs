import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { AppConfig } from '../app.config';
import { QuotationPricing } from '../models/quotationPricing';

@Injectable()
export class BidPriceService {
	public apiBaseUrl: any;
	public pricing_v2_key : any ;
	constructor(
		private apiService: ApiService,
		private config: AppConfig
	) { this.apiBaseUrl = this.config.getEnv('env'); this.pricing_v2_key = this.config.getV2('env');}

	getMultiplePlanByData(model: QuotationPricing) {
		model['clientkey'] = this.pricing_v2_key['key'];
		return this.apiService.post(this.apiBaseUrl.chjPort8051 + "QuotationInvoice/ManageQuotationForMultiplePlanByData", model)
	}

	addToQuotation(model: any) {
		return this.apiService.post(this.apiBaseUrl.chjPort850 + "Quotation/InsertQuotation?QuotationId", model);
	}

	getAllCurrency() {
		return this.apiService.get(this.apiBaseUrl.chjPort8051 + "FetchData/GetAllcurrency")
	}

	updateQuotation(model: any) {
		return this.apiService.post(this.apiBaseUrl.chjPort850 + "Quotation/ChangeBidPrice", model);
	}

	getCnfBasedQuotation(model: QuotationPricing) {
		model['ClientKey'] = this.pricing_v2_key['key'];
		return this.apiService.post(this.apiBaseUrl.chjPort8051 + "QuotationInvoice/ManageQuotationWithFixedAmount", model);
	}
}
