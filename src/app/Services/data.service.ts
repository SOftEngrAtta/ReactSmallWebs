import { Injectable } from '@angular/core'
import { ApiService } from './api.service'
import { Make } from '../models/make'
import { VehicleModel } from '../models/vehicleModels'
import { AppConfig } from '../app.config';
import { AuctionSearch } from '../models/auctionSearch'
import { CustomerAddressDetail } from '../models/CustomerAddressDetail';
import { NotifyMeModel } from '../models/NotifyMeModel';

@Injectable()
export class DataService {

  public apiBaseUrl : any ;
  public pricing_v2_key : any ;

  constructor(
    private apiService: ApiService,
    private config: AppConfig
  ) { this.apiBaseUrl = this.config.getEnv('env');this.pricing_v2_key = this.config.getV2('env');}

  // chjPort81URL = this.apiBaseUrl.chjPort81

  getMakes() {
    return this.apiService.get(this.apiBaseUrl.chjPort81 + 'Makes')
  }

  getMakesModels(make: Make, source) {
    return this.apiService.get(
      this.apiBaseUrl.chjPort81 + 'Makes/' + source + '/' + make.Id + '/Models'
    )
  }

  searchVehicleModel(vehicleModel: VehicleModel, source: string) {
    return this.apiService.get(
      this.apiBaseUrl.chjPort81 + 'Search/' + source + '/' + vehicleModel.Id
    )
  }

  searchAuction(auctionSerach: AuctionSearch) {
    return this.apiService.post(
      this.apiBaseUrl.chjPort81 + 'Search',
      auctionSerach
    )
  }

  getCustomerFavourites() {
    return this.apiService.get(
      this.apiBaseUrl.chjPort850 + 'Customer/GetFavourites'
    )
  }

  getQuotationDetail(quotationId: string) {
    return this.apiService.get(
      this.apiBaseUrl.chjPort850 +
        'Quotation/GetQuotationDetail?encryptedQuotationId=' +
        quotationId
    )
  }

  deactivateQuotationItem(quotationItemId: string) {
    return this.apiService.post(
      this.apiBaseUrl.chjPort850 +
        'Quotation/DeactivateQuotationItem?encryptedQuotationItemId=' +
        quotationItemId,
      quotationItemId
    )
  }

  getMyQuotation() {
    return this.apiService.get(
      this.apiBaseUrl.chjPort850 + 'Quotation/GetMyQuotations'
    )
  }

  moveQuotationItem(quotationId: string, quotationItemId: string) {
    return this.apiService.post(
      this.apiBaseUrl.chjPort850 +
        'Quotation/MoveQuotationItem?encryptedQuotationId=' +
        quotationId +
        '&encryptedQuotationItemId=' +
        quotationItemId,
      quotationItemId
    )
  }

  generateShortUrl(quotationId: string) {
    return this.apiService.get(
      this.apiBaseUrl.chjPort850 +
        'Quotation/GenerateLink?QuotationId=' +
        quotationId
    )
  }

  getIncompleteOrders() {
    return this.apiService.get(this.apiBaseUrl.chjPort850 + 'Order/GetIncompleteOrders/')
  }

  getMyOrders() {
    return this.apiService.get(
      this.apiBaseUrl.chjPort850 + 'Order/GetMyOrders/'
    )
  }

  getQuotationList(quotationId: string) {
    return this.apiService.get(
      this.apiBaseUrl.chjPort850 +
        'Quotation/GetQuotationTaskbar?QuotationId=' +
        quotationId
    )
  }

  /**
   * 
   * @param id // order id
   */ 
  getOrdersList(id){
    return this.apiService.get(this.apiBaseUrl.chjPort850 +'Order/GetOrderTaskbar?OrderId=' +id)
  }

  /**
   * @param id // string
   */
  getorderdetail(id) {
    return this.apiService.get(
      this.apiBaseUrl.chjPort850 + 'Order/GetOrderDetailByOrderId?OrderId=' + id
    )
  }

  /**
   * @param itemId //string
   * @param detailId // string
   */
  removeitem(itemId, detailId) {
    return this.apiService.post(
      this.apiBaseUrl.chjPort850 +
        'Order/RemoveItemFromGroup?orderDetailId=' +
        detailId +
        '&orderItemId=' +
        itemId,
      ''
    )
  }

  orderQuotationItem(QuotationId, QuotationItemId, QuotationDetailId) {
    return this.apiService.get(
      this.apiBaseUrl.chjPort850 +
        'Order/ProceedToOrder?QuotationId=' +
        QuotationId +
        '&QuotationItemId=' +
        QuotationItemId +
        '&QuotationDetailId=' +
        QuotationDetailId
    )
  }
  /**
   * @param id // string
   */
  _getmovegroups(id) {
    let url_query = 'Order/GetAllOrderItemsByOrderId?orderId=' + id
    return this.apiService.get(this.apiBaseUrl.chjPort850 + url_query)
  }

