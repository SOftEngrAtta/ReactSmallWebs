// Importing Internal Modules
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
// Importing Models
// import { IncompleteOrders } from './../../models/incompleteOrder';

// Importing Services
import { DataService } from '../../Services/data.service';
import { HelperService } from '../../Services/helper.service';
import { ToastrService } from '../../Services/toastr.service';
import { StorageService } from '../../Services/storage.service';
import { DashboardServices } from '../../Services/dashboard.service';
import { InvoiceServices } from '../../Services/invoice.services';
import { RoundPipe } from './../../shared/roundoff'
import { Token } from '../../models/token';

import { ShipmentDetail } from '../../models/shipmentDetail';
import { ShipmentCountry } from '../../models/shipmentCountry';
import { ShipmentPort } from '../../models/shipmentPort';
import { ShipmentTerm } from '../../models/shipmentTerm';
import { BankDetails } from '../../models/bankDetails';
import { CustomerShipmentDetail } from '../../models/customerShipmentDetail';
import { CustomerInformation } from '../../models/customerInformation';
import { DashBoard } from '../../models/dashboard';
import { Invoice } from '../../models/invoice';
import { InvoiceEmailResponse } from '../../models/InvoiceEmailResponse';
import { CustomerAddressDetail } from './../../models/CustomerAddressDetail';

import {
  Subject
} from 'rxjs/Subject';
import { Model } from '@swimlane/ngx-datatable';
// import { TIMEOUT } from 'dns';
import { timeout } from 'rxjs/operators';
import { debug } from 'util';
import { element } from 'protractor';
// import { read } from 'fs';
// import { debug } from 'util';

declare var $;

@Component({
  selector: 'app-dashboard',
  templateUrl: './generalinvoice.component.html',
  styleUrls: ['./generalinvoice.component.css']
})
export class GeneralInvoice implements OnInit {

  invoicedetails = new Invoice()
  invoiceVM: Invoice;
  invoiceResponseVM = new InvoiceEmailResponse();
  customerInformation: CustomerInformation;
  customerShipmentDetail = new CustomerShipmentDetail();
  shipmentDetail = new ShipmentDetail();
  filteredShipmentPorts: ShipmentPort[] = []
  filterFreightType: ShipmentTerm[] = []
  filterBankDetails : BankDetails[] = []
  selectedCountry: any = {};
  queryparam: string;
  currentDate = new Date();
  format: '"MMMM d, y"';
  arrInvoiceDetail: any = [
    {
      Description: '',
      Amount: 0
    }
  ];
  invoiceIndex: any;
  arrAmount: any = []
  arrDescription: any = []
  downloadLink: string;
  orderinvoiceid : any = 0;
  Customer:any = {} ;
  selectedCurrencyCode : number = 0;
  
  
  modelChanged: Subject<string> = new Subject<string>();
  modelChanged2: Subject<string> = new Subject<string>();

  // store data when agent open dashboard
  customer_information = new CustomerInformation();

  _selectedBank   = {
    id : ''
  };
  _selectedCustomer = {
    Id: ''
  }
  customerDetailsThirdParty = new CustomerAddressDetail();
  IsValidiation: boolean = true;


  constructor(private router: Router,
    private dataService: DataService,
    private helperservice: HelperService,
    private roundPipe: RoundPipe,
    private dashboardService: DashboardServices,
    private storageService: StorageService,
    private invoiceService: InvoiceServices,
    private toastrService: ToastrService,
    private spinnerService: Ng4LoadingSpinnerService,
    private activatedRoute: ActivatedRoute) {
    
      this.modelChanged
      .debounceTime(1000) // wait 300ms after the last event before emitting last event
      .subscribe(model => {
        var amount = model;
        
        if(this.arrAmount.length)
        {
          var count = 0;
          for(let i=0; i< this.arrAmount.length; i++)
          {
            count +=  parseInt(this.arrAmount[i]['amount']);
          }
          $("#lblTotalAmt").text(count);
        }
        else{
          $("#lblTotalAmt").text(amount);
        }
      });

      this.modelChanged2
      .debounceTime(1500) // wait 300ms after the last event before emitting last event
      .subscribe(model => {

        var desc = model;
      
        if(this.arrDescription.length)
        {
          
        }

      });
  }

