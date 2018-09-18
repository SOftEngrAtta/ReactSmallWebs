import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { AppConfig } from '../app.config';
import { HttpClient } from '@angular/common/http';

// models
import { FavouriteCar } from '../models/favourite';

@Injectable()
export class UnitDetailService {

  public apiBaseUrl : any ;
  public pricing_v2_key : any 
  constructor(
    private apiService: ApiService,
    private config: AppConfig,
    private http: HttpClient
  ) { this.apiBaseUrl = this.config.getEnv('env');this.pricing_v2_key = this.config.getV2('env');}

  /**
   *
   * @param data {Object} // unit detail object
   *
   */

  _getUnitPrices(data) {
    data['clientkey'] = this.pricing_v2_key['key'];
    return this.apiService.post(
      this.apiBaseUrl.chjPort8051 + 'QuotationInvoice/ManageQuotationByData',
      data
    );
  }

  /**
   *
   * @param data {Object}
   * @param data.makerId
   * @param data.chassisNo
   *
   */

  getChassisDetail(data) {
    let _url = this.apiBaseUrl.manufacDetail+'Service/FindChassisNumber?chassisNumber='+data.chassisNo +'&makeId='+data.makerId;
    return this.http.jsonp(_url, 'callback');
  }
  /**
   *
   * @param id // id is car modal id
   */

  getmodeldetail(id) {
    return this.apiService.get(
      this.apiBaseUrl.chjPort81 + 'Search/Auction/' + id + '/Stats'
    );
  }

  /**
   *
   * @param data {Object} // all keys use in query param
   * @param data.modelId
   * @param data.year
   * @param data.minMileage
   * @param data.maxMilage
   * @param data.condition
   * @param data.page
   * @param data.count
   */

  salesStatisticsRecords(data) {
    var queryparams =
      'vehicle/Auction/' +
      data.modelId +
      '/stats?year=' +
      data.year +
      '&minMileage=' +
      data.minMileage +
      '&maxMileage=' +
      data.maxMileage +
      '&condition=&page=' +
      data.page +
      '&count=' +
      data.count;
    return this.apiService.get(this.apiBaseUrl.chjPort81 + queryparams);
  }

  /**
   *
   * @param data {Object}
   * @param data.source
   * @param data.lotNum
   * @param data.id
   */

  unitDetailData(data) {
    var queryparam =
      'Quotation/GetVehicleDetail/' +
      data.source +
      '/' +
      data.lotNum +
      '/' +
      data.id;
    return this.apiService.get(this.apiBaseUrl.chjPort850 + queryparam);
  }

  
   /**
   *
   * @param data {Object}
   * @param data.AddRemoveType
   * @param data.CountryId
   * @param data.ClientId
   * @param data.ProductId
   * @param data.ReferenceId 
   * @param data.Lotnum
   * @param data.Source 
   * @param data.AuctionId
   */

  favourite(data : FavouriteCar) {
    var queryparam = 'Quotation/AddRemoveFavourite?AddRemoveType='+data.AddRemoveType+'&CountryId='+data.CountryId+'&ClientId='+data.ClientId+'&ProductId='+data.ProductId+'&ReferenceId='+data.ReferenceId+'&Lotnum='+data.LotNumber+'&Source='+data.Source+'&AuctionId='+data.AuctionId
    return this.apiService.get(this.apiBaseUrl.chjPort850 + queryparam);
  }

  /**
   *
   * @param data {Object}
   * @param data.AuctionId // string
   * @param data.QuotationItemId // string
   * @param data.OrderDetailId // string
   * @param data.IsBid // boolea
   * @param data.IsHot // boolean
   */

  translatedApi(data) {
    return this.apiService.post(
      this.apiBaseUrl.chjPort850 + 'Translate/RequestForTranslatedSheet',
      data
    );
  }
}
