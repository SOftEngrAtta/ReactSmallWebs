import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { InquireData } from '../../models/inquiredata'

import { StorageService } from '../../Services/storage.service';
import { HelperService } from '../../Services/helper.service';
import { SpecificQuotation } from '../../Services/quotation.service';


declare var $;

@Component({
	selector: 'app-inquire',
	templateUrl: './inquirenow.component.html',
	styleUrls: ['./inquirenow.component.css']
})
export class InquireNow implements OnInit {
    public inquiredata = new InquireData();
	@Input()
	set InquireNow(value : InquireData) {
		if (value) {
            this.inquiredata = value;
            $.fancybox.open({ src: '#openInquireNow', type: 'inline', });
		}
	}

	constructor(private storageService: StorageService,private helperService: HelperService, private quotationservice: SpecificQuotation ) { }

	ngOnInit() { }

    submitInq() {
        if (!this.inquiredata.CommentText) {
          this.helperService.displayMsg('error', 'Please enter text');
          return false;
        }
    
        let _token = this.storageService.getDecrypted('token');
    
        let data = {
          QuotationId: this.inquiredata.QuotationId,
          QuotationItemId: this.inquiredata.QuotationItemId,
          AuctionId: this.inquiredata.AuctionId,
          InquiryText: this.inquiredata.CommentText,
          APIUniqueId: this.inquiredata.ReferenceId,
          LotNo: this.inquiredata.LotNo,
          Source: this.inquiredata.AuctionSource,
          CustomerId: (_token && _token.AccessToken) ? _token.AccessToken : '',
          CountryId: this.inquiredata.CountryId ,
          ClientId : this.inquiredata.ClientId ,
          ProductId : this.inquiredata.ProductId 
        }

        if(this.inquiredata.QuotationId && this.inquiredata.QuotationItemId){ data['CustomerId'] = null}

        this.quotationservice
          .inquiredetail(data)
          .subscribe(res => {

            if (res.IsSuccess) {
              if (res.Message && res.Message != null) { this.helperService.displayMsg('error', res.Message) }
              else { 
                this.helperService.displayMsg('success','Thank you for your inquiry! You will receive reply from Car Hub Japan by email or phone soon!');$.fancybox.close()
              }
            } else { this.helperService.displayMsg('error', 'inquiry response faild'); }
          })
      }

}
