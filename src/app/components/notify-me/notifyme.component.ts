import {
	Component,
	OnInit
} from '@angular/core';

import { StorageService } from '../../Services/storage.service';
import { DataService } from '../../Services/data.service';
import { HelperService } from '../../Services/helper.service';
import { DashboardServices } from '../../Services/dashboard.service';

// modals
import { CustomerShipmentDetail } from '../../models/customerShipmentDetail';
import { NotifyMeModel } from '../../models/NotifyMeModel';
import { CustomerInformation } from './../../models/customerInformation';
import { ShipmentDetail } from '../../models/shipmentDetail';
import { ShipmentCountry } from '../../models/shipmentCountry';
import { ShipmentPort } from '../../models/shipmentPort';

declare var $;

@Component({
    selector: 'app-home',
    templateUrl: './notifyme.component.html',
    styleUrls: ['./notifyme.component.css']
  })

  export class NotifyMe implements OnInit {

    CustomerInformation = new CustomerInformation();
    notifyMeModel = new NotifyMeModel();
    notifyMeList : NotifyMeModel[] = [];
    makes: Array<any> = [];
    models: Array<any> = [];
    shipmentDetail = new ShipmentDetail();
    customerShipmentDetail = new CustomerShipmentDetail();
    filteredShipmentPorts: ShipmentPort[] = []
    IsValidate:boolean = true;
    ErrorMessage:string = 'Please fill required fields.';


    constructor(
      private storageservice: StorageService,
      private dataservice: DataService,
      private dashboardService: DashboardServices,private helpherservice : HelperService){}

    ngOnInit(){
        
      $('body').removeClass('main_login');
        this.CustomerInformation = this
        .storageservice
        .getDecrypted('customerInformation'); // get Customer Information from Token

        this._getmakes(); // get makers detail 
        this.getCountryPortDetails();  // get country and port detail
        this.Get_NotifyMeList(); // get list of Notify Me Records
    }

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
            .getmodels(this.notifyMeModel.MakeId)
            .subscribe(res => {
                let _data_: any = res;
                if (_data_.isSuccess) {
                    this.models = _data_.data;
                }
            })
      }
      
      getCountryPortDetails() {
        var customerInformation: CustomerInformation = this.CustomerInformation;
        this.dashboardService.getShipmentDetail(customerInformation.MembershipId)
          .subscribe(res => {
            
            this.shipmentDetail = res.data;
            if (this.shipmentDetail && this.shipmentDetail.country.length) {
              for (let i = 0; i < this.shipmentDetail.country.length; i++) {
                if (customerInformation.ShipmentCountryId) {
                  if (customerInformation.ShipmentCountryId == this.shipmentDetail.country[i]['id']) {
                    this.customerShipmentDetail.ShipmentCountry = this.shipmentDetail.country[i];
                    this.selectedShipmentCountry(this.shipmentDetail.country[i]);
                  }
                }
    
                if (customerInformation.CountryId) {
                  if (customerInformation.CountryId == this.shipmentDetail.country[i]['id']) {
                    this.customerShipmentDetail.ShipmentCountry = this.shipmentDetail.country[i];
                    this.selectedShipmentCountry(this.shipmentDetail.country[i]);
                  }
                }
    
              }
            }
            
          })
      }

      selectedShipmentCountry(country: ShipmentCountry) {
    
        this.filteredShipmentPorts = this.shipmentDetail.port.filter(x => x.countryCode == country.code)
        if (this.filteredShipmentPorts.length) {
          this.customerShipmentDetail.ShipmentPort = this.filteredShipmentPorts[0];
          for (let i = 0; i < this.filteredShipmentPorts.length; i++) {
            if (this.CustomerInformation.PortId == this.filteredShipmentPorts[i]['id']) {
              this.customerShipmentDetail.ShipmentPort = this.filteredShipmentPorts[i];
              break;
            }
          }
        }
      }

      Get_NotifyMeList(){
        this.dataservice.GetNotifyByCustomerId()
        .subscribe(res =>{
          if(res.IsSuccess){
            this.notifyMeList = res.Data;
          } else { this.helpherservice.displayMsg('error','Something Went Wrong..')}
          
        });

      }

      Insert_NotifyMeData(){
        
        this.notifyMeModel.CountryId = this.customerShipmentDetail.ShipmentCountry.id;
        this.notifyMeModel.PortId = this.customerShipmentDetail.ShipmentPort.port_Id;

        this.Validate_NotifyMePopUp(this.notifyMeModel);
        
        if(this.IsValidate){
            this.dataservice.InsertNotifyData(this.notifyMeModel)
            .subscribe(res =>{
              if(res.IsSuccess){
                this.helpherservice.displayMsg('success' , 'Record Successfully Saved.')
                this.Get_NotifyMeList();
                $("#notifyme-popup").modal('hide');
              } else {
                this.helpherservice.displayMsg('error','Something Went Wrong..')
              }
              
            });

        } else {
          this.helpherservice.displayMsg('error',this.ErrorMessage)
        }

      }

      Validate_NotifyMePopUp(_notifymodel: NotifyMeModel){
        
        $(".valid-check").removeClass('error')
        this.IsValidate = true;
        this.ErrorMessage = 'Please fill required fields.';

        if(_notifymodel.MakeId == 0 && _notifymodel.ModelId == 0 
          && (!_notifymodel.YearFrom || _notifymodel.YearFrom == null) 
          && (!_notifymodel.YearTo || _notifymodel.YearTo == null )
          && (!_notifymodel.PriceMin ||_notifymodel.PriceMin == null)
          && (!_notifymodel.PriceMax ||_notifymodel.PriceMax == null) )
          { 
              $(".valid-check").addClass('error')
              this.IsValidate = false;
          }

          if(_notifymodel.MakeId == 0){
            $("#ddlMake").addClass('error')
            this.IsValidate = false;
          }
          if(_notifymodel.Model == 0){
            $("#ddlModel").addClass('error')
            this.IsValidate = false;
          }
          if(!_notifymodel.YearFrom || _notifymodel.YearFrom == null ){
              $("#txtYearFrom").addClass('error')
              this.IsValidate = false;
          }
          if(!_notifymodel.YearTo || _notifymodel.YearTo == null ){
              $("#txtYearTo").addClass('error')
              this.IsValidate = false;
          }
          if(_notifymodel.YearTo < _notifymodel.YearFrom || _notifymodel.YearFrom < 0){
              $("#txtYearFrom").addClass('error')
              this.ErrorMessage = 'YEARFROM can not be Greater than YEARTO & less than 0.';
              this.IsValidate = false;
          }

          if(!_notifymodel.PriceMin || _notifymodel.PriceMin == null ){
              $("#txtPriceFrom").addClass('error')
              this.IsValidate = false;
          }
          if(!_notifymodel.PriceMax || _notifymodel.PriceMax == null){
              $("#txtPriceTo").addClass('error')
              this.IsValidate = false;
          }
          if( _notifymodel.PriceMax < _notifymodel.PriceMin || _notifymodel.PriceMin < 0){
                $("#txtPriceFrom").addClass('error')
                this.ErrorMessage = 'MINPRICE can not be Greater than MAXPRICE & less than 0.';
                this.IsValidate = false;
          }

          if(this.IsValidate){
              return;
          }

      }

      HidePopUp(){
        this.notifyMeModel = new NotifyMeModel();
        $(".valid-check").removeClass('error')
        $("#notifyme-popup").modal('hide');
      }



    //  END HERE 
  }

  