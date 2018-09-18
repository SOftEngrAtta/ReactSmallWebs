// Importing Internal Modules
import { Component, OnInit,Pipe, PipeTransform } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';

// Importing Services
import { DataService } from '../../Services/data.service';
import { HelperService } from '../../Services/helper.service';
import { ToastrService } from '../../Services/toastr.service';
import { StorageService } from '../../Services/storage.service';
import { InvoiceServices } from '../../Services/invoice.services';
import { RoundPipe } from './../../shared/roundoff'
import { Token } from '../../models/token';

// Importing Models
import { ShipmentDetail } from '../../models/shipmentDetail';
import { ShipmentCountry } from '../../models/shipmentCountry';
import { ShipmentPort } from '../../models/shipmentPort';
import { ShipmentTerm } from '../../models/shipmentTerm';
import { CustomerShipmentDetail } from '../../models/customerShipmentDetail';
import { CustomerInformation } from '../../models/customerInformation';
import { Invoice } from '../../models/invoice'
import { InvoiceEmailResponse } from '../../models/InvoiceEmailResponse';
import { CustomerAddress } from './../../models/CustomerAddress';
import { CustomerAddressDetail } from './../../models/CustomerAddressDetail';

import {
  Subject
} from 'rxjs/Subject';
import { _def } from '@angular/core/src/view/provider';

declare var $;


@Component({
  selector: 'app-dashboard',
  templateUrl: './deposit-invoice.component.html',
  styleUrls: ['./deposit-invoice.component.css']
})

export class DepositInvoice implements OnInit {

  invoicedetails = new Invoice()
  invoiceVM: Invoice;
  invoiceResponseVM = new InvoiceEmailResponse();
  customerInformation: CustomerInformation;
  customerShipmentDetail = new CustomerShipmentDetail();
  shipmentDetail = new ShipmentDetail();
  filteredShipmentPorts: ShipmentPort[] = []
  filterFreightType: ShipmentTerm[] = []
  selectedCountry: any = {};
  queryparam: string;
  currentDate = new Date(); 
  format: '"MMMM d, y"';
  downloadLink: string;
  orderedetailID: any;
  Customer:any = {} ;
  selectedCurrencyCode : number = 0;
  _selectedBank   = {
    id : ''
  };
  _selectedCustomer = {
    Id: ''
  }
  _selectedPlan = {
    Id: '-1'
  }
  _CurrencyCode : any;
  _TotalAmountDue : any;
  _TotalAuctionDeposit: any;
  customerDetailsThirdParty = new CustomerAddressDetail();
  IsValidiation: boolean = true;
  _CurrentRate : any;
  _defaultUnitDetails : any;
  _modifiedUnitDetails : any;
  _TotalCNFModified : any;
  _TotalAuctionDepositModified : any;
  _TotalAmountDueModified : any;

  // store data when agent open dashboard
  customer_information = new CustomerInformation();


  copydefaultUnitDetails :  any ;


  constructor(private router: Router,
    private dataService: DataService,
    private helperservice: HelperService,
    private roundPipe: RoundPipe,
    private storageService: StorageService,
    private invoiceService: InvoiceServices,
    private toastrService: ToastrService,
    private spinnerService: Ng4LoadingSpinnerService,
    private activatedRoute: ActivatedRoute) {
  
  }

  ngOnInit() {
    this.helperservice.loadphone();
    let body = document.getElementsByTagName('body')[0];

    body.classList.remove('main_login')
    body.classList.add('invc')

    this.currentDate.getDate();
    
    this.orderedetailID = this.activatedRoute.snapshot.queryParams['data'];;
    
    this.AuctionDepositInvoiceDetails(); 
  }

