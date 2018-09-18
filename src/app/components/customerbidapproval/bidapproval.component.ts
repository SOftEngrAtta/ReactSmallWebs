import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { DataService } from '../../Services/data.service';
import { HelperService } from '../../Services/helper.service';

@Component({
    selector: 'app-bid-approval',
    templateUrl: './bidapproval.component.html',
    styleUrls: ['./bidapproval.component.css']
})
export class CustomerBidApproval implements OnInit {
    
    public orderId : string;
    public orderDetailRecords : any = [];
    public accept_reject : any = {Id : '',Status : '',Action : ''}; 
    public isListActive : boolean = false;

    constructor(private dataservice : DataService,private route : ActivatedRoute,private router : Router,private helperserice : HelperService) {}

    ngOnInit() {
        this.route.queryParams.subscribe(params => {this.orderId = (params.OrderId)?params.OrderId:this.orderId;})
        if(this.orderId) this.getOrderDetail();
        else this.router.navigate(['/login']);
    }

    /**********************************
    * get order details functionality   
    ***********************************/ 
    getOrderDetail(){
        this.dataservice
        .orderDetails(this.orderId)
        .subscribe(res=>{
            if(res.IsSuccess){this.updatedlist(res.Data)}
            if(res.Message && res.Message != null){this.helperserice.displayMsg('error',res.Message)}
        })
    }

    /**********************************
     * accept && reject functionality
    **********************************/  
    acceptreject(){ 
        this.dataservice
        .acceptrejectorder({
            OrderDetailId : this.accept_reject['Id'],
            StatusId : this.accept_reject['Status'] 
        }).subscribe(res=>{
            if(res) this.helperserice.displayMsg('success','request submitted successfully')
            else this.helperserice.displayMsg('error' , 'request failed');
        })
    }


    /**********************************
     * Modify data functionality 
     *********************************/ 
    updatedlist(data){
        let _list = [];
        if(data && data['OrderObj']['orderitemList'] && data['OrderObj']['orderitemList'].length){
            for(let i = 0 ; i < data['OrderObj']['orderitemList'].length ; i++){
                if(data['OrderObj']['orderitemList'][i]['orderdetailsList'] && data['OrderObj']['orderitemList'][i]['orderdetailsList'].length){
                    for(let k = 0 ; k < data['OrderObj']['orderitemList'][i]['orderdetailsList'].length ; k++){
                        data['OrderObj']['orderitemList'][i]['orderdetailsList'][k]['AuctionImage'] = data['OrderObj']['orderitemList'][i]['orderdetailsList'][k]['AuctionImage'].split("#");
                        _list.push(data['OrderObj']['orderitemList'][i]['orderdetailsList'][k])
                    }
                }
            }
            this.isListActive = (_list.length)?true:false;
            data['OrderObj']['list'] = _list;
            this.orderDetailRecords = data['OrderObj'];
        }
    }

}
