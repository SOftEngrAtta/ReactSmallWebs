import {Component,OnInit,Input} from '@angular/core';
import {Router,ActivatedRoute,Params} from '@angular/router';

// services
import { StorageService } from './../../Services/storage.service';
import { CustomerInformation } from '../../models/customerInformation';
import { HelperService } from '../../Services/helper.service';
import { AuthService } from '../../Services/auth.service';
// ----

// models
import { ChangePassword } from '../../models/changespassword';


declare var $;
declare var moment: any;

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  @Input() set CustomerInformation(value: CustomerInformation) {
    if (value) {
      this.customerInformation = value;
      if(value.japantime){
        this.customerInformation.japantime = moment(value.japantime).format('h:mm a')    
      }

      if (this.customerInformation && this.customerInformation['Id']) {
        this.checkcustomerid = this.customerInformation['Id'];
      }
      this.storageservice.setEncrypted('customerInformation', value);
    }
  }

  public customerInformation: CustomerInformation;

  public queryparam;

  public passwordChange: ChangePassword = new ChangePassword();

  public isCustomerLogin: boolean = false;
  public bidCustomer: boolean = false;

  public checkcustomerid = 0;

  constructor(private router: Router,
    private storageservice: StorageService,
    private authservice: AuthService ,
    private helpherservice : HelperService
  ) { }

  ngOnInit() {

    $.fn.jPushMenu = function (customOptions) {
      var o = $.extend({}, $.fn.jPushMenu.defaultOptions, customOptions);

      $('body').addClass(o.pushBodyClass);

      // Add class to toggler
      $(this).addClass('jPushMenuBtn');

      $(this).click(function (e) {
        e.stopPropagation();

        var target = ''
          , push_direction = '';

        // Determine menu and push direction
        if ($(this).is('.' + o.showLeftClass)) {
          target = '.cbp-spmenu-left';
          push_direction = 'toright';
        } else if ($(this).is('.' + o.showRightClass)) {
          target = '.cbp-spmenu-right';
          push_direction = 'toleft';
        } else if ($(this).is('.' + o.showTopClass)) {
          target = '.cbp-spmenu-top';
        } else if ($(this).is('.' + o.showBottomClass)) {
          target = '.cbp-spmenu-bottom';
        }

        if (target == '') {
          return;
        }

        $(this).toggleClass(o.activeClass);
        $(target).toggleClass(o.menuOpenClass);

        if ($(this).is('.' + o.pushBodyClass) && push_direction != '') {
          $('body').toggleClass(o.pushBodyClass + '-' + push_direction);
        }

        // Disable all other buttons
        $('.jPushMenuBtn').not($(this)).toggleClass('disabled');

        return;
      });

      var jPushMenu = {
        close: function (o) {
          $('.jPushMenuBtn,body,.cbp-spmenu').removeClass('disabled ' + o.activeClass + ' ' + o.menuOpenClass + ' ' + o.pushBodyClass + '-toleft ' + o.pushBodyClass + '-toright');
        }
      }

      // Close menu on clicking outside menu
      if (o.closeOnClickOutside) {
        $(document).click(function () {
          jPushMenu.close(o);
        });
      }

      // Close menu on clicking menu link
      if (o.closeOnClickLink) {
        $('.cbp-spmenu a').on('click', function () {
          jPushMenu.close(o);
        });
      }
    }

    $.fn.jPushMenu.defaultOptions = {
      pushBodyClass: 'push-body',
      showLeftClass: 'menu-left',
      showRightClass: 'menu-right',
      showTopClass: 'menu-top',
      showBottomClass: 'menu-bottom',
      activeClass: 'menu-active',
      menuOpenClass: 'menu-open',
      closeOnClickOutside: true,
      closeOnClickLink: true
    };

    $('.toggle-menu').jPushMenu();

    this.queryparam = this.storageservice.get('agent_query');
    this.customerInformation = this.storageservice.getDecrypted('customerInformation');

    let loginInCustomer = this.storageservice.get('customerlogin');
    let bidcustomer = this.storageservice.getDecrypted('_a');

    if (loginInCustomer) {
      this.isCustomerLogin = true;
    }

    if (bidcustomer == 'true') {
      this.bidCustomer = true;
    } else {
      this.bidCustomer = false
    }


    setInterval(() => {

      let bidcustomer = this.storageservice.getDecrypted('_a');
      if (bidcustomer == 'true') {
        this.bidCustomer = true;
      } else {
        this.bidCustomer = false;
      }

      this.queryparam = this.storageservice.get('agent_query');
      this.customerInformation = this.storageservice.getDecrypted('customerInformation');
      if (this.checkcustomerid && this.customerInformation && this.customerInformation['Id'] && this.checkcustomerid != this.customerInformation['Id']) {
        this.checkcustomerid = this.customerInformation['Id'];
        this.router.navigate(['/dashboard'], { queryParams: { data: this.queryparam } })
        window.location.reload();
      }
    }, 2000)

  }



  openProfile() {
    this.router.navigate(['/user-profile'] , {queryParams : {id:this.customerInformation.CustomerTypeId}});
  }

  // logout functionality 
  logoutUser() {
    let agentcode = this.storageservice.get('agentcode');
    this.storageservice.clear();
    if (agentcode) {
      this.router.navigate(['/logout-screen'])
    } else {
      this.router.navigate(['/login']);
    }

  }

  //changePassword
  changePassword() {

    if (!this.passwordChange.CurrentPassword) { this.helpherservice.displayMsg('error','Please enter current password'); return false;}
    if (!this.passwordChange.NewPassword) { this.helpherservice.displayMsg('error','Please enter new password');return false;}
    if (!this.passwordChange.VerifyNewPassword) { this.helpherservice.displayMsg('error','Please enter verify password'); return false;}

    if (this.passwordChange.NewPassword && this.passwordChange.VerifyNewPassword) {

      if (this.passwordChange.NewPassword.length <= 7) {
        this.helpherservice.displayMsg('error','New password length must be equal or greater than eight characters');
        return false;
      }

      if (this.passwordChange.NewPassword != this.passwordChange.VerifyNewPassword) {
        this.helpherservice.displayMsg('error','New password and verify password are not correct');
        return false;
      }

    }

    let data = {
      OldPassword: this.passwordChange.CurrentPassword,
      NewPassword: this.passwordChange.NewPassword,
      ReTypePassword: this.passwordChange.VerifyNewPassword
    }
    this.authservice
      ._changespassowrd(data)
      .subscribe(res => {
        let _data_ = res;
        if (_data_.IsSuccess) {
          this.helpherservice.displayMsg('success','Password updated successfully');
          this.passwordChange = new ChangePassword();
          $.fancybox.close();
        }
        if (!_data_.IsSuccess) {
          if (_data_.Errors && _data_.Errors.length) {
            this.helpherservice.displayMsg('error',_data_.Errors[0]);
          }
        }

      })

  }

  // open demo functionality 
  opendemo(){ window.open('https://area.autorod.com/demo/' , '_blank') }

}