  ngOnInit() {
    let body = document.getElementsByTagName('body')[0];
    this.helperservice.loadphone();
    body.classList.remove('main_login')
    body.classList.add('invc')
    $("#tb-pdfData").hide();
   
    $("#rdYen").click( () => {
      this.selectedCurrencyCode = 2;
      $("#lblCurrencyCode").text("JPY");
    })

    $("#txtAmt").focusin(() =>{
        var val = $("#txtAmt").text();
        if(val == ""){
          $("#txtAmt").text('')
        }
    })

    $("#txtDesc").focusin(() =>{
      var val = $("#txtDesc").text();
      if(val == ""){
        $("#txtDesc").text('')
      }

  })

    this.currentDate.getDate();

    this.AuctionDepositInvoiceDetails(); 
    
    $("#rdDollar").click(() => {
      $("#lblCurrencyCode").text("USD");
      this.selectedCurrencyCode = 1;
      // var val: string =  $("#hdnCurrencyCode").val();
      // let currCode : any = val.trim();
      // let curr: any = $("#hdnAccountNumber").val();
      // if(currCode == "JPY"){
      //   curr = "2853661";
      // }
      //   $("#bankAN").text(curr);
    })

  }

  addMoreInvoice(desc, amt) {
    
    if (this.arrInvoiceDetail.length < 5) {
      if(desc != null && desc != "")
      {
        if(amt != null && amt != 0 && amt != "")
        {
            this.arrInvoiceDetail.push({
              Description: '',
              Amount: 0
            });
        }
        else{
          this.toastrService.error("Amount cannot be null or zero (0)");  
        }
      }
      else{
        $("#txtDescription").focusin();
        this.toastrService.error("Description can not be null or empty");
      }
    }
  }

