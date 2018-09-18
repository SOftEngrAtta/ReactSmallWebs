import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { DataService } from '../../Services/data.service';
import { ToastrService } from '../../Services/toastr.service';
import { setRootDomAdapter } from '@angular/platform-browser/src/dom/dom_adapter';

declare var $;

@Component({
    selector: 'app-car-inquires',
    templateUrl: './inquires.component.html',
    styleUrls: ['./inquires.component.css']
})
export class CarInquiries implements OnInit {
    getinquires: any = []; 

    constructor(private dataservice : DataService,private toastrservice : ToastrService) {}

    ngOnInit() { this.getinquiresdetail() }

    getinquiresdetail(){
        this.dataservice._getinquiresdetail()
        .subscribe(res=>{
            if(res.IsSuccess){this.getinquires = (res.Data && res.Data.length)?this.getsingleimage(res.Data):[];}
            if(res.Message && res.Message != null){
                this.toastrservice.clear();
                this.toastrservice.error(res.Message);
                setTimeout(()=>{this.toastrservice.clear()},4000);
            }
        })
    }

    getsingleimage(data){
        if(data && data.length){
            data.forEach(element => {
                let singleImage = element.AuctionImage.split("#");
                element['singleImage'] = singleImage[0];
            });
            return data;
        }
    }
}
