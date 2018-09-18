import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { AppConfig } from '../app.config';

@Injectable()
export class AuthService {
    public apiBaseUrl : any ;
    constructor(
        private apiService: ApiService,
        private config : AppConfig
    ) { this.apiBaseUrl = this.config.getEnv('env'); }

    /**
     * 
     * @param data // {email : string , password : password }
     * @param data.email // user email address
     * @param data.password // user password 
     */
    login(data) {
        return this.apiService.post(this.apiBaseUrl.chjPort850+'Authentication/CustomerLogin', data)
    }

    /**
     * 
     * @param data {Object}
     * @param data.OldPassword 
     * @param data.NewPassword
     * @param data.ReTypePassword
     */ 
    _changespassowrd(data){
        return this.apiService.post(this.apiBaseUrl.chjPort850+'Authentication/ResetPassword' , data);
    }


    /**
     * @param data {Object}
     * @param data.Email // email address
     */ 
    forgetpassword(data){
        let _data_ = {
            email : data.Email
        }
        return this.apiService.post(this.apiBaseUrl.chjPort850+'Authentication/ForgetPassword', _data_);
    }

    /**
     * 
     * @param token // string
     */ 
    verifytoken(token){
        return this.apiService.get(this.apiBaseUrl.chjPort850+'Authentication/ValidateUrl?Url='+token)
    }
}