  removeInvoice(index) {
    if (this.arrInvoiceDetail.length > 1) {
      this.arrInvoiceDetail.splice(index, 1);
      
      for(let i=0;i<this.arrAmount.length;i++){
        if(this.arrAmount.indexOf(index)){
          this.arrAmount.splice(index, 1);
        }

        if(this.arrDescription.indexOf(index)){
          this.arrDescription.splice(index, 1);
          break;
        }
    }

    if(this.arrAmount.length)
        {
          var count = 0;
          for(let i=0; i< this.arrAmount.length; i++)
          {
            count +=  parseInt(this.arrAmount[i]['amount']);
          }
          $("#lblTotalAmt").text(count);
        }

  }
}

  
  generatePDF()
  {
    this.spinnerService.show();
    let amountArray =  this.arrAmount ;
    let describtionArray = this.arrDescription ;
    let depositInvoiceModel: any = {};
    let totalAmount = parseInt($("#lblTotalAmt").text())
    var countryId: any = $("#ddlCountry :selected").text()
    var portId: any = $("#ddlPort :selected").text()
    var typeId: any = $("#ddlShipmentType :selected").text()
    var Shptypeid = $("#ddlShipmentType").val();
    var idNumber = this.invoicedetails.CustomerDetail.IDNumber;
    var passportNumber = this.invoicedetails.CustomerDetail.PassportNumber;
    var txtCustomerName = this.Customer.Name ? this.Customer.Name.trim() : '';
    var txtCustomerAddress = this.Customer.Address ? this.Customer.Address.trim() : '';
    let isValidate : boolean = false;

    // Check conditions for Georgia Country input ID Number
    if(this.invoicedetails.CustomerDetail.ShipmentCountryId == 78 && this.invoicedetails.CustomerDetail.IDNumber == '')
    {
        var _txtIDNumber : string =  $("#txtIDNumber").val();
        idNumber = _txtIDNumber;
        if(idNumber == '')
        {
           isValidate = false;
        }
        else{
          $("#hdnIDNumber").text(idNumber);
          isValidate = true;
        }

        if(!isValidate)
        {
          this.toastrService.error("Enter ID Number");
          this.spinnerService.hide();
          return;
        }
    }

   

    // Check Conditions for Armenia and Russian Federation input Passport Number
    if(this.invoicedetails.CustomerDetail.ShipmentCountryId == 7 || this.invoicedetails.CustomerDetail.ShipmentCountryId == 184 && this.invoicedetails.CustomerDetail.PassportNumber == '')
    {
      var _txtPassPortNumber : string = $("#txtPassPortNumber").val();
      passportNumber = _txtPassPortNumber;
      if(passportNumber == '')
        {
           isValidate = false;
        }
        else{
          $("#hdnPassportNumber").text(passportNumber);
          isValidate = true;
        }

        if(!isValidate)
        {
          this.toastrService.error("Enter Passport number");
          this.spinnerService.hide();
          return;
        }
    }

    let orderinvoiceid = 0;

    if(totalAmount == 0)
    {
      this.toastrService.error("Please enter amount greater than Zero (0)"); 
      this.spinnerService.hide();
      return;
    }

    if(describtionArray.length == 0){
      this.toastrService.error("Please enter description"); 
      this.spinnerService.hide();
      return;
    }
    if( txtCustomerName == "" )
    {

      this.toastrService.error("Customer name cannot be empty."); 
      this.spinnerService.hide();
      return;
    }

    if(countryId != "Select Shipment Country" && portId != "Select Shipment Port" && Shptypeid != null)
    {
        $("#ddlCustomer").hide();
        $("#btnAddNewCustomer").hide();
        $("#ddlCountry").hide()
        $("#ddlPort").hide()
        $("#ddlShipmentType").hide()
        $("#ddlBank").hide();
        $("#hdnCountry").text(countryId); $("#hdnPort").text(portId); $("#hdnShipmentType").text(typeId);
        $("#hdnCountry").show(); $("#hdnPort").show(); $("#hdnShipmentType").show(); 
        $("#hdnIDNumber").show(); $("#hdnPassportNumber").show();
        $("#txtCustName").hide(); $("#hdnCustName").text(txtCustomerName).show();
        $("#txtCustAddress").hide(); $("#hdnAddress").text(txtCustomerAddress).show();
        $(".inputText").hide()
        $("#currencyDiv").hide()
        
        $("#tb-price").hide();

        let html = '';  
        $("#tb-pdfData").show();
        
        let describtionArraylength = 0;
        if(describtionArray && describtionArray.length){
          describtionArraylength = describtionArray.length;
          for(let i = 0 ; i < describtionArray.length ; i++){
            html +='<tr  class="back" style="background: rgba(204, 203, 203, 0.5)"><td width="100" style="padding-left: 30px;">'+(i+1)+'</td> <td  width="460" style="padding-left:30px;">'+describtionArray[i]['description']+'</td> <td >'+amountArray[i]['amount']+'</td> </tr>';
            depositInvoiceModel.InvoiceNumber = this.invoicedetails.InvoiceNumber;
            depositInvoiceModel.Description = describtionArray[i]['description'];
            depositInvoiceModel.AuctionDeposit = amountArray[i]['amount'];
            depositInvoiceModel.TotalAmount = totalAmount;
            depositInvoiceModel.PassportNumber = passportNumber;
            depositInvoiceModel.IDNumber = idNumber;
            depositInvoiceModel.CustomerInvoiceName = this.Customer.Name;
            depositInvoiceModel.CustomerInvoiceAddress = this.Customer.Address;
            depositInvoiceModel.CurrencyId = this.selectedCurrencyCode;
              
            this.invoiceService.UpdateAuctionDepositInvoiceDetail(depositInvoiceModel)
            .subscribe(res => {
              let _data: any = res;
              if(_data != 0){
                  this.orderinvoiceid = _data;
                  orderinvoiceid= _data;
                  
                  $("#btnGenerate").prop("disabled", true);
                  $("#btnGenerate").text('Downloading please wait..')

                  if((i+1) == describtionArraylength)
                  {
                    this.generateHTMLtoPDF(html,orderinvoiceid);
                  }
              }
              else{
                this.toastrService.error("Something went wrong.")
              }
            },error => {
              this.spinnerService.hide();
              this.toastrService.error("Something went wrong.")
            } 
          )

          }
            this.toastrService.success("Successfully Created.");
            this.spinnerService.hide();
        }
    }
    else{
      this.toastrService.error("Please select all shipment details");
      this.spinnerService.hide();
    }
  }

  generateHTMLtoPDF(html, orderinvoiceid)
  {
    this.spinnerService.show();
    let InvoiceHTMLtoPDFRequest: any = {};
    this.spinnerService.show()
    $("#tb-pdfData").html('');
    $("#tb-pdfData").append(html);
    
    let pdfHTML : any = '<html class="no-js" lang=""> <head>'
                  +'<meta charset="utf-8">'
                  +'<meta http-equiv="x-ua-compatible" content="ie=edge">'
                  +'<title>Auction Deposit Invoice</title>'
                  +'<meta name="viewport" content="width=device-width, initial-scale=1">'
                  +'<link href="https://fonts.googleapis.com/css?family=Open+Sans:300,400,400i,600,600i,700,800" rel="stylesheet">'
                  +'<link rel="stylesheet" href="https://www.autorod.com/Assets/css/style-invoice.css">'
                  +'<link rel="stylesheet" href="https://www.autorod.com/Assets/css/normalize.css">'
                  // +'<style> .cont-uper-lft .top-lft {font-weight: 700 !important;font-size: 12px !important;vertical-align: top !important;} </style>'
                  +'</head>';
    pdfHTML += $(".cont-pdfHTML").html();
    pdfHTML += '<script src="https://www.autorod.com/Assets/js/modernizr-3.5.0.min.js"> '
              +'<script src="https://www.autorod.com/Assets/js/jquery-3.2.1.min.js">  </html>';

    InvoiceHTMLtoPDFRequest.OrderInvoiceID = orderinvoiceid;
    InvoiceHTMLtoPDFRequest.GridHtml = pdfHTML;
    InvoiceHTMLtoPDFRequest.DocumentTypID = 1;
  
    this.invoiceService.InvoiceHTMLtoPDF(InvoiceHTMLtoPDFRequest)
    .subscribe(res => {
          let path: any = res;
          this.downloadLink = path;
          $("#btnGenerate").hide();
          $("#btnGenerate").text('Generate PDF')
          $("#btnDownload").show();
          $("#btnSendEmail").show();
          this.spinnerService.hide();  
      },error => {
        this.spinnerService.hide();
        this.toastrService.error("Something went wrong.")
      } 
    );
  }

