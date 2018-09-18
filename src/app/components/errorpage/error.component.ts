import {Component,OnInit} from '@angular/core';

declare var $;

@Component({
	selector: 'app-error',
	templateUrl: './error.component.html',
	styleUrls: ['./error.component.css']
})
export class ErrorPage implements OnInit {
    constructor(){}
    ngOnInit(){$('body').removeClass('main_login');}
}
