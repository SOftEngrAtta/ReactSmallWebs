/**
 * import modules 
 */ 
import { Component, OnInit } from '@angular/core';

/**
 * import services
 */ 
import { DataService } from '../../Services/data.service'

declare var $;

@Component({
    selector: 'app-home',
    templateUrl: './notifications.component.html',
    styleUrls: ['./notifications.component.css']
})
export class Notifications implements OnInit {

    public notifications : Array<any> = [];

    constructor(private dataservice : DataService) { }

    ngOnInit() {
        $('body').removeClass('main_login');
        this.getnotifications();    
    }

    getnotifications(){
        this.dataservice
        .get_notifications()
        .subscribe(res=>{
            if(res.IsSuccess){
                this.notifications = res.Data ;
            }
        })
    }


    openlink(url){
        window.open(url,'_blank')
    }

}