  /**
   * @param data {Object}
   * @param data.orderId // string
   * @param data.itemId // string
   * @param data.count // string
   */

  purchasedcarcount(data) {
    let url_query =
      'Order/PurchaseItemCount?EncryptedOrderId=' +
      data.orderId +
      '&EncryptedOrderItemId=' +
      data.itemId +
      '&ItemsCountToBePurchased=' +
      data.count
    return this.apiService.get(this.apiBaseUrl.chjPort850 + url_query)
  }

  /**
   * @param data {object}
   * @param data.orderItemID // string
   * @param dara.orderDetailId // string
   */
  changeorderintoanothergroup(data) {
    return this.apiService.post(
      this.apiBaseUrl.chjPort850 + 'Order/ChangeItemGroup',
      data
    )
  }

  /**
   *
   * @param id // string
   */
  _placeorder(id) {
    let url_query = 'Order/PlaceOrderByOrderId?orderId=' + id
    return this.apiService.post(this.apiBaseUrl.chjPort850 + url_query, '')
  }

  /**
   * @param id // string
   */
  addnewgroup(id) {
    return this.apiService.get(
      this.apiBaseUrl.chjPort850 + 'Order/AddGroupInOrder?OrderId=' + id
    )
  }

  getPaymentHistory() {
    return this.apiService.get(
      this.apiBaseUrl.chjPort850 + 'Payment/GetPaymentHistory'
    )
  }

  getDepositFundType() {
    return this.apiService.get(
      this.apiBaseUrl.chjPort850 + 'Payment/GetDepositFundType'
    )
  }

  getAvailableCurrency() {
    return this.apiService.get(
      this.apiBaseUrl.chjPort850 + 'Payment/GetAvailableCurrency'
    )
  }

  getPaymentMethod() {
    return this.apiService.get(
      this.apiBaseUrl.chjPort850 + 'Payment/GetPaymentMethod'
    )
  }

  getAllCurrency() {
    return this.apiService.get(
      this.apiBaseUrl.chjPort850 + 'Customer/GetAllCurrency'
    )
  }

  getPaymentRedirectorUrl(PaymentOrderId, PaymentMethodId) {
    return this.apiService.get(
      this.apiBaseUrl.chjPort850 +
        'Payment/GetFundDepositUrl?PaymentOrderId=' +
        PaymentOrderId +
        '&PaymentMethodId=' +
        PaymentMethodId
    )
  }

  generateFundDeposit(objFundDepositRequestModel) {
    return this.apiService.post(
      this.apiBaseUrl.chjPort850 + 'Payment/GenerateFundDepositUrl',
      objFundDepositRequestModel
    )
  }

  getPaymentUrl(encryptedQueryString) {
    return this.apiService.get(
      this.apiBaseUrl.chjPort850 +
        'Payment/GetPaymentUrl?EncryptedQueryString=' +
        encryptedQueryString
    )
  }

  // update profile api
  updateprofile(data) {
    let _data_ = Object.assign({},data);
    _data_['ReceiveNotificationForAutorod'] = (_data_['ReceiveNotificationForAutorod'] == 'Yes')?true:false;
    return this.apiService.post(this.apiBaseUrl.chjPort850 + 'Customer/UpdateProfile',_data_);
  }

  getMembershipDetails() {
    return this.apiService.get(
      this.apiBaseUrl.chjPort850 + 'Customer/GetMembershipDetails'
    )
  }

  sendEmailToCustomer(EmailData) {
    return this.apiService.post(
      this.apiBaseUrl.chjPort850 + 'Invoice/SendEmailInvoice',
      EmailData
    )
  }

  sendEmailForDocuments(EmailData){
    return this.apiService.post(
      this.apiBaseUrl.chjPort850 + 'EmailAndServiceService/SendEmailForDocuments',
      EmailData
    )
  }

  upgradeMembership(selectedMembershipId: string, selectedCurrencyId: string) {
    return this.apiService.post(
      this.apiBaseUrl.chjPort850 +
        'Customer/UpgradeMembership?EncryptedMembershipId=' +
        selectedMembershipId +
        '&EncryptedCurrencyId=' +
        selectedCurrencyId,
      selectedMembershipId
    )
  }
  // get makes and models api
  getmakes() {
    return this.apiService.get(this.apiBaseUrl.chjPort8051 + 'FetchData/GetAllMakes')
  }
  getmodels(id) {
    return this.apiService.get(this.apiBaseUrl.chjPort8051 + 'FetchData/GetModelByMakeId?Make_Id=' + id)
  }

