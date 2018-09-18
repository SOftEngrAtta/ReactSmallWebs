import {
	Component,
	OnInit
} from '@angular/core';


declare var $;

@Component({
	selector: 'app-logout',
	templateUrl: './logout.component.html',
	styleUrls: ['./logout.component.css']
})
export class LogoutPage implements OnInit {
    constructor(){

    }
    ngOnInit(){
        $('body').removeClass('main_login');
    }

    openautorodweb(){window.open('https://www.autorod.com/');}
}
