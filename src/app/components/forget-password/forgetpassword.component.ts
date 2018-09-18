// models
import { Component,OnInit } from '@angular/core';


// services
import { AuthService } from '../../Services/auth.service';
import { HelperService } from '../../Services/helper.service';
import { ResetPassword } from '../reset-password/resetpassword.component';

// end


// include jquery
declare var $;

@Component({
    selector: 'app-home',
    templateUrl: './forgetpassword.component.html',
    styleUrls: ['./forgetpassword.component.css']
})
export class ForgetPassword implements OnInit {
    
    resetpassword : any = {Email : ''}
    
    public emailPattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    constructor(private authservice : AuthService , private helpherservice : HelperService) { }

    ngOnInit() {}

    resertPassword(){
        if(!this.resetpassword.Email){
            this.helpherservice.displayMsg('error','Please enter email address');
            return false;
        }

        if(!this.emailPattern.test(this.resetpassword.Email)){
            this.helpherservice.displayMsg('error','Please enter valid format email address');
            return false;
        }

        
        this.authservice
        .forgetpassword(this.resetpassword)
        .subscribe(res=>{
            if(res.IsSuccess){
                $.fancybox.open({
                    src: '#pass_reset_con',
                    type: 'inline',
                });
            }else{ this.helpherservice.displayMsg('error' ,'Bad Request')}
        })

    }


}