  getOrdersByAgent(id) {
    return this.apiService.get(this.apiBaseUrl.chjPort850 + 'Order/GetOrdersByAgent/?DataType='+id)
  }

  getUtilizationDetail(encryptedOrderDetailId) {
    return this.apiService.get(
      this.apiBaseUrl.chjPort850 +
        'Payment/GetUtilizationDetail?EncryptedOrderDetailId=' +
        encryptedOrderDetailId
    )
  }

  generateUtilizationRequest(objUtilizationRequest) {
    return this.apiService.post(
      this.apiBaseUrl.chjPort850 + 'Payment/GenerateUtilizationRequest',
      objUtilizationRequest
    )
  }

  getMembershipInvoiceData(OrderInvoiceId) {
    return this.apiService.get(
      this.apiBaseUrl.chjPort850 +
        'Invoice/InvoiceDetails?OrderInvoiceId=' +
        OrderInvoiceId
    )
  }

  getAllShipmentAddress(OrderDetailId) {
    return this.apiService.get(
      this.apiBaseUrl.chjPort850 +
        'Customer/GetAllShipmentAddress?OrderId=' +
        OrderDetailId
    )
  }

  // Start **************** Customer Shipment Addresses *****************

  Get_CustomerShipmentAddress(CustomerId){
    return this.apiService.get(
      this.apiBaseUrl.chjPort850 +
      'Customer/SelectShipmentAddress?CustomerId='+
      CustomerId
    )
  }

  Insert_CustomerShipmentAddress(customerAddress: CustomerAddressDetail){
    return this.apiService.post(
      this.apiBaseUrl.chjPort850 +
      'Customer/InsertCustomerShipmentAddress', customerAddress)
  }

  Remove_CustomerShipmentAddress(customerAddress: CustomerAddressDetail){
    return this.apiService.post(
      this.apiBaseUrl.chjPort850 +
      'Customer/RemoveCustomerShipmentAddress', customerAddress)
  }



  // End ******************* Customer Shipment Address **************

  /**
   *
   * @param data {Object}
   * @param data.QuotationItemId
   * @param data.QuotationId
   * @param data.QuotationDetailId
   */

  proceedtoorderdetail(data) {
    let queryparam =
      'Quotation/PreProceedToOrderWitAlteration?QuotationItemId=' +
      data.QuotationItemId +
      '&QuotationId=' +
      data.QuotationId +
      '&QuotationDetailId=' +
      data.QuotationDetailId
    return this.apiService.get(this.apiBaseUrl.chjPort850 + queryparam)
  }

  /**
   * @param data {Object}
   * @param data.countryCode
   * @param data.currencycode
   *
   */

  _getalterationdata(data) {
    return this.apiService.get(
      this.apiBaseUrl.chjPort8051 +
        'FetchData/GetAllAlterationByCountryCode?countryCode=' +
        data.CountryCode +
        '&CurrencyCode=' +
        data.CurrencyCode
    )
  }

  /**
   * @param data {Object}
   *
   */

  evaluateamount(data) {
    data['ClientKey'] = this.pricing_v2_key['key'];
    return this.apiService.post(this.apiBaseUrl.chjPort850 + 'Order/CalculateAmountForPlanData',data)
  }

  /**
   * @param data {Object}
   *
   */
  proceedtoorder(data) {
    data['PlanData']['ClientKey'] = this.pricing_v2_key['key'];
    return this.apiService.post(
      this.apiBaseUrl.chjPort850 + 'Order/ProceedToOrder',
      data
    )
  }

  InsertShipmentAddress(data) {
    return this.apiService.post(
      this.apiBaseUrl.chjPort850 + 'Customer/InsertShipmentAddress',
      data
    )
  }

  getCarDetails(OrderId, DocumentTypeId) {
    return this.apiService.get(
      this.apiBaseUrl.chjPort850 +
        'Order/GetDetailsByOrderId?orderId=' +
        OrderId +
        '&DocumentTypeId=' +
        DocumentTypeId
    )
  }

  getPaymentPlans(countryCode, packageId) {
    return this.apiService.get(
      this.apiBaseUrl.chjPort8051 +
        'FetchData/GetAllPlanByPackageAndCountryCode?countryCode=' +
        countryCode +
        '&packageId=' +
        packageId
    )
  }

  getCompleteOrderDetail(orderId: string) {
    return this.apiService.get(
      this.apiBaseUrl.chjPort850 + 'Order/ViewCompleteOrder?orderId=' + orderId
    )
  }

  getViewOrderDetailById(orderDetailId: string) {
    return this.apiService.get(
      this.apiBaseUrl.chjPort850 +
        'Order/ViewOrderDetailById?orderDetailId=' +
        orderDetailId
    )
  }

