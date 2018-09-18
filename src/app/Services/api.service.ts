import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { Router } from '@angular/router';
import { ToastrService } from './toastr.service';
import { StorageService } from './storage.service';
import { retry, tap, finalize } from 'rxjs/operators';
import { Result } from '../models/result';
import { Observable } from 'rxjs/Observable';
import { Token } from '../models/token';

@Injectable()
export class ApiService {

  token = new Token();
  constructor(
    private httpClient: HttpClient,
    private storageService: StorageService,
    private toastrService: ToastrService,
    private router: Router,
    private spinnerService: Ng4LoadingSpinnerService
  ) { }


   // Get
  get(url): Observable<Result>{
    // this.spinnerService.show();
    this.toastrService.clear();
    this.toastrService.success("Please wait...");
		this.token = this.storageService.getDecrypted('token');
    let headers = new HttpHeaders();
    headers = headers.set('content-type', 'application/jsonp; charset=utf-8');
    if(this.token != null){
			headers = headers.set('Authorization', 'Bearer ' + this.token.AccessToken);
    }
		return this.httpClient.get<Result>(url, {headers: headers})
		.pipe(
      tap( // Log the result or error
        data => {
          this.toastrService.clear();
					// this.spinnerService.hide();
        },
        error => {
          this.spinnerService.hide();
					if(error.status == 401){
            this.storageService.clear();
            this.toastrService.clear();
            this.toastrService.error(error.statusText);
            this.router.navigate(['/login']);
            return
          }
          this.toastrService.clear();
          this.toastrService.error("Something went wrong. Please try again later!");
        }
			),
			finalize(() => {
				setTimeout(() => {
					this.spinnerService.hide();
				}, 500);
			})
    )
  }
  
  //Post
  post(url, model:any): Observable<Result>{
    // this.spinnerService.show();
    this.toastrService.clear();
    this.toastrService.success("Please wait...");
    this.token = this.storageService.getDecrypted('token');
    let headers = new HttpHeaders();
    headers = headers.set('content-type', 'application/json; charset=utf-8');
    if(this.token != null){
      headers = headers.set('Authorization', 'Bearer ' + this.token.AccessToken);
    }
    return this.httpClient.post<Result>( url, model, {headers: headers})
    .pipe(
      retry(3), // retry a failed request up to 3 times
      tap( // Log the result or error
        data => {
          this.toastrService.clear();
					// this.spinnerService.hide();
				},
        error => {
          this.spinnerService.hide();
          if(error.status == 401){
            this.toastrService.error(error.statusText);
            this.router.navigate(['/login']);
            return
          }
          if(error.error && error.error.Errors && error.error.Errors.length){
            this.toastrService.error(error.error.Errors[0]);
          }else{
            this.toastrService.error("Something went wrong. Please try again later!");        
          }
        }
			),
			finalize(() => {
				setTimeout(() => {
					this.spinnerService.hide();
				}, 500);
			})
    )
  }

}
