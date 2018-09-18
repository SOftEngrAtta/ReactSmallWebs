// modules 
import { Component,OnInit } from '@angular/core';
import { Router,ActivatedRoute,Params } from '@angular/router';

// model
import { ManufactureDetail } from './../../models/manufactureDetail';
import { InquireData } from '../../models/inquiredata';

// services
import { HelperService } from '../../Services/helper.service'
import { SpecificQuotation } from '../../Services/quotation.service';
import { ToastrService } from '../../Services/toastr.service';
import { UnitDetailService } from '../../Services/unit-detail.service';
import { StorageService } from '../../Services/storage.service';


declare var $;


@Component({
    selector: 'app-profile',
    templateUrl: './quotation.component.html',
    styleUrls: ['./quotation.component.css']
})
export class Quotation implements OnInit {



    public quotationDetail: Array<any> = [];
    public mulitImagesSlider: Array<any> = [];
    public imagesSlider: Array<any> = [];
    public selectedCar: any;
    public manufactureYearCheck: any = { makerId: '', chassisNo: '' }
    public quoDetail: any;
    public manufactureDetail: any = new ManufactureDetail();
    public quotationId: any;

    public currencyCode = "";
    public activecurrency = "";
    slideConfig = { "slidesToShow": 1, "slidesToScroll": 1 };

    public selectedIndex = 0;

    productionloader: boolean = false;
    inquiryloader: boolean = false;
    


    public isCnfBase: boolean = false;

    public requesttranslationOptions = [
        { name: "Select All", isSelected: false },
        { name: "Snow Tyres", isSelected: false, id: 1 },
        { name: "Cigarette burn/hole", isSelected: false, id: 2 },
        { name: "Rust or Corrosion", isSelected: false, id: 3 },
        { name: "Interior pet car", isSelected: false, id: 4 },
        { name: "Oil leakage", isSelected: false, id: 5 },
        { name: "Slide door/ (s) not working", isSelected: false, id: 6 },
        { name: "Power boot not working / not functional", isSelected: false, id: 7 },
        { name: "Power seats not working / not functional", isSelected: false, id: 8 },
        { name: "Power window not working", isSelected: false, id: 9 },
        { name: "A/C not working / not functional", isSelected: false, id: 10 },
        { name: "Knocking sound ENGINE (engine noise)", isSelected: false, id: 11 },
        { name: "Panel knocking sound", isSelected: false, id: 12 },
        { name: "Crack on dashboard / bumper", isSelected: false, id: 13 },
        { name: "Faded color bumper / rear spoiler", isSelected: false, id: 14 },
        { name: "Audio missing", isSelected: false, id: 15 },
        { name: "Stone chip on windscreen", isSelected: false, id: 16 },
        { name: "Under body corrosion", isSelected: false, id: 17 },
        { name: "Repair marks", isSelected: false, id: 18 },
        { name: "Floor matt missing", isSelected: false, id: 19 },
        { name: "Transmission Noise Or Failure ", isSelected: false, id: 20 },
        { name: "Bubbles on dashboard", isSelected: false, id: 21 },
        { name: "Check lamp On", isSelected: false, id: 22 }
    ]

    public makers: Array<any> = [
        { id: "0,9", name: "Toyota" },
        { id: "1,6", name: "Nissan" },
        { id: "2,5", name: "Mitsubishi" },
        { id: "3,3", name: "Isuzu" },
        { id: "4,8", name: "Suzuki" },
        { id: "5,7", name: "Subaru" },
        { id: "6,1", name: "Daihatsu" },
        { id: "7,4", name: "Mazda" },
        { id: "8,2", name: "Honda" }
    ]

    public displayPlanIndex: number = 0;

    public carUniqueId : String = '';
    
    public _inquireData = new InquireData();
    public inquirenow : InquireData;

    constructor(private helperservice: HelperService,
        private quotationservice: SpecificQuotation,
        private toastrservice: ToastrService,
        private route: ActivatedRoute,
        private unitdetailservice: UnitDetailService,
        private storageservice : StorageService) { }

    ngOnInit() {

        $('body').removeClass('main_login');
        this.route.queryParams.subscribe(params => {
            this.quotationId = params.id;
        })
        let uID = this.storageservice.getDecrypted('u_c_id');
        this.carUniqueId = (uID)?uID:'';
        this.getquotationdetail();
    }