  /**
   * customer hit this request from unit detail page for bid 
   * @param data {Objectr}
   */ 
  proceedOrderCustomer(data){
    data['OrderPlanData']['ClientKey'] = this.pricing_v2_key['key'];
    return this.apiService.post(this.apiBaseUrl.chjPort850+'Order/AddToBidInOrder',data)
  }

  /**
   * get notifications api functionality 
   */ 
  get_notifications(){
    return this.apiService.get(this.apiBaseUrl.chjPort850+'Customer/GetAllRecentActivity')
  }

  /**
   * get colors api functionality 
   */ 

  getcolors(){
    return this.apiService.get(this.apiBaseUrl.chjPort81+'Color')
  }

  /**
   * get auction houses api functionality 
   */ 
  getauctionhouses(){
    return this.apiService.get(this.apiBaseUrl.chjPort81+'AuctionHouse')
  }


  /**
   * submit manual order 
   * @param { data } // data is Object 
   */ 
  submitManualOrder(data){
    return this.apiService.post(this.apiBaseUrl.chjPort850+'Quotation/ManualAuctionData',data)
  }


  getCustomerOrderCreditLimit(orderId: string) {
    return this.apiService.get(
      this.apiBaseUrl.chjPort850 + 'Customer/GetCreditLimit?EncryptedOrderId=' + orderId
    )
  }


  /**
   * get pdf base64 string functionality 
   */ 

  getFileData(file){
    return this.apiService.get(this.apiBaseUrl.chjPort850+'order/GetFileData?URL='+file)
  }

  /**
   * @param { Object } // OrderId , PlanId
   * 
   */

  _saveorderplan(data){
    return this.apiService.get(this.apiBaseUrl.chjPort850+'order/UpdateRatesAgainstPlan?OrderId='+data.OrderId + '&PlanId=' + data.PlanId + '&PricingTypeId=' + data.PricingTypeId)
  }

  placeCreditSkipRequest(OrderId: string, Comment: string) {
    return this.apiService.post(
      this.apiBaseUrl.chjPort850 +
        'Order/OrderCreditLimitSkipRequest?orderId=' +
        OrderId +
        '&Comment=' +
        Comment,
        OrderId
    );
  }

  // get country restriction detail api functionality 
  _getCountryRestrictionDetail(id){
    return this.apiService.get(this.apiBaseUrl.chjPort81+'Country/GetCountryRestrictions?CountryId='+id)
  }

  // get inquires detail functionality 
  _getinquiresdetail(){return this.apiService.get(this.apiBaseUrl.chjPort850+'Inquiry/GetInquiryDetailsByCustomer');}

  // order process email api functionality 
  sendorderprocessemail(id){return this.apiService.post(this.apiBaseUrl.chjPort850+'Bidding/SendBidConfirmation',{OrderId : id})}

  // bid approval order detail functionality 
  orderDetails(id){return this.apiService.get(this.apiBaseUrl.chjPort850+'Bidding/GetOrderDetail?EncryptOrderId='+id)}

  // accept & reject functionality 
  acceptrejectorder(data){return this.apiService.post(this.apiBaseUrl.chjPort850+'Bidding/UpdateBidStatusByOrderDetailId', data)}
  
  GetNotifyByCustomerId(){
    return this.apiService.get(this.apiBaseUrl.chjPort850 +'Customer/GetNotifyByCustomerId')
  }

  InsertNotifyData(notifyModel:NotifyMeModel){
    return this.apiService.post(
      this.apiBaseUrl.chjPort850 +
      'Customer/InsertNotifyData', notifyModel)
  }

  sendDocument(data){
    return this.apiService.post(this.apiBaseUrl.chjPort850+'Customer/SendExportCertificateEmail',data)
  }

  updatePrices(data){
    return this.apiService.post(this.apiBaseUrl.chjPort850+'Order/UpdateRateOnSelectedItem',data)
  }

  GetOGDatasetForddl(){
    return this.apiService.get('https://www.autorod.com/auctioncenter/api/Color')
  }

  // reserve stock order functionlity 
  _reserveStockOrder(data){
    data['OrderPlanData']['ClientKey'] = this.pricing_v2_key['key'];
    return this.apiService.post(this.apiBaseUrl.chjPort850+'Order/AddToBidInOrderForStock',data)
  }

  getOrderDetailForLC() {
    return this.apiService.get(
      this.apiBaseUrl.chjPort850 + 'Order/GetOrderDetailForLC'
    )
  }

  // get stock popup detail 
  _getStockDetail(data){
      return this.apiService.post(this.apiBaseUrl.chjPortADMIN+'Search/GetStockVehicleDetail',data)
  }

}