  generateHTMLtoPDF()
  {
    var txtCustomerName = this.Customer.Name ? this.Customer.Name.trim() : '';
    var txtCustomerAddress = this.Customer.Address ? this.Customer.Address.trim() : '';
    var _AuctionDeposit = this._TotalAuctionDepositModified;
    var _selectedCurrencyId = this.selectedCurrencyCode;
    let _finalUnitDetails : any = {};
    _finalUnitDetails = this._modifiedUnitDetails;
    
    for(let i:number=0; i<_finalUnitDetails.length; i++)
    {
        _finalUnitDetails[i].CustomerName = txtCustomerName;
        _finalUnitDetails[i].CustomerAddress = txtCustomerAddress;
        _finalUnitDetails[i].OrderInvoiceId = this.invoicedetails.OrderInvoiceId;
        _finalUnitDetails[i].TotalAuctionDeposit = _AuctionDeposit;
        _finalUnitDetails[i].CurrencyId = _selectedCurrencyId;
    }
    
    if( txtCustomerName == "" )
    {
      this.toastrService.error("Customer name cannot be empty."); 
      this.spinnerService.hide();
      return;
    }
    $(".inputText").hide();
    $("#btnAddNewCustomer").hide()
    $("#ddlCustomer").hide();
    $(".zontop-rite-bottom").hide();
    $("#ddlBank").hide();
    $("#btnGenerate").hide();
    $("#btnDownload").show();
    $("#txtCustName").hide(); $("#hdnCustName").text(txtCustomerName).show();
    $("#txtCustAddress").hide(); $("#hdnAddress").text(txtCustomerAddress).show();
    this.spinnerService.show();
    let InvoiceHTMLtoPDFRequest: any = {};
    this.spinnerService.show()
        
    let pdfHTML : any = '<html class="no-js" lang=""> <head>'
                  +'<meta charset="utf-8">'
                  +'<meta http-equiv="x-ua-compatible" content="ie=edge">'
                  +'<title>Auction Deposit Invoice</title>'
                  +'<meta name="viewport" content="width=device-width, initial-scale=1">'
                  +'<link href="https://fonts.googleapis.com/css?family=Open+Sans:300,400,400i,600,600i,700,800" rel="stylesheet">'
                  +'<link rel="stylesheet" href="https://www.autorod.com/Assets/css/style-invoice.css">'
                  +'<link rel="stylesheet" href="https://www.autorod.com/Assets/css/generate-invoice-style.css">'
                  +'<link rel="stylesheet" href="https://www.autorod.com/Assets/css/normalize.css">'
                  // +'<style> .cont-uper-lft .top-lft {font-weight: 700 !important;font-size: 12px !important;vertical-align: top !important;} </style>'
                  +'</head>';
    pdfHTML += $(".cont-pdfHTML").html();
    pdfHTML += '<script src="https://www.autorod.com/Assets/js/modernizr-3.5.0.min.js"> '
              +'<script src="https://www.autorod.com/Assets/js/jquery-3.2.1.min.js">  </html>';

    this.invoiceService.Update_generated_AuctionDepositInvoice(_finalUnitDetails)
    .subscribe(res => {
      let isSaved : any = res;
      if(isSaved){
          InvoiceHTMLtoPDFRequest.OrderInvoiceID = this.invoicedetails.OrderInvoiceId;
          InvoiceHTMLtoPDFRequest.GridHtml = pdfHTML;
          InvoiceHTMLtoPDFRequest.DocumentTypID = 2;
          $("#btnDownload").prop("disabled", true);
          $("#btnDownload").text('Downloading please wait..')
          this.spinnerService.show();
          this.invoiceService.InvoiceHTMLtoPDF(InvoiceHTMLtoPDFRequest)
          .subscribe(res => {
                let path: any = res;
                this.downloadLink = path;
                $("#btnDownload").prop("disabled", false);
                $("#btnDownload").text('Download')
                $("#btnDownload").show();
                $("#btnSendEmail").show();
                $("#btnGenerate").hide();
                this.spinnerService.hide();
            });
        }
        else{
          this.toastrService.error("Ooops something went wrong.");
        }
    })
  }

  sendEmail()
  {
      this.spinnerService.show();
      
      this.invoiceResponseVM.OrderInvoiceId = this.invoicedetails.EncryptedOrderInvoiceId;
      this.invoiceService.SendEmail(this.invoiceResponseVM)
      .subscribe( res => {
          let IsSent : any  = res;
          if(IsSent){
            this.toastrService.success("Email successfully sent.");
          }
          else{
            this.toastrService.error("Something went wrong.");
          }
      });

  }

  generatePDF(){
    this.generateHTMLtoPDF();
  }

  downloadPDF(){window.open(this.downloadLink,"_blank");}