    getquotationdetail() {
        this.mulitImagesSlider = [];
        this.quotationservice
            .getquotationdetail(this.quotationId, this.currencyCode)
            .subscribe(res => {
                let _data_: any = res;

                if (_data_.IsSuccess) {
                    this.quotationDetail = _data_.Data;

                    this.isCnfBase = (this.quotationDetail[0]['PricingTypeId'] == 2) ? true : false;

                    if (this.quotationDetail && this.quotationDetail.length && this.quotationDetail[0].QuotationData && this.quotationDetail[0].QuotationData.CurrencySymbol) {
                        this.currencyCode = this.quotationDetail[0].QuotationData.CurrencyCode;
                        if (!this.activecurrency) {
                            this.activecurrency = this.currencyCode;
                        }
                    } else {
                        this.currencyCode = "JPY";
                        if (!this.activecurrency) {
                            this.activecurrency = this.currencyCode;
                        }

                    }
                    if (this.quotationDetail && this.quotationDetail.length) {
                        
                        // this.storageservice.setEncrypted('_u_c_id' , this.quotationDetail)

                        for (let i = 0; i < this.quotationDetail.length; i++) {
                            this.quotationDetail[i].AuctionData.AuctionImage = this.seperateImages(this.quotationDetail[i].AuctionData.AuctionImage);
                            this.mulitImagesSlider.push({
                                index: i,
                                path: this.quotationDetail[i].AuctionData.AuctionImage[0],
                                id: this.quotationDetail[i].AuctionData.ModelId,
                                booked: this.quotationDetail[i].IsBooked
                            })
                        }


                        this.selectedCar = (this.selectedIndex)?this.quotationDetail[this.selectedIndex]:this.quotationDetail[0];
                        this.imagesSlider = (this.selectedIndex)?this.quotationDetail[this.selectedIndex].AuctionData.AuctionImage:this.quotationDetail[0].AuctionData.AuctionImage;
                        this.quoDetail = (this.selectedIndex)?this.quotationDetail[this.selectedIndex].QuotationData:this.quotationDetail[0].QuotationData;
                        
                        this.manufactureYearCheck.chassisNo = this.selectedCar.AuctionData.Body + '-';


                        for (let i = 0; i < this.makers.length; i++) {
                            if (this.selectedCar.AuctionData.Make.toLowerCase() == this.makers[i]['name'].toLowerCase()) {
                                this.manufactureYearCheck.makerId = this.makers[i]['id'];
                            }
                        }

                    }
                    setTimeout(() => { this.helperservice.quotationFunc();}, 500);
                }

            })
    }

    // separate image slider functionality 
    seperateImages(images_string) {
        if (images_string)
            return images_string.split("#");
    }

