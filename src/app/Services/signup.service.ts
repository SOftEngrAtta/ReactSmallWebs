import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { AppConfig } from '../app.config';
import { Signup } from '../models/signup';

@Injectable()
export class SignupService {
	public apiBaseUrl : any ;
	constructor(
		private apiService: ApiService,
		private config: AppConfig,
	) { this.apiBaseUrl = this.config.getEnv('env'); }

	customerSignup(model: Signup) {
		return this.apiService.post(this.apiBaseUrl.chjPort850 + 'Authentication/CustomerSignup', model);
	}

	getCountry() {
		return this.apiService.get("http://freegeoip.net/json");
	}

}