  sendEmail()
  {
      this.spinnerService.show();
      this.invoiceService.SendEmail(this.invoiceResponseVM)
      .subscribe( res => {
          let IsSent : any  = res;
          if(IsSent){
            this.toastrService.success("Email successfully sent.");
          }
          else {
            this.toastrService.error("Something went wrong.");
          }
      },error => {  
        this.spinnerService.hide();
        this.toastrService.error("Something went wrong.")
      } );

  }

  downloadPDF()
  {
    window.open(this.downloadLink,"_blank");
  }

  // dashboard detail functionality 
  AuctionDepositInvoiceDetails() {
    this.invoiceService.getInvoiceDetail()
      .subscribe(res => {
        let _data_: any = res;
        if (_data_.IsSuccess) {
          this.invoicedetails = _data_.Data;
          this.invoicedetails.CustomerDetail = _data_.Data.CustomerDetail;
          this.invoicedetails.BankDetail = _data_.Data.BankDetail;
          
          this.invoicedetails.BankDetailList = _data_.Data.BankDetailList;

          this._selectedBank.id = this.invoicedetails.BankDetail.Id;

          this.invoicedetails.InvoiceNumber = _data_.Data.InvoiceNumber;
          this.invoicedetails.EncryptedOrderInvoiceId = _data_.Data.EncryptedOrderInvoiceId;
          this.invoiceResponseVM.OrderInvoiceId = _data_.Data.EncryptedOrderInvoiceId;
          this.Get_CustomerAddressList(1);
          if(this.invoicedetails.BankDetail.CurrencyCode == "JPY")
          {
              this.selectedCurrencyCode = 2;
              $("#rdYen").prop("checked",true);
              $("#lblCurrencyCode").text('JPY')
          }
          else{
            this.selectedCurrencyCode = 1;
              $("#rdDollar").prop("checked",true);
              $("#lblCurrencyCode").text('USD')
          }
          
          this.Customer.Name = this.invoicedetails.CustomerDetail.CustomerName;
          this.Customer.Address = this.invoicedetails.CustomerDetail.CustomerAddress;
          this.getInvoiceDetails()
        } else {
          this.toastrService.error(_data_.Errors[0])
        }

      })
  }

  getInvoiceDetails() {
    var customerInformation: CustomerInformation = this.customerInformation;
    this.invoiceService.getShipmentDetail(this.invoicedetails.CustomerDetail.MemberShipID)
      .subscribe(res => {
        this.spinnerService.show();
        this.shipmentDetail = res.data;
        let customer: any = this.invoicedetails.CustomerDetail
        this.customerInformation = this.invoicedetails.CustomerDetail;
        if (this.shipmentDetail && this.shipmentDetail.country.length) {
          for (let i = 0; i < this.shipmentDetail.country.length; i++) {
            if (customer.ShipmentCountryId) {
              if (customer.ShipmentCountryId == this.shipmentDetail.country[i]['id']) {
                this.customerShipmentDetail.ShipmentCountry = this.shipmentDetail.country[i];
                this.selectedShipmentCountry(this.shipmentDetail.country[i]);
              }
            }

            if (customer.CountryId) {
              if (customer.CountryId == this.shipmentDetail.country[i]['id']) {
                this.customerShipmentDetail.ShipmentCountry = this.shipmentDetail.country[i];
                this.selectedShipmentCountry(this.shipmentDetail.country[i]);
              }
            }

          }
        }

        setTimeout(() => {
          $("#ddlShipmentType").val("0: 0");
        },1000);
        
      })
      this.spinnerService.hide();
  }

