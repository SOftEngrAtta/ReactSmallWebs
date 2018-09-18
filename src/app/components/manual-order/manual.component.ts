// Importing Internal Modules
import { Component, OnInit } from '@angular/core';
import { window } from 'rxjs/operators/window';
import { RequestOptions, Request, RequestMethod } from '@angular/http';

// Importing services
import { HelperService } from '../../Services/helper.service';
import { StorageService } from '../../Services/storage.service';
import { DataService } from '../../Services/data.service';

// Importing Route
import { Router, ActivatedRoute, Params } from '@angular/router';
import { setTimeout } from 'timers';
import { timeInterval } from 'rxjs/operator/timeInterval';

// modals
import { CustomerShipmentDetail } from '../../models/customerShipmentDetail';
import { ManualOrderObj } from '../../models/manual_order';

declare var $;
declare var moment: any;

@Component({
    selector: 'app-manual-order',
    templateUrl: './manual.component.html',
    styleUrls: ['./manual.component.css']
})
export class ManualOrder implements OnInit {

    public carImages: Array<any> = [];
    public auctionSheetImages: Array<any> = [];

    public shipmentdetail = new CustomerShipmentDetail();
    public makes: Array<any> = [];
    public models: Array<any> = [];
    public colors: Array<any> = [];
    public auctionhouses : Array<any> = [];

    public manualOrder = new ManualOrderObj();

    public onlynumbersallow = /^\d+$/; // regx expression ;

    // date config 
    date: Date = new Date();
    settings = {
        bigBanner: true,
        timePicker: false,
        format: 'dd-MM-yyyy',
        defaultOpen: false,
        closeOnSelect : true
    }
    // end

    public hidesubbtn : boolean = false;

    constructor(private helperservice: HelperService,
        private storageservice: StorageService,
        private dataservice: DataService,
        private router : Router) { }

    ngOnInit() {
        $('body').removeClass('main_login');

        this.shipmentdetail = this.storageservice.getDecrypted('customerShipmentDetail');

        this._getmakes(); // get makers detail 
        this._getcolors(); // get colors detail 
        this._getauctionhouse(); // get auction house detail

        setTimeout(() => {
            this.helperservice.manualorderservice();
        }, 100);
    }

    /*********************************************************************
     * get makes , models , colors and auction house functionality portion
     *********************************************************************/
    _getmakes() {
        this.dataservice
            .getMakes()
            .subscribe(res => {
                if(res && res.Data){
                    this.makes = res.Data;
                }
            })
    }
    getModels() {
        this.dataservice
            .getmodels(this.manualOrder.MakeId)
            .subscribe(res => {
                let _data_: any = res;
                if (_data_.isSuccess) {
                    this.models = _data_.data;
                }
            })
    }
    _getcolors(){
        this.dataservice
        .getcolors()
        .subscribe(res=>{
            this.colors = res.Data;
        })
    }
    _getauctionhouse(){
        this.dataservice
        .getauctionhouses()
        .subscribe(res=>{
            this.auctionhouses = res.Data ;
        })
    }
    // --> end 

    onUploadFinished(file) { 
        this.carImages.push(file);
    }

    onRemoved(file) {
        for(let i = 0 ; i < this.carImages.length ; i++){
            if(this.carImages[i]['file']['name'] == file['file']['name']){
                this.carImages.splice(i,1);
                break;
            }
        }
    }

    onUploadStateChanged(state: boolean) {}

    onUploadFinishedAuc(file) { 
        this.auctionSheetImages.push(file)
    }

    onRemovedAuc(file) {
        for(let i = 0 ; i < this.auctionSheetImages.length ; i++){
            if(this.auctionSheetImages[i]['file']['name'] == file['file']['name']){
                this.auctionSheetImages.splice(i,1);
                break;
            }
        }
    }

    onUploadStateChangedAuc(state: boolean) { }
    
    
    /***********************************
     * modified image path functionality 
     ***********************************/
    modifiedimagepath(path){
        let _path = path.split(',');
        return _path[1];
    } 