  // dashboard detail functionality 
  AuctionDepositInvoiceDetails() {
    this.invoiceService.get_generated_AuctionDepositInvoice(this.orderedetailID)
      .subscribe(res => {
        let _data_: any = res;
        if (_data_.IsSuccess) {
          this.invoicedetails = _data_.Data;
          this.invoicedetails.CustomerDetail = _data_.Data.CustomerDetail;
          this.invoicedetails.BankDetail = _data_.Data.BankDetail;
          this.invoicedetails.BankDetailList = _data_.Data.BankDetailList;
          this.invoicedetails.PlansList = _data_.Data.PlansList;
          this._selectedBank.id = this.invoicedetails.BankDetail.Id;

          this.invoicedetails.UnitDetails = _data_.Data.UnitDetails;
          this.invoicedetails.InvoiceNumber = _data_.Data.InvoiceNumber;
          this.invoicedetails.OrderInvoiceId = _data_.Data.OrderInvoiceId;
          this.invoicedetails.EncryptedOrderInvoiceId = _data_.Data.EncryptedOrderInvoiceId;
          this._CurrencyCode = this.invoicedetails.CustomerDetail.CurrencyCode;
          this._CurrentRate = this.invoicedetails.UnitDetails[0].Rate;
          this._defaultUnitDetails = Object.assign([], this.invoicedetails.UnitDetails);
          this._modifiedUnitDetails = Object.assign([], this.invoicedetails.UnitDetails);
          this._TotalAmountDue = this.invoicedetails.TotalCNFAmount/2;
          this._TotalCNFModified = this.invoicedetails.TotalCNFAmount;
          this._TotalAuctionDeposit = this.invoicedetails.TotalAuctionDeposit;
          this.selectedBank(this.invoicedetails.CustomerDetail.ShipmentCountryId)
          this.Customer.Name = this.invoicedetails.CustomerDetail.CustomerName;
          this.Customer.Address = this.invoicedetails.CustomerDetail.CustomerAddress;
          this.Get_CustomerAddressList(1);
          // setTimeout(()=>{
              
          // },1000)
          // setTimeout(()=>{
          //   if(this.invoicedetails.CustomerDetail.ShipmentCountryId != 239)
          //   {
          //       this.generateHTMLtoPDF();
          //   }else{
          //     $("#btnDownload").hide();
          //   }
          // },1000)
        }
        else {
          this.toastrService.error(_data_.Errors[0])
        }

      })
  }

  Get_CustomerAddressList(checkOnLoad:number){
    this.invoicedetails.ThirdPartyCustomersList = null;
    this.invoiceService.Get_CustomerAddresses().subscribe( res =>{
       this.invoicedetails.ThirdPartyCustomersList = res.Data;
       this.SelectedCustomer(checkOnLoad);
    })
  }

  selectedBank(countryId)
  {
    let selectedbankdetail : any;
    let _currencyCode_ : any;
    _currencyCode_ = this.invoicedetails.CustomerDetail.CurrencyCode;
    if(countryId && countryId != null &&  ( countryId == 239 || countryId == 220 || countryId == 240 )){
      
      if(_currencyCode_ == 'USD'){
        this._selectedBank.id = this.invoicedetails.BankDetailList.
      filter(x => x.SwiftCode == "" && x.CountryId == countryId && x.CurrencyCode == _currencyCode_)[0].Id;
      }else{
        this._selectedBank.id = this.invoicedetails.BankDetailList.
      filter(x => x.SwiftCode != "" && x.CurrencyCode == _currencyCode_)[0].Id;
      }
      

      selectedbankdetail = this.invoicedetails.BankDetailList.find((e)=>{
        if(e.Id == parseInt(this._selectedBank.id)){
          return e
        }
      })
      $("#ddlBank").val(this._selectedBank.id);
    }
    else if ( countryId && countryId != null && ( countryId != 239 || countryId != 220 || countryId != 240)) {
    
      this._selectedBank.id = this.invoicedetails.BankDetailList.
      filter(x => x.SwiftCode != "" && x.CurrencyCode == _currencyCode_)[0].Id;

      selectedbankdetail = this.invoicedetails.BankDetailList.find((e)=>{
        if(e.Id == parseInt(this._selectedBank.id)){
          return e
        }
      })

      $("#ddlBank").val(this._selectedBank.id);
    }
    else{
      selectedbankdetail = this.invoicedetails.BankDetailList.find((e)=>{
        if(e.Id == parseInt(this._selectedBank.id)){
          return e
        }
      })

      $("#ddlBank").val(this._selectedBank.id);
    }

    this.invoicedetails.BankDetail = selectedbankdetail; 
    if(selectedbankdetail.CurrencyCode == 'USD')
    {
        this.selectedCurrencyCode = 1;
        $("#rdDollar").prop("checked",true);
        $("#lblCurrencyCode").text('USD')
        $("#bankAN").text(selectedbankdetail.BeneficiaryAccountNumber);
        this.UnitPriceConversion(selectedbankdetail.CurrencyCode);
    } else{
      this.selectedCurrencyCode = 2;
      $("#rdYen").prop("checked",true);
        $("#lblCurrencyCode").text('JPY')
        $("#bankAN").text(selectedbankdetail.BeneficiaryAccountNumber);
        this.UnitPriceConversion(selectedbankdetail.CurrencyCode);
    }
    
  }

