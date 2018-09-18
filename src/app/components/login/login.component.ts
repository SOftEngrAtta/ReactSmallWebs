import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../Services/auth.service';
import { HelperService } from '../../Services/helper.service';
import { StorageService } from './../../Services/storage.service';
import { Router, ActivatedRoute,Params } from '@angular/router';

declare var $;

@Component({
  selector: 'app-home',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class Login implements OnInit {


  public userLogin = {
    email: '',
    password: ''
  }

  public emailPattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  public successResult: any;

  constructor(private authservice: AuthService,
    private helpherservice : HelperService,
    private storageservices: StorageService,
    private router: Router
  ) { }

  ngOnInit() {
    $('body').addClass('main_login');
  }

  // login functionality 
  login(code) {
    
    var entercode = code.keyCode ? code.keyCode : 0;
    if(code == 'click' || entercode == 13){
      if (!this.userLogin.email) { this.helpherservice.displayMsg('error','Please enter email address');return false;}

      if (!this.emailPattern.test(String(this.userLogin.email).toLowerCase())) {
        this.helpherservice.displayMsg('error','Please enter valid email address');
        return false;
      }

      if (!this.userLogin.password) {
        this.helpherservice.displayMsg('error','Please enter password');
        return false;
      }

      if (this.userLogin.password && this.userLogin.password.length < 8) {
        this.helpherservice.displayMsg('error' , 'Password length should be greater than 7 digits');
        return false;
      }

      
        this.authservice.login(this.userLogin)
        .subscribe(res => {
          this.successResult = res
          if (this.successResult.IsSuccess) {
            var userData = this.successResult.Data.CustomerInformation;
            this.helpherservice.displayMsg('success','Login Successfully');
            this.storageservices.set('customerlogin' , true);
            this.storageservices.setEncrypted('token' , userData);
            this.userLogin = {
              email: null,
              password: null
            }
            this.router.navigate(['dashboard'])
          }
          if(this.successResult.IsSuccess == false){this.helpherservice.displayMsg('error',this.successResult.Errors[0]);}
        });
    }

  }
}