  selectedShipmentCountry(country: ShipmentCountry) {
    this.filterFreightType = []
    this.filteredShipmentPorts = this.shipmentDetail.port.filter(x => x.countryCode == country.code)
    this.invoicedetails.CustomerDetail.ShipmentCountryId = country.id;
    this.selectedBank(country.id);
    if (this.filteredShipmentPorts.length) {
      this.customerShipmentDetail.ShipmentPort = this.filteredShipmentPorts[0];
      for (let i = 0; i < this.filteredShipmentPorts.length; i++) {
        if (this.customerInformation.PortId == this.filteredShipmentPorts[i]['id']) {
          this.customerShipmentDetail.ShipmentPort = this.filteredShipmentPorts[i];
          break;
        }
      }
      this.selectFreightType();
    }


  }

  selectFreightType() {
    this.filterFreightType = this.shipmentDetail.shipmentterm.filter(x => x.countryCode == this.customerShipmentDetail.ShipmentCountry.code && x.portId == this.customerShipmentDetail.ShipmentPort.id)
    if (this.filterFreightType.length == 1) {
      this.filterFreightType[0].selected = true
      this.customerShipmentDetail.ShipmentTerm = this.filterFreightType[0];
    }
  }

  ShipmentDetailValidation(): boolean {
    // if(!this.customerShipmentDetail.QuatationType){
    //   this.toastrService.error("Please select quatation type");
    //   return false
    // }
    if (!this.customerShipmentDetail.ShipmentCountry) {
      this.toastrService.error("Please select shipment country");
      return false
    }
    if (!this.customerShipmentDetail.ShipmentPort) {
      this.toastrService.error("Please select shipment port");
      return false
    }
    if (!this.customerShipmentDetail.ShipmentType) {
      this.toastrService.error("Please select shipment type");
      return false
    }
    if (!this.customerShipmentDetail.ShipmentTerm) {
      this.toastrService.error("Please select freight type");
      return false
    }
    return true
  }

  itemCountChange(e, value, indexNo) {

    if(this.arrAmount.length){
      let amountupdated : boolean = false;
      for(let i=0;i<this.arrAmount.length;i++){
        if(this.arrAmount[i]['key'] == indexNo){
          this.arrAmount[i]['amount'] = value;
          amountupdated = true ;
          break;
        }
      }

      if(!amountupdated){
        this.arrAmount.push({
          key : indexNo ,
          amount : value
        })  
      }

    }else{
      this.arrAmount.push({
        key : indexNo ,
        amount : value
      })
    }
    
    this.modelChanged.next(e);
  }

  itemDescChange(e, value, indexNo){

    if(this.arrDescription.length){
      let amountupdated : boolean = false;
      for(let i=0;i<this.arrDescription.length;i++){
        if(this.arrDescription[i]['key'] == indexNo){
          this.arrDescription[i]['description'] = value;
          amountupdated = true ;
          break;
        }
      }

      if(!amountupdated){
        this.arrDescription.push({
          key : indexNo ,
          description : value
        })  
      }

    }else{
      this.arrDescription.push({
        key : indexNo ,
        description : value
      })
    }
    
    this.modelChanged2.next(e);
  }

  selectedBank(countryId)
  {
    let selectedbankdetail : any;
    
    if(countryId && countryId != null && ( countryId == 239 || countryId == 220 || countryId == 240)){
      
      this._selectedBank.id = this.invoicedetails.BankDetailList.
      filter(x => x.SwiftCode == "" && x.CountryId == countryId && x.CurrencyCode == 'USD')[0].Id;

      selectedbankdetail = this.invoicedetails.BankDetailList.find((e)=>{
        if(e.Id == parseInt(this._selectedBank.id)){
          return e
        }
      })
      $("#ddlBank").val(this._selectedBank.id);
    }
    else if ( countryId && countryId != null && ( countryId != 239 || countryId != 220 || countryId != 240)) {
    
      this._selectedBank.id = this.invoicedetails.BankDetailList.
      filter(x => x.SwiftCode != "" && x.CurrencyCode == 'USD')[0].Id;

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
    }else{
      this.selectedCurrencyCode = 2;
      $("#rdYen").prop("checked",true);
        $("#lblCurrencyCode").text('JPY')
        $("#bankAN").text(selectedbankdetail.BeneficiaryAccountNumber);
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

  Get_CustomerAddressList(checkOnLoad:number){
    this.invoicedetails.ThirdPartyCustomersList = null;
    this.invoiceService.Get_CustomerAddresses().subscribe( res =>{
       this.invoicedetails.ThirdPartyCustomersList = res.Data;
       this.SelectedCustomer(checkOnLoad);
    })
  }

  // END

}