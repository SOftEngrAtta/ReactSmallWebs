import { OnlyNumber } from './shared/NumberOnly';
// import modules 
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms'
import { NgModule, enableProdMode } from '@angular/core';
import { RouterModule,Routes} from '@angular/router'
import { HttpClientModule,HttpClient,HttpClientJsonpModule} from '@angular/common/http';
import { NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { RoundPipe } from './shared/roundoff';
import { RoundOffHtmlNumber } from './shared/roundoffhtml';
import { ReverseArray } from './shared/reverseArray'
import { CustomeTime } from './shared/customTime';
import { MomentModule } from 'angular2-moment';
import { NgSelectModule } from '@ng-select/ng-select';
import { ImageUploadModule } from "angular2-image-upload";
import { AngularDateTimePickerModule } from 'angular2-datetimepicker';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { NgxPaginationModule } from 'ngx-pagination';
// .....

// initializing json files 
import { APP_INITIALIZER } from '@angular/core';
import { AppConfig } from './app.config';
// end


// Components
import { AppComponent } from './app.component';
import { Login } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { HeaderComponent } from './components/header/header.component';
import { AuctionCarSearchComponent } from './components/auction-car-search/auction-car-search.component';
import { UnitDetailComponent } from './components/unit-detail/unit-detail.component';
import { ForgetPassword } from './components/forget-password/forgetpassword.component';
import { ResetPassword } from './components/reset-password/resetpassword.component';
import { Membership } from './components/membership/membership.component';
import { MembershipInvoice } from './components/membership-invoice/membership-invoice.component';
import { Favourite } from './components/favourite/favourite.component';
import { Notifications } from './components/notifications/notifications.component';
import { UserProfile } from './components/userprofile/userprofile.component';
import { IncompleteOrder } from './components/incomplete-order/incompleteorder.component';
import { MyOrders } from './components/my-orders/myorders.component';
import { UpcomingPayment } from './components/upcoming-payment/upcomingpayment.component';
import { PaymentHistory } from './components/payment-history/paymenthistory.component';
import { OrderDetail } from './components/order-detail/orderdetail.component';
import { QuotationDetailComponent } from './components/quotation-detail/quotation-detail.component';
import { BidPrice } from './components/bidprice/bidprice.component';
import { StockPrice } from './components/stock-price/stockprice.component';
import { Quotation } from './components/quotationpage/quotation.component';
import { MyQuotationComponent } from './components/my-quotation/my-quotation.component';
import { ViewConfirmOrder } from './components/viewconfirmorder/viewconfirmorder.component';
import { PreSignUp } from './components/pre-signup/presignup.component';
import { PaymentredirectorComponent } from './components/paymentredirector/paymentredirector.component';
import { GeneralInvoice } from './components/general-invoice/generalinvoice.component';
import { DepositInvoice } from './components/deposit-invoice/deposit-invoice.component';
import { ThankYou } from './components/thankyou/thankyou.component';
import { ErrorPage } from './components/errorpage/error.component';
import { LogoutPage } from './components/logout-success/logout.component';
import { InvoiceHistory } from './components/invoice-history/invoicehistory.component';
import { BidPriceOrder } from './components/bidpriceorder/bidpriceorder.component';
import { CarDetailComponent } from './components/car-detail/car-detail.component';
import { ManualOrder } from './components/manual-order/manual.component';
import { ComingSoon } from './components/comingsoon/comingsoon.component';
import { CarInquiries } from './components/car-inquiries/inquires.component';
import { CustomerBidApproval } from './components/customerbidapproval/bidapproval.component';
import { NotifyMe } from './components/notify-me/notifyme.component';
import { UnitDetailStockComponent } from './components/unit-detail-stock/unit-detail-stock.component';
import { InquireNow } from './components/inquire-now/inquirenow.component';
// end  


// services
import { DashboardServices } from './Services/dashboard.service'
import { DataService } from './Services/data.service';
import { StorageService } from './Services/storage.service';
import { ToastrService } from './Services/toastr.service';
import { AuthGuardService } from './components/auth/auth';
import { UnitDetailService} from './Services/unit-detail.service';
import { HelperService } from './Services/helper.service';
import { ApiService } from './Services/api.service';
import { AuthService } from './Services/auth.service';
import { InvoiceServices } from './Services/invoice.services'
import { SpecificQuotation } from './Services/quotation.service';
import { BidPriceService } from './Services/bid-price.service';
import {SignupService } from './Services/signup.service';

// .....

// Plugins
import { Ng4LoadingSpinnerModule } from 'ng4-loading-spinner';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { SplitImage } from './shared/splitimage';
import { AucSplitImage } from './shared/auctionsplitimage';
import * as moment from 'moment';
import { ClipboardModule } from 'ngx-clipboard';
import { SignupComponent } from './components/signup/signup.component';
import { Ng2TelInputModule } from 'ng2-tel-input';
import { LazyLoadModule } from '@greg-md/ng-lazy-load';
import { SlickModule } from 'ngx-slick';

// routes 
export const route: Routes = [
  { path: "", redirectTo: "/dashboard", pathMatch: "full" },
  { path: "auction-car-search", component: AuctionCarSearchComponent, canActivate: [AuthGuardService] },
  { path: "auction-car-search/:quotationid", component: AuctionCarSearchComponent, canActivate: [AuthGuardService] },
  { path: "unit-detail", component: UnitDetailComponent, canActivate: [AuthGuardService] },
  { path: "membership", component: Membership, canActivate: [AuthGuardService] },
  { path: "membership-invoice", component: MembershipInvoice, canActivate: [AuthGuardService] },
  { path: "favourite", component: Favourite, canActivate: [AuthGuardService] },
  { path: "notifications", component: Notifications, canActivate: [AuthGuardService] },
  { path: "user-profile", component: UserProfile, canActivate: [AuthGuardService] },
  { path: "incomplete-order", component: IncompleteOrder, canActivate: [AuthGuardService] },
  { path: "my-orders", component: MyOrders, canActivate: [AuthGuardService] },
  { path: "upcoming-payment", component: UpcomingPayment, canActivate: [AuthGuardService] },
  { path: "payment-history", component: PaymentHistory, canActivate: [AuthGuardService] },
  { path: "order-detail", component: OrderDetail, canActivate: [AuthGuardService] },
  { path: "quotation-detail", component: QuotationDetailComponent, canActivate: [AuthGuardService] },
  { path: "quotation-detail/:id", component: QuotationDetailComponent, canActivate: [AuthGuardService] },
  { path: "my-quotation", component: MyQuotationComponent, canActivate: [AuthGuardService] },
  { path: "view-confirm-order", component: ViewConfirmOrder, canActivate: [AuthGuardService] },
  { path: "generalinvoice", component: GeneralInvoice, canActivate: [AuthGuardService] },
  { path: "deposit-invoice", component: DepositInvoice, canActivate: [AuthGuardService] },
  { path: "invoice-history", component: InvoiceHistory, canActivate: [AuthGuardService] },
  { path: "manual-order", component: ManualOrder, canActivate: [AuthGuardService] },
  { path: "car-inquiries", component: CarInquiries, canActivate: [AuthGuardService] },  
  { path: "car-detail", component: CarDetailComponent },
  { path: "car-detail/:id", component: CarDetailComponent },
  { path: "sign-up", component: SignupComponent },
  { path: "pre-signup", component: PreSignUp },
  { path: "paymentredirector", component: PaymentredirectorComponent },
  { path: "paymentredirector/:data", component: PaymentredirectorComponent },
  { path: "forget-password", component: ForgetPassword },
  { path: "reset-password", component: ResetPassword },
  { path: "quotation", component: Quotation },
  { path: "dashboard", component: DashboardComponent },
  { path: "login", component: Login },
  { path: "thankyou", component: ThankYou },
  { path: "error", component: ErrorPage },
  { path: "logout-screen", component: LogoutPage },
  { path: "coming-soon", component: ComingSoon },
  { path: "bid-approval", component: CustomerBidApproval},
  {path: "notify-me", component: NotifyMe},
  {path: "unit-detail-stock", component: UnitDetailStockComponent }
];
// ....

// import modules , services 
enableProdMode()
@NgModule({
  declarations: [
    AppComponent,
    Login,
    ForgetPassword,
    ResetPassword,
    DashboardComponent,
    HeaderComponent,
    Membership,
    MembershipInvoice,
    Favourite,
    Notifications,
    UserProfile,
    IncompleteOrder,
    MyOrders,
    UpcomingPayment,
    PaymentHistory,
    OrderDetail,
    AuctionCarSearchComponent,
    UnitDetailComponent,
    QuotationDetailComponent,
    BidPrice,
    BidPriceOrder,
    StockPrice,
    InquireNow,
    MyQuotationComponent,
    Quotation,
    SplitImage,
    AucSplitImage,
    ViewConfirmOrder,
    SignupComponent,
    PreSignUp,
    OnlyNumber,
    PaymentredirectorComponent,
    RoundOffHtmlNumber,
    ReverseArray,
    CustomeTime,
    GeneralInvoice,
    DepositInvoice,
    ThankYou,
    ErrorPage,
    LogoutPage,
    RoundPipe,
    InvoiceHistory,
    CarDetailComponent,
    ManualOrder,
    ComingSoon,
    CarInquiries,
    CustomerBidApproval,
    NotifyMe,
    UnitDetailStockComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(route), HttpClientModule,
    Ng4LoadingSpinnerModule.forRoot(),
    NgbModule.forRoot(),
    FormsModule,
    NgxDatatableModule,
    MomentModule,
    HttpClientJsonpModule,
    ClipboardModule,
    SlickModule.forRoot(),
    LazyLoadModule,
    NgSelectModule,
    ImageUploadModule.forRoot(),
    AngularDateTimePickerModule,
    PdfViewerModule,
    NgxPaginationModule
  ],
  providers: [
    HttpClient,
    HelperService,
    StorageService,
    ToastrService,
    ApiService,
    DataService,
    AuthService,
    UnitDetailService,
    RoundPipe,
    RoundOffHtmlNumber,
    ReverseArray,
    CustomeTime,
    AuthGuardService,
    DashboardServices,
    SplitImage,
    AucSplitImage,
    BidPriceService,
    SpecificQuotation,
    SignupService,
    InvoiceServices,
    AppConfig,
    { provide: APP_INITIALIZER, useFactory: (config: AppConfig) => () => config.load(), deps: [AppConfig], multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