    selectitem(data) {
        $('.slider-for').slick('unslick');
        $('.slider-nav').slick('unslick');
        this.selectedIndex = data.index;
        this.selectedCar = this.quotationDetail[data.index];
        this.manufactureYearCheck.chassisNo = this.selectedCar.AuctionData.Body + '-';
        this.imagesSlider = this.quotationDetail[data.index].AuctionData.AuctionImage;   
        setTimeout(() => { 
            $('.slider-for').slick({
                slidesToShow: 1,
                slidesToScroll: 1,
                arrows: false,
                fade: true,
                asNavFor: '.slider-nav'
              });
              $('.slider-nav').slick({
                slidesToShow: 5,
                slidesToScroll: 1,
                asNavFor: '.slider-for',
                dots: false,
                centerMode: true,
                vertical: true,
                focusOnSelect: true,
                responsive: [{
                  breakpoint: 767,
                  settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                    vertical: false,
                    dots: false,
                    arrows: false,
                    autoplay: true,
                  }
                },
                {
                  breakpoint: 480,
                  settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                    vertical: false,
                    dots: false,
                    arrows: false,
                    autoplay: true,
                  }
                }
          
                ]
              });
        }, 200);

        for (let i = 0; i < this.makers.length; i++) {
            if (this.selectedCar.AuctionData.Make.toLowerCase() == this.makers[i]['name'].toLowerCase()) {
                this.manufactureYearCheck.makerId = this.makers[i]['id'];
            }
        }
        
    }

    findProduction() {
        this.manufactureDetail.message = '';
        if (!this.manufactureYearCheck.makerId) {
            this.toastrservice.clear();
            this.toastrservice.error('Please select modal');
            setTimeout(() => { this.toastrservice.clear() }, 4000);
            return false;
        }

        if (!this.manufactureYearCheck.chassisNo) {
            this.toastrservice.clear();
            this.toastrservice.error('Please enter chassis Number');
            setTimeout(() => { this.toastrservice.clear() }, 4000);
            return false;
        }

        this.productionloader = true;
        this.unitdetailservice
            .getChassisDetail(this.manufactureYearCheck)
            .subscribe(res => {
                this.productionloader = false;
                this.manufactureDetail = res;
            })
    }

    bookNow(data) {
        if (this.selectedCar.IsBooked) {
            this.toastrservice.clear();
            this.toastrservice.error('This car is already booked');
            setTimeout(() => { this.toastrservice.clear() }, 4000);
        } else {
            this.quotationservice
                .bookorder(data.QuotationDetailId)
                .subscribe(res => {
                    let _data_ = res;
                    if (_data_.IsSuccess) {
                        if (this.mulitImagesSlider.length) {
                            this.mulitImagesSlider[this.selectedIndex]['booked'] = true;
                        }
                        this.selectedCar.IsBooked = true;
                        this.toastrservice.clear();
                        this.toastrservice.success('This car booked successfully');
                        setTimeout(() => { this.toastrservice.clear() }, 4000);
                    }
                })
        }
    }

    selectedcurrency(currency) {
        this.currencyCode = currency;
        this.activecurrency = currency;
        $('.slider-for').slick('unslick');
        $('.slider-nav').slick('unslick');
        this.getquotationdetail();
    }

    reqTeanslatedSheet() {

        let selectedchecklist: any = [];
        this.requesttranslationOptions.forEach(e => {
            if (e['isSelected'] && e['name'] != "Selected All") {
                selectedchecklist.push(e['id'])
            }
        })

        let data = {
            VehicleId: null,
            Lotnum: null,
            Source: null,
            AuctionId: this.quotationDetail[0]['AuctionData']['EncryptAuctionId'],
            QuotationItemId: this.quotationDetail[0]['QuotationItemData']['QuotationItemId'],
            OrderDetailId: null,
            IsBid: false,
            IsHot: false,
            CheckList: (selectedchecklist.length) ? selectedchecklist.join(',') : ''
        };
        this.unitdetailservice
            .translatedApi(data)
            .subscribe(res => {
                let _data_: any = res;
                if (_data_.IsSuccess) {
                    if (_data_.Data.TranslateId) {
                        this.toastrservice.clear();
                        this.toastrservice.success('Translation requested successfully');
                        setTimeout(() => { this.toastrservice.clear() }, 4000);
                        $.fancybox.close();
                    } else {
                        this.toastrservice.clear();
                        this.toastrservice.error('Translation already requested');
                        setTimeout(() => { this.toastrservice.clear() }, 4000);
                    }
                }
            })

    }

    afterChange(e) { }


    // selected all
    selectalltrans(_bol) {
        this.requesttranslationOptions.forEach(e => {
            e['isSelected'] = _bol;
        })
    }

    openTranSheet() {
        this.requesttranslationOptions.forEach(e => {
            e['isSelected'] = false;
        })
        $.fancybox.open({
            src: '#quotationReqTranslation',
            type: 'inline',
        });
    }


    /*************************
     * inquiry functionality 
     *************************/
    openInquireNowPopUp(){
        this._inquireData.Images = this.selectedCar.AuctionData['AuctionImage'];
        this._inquireData.Make = this.selectedCar.AuctionData['Make'];
        this._inquireData.Model = this.selectedCar.AuctionData['Model'];
        this._inquireData.Engine = this.selectedCar.AuctionData['EngineCC'];
        this._inquireData.ReferenceId = this.selectedCar.AuctionData.APIUniqueId;
        this._inquireData.Mileage = this.selectedCar.AuctionData['Mileage'];
        this._inquireData.Year = this.selectedCar.AuctionData['Year'];
        this._inquireData.QuotationId =  this.quotationId;
        this._inquireData.QuotationItemId = this.selectedCar.QuotationItemData.QuotationItemId;
        this._inquireData.AuctionId = this.selectedCar.AuctionData.EncryptAuctionId;
        this._inquireData.AuctionSource = null;
        this._inquireData.LotNo = null;
        this._inquireData.VehiclePrice = this.selectedCar.QuotationDetailDataDTO[this.displayPlanIndex]['BidPrice'];
        this._inquireData.TotalPrice = this.selectedCar.QuotationDetailDataDTO[this.displayPlanIndex]['CNF'];
        this._inquireData.CountryId = (this.quoDetail && this.quoDetail.CountryId) ? this.quoDetail.CountryId : 0;
        this._inquireData.Port = (this.selectedCar.QuotationData && this.selectedCar.QuotationData.PortName)?this.selectedCar.QuotationData.PortName:'';
        this._inquireData.Location = (this.selectedCar.QuotationData && this.selectedCar.QuotationData.CountryName)?this.selectedCar.QuotationData.CountryName:'';
        let inquiredatacomplete = Object.assign({},this._inquireData);
        this._inquireData = new InquireData();
        this.inquirenow = inquiredatacomplete;
    } 

}
