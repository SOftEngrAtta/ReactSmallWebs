import {
	Component,
	OnInit
} from '@angular/core';
import {
	Signup
} from '../../models/signup';
import {
	CustomerType
} from '../../models/customerType';
import {
	SignupService
} from '../../Services/signup.service';
import {
	Route,
	Router
} from '@angular/router';
import {
	ToastrService
} from '../../Services/toastr.service';

declare var $;

@Component({
	selector: 'app-signup',
	templateUrl: './signup.component.html',
	styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

	// selectedCustomerType: CustomerType = new CustomerType()
	customerTypes: CustomerType[] = []
	signup: Signup = new Signup()
	customerCountry: any

	spaceandalphabetsregx = /^[a-zA-Z ]*$/;
	numberregx = /^\d+$/;
	emailregx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	getSelectedCountryData : any ;
	constructor(
		private signupService: SignupService,
		private router: Router,
		private toastrservice: ToastrService
	) { }

	ngOnInit() {
		// this.getCustomerCountry()
		this.getCustomerType();
		this.loadJs();
	}

	loadJs() {
		$('.signup_success').on('click', () => {
			$.fancybox.close({
				src: '#signup_success',
				type: 'inline',
			});
			this.router.navigate(["/login"]);
		});

		$(".phone").intlTelInput({
			
			autoHideDialCode: false,
			autoPlaceholder: "off",
			dropdownContainer: "body",
			 formatOnDisplay: false,
			geoIpLookup: function(callback) {
			  $.get("https://ipinfo.io", function() {}, "jsonp").always(function(resp) {
				var countryCode = (resp && resp.country) ? resp.country : "";
				callback(countryCode);
		 });
			},
			initialCountry: "us",
			nationalMode: true,
			separateDialCode: true,
		 });
		 
	}
	getCustomerType() {
		this.customerTypes.push({ Id: 1, Title: 'Individual', Selected: true })
		this.customerTypes.push({ Id: 2, Title: 'Dealer', Selected: false })
		// this.customerTypes.push({ Id: 3, Title: 'Broker', Selected: false })
		// this.customerTypes.push({ Id: 4, Title: 'Corporate', Selected: false })
	}

	onCustomerSeleted(customerType: CustomerType) {
		this.customerTypes.forEach(element => {
			element.Selected = false
			if (element.Id == customerType.Id) {
				element.Selected = true
				this.signup.CustomerTypeId = element.Id
			}
		});
	}

	customerSignup() {
		
		if (!this.signup.FirstName) {
			this.toastrservice.clear();
			this.toastrservice.error('Please enter first name');
			setTimeout(()=>{this.toastrservice.clear()},4000);
			return false
		}

		if (this.signup.FirstName) {
			if (!this.spaceandalphabetsregx.test(this.signup.FirstName)) {
				this.toastrservice.clear();
				this.toastrservice.error('First name is not valid');
				setTimeout(()=>{this.toastrservice.clear()},4000);
				return false
			}
		}

		if (!this.signup.LastName) {
			this.toastrservice.clear();
			this.toastrservice.error('Please enter last name');
			setTimeout(()=>{this.toastrservice.clear()},4000);
			return false;
		}

		if (this.signup.LastName) {
			if (!this.spaceandalphabetsregx.test(this.signup.LastName)) {
				this.toastrservice.clear();
				this.toastrservice.error('Last name is not valid');
				setTimeout(()=>{this.toastrservice.clear()},4000);
				return false;
			}
		}

		if (!this.signup.ContactNo) {
			this.toastrservice.clear();
			this.toastrservice.error('Please enter valid contact number');
			setTimeout(()=>{this.toastrservice.clear()},4000);
			return false;
		}


		if (this.signup.ContactNo) {
			if (!this.numberregx.test(this.signup.ContactNo)) {
				this.toastrservice.clear();
				this.toastrservice.error('Please enter valid contact number');
				setTimeout(()=>{this.toastrservice.clear()},4000);
				return false;
			}
		}

		if(!this.signup.Email){
			this.toastrservice.clear();
			this.toastrservice.error('Please enter email address');
			setTimeout(()=>{this.toastrservice.clear()},4000);
			return false ;
		}

		if(this.signup.Email){
			if(!this.emailregx.test(this.signup.Email)){
				this.toastrservice.clear();
				this.toastrservice.error('Please enter valid email address');
				setTimeout(()=>{this.toastrservice.clear()},4000);
				return false;
			}
		}

		if(!this.signup.Password){
			this.toastrservice.clear();
			this.toastrservice.error('Please enter password');
			setTimeout(()=>{this.toastrservice.clear()},4000);
			return false ;
		}

		if(this.signup.Password.length < 8){
			this.toastrservice.clear();
			this.toastrservice.error('New password length should be greater than 7 digits');
			setTimeout(()=>{this.toastrservice.clear()},4000);
			return false ;
		}

		if(!this.signup.ConfirmPassword){
			this.toastrservice.clear();
			this.toastrservice.error('Please enter confirm password');
			setTimeout(()=>{this.toastrservice.clear()},4000);
			return false;
		}

		if(this.signup.Password != this.signup.ConfirmPassword){
			this.toastrservice.clear();
			this.toastrservice.error('Password and confirm password are not correct');
			setTimeout(()=>{this.toastrservice.clear()},4000);
			return false ;
		}

		this.getSelectedCountryData = $(".phone").intlTelInput("getSelectedCountryData")
		
		if(!this.getSelectedCountryData.dialCode){
			this.toastrservice.clear();
			this.toastrservice.error('Please select country code ');
			setTimeout(()=>{this.toastrservice.clear()},4000);
			return false ;
		}
		

		this.signup.Diacode = this.getSelectedCountryData.dialCode
		this.signup.CountryCode = this.getSelectedCountryData.iso2
		this.signup.FullName = this.signup.FirstName + " " + this.signup.LastName

		this.signupService.customerSignup(this.signup)
			.subscribe(res => {
				if (res.IsSuccess) {
					$.fancybox.open({
						src: '#signup_success',
						type: 'inline',
						helpers: {
							overlay: { closeClick: false } // prevents closing when clicking OUTSIDE fancybox 
						}
					});
					this.router.navigate(['/login']);
				}
			})
	}

	getCustomerCountry() {
		this.signupService.getCountry()
			.subscribe(res => {
				this.customerCountry = res
			})
	}

	// only numbers are allow in input field functionality 
	onlyNumberKey(event) {
		return (event.charCode == 8 || event.charCode == 0) ? null : event.charCode >= 48 && event.charCode <= 57;
	}
}
