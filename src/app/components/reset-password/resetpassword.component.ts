// models

import { 
    Component, 
    OnInit 
} from '@angular/core';
import {
  Router,
  ActivatedRoute,
  Params
} from '@angular/router';
// end


// services
import {
  AuthService
} from '../../Services/auth.service';
import {
  StorageService
} from '../../Services/storage.service';
import {
  ToastrService
} from '../../Services/toastr.service';

// end

@Component({
  selector: 'app-home',
  templateUrl: './resetpassword.component.html',
  styleUrls: ['./resetpassword.component.css']
})
export class ResetPassword implements OnInit {

  public resetpassword = {
    newpassword : '',
    confirmpassword : ''
  }

  public token : string ; 

  constructor(private activatedRoute: ActivatedRoute , 
      private authservice : AuthService , 
      private toastrservice : ToastrService ,
      private storageservice : StorageService ,
      private route : Router ) { }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(params => {
      this.token = params.token;
      this.authservice
      .verifytoken(this.token)
      .subscribe(res=>{
        if(res.IsSuccess){
          this.storageservice.setEncrypted('token' , {AccessToken : this.token})
        }else{
          this.route.navigate(['/login'])
        }
        
      })
    })
  }


  changepassword(){
    if(!this.resetpassword.newpassword){
      this.toastrservice.clear();
      this.toastrservice.error('Please enter new password');
      return false;
    }
    if(this.resetpassword.newpassword.length < 8) {
      this.toastrservice.clear();
      this.toastrservice.error('New password length should be greater than 7 digits');
      return false;
    }
    if(!this.resetpassword.confirmpassword){
      this.toastrservice.clear();
      this.toastrservice.error('Please enter verify password');
      return false;
    }
    if(this.resetpassword.newpassword != this.resetpassword.confirmpassword){
      this.toastrservice.clear();
      this.toastrservice.error('New password and confirm password are not correct');
      return false;
    }

    let _data_ = {
      NewPassword : this.resetpassword.newpassword ,
      ReTypePassword : this.resetpassword.confirmpassword
    }
    this.authservice
    ._changespassowrd(_data_)
    .subscribe(res=>{
      if(res.IsSuccess){
        this.toastrservice.clear();
        this.toastrservice.success('Password has been updated successfully');
        this.route.navigate(['/login'])
      }
    })

  }

}