  UnitPriceConversion(_currCode:any){
    
    this.copydefaultUnitDetails = JSON.parse(JSON.stringify(this._defaultUnitDetails))

    if(_currCode == this._CurrencyCode) {
      this._modifiedUnitDetails = this.copydefaultUnitDetails;
      this._TotalCNFModified = this.invoicedetails.TotalCNFAmount;
      this._TotalAuctionDepositModified = this.invoicedetails.TotalAuctionDeposit;
      this._TotalAuctionDeposit = this.invoicedetails.TotalAuctionDeposit;
      this._TotalAmountDueModified = this.invoicedetails.TotalCNFAmount/2;
      this.invoicedetails.CustomerDetail.CurrencyCode = _currCode;
      this.SelectedPlan();
      return;
    } else if (_currCode == 'JPY') {
      
      let totalcnf_amount : number = 0;
            
      for(let i:number=0; i<this.invoicedetails.UnitDetails.length; i++){
        
        this._modifiedUnitDetails[i].BidPrice = this._defaultUnitDetails[i].BidPrice*this._CurrentRate;
        this._modifiedUnitDetails[i].ServiceCharges = this._defaultUnitDetails[i].ServiceCharges*this._CurrentRate;
        this._modifiedUnitDetails[i].FOB = this._defaultUnitDetails[i].FOB*this._CurrentRate;
        this._modifiedUnitDetails[i].FreightCharges = this._defaultUnitDetails[i].FreightCharges*this._CurrentRate;
        this._modifiedUnitDetails[i].InspectionCharges = this._defaultUnitDetails[i].InspectionCharges*this._CurrentRate;
        this._modifiedUnitDetails[i].CNF = this._defaultUnitDetails[i].CNF*this._CurrentRate;
        this._modifiedUnitDetails[i].AuctionDeposit = this._defaultUnitDetails[i].AuctionDeposit*this._CurrentRate;
        totalcnf_amount += this._modifiedUnitDetails[i].CNF;
      }

      this._TotalCNFModified = totalcnf_amount;
      this._TotalAuctionDepositModified = this._TotalAuctionDeposit*this._CurrentRate;;
      this._TotalAmountDueModified = totalcnf_amount/2;
      this.invoicedetails.CustomerDetail.CurrencyCode = _currCode;
      this._TotalAuctionDeposit = this._TotalAuctionDepositModified;
      this.SelectedPlan();

    } else if (_currCode == 'USD'){
      
      let totalcnf_amount : number = 0;
            
      for(let i:number=0; i<this.invoicedetails.UnitDetails.length; i++) {
        
        this._modifiedUnitDetails[i].BidPrice = this._defaultUnitDetails[i].BidPrice/this._CurrentRate;
        this._modifiedUnitDetails[i].ServiceCharges = this._defaultUnitDetails[i].ServiceCharges/this._CurrentRate;
        this._modifiedUnitDetails[i].FOB = this._defaultUnitDetails[i].FOB/this._CurrentRate;
        this._modifiedUnitDetails[i].FreightCharges = this._defaultUnitDetails[i].FreightCharges/this._CurrentRate;
        this._modifiedUnitDetails[i].InspectionCharges = this._defaultUnitDetails[i].InspectionCharges/this._CurrentRate;
        this._modifiedUnitDetails[i].CNF = this._defaultUnitDetails[i].CNF/this._CurrentRate;
        this._modifiedUnitDetails[i].AuctionDeposit = this._defaultUnitDetails[i].AuctionDeposit/this._CurrentRate;
        totalcnf_amount += this._modifiedUnitDetails[i].CNF;
      }

      this._TotalCNFModified = totalcnf_amount;
      this._TotalAuctionDepositModified = this._TotalAuctionDeposit/this._CurrentRate;
      this._TotalAmountDueModified = totalcnf_amount/2;
      this.invoicedetails.CustomerDetail.CurrencyCode = _currCode;
      this._TotalAuctionDeposit = this._TotalAuctionDepositModified 
      this.SelectedPlan();
    }
  }

