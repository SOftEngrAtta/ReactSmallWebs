// modules
import { Component, OnInit, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

// services
import { DataService } from '../../Services/data.service';
import { StorageService } from '../../Services/storage.service';
import { HelperService } from '../../Services/helper.service';

// models
import { CompleteOrder } from '../../models/complete-order';
import { BidPriceOrderDetail } from '../../models/bidpriceorder';
import { DocumentDetail } from '../../models/document-detail';

import 'rxjs/Rx';


declare var $

@Component({
  selector: 'app-home',
  templateUrl: './orderdetail.component.html',
  styleUrls: ['./orderdetail.component.css']
})
export class OrderDetail implements OnInit {
  orderGroups: any
  completeOrder: CompleteOrder
  selectedOrderDetails: BidPriceOrderDetail[] = []
  slideConfig: any
  slideConfigCarImageSlider: any
  slideConfigCarImageSliderSmall: any
  selectedBit: DocumentDetail
  selectedCarModel: BidPriceOrderDetail
  documentDetails: DocumentDetail[] = []
  showNullDiv: boolean = true
  showDocDiv: boolean = false
  showImageSliderDiv: boolean = false
  trackOrder: boolean = false
  trackOrderDone: boolean = false;
  groupIndex: number = 0
  carIndex: number = 0
  closeResult: string
  vesselMMSI: string
  vesselMapUrl: any
  isCustomerLogin: boolean = false;
  displayPdfView: any = {
    id: 0,
    isEnabled: false,
    format: '',
    url: '',
    filevalue: ''
  }

  zoom_number: number = 0.7;


  selectedDocumentDetail: any;

  emailData: any = {
    OrderDetailId: '',
    DocumentTypeId: 0
  }

  constructor(
    private dataService: DataService,
    private route: ActivatedRoute,
    private elementRef: ElementRef,
    private modalService: NgbModal,
    public sanitizer: DomSanitizer,
    public storageservice: StorageService,
    private helpherservice: HelperService
  ) {
    this.completeOrder = new CompleteOrder()
    this.slideConfig = {
      infinite: false,
      slidesToShow: 7,
      slidesToScroll: 1,
      responsive: [
        {
          breakpoint: 1024,
          settings: 'unslick'
        }
      ]
    }
    this.slideConfigCarImageSlider = {
      slidesToShow: 1,
      slidesToScroll: 1,
      arrows: true
    }
    this.slideConfigCarImageSliderSmall = {
      focusOnSelect: true,
      centerMode: true,
      centerPadding: 0,
      slidesToShow: 3,
      horizontal: true,
      slidesToScroll: 1,
      dots: false,
      arrows: false,
      responsive: [
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 1
          }
        }
      ]
    }
  }

  ngOnInit() {

    let customer_login = this.storageservice.get('customerlogin');
    this.isCustomerLogin = (customer_login) ? true : false;

    this.loadJs()
    this.getCompleteOrderDetail(this.getOrderId())
  }

  open(content) {
    this.modalService.open(content, { size: 'lg' }).result.then(
      result => {
        this.closeResult = `Closed with: ${result}`
      },
      reason => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`
      }
    )
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC'
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop'
    } else {
      return `with: ${reason}`
    }
  }

  getOrderId(): string { return this.route.snapshot.queryParams['orderId'] }

  getCompleteOrderDetail(orderId: string) {

    this.dataService.getCompleteOrderDetail(orderId).subscribe(res => {
      if (res.IsSuccess) {
        this.completeOrder = res.Data
        // if (this.completeOrder.OrderItems.length == 1) {
        //   if (this.completeOrder.OrderItems[0].OrderDetails.length == 1) {
        //     this.completeOrder.OrderItems = []
        //     return
        //   }
        // }

        if (this.completeOrder.OrderItems.length > 0) {
          this.selectedOrderDetails = this.completeOrder.OrderItems[0].OrderDetails
          this.selectedModel(this.selectedOrderDetails[0], 0)
        }
      }
    })
  }

  loadJs() {
    $('html, body').animate({ scrollTop: 0 }, 'fast')
    $('body').removeClass('main_login')
  }

  loadjsCarSlider() {
    setTimeout(() => {
      $('.car-images-big').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: true,
        asNavFor: '.car-images-small-list'
      })
    }, 1000)
    $('.car-images-small-list').slick({
      focusOnSelect: true,
      centerMode: true,
      centerPadding: 0,
      slidesToShow: 3,
      horizontal: true,
      slidesToScroll: 1,
      asNavFor: '.car-images-big',
      dots: false,
      arrows: false,
      responsive: [
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 1
          }
        }
      ]
    })
  }

  selectedCarList(selectedOrderDetails: BidPriceOrderDetail[], index) {
    this.selectedCarModel = null
    this.documentDetails = []
    this.selectedOrderDetails = selectedOrderDetails
    this.groupIndex = index
    this.selectedModel(this.selectedOrderDetails[0], 0)
  }

  selectedModel(selectedCarModel: BidPriceOrderDetail, index) {
    this.selectedCarModel = selectedCarModel
    this.getViewOrderDetailById(this.selectedCarModel.OrderDetailId)
    // this.getViewOrderDetailById('SYD01dPZZ/E=')
    this.carIndex = index
  }

  getViewOrderDetailById(orderDetailId: string) {
    this.dataService.getViewOrderDetailById(orderDetailId).subscribe(res => {
      if (res.IsSuccess) {

        this.documentDetails = res.Data
        this.displayPdfView = {
          id: 0,
          format: '',
          isEnabled: false,
          url: '',
          filevalue: ''
        }
      }
    })
  }
  selectedBitHandler(bit: DocumentDetail, index: number) {

    this.selectedDocumentDetail = bit;
    this.trackOrderDone = false;
    if (bit.StatusType == "BL" || bit.StatusType == "Export Certificate" || bit.StatusType == "Export Certificate Translation" || bit.StatusType == "Inspection Certificate") {

      if (bit.OrderDetailDocument.length == 0) {
        this.helpherservice.displayMsg('error', 'No document found');
        return false;
      }

      this.dataService
        .getFileData(bit.OrderDetailDocument[0]['SourcePath'])
        .subscribe(res => {
          if (res.IsSuccess) {
            if (res.Data) {
              if (bit.StatusType == "Export Certificate Translation") {
                this.displayPdfView.filevalue = 'data:image/png;base64,' + res.Data;
                this.displayPdfView.id = bit.Type;
                this.displayPdfView.isEnabled = bit.IsEnabled;
                this.displayPdfView.url = 'data:image/png;base64,' + res.Data;
                this.displayPdfView.format = 'JPG';
              } else {
                var binaryImg = atob(res.Data);
                var length = binaryImg.length;
                var arrayBuffer = new ArrayBuffer(length);
                var uintArray = new Uint8Array(arrayBuffer);
                for (var i = 0; i < length; i++) {
                  uintArray[i] = binaryImg.charCodeAt(i);
                }
                this.displayPdfView.filevalue = 'data:application/octet-stream;base64,' + res.Data;
                this.displayPdfView.id = bit.Type;
                this.displayPdfView.isEnabled = bit.IsEnabled;
                this.displayPdfView.url = uintArray;
                this.displayPdfView.format = 'PDF'
              }
            }

            if (res.Message) { this.helpherservice.displayMsg('error', res.Message); }
          }
        })
    } else {
      this.displayPdfView.id = 0;
      this.displayPdfView.isEnabled = false;
      this.displayPdfView.url = '';
    }

    this.selectedBit = bit
    this.selectedBit.selectedIndex = index
    this.showNullDiv = false
    if (this.selectedBit.ViewType == 1) {
      this.showDocDiv = false
      this.showImageSliderDiv = true
      this.trackOrder = false
      return
    }
    if (this.selectedBit.ViewType == 2) {
      this.showDocDiv = true
      this.showImageSliderDiv = false
      this.trackOrder = false
      return
    }
    if (this.selectedBit.ViewType == 3) {
      this.showDocDiv = false
      this.showImageSliderDiv = false
      if (this.selectedBit.StatusId == 1110) this.trackOrderDone = true;
      else this.trackOrder = true;
      this.vesselMMSI = this.selectedBit.VesselMMSI
      this.vesselMapUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
        'https://area.autorod.com/vesselmap/index.html?trackVesselId=' + this.vesselMMSI
      )
      return
    }
    this.showNullDiv = true
    this.showDocDiv = false
    this.showImageSliderDiv = false
    this.trackOrder = false
  }

  pdfrendering(e) {
  }

  zoom(e) {
    if (e == 'in') {
      this.zoom_number = this.zoom_number + 0.1;
    }
    if (e == 'out') {
      this.zoom_number = (this.zoom_number > 0) ? this.zoom_number - 0.1 : 0;
    }
  }

  donwloadpdf() {
    var dlnk: any = document.getElementById('dwnldLnk');
    dlnk.href = this.displayPdfView.filevalue;
  }

  // send email functionality 
  sendEmail() {

    this.dataService.sendEmailForDocuments({
      OrderDetailId: this.selectedDocumentDetail['OrderDetailDocument'][0]['OrderDetailId'],
      DocumentTypeId: this.selectedDocumentDetail['OrderDetailDocument'][0]['DocumentTypeId']
    }).subscribe(res => {
      if(res.IsSuccess){
        if(res.Message) this.helpherservice.displayMsg('error' , res.Message);
        else this.helpherservice.displayMsg('success', 'Email has been send successfully');
      }
    })
  }


}
