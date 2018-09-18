import {
	Component,
	OnInit
} from '@angular/core';


declare var $;

@Component({
	selector: 'app-thankyou',
	templateUrl: './thankyou.component.html',
	styleUrls: ['./thankyou.component.css']
})
export class ThankYou implements OnInit {
    constructor(){

    }
    ngOnInit(){
        $('body').removeClass('main_login');
    }
}