  SelectedCustomer(onLoad:number){
    let _customer : any;
    let _count : any;
    if(onLoad == 1){
      _count = this.invoicedetails.ThirdPartyCustomersList.length;
      _customer = this.invoicedetails.ThirdPartyCustomersList[_count-1];
      this._selectedCustomer.Id = _customer.CustomerId;
    } else if(onLoad == 2) {
      _customer = this.invoicedetails.ThirdPartyCustomersList[0];
      this._selectedCustomer.Id = _customer.CustomerId;
    } else {
      _customer = this.invoicedetails.ThirdPartyCustomersList.find((e)=>{
        if(e.CustomerId == parseInt(this._selectedCustomer.Id)){
          return e
        }
      })
    }

    this.Customer.Name = _customer.CustomerName;
    this.Customer.Address = (_customer.CustomerAddress) ? _customer.CustomerAddress : '';
    this.invoicedetails.CustomerDetail.PhoneNumber = _customer.PhoneNumber;
    $("#ddlCustomer").val(this._selectedCustomer.Id);
  }

  AddThirdPartyAddress(IsEdited: boolean) {
    
    this.customerDetailsThirdParty.CountryCode = $("#newthirdparty .phone").intlTelInput("getSelectedCountryData").iso2.toUpperCase();
    this.customerDetailsThirdParty.AddressTypeId = 4;
    this.Validate_CustomerShipmentAddressData(this.customerDetailsThirdParty);
    if(this.IsValidiation){
        this.dataService.Insert_CustomerShipmentAddress(this.customerDetailsThirdParty)
        .subscribe(res => {

            if (res.IsSuccess) {
             
                this.toastrService.success(res.Message);
                this.customerDetailsThirdParty = new CustomerAddressDetail();
                this.Get_CustomerAddressList(2);
                $("#newthirdparty").modal('hide');

            } else {
                this.toastrService.error(res.Message);
            }

        });
    } else {
        this.toastrService.error('Please fill required fields.')
        setTimeout( () => { this.toastrService.clear(); }, 2000 );
    }
    
  }

  hidePopUp(_AddresTypeId:any){
    $(".consform input").removeClass('error')
    this.customerDetailsThirdParty = new CustomerAddressDetail();
    $("#newthirdparty").modal('hide');
  }

  Validate_CustomerShipmentAddressData(_model: CustomerAddressDetail) {
    $(".consform input").removeClass('error')
    this.IsValidiation = true;
   
    if (!_model.Fullname || _model.Fullname == null) {
        $(".name").addClass('error');
        this.IsValidiation = false;
    }
    if ( (!_model.Email || _model.Email == null) && _model.CountryCode != "PK") {
        $(".email").addClass('error');
        this.IsValidiation = false;
    }
    if (!_model.Contact || _model.Contact == null) {
        $(".phone").addClass('error');
        this.IsValidiation = false;
    }
    
    if (!_model.Address || _model.Address == null) {
        $(".address").addClass('error');
        this.IsValidiation = false;
    }
    
  }

  showPopUp(){
    $("#newthirdparty").modal('show');
  }

  SelectedPlan(){
    
      let _plan : any;
      _plan = this.invoicedetails.PlansList.find((e)=>{
      if(e.Id == parseInt(this._selectedPlan.Id)){
          return e
        }
      })  

    if(this._selectedPlan.Id != '-1'){
      if(_plan.Percentage == 50){
        $("#lblAmountDue").text('50% of toal CNF');
        this._TotalAmountDueModified = this._TotalCNFModified*0.5;
        this._TotalAuctionDepositModified = this._TotalAmountDueModified;
      } else if(_plan.Percentage == 30){
        $("#lblAmountDue").text('30% of toal CNF');
        this._TotalAmountDueModified = this._TotalCNFModified*0.3;
        this._TotalAuctionDepositModified = this._TotalAmountDueModified;
      } else if (_plan.Percentage == 100){
        $("#lblAmountDue").text('100% of toal CNF');
        this._TotalAmountDueModified = this._TotalCNFModified*1;
        this._TotalAuctionDepositModified = this._TotalAmountDueModified;
      } 
    } else {
      $("#lblAmountDue").text('50% of toal CNF');
      this._TotalAmountDueModified = this._TotalCNFModified*0.5;
      this._TotalAuctionDepositModified= this._TotalAuctionDeposit;
    }
      $("#ddlPlan").val(this._selectedPlan.Id);
  }


  
  // END
}
