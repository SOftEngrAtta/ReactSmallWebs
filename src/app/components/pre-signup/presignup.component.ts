import {
	Component,
	OnInit
} from '@angular/core';
import {
	window
} from 'rxjs/operators/window';
import {
	Router,
	ActivatedRoute,
	Params
} from '@angular/router';

// services 
import {
	AuthService
} from '../../Services/auth.service';
import {
	ToastrService
} from '../../Services/toastr.service';
import {
	StorageService
} from './../../Services/storage.service';
import {
	SignupService
} from '../../Services/signup.service';
//---

declare var $;

@Component({
	selector: 'app-presignup',
	templateUrl: './presignup.component.html',
	styleUrls: ['./presignup.component.css']
})
export class PreSignUp implements OnInit {

	public signupdata: any = {
		FullName: null,
		Email: null,
		ContactNo: null,
		DialCode: null,
		CountryCode: "us",
		customerTypeId: 1,
		Agentcode : null,
		Id : 0 ,
		ReferrerURL : "http://dashboard.autorod.com?source=agentsignup",
		SignUpThroughCode : 4,
	}

	public customerTypes = [{ Id: 1, Title: 'Individual', Selected: false }, { Id: 2, Title: 'Dealer', Selected: false }]

	public presignup: boolean = false;

	public emailregx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

	public customerinformation : any ;

	public displaypresignbtn : boolean = false;

	public selectedmembership : any ;

	constructor(private toasterservice: ToastrService , 
		private authservice : SignupService ,
		private storageservice : StorageService,
		private router : Router) { }

	ngOnInit() {
		$('body').addClass('main_login');
		this.storageservice.remove('agent_query');
		this.customerinformation = this.storageservice.getDecrypted('presigncustomer');
		let statuscode = this.storageservice.get('statusid');
		let user_id = this.storageservice.get('user_id');

		let agent_type = this.storageservice.get('agent_type');
		
		if(agent_type == 12){
			this.signupdata.ReferrerURL = 'http://dashboard.autorod.com?source=chatsignup'
		}

		if(user_id){
			this.signupdata.Id = user_id;
		}
		
		this.signupdata.Agentcode = this.storageservice.get('agentcode');



		if(this.customerinformation && this.customerinformation.FullName){
			this.signupdata.FullName = this.customerinformation.FullName;
			this.signupdata.CountryCode = this.customerinformation.CountryCode;
			this.signupdata.ContactNo = this.customerinformation.PhoneNumber;
			this.signupdata.Email = this.customerinformation.Email;
			this.signupdata.customerTypeId = this.customerinformation.CustomerTypeId;
		}

		
		if(statuscode == 10000){
			this.displaypresignbtn = true;
		}

		if(this.signupdata.customerTypeId){
			for(let i=0;i<this.customerTypes.length;i++){
				if(this.signupdata.customerTypeId == this.customerTypes[i]['Id']){
					this.selectedmembership = this.customerTypes[i];
					this.customerTypes[i]['Selected'] = true
				}
			}
		}

		this.loadJs();
	}
	loadJs() {
		$('.signup_success').on('click', () => {
			$.fancybox.close({
				src: '#signup_success',
				type: 'inline',
			});

		});

		$(".phone").intlTelInput({

			autoHideDialCode: false,
			autoPlaceholder: "off",
			dropdownContainer: "body",
			formatOnDisplay: false,
			geoIpLookup: function (callback) {
				$.get("https://ipinfo.io", function () { }, "jsonp").always(function (resp) {
					var countryCode = (resp && resp.country) ? resp.country : "";
					callback(countryCode);
				});
			},
			initialCountry: this.signupdata.CountryCode,
			nationalMode: true,
			separateDialCode: true,
		});
	}

	activesignup() {
		
		if (this.presignup) {
			this.presignup = false;
		} else {
			this.presignup = true;
		}

		this.signupdata['FullName'] = null ;
		this.signupdata['Email'] = null ;
		this.signupdata['ContactNo'] = null;
		
	}

	onCustomerSeleted(type) {
		this.signupdata.customerTypeId = type.Id;
	}

	signup() {

		
		if (!this.signupdata.FullName) {
			this.toasterservice.clear();
			this.toasterservice.error('Please enter full name');
			return false;
		}

		if (!this.signupdata.Email) {
			this.toasterservice.clear();
			this.toasterservice.error('Please enter email address');
			return false;
		}

		if (this.signupdata.Email) {
			if (!this.emailregx.test(this.signupdata.Email)) {
				this.toasterservice.clear();
				this.toasterservice.error('Please enter valid email address');
				return false;
			}
		}

		if(!this.signupdata.ContactNo){
			this.toasterservice.clear();
			this.toasterservice.error('Please enter contact number');
			return false ;
		}

		let phonecountry = $(".phone").intlTelInput("getSelectedCountryData");
		this.signupdata.DialCode = phonecountry.dialcode ;
		this.signupdata.CountryCode = phonecountry.iso2 ;
		
		this.authservice
		.customerSignup(this.signupdata)
		.subscribe(res=>{
			let data : any = res;
			if(data.IsSuccess){
				this.router.navigate(['/thankyou']);
			}
			if(!data.IsSuccess){
				this.toasterservice.clear();
				this.toasterservice.error('Please open sign up  page again from crm');
			}
		})
	}

	_presignup() {

		if(!this.signupdata.FullName){
			this.toasterservice.clear();
			this.toasterservice.error('Please enter full name');
			return false;
		}

		if(!this.signupdata.Email && !this.signupdata.ContactNo){
			this.toasterservice.clear();
			this.toasterservice.error('Please enter email OR contact number');
			return false ;
		}

		if(this.signupdata.Email || this.signupdata.ContactNo){

			if(this.signupdata.Email){
				if(!this.emailregx.test(this.signupdata.Email)){
					this.toasterservice.clear();
					this.toasterservice.error('Please enter valid email address');
					return false ;
				}
			}

		}

		let phonecountry = $(".phone").intlTelInput("getSelectedCountryData");
		this.signupdata.DialCode = phonecountry.dialcode ;
		this.signupdata.CountryCode = phonecountry.iso2 ;
		
		this.authservice
		.customerSignup(this.signupdata)
		.subscribe(res=>{
			if(res.IsSuccess){
				this.router.navigate(['/thankyou']);
			}
		})

	}

	// only numbers are allow in input field functionality 
	onlyNumberKey(event) {
		return (event.charCode == 8 || event.charCode == 0) ? null : event.charCode >= 48 && event.charCode <= 57;
	}
}