    /************************************************
     * check mandatory fields and allow manual order  
     ************************************************/ 
    submit() {

        if(this.hidesubbtn){
            this.helperservice.displayMsg('error','Manual request is already in pending');
            return false ;
        }

        if (!this.manualOrder.MakeId) {
            this.helperservice.displayMsg('error','Please select make');
            return false;
        }
        if (!this.manualOrder.ModelId) {
            this.helperservice.displayMsg('error' , 'Please select model');
            return false;
        }
        if (!this.manualOrder.Year) {
            this.helperservice.displayMsg('error','Please enter year');
            return false;
        }



        if(this.manualOrder.Year){
            let checkyear : any = this.manualOrder.Year
            if(!this.onlynumbersallow.test(checkyear)){
                this.helperservice.displayMsg('errpr' , 'Please enter valid year');
                return false;
            }else{
                if(this.manualOrder.Year.toString().length != 4){
                    this.helperservice.displayMsg('error' , 'Please enter valid year. (e.g : 2018)')
                    return false ;
                }
            }
        }

        if (!this.manualOrder.ChassisId) {
            this.helperservice.displayMsg('error' , 'Please enter Chassis');
            return false;
        }
        if (!this.manualOrder.LotNumber) {
            this.helperservice.displayMsg('error','Pleaser enter lot number');
            return false;
        }
        if (!this.manualOrder.AuctionHouseId) {
            this.helperservice.displayMsg('error' , 'Please select auction house');
            return false;
        }

        if(this.manualOrder.EngineCC){
            let engine_cc : any = this.manualOrder.EngineCC;
            if(!this.onlynumbersallow.test(engine_cc)){
                this.helperservice.displayMsg('error' ,'Please enter valid engine value');
                return false;
            }
        }
        
        if(this.manualOrder.PW){
            let p_w : any = this.manualOrder.PW
            if(!this.onlynumbersallow.test(p_w)){
                this.helperservice.displayMsg('error' , 'Please enter valid pw value');
                return false;
            }
        }

        if(this.manualOrder.Mileage){
            let mileage_num : any = this.manualOrder.Mileage;
            if(!this.onlynumbersallow.test(mileage_num)){
                this.helperservice.displayMsg('error' , 'Please enter valid mileage value');
                return false;
            }
        }
        

        if (this.carImages.length == 0) {
            this.helperservice.displayMsg('error' , 'Please upload car images');
            return false;
        }
        if (this.auctionSheetImages.length == 0) {
            this.helperservice.displayMsg('error' , 'Please upload auction sheet images');
            return false;
        }

        if (this.auctionSheetImages.length > 1) {
            this.helperservice.displayMsg('error' , 'Only 1 auction sheet image allow');
            return false;
        }

        if(this.manualOrder.StartPrice){
            let _startprice : any = this.manualOrder.StartPrice;
            if(!this.onlynumbersallow.test(_startprice)){
                this.helperservice.displayMsg('error' , 'Please enter valid start price');
                return false;
            }
        }

        if(this.manualOrder.FinishPrice){
            let _finishprice : any = this.manualOrder.FinishPrice;
            if(!this.onlynumbersallow.test(_finishprice)){
                this.helperservice.displayMsg('error','Please enter valid finish price');
                return false;
            }
        }

        if(this.manualOrder.StartPrice && this.manualOrder.FinishPrice){
            if(this.manualOrder.FinishPrice < this.manualOrder.StartPrice){
                this.helperservice.displayMsg('error' , 'Finish Price must be greater than or equal to Start Price');
                return false ;
            }
        }

        this.submitorder();

    }
    // --> end



    /*******************************
     * submit order functionality  
     *******************************/ 
    submitorder() {
        
        /*****************************************************************
         * get makers , models a, colors and auction houses 
         *****************************************************************/  
        let make_obj = this.makes.find((mak) => { if (this.manualOrder.MakeId == mak.Id) return mak; })
        let model_obj = this.models.find((mod) => { if (this.manualOrder.ModelId == mod.id) return mod })
        
        let color_obj : any ;
        if(this.manualOrder.ColorId){
            color_obj = this.colors.find((col)=>{ if(this.manualOrder.ColorId == col.Id) return col})
        }
        
        
        let auctiondate = (this.manualOrder.AuctionDate)?moment(this.manualOrder.AuctionDate).format('YYYY-MM-DD'):moment().format('YYYY-MM-DD');

        this.manualOrder.CarImages = this.carImages.map(img=>this.modifiedimagepath(img.src));
        this.manualOrder.AuctionSheetImags = this.auctionSheetImages.map(img=>this.modifiedimagepath(img.src));

        let _data = {
            AuctionTypeId: 4,
            MakeId: this.manualOrder.MakeId,
            Make: make_obj.Title,
            ModelId: this.manualOrder.ModelId,
            Model: model_obj.name,
            Year: this.manualOrder.Year,
            ColorId: (color_obj && color_obj.Id)?color_obj.Id : '',
            Color: (color_obj && color_obj.Title)?color_obj.Title:'',
            Transmission: this.manualOrder.Transmission,
            Chassis: this.manualOrder.ChassisId,
            EngineCC: this.manualOrder.EngineCC,
            Drive: this.manualOrder.Drive,
            Mileage: this.manualOrder.Mileage,
            Equipment: this.manualOrder.Equipment,
            LotNo: this.manualOrder.LotNumber,
            AuctionHouseId: this.manualOrder.AuctionHouseId,
            AuctionDate: auctiondate,
            Grade: this.manualOrder.Grade,
            Rate: this.manualOrder.Rate,
            PW: this.manualOrder.PW,
            PriceStart: this.manualOrder.StartPrice,
            PriceFinish: this.manualOrder.FinishPrice,
            Info: this.manualOrder.Information,
            AuctionImages: this.manualOrder.CarImages,
            AuctionSheet: this.manualOrder.AuctionSheetImags[0],
            AuctionSheetTranslated: null,
            MeterCube: null
        }

        this.hidesubbtn = true ;

        this.dataservice
        .submitManualOrder(_data)
        .subscribe(res=>{
            let _data_ : any = res;
            this.hidesubbtn = false;
            if(_data_.IsSuccess){

                if(!_data_.Message || _data_.Message == null){
                    this.router.navigate(['/unit-detail'] , { queryParams : {
                        source : _data_.Data.AuctionTypeId,
                        lotNum : _data_.Data.Lotno,
                        id : _data_.Data.APIUniqueId}
                    },)
                }

                if(_data_.Message && _data_.Message != null) this.helperservice.displayMsg('error' , _data_.Message);
            }
        })
    }
    // --> end 

    /*********************************************
     * only number value are allowed functionality 
     *********************************************/ 
    onlyNumberKey(event) {
		return (event.charCode == 8 || event.charCode == 0) ? null : event.charCode >= 48 && event.charCode <= 57;
	}
}
