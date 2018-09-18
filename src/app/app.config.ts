import { Inject, Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Rx';


@Injectable()
export class AppConfig {

    private config: Object = null;
    private env:    Object = null;
    private v2Key: Object = null;

    constructor(private http: Http) {}

    /**
     * Use to get the data found in the second file (config file)
     */
    public getConfig(key: any) {
        return this.config[key];
    }

    /**
     * Use to get the data found in the first file (env file)
     */
    public getEnv(key: any) {
        return this.env;
    }

    /**
     * pricing version V2
     */ 
    public getV2(key: any ){
        return this.v2Key;
    }

    /**
     * This method:
     *   a) Loads "env.json" to get the current working environment (e.g.: 'production', 'development')
     *   b) Loads "config.[env].json" to get all env's variables (e.g.: 'config.development.json')
     */
    public load() {
        return new Promise((resolve, reject) => {
            this.http.get('/assets/env.json').map( res => res.json() ).catch((error: any):any => {
                resolve(true);
                return Observable.throw(error.json().error || 'Server error');
            }).subscribe( (envResponse) => {
                this.env = envResponse;
                let request:any = null;
                let _v2_key:any = null;
                switch (envResponse.env) {
                    case 'production': {
                        request = this.http.get('/assets/config.' + envResponse.env + '.json');
                        _v2_key = this.http.get('/assets/v2pricing.' + envResponse.env + '.json')
                    } break;

                    case 'development': {
                        request = this.http.get('/assets/config.' + envResponse.env + '.json');
                        _v2_key = this.http.get('/assets/v2pricing.' + envResponse.env + '.json')
                    } break;

                    case 'default': {
                        resolve(true);
                    } break;
                }
                if (request) {
                    request
                        .map( res => res.json() )
                        .catch((error: any) => {
                            resolve(error);
                            return Observable.throw(error.json().error || 'Server error');
                        })
                        .subscribe((responseData) => {
                            this.config = responseData;
                            this.env = (envResponse.env == "production")?this.config['chj_pro_url']:this.config['chj_dev_url'];
                            this.v2Key = (envResponse.env == "production")?this.config['pro_v2_key']:this.config['dev_v2_key'];
                            resolve(true);
                        });
                } else {
                    resolve(true);
                }

                
            });

        });
    }
}