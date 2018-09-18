// Importing Internal Modules
import { Component, OnInit } from '@angular/core';
import { window } from 'rxjs/operators/window';

// Importing Services
import { DataService } from '../../Services/data.service';
import { StorageService } from '../../Services/storage.service';

// Importing Models
import { MembershipDetail } from './../../models/membershipDetail';
import { AvailableCurrency } from './../../models/currency';

// Importing Route
import { Router, ActivatedRoute, Params } from '@angular/router';

declare var $;

@Component({
    selector: 'app-home',
    templateUrl: './membership.component.html',
    styleUrls: ['./membership.component.css']
})
export class Membership implements OnInit {

    public queryparam;

    public closeModal: string;
    public thankyou = false;
    CurrentMemberShipId: any = '0';
    RequestedMemberShipId: any = '0';
    public SelectMemberShipId: string;
    public SelectedMemberShipName: string;
    public selectedCurrency: string;
    public encryptedMembershipId: string;
    objAvailableCurrency: AvailableCurrency[] = [];
    membershipList: MembershipDetail[] = [];


    public membershipRequestedAlready: boolean = false;

    constructor(
        private dataService: DataService,
        private router: Router,
        private storageservices: StorageService
    ) { }

    ngOnInit() {
        this.queryparam = this.storageservices.get('agent_query');
        $('body').removeClass('main_login');
        this.getMembershipDetail();
        this.getAvailableCurrency();
    }

    viewMemverShip(mode) {
        this.router.navigate(['/membership', mode]);
    }

    getAvailableCurrency() {
        this.dataService.getAvailableCurrency()
            .subscribe(res => {
                this.objAvailableCurrency = res.Data;
                this.selectedCurrency = res.Data[0].EncryptedCurrencyId;
            });
    }

    getMembershipDetail() {
        this.dataService.getMembershipDetails()
            .subscribe(res => {
                $.each(res.Data, (index, item) => {
                    if (item.IsCurrentMemberShip) { this.CurrentMemberShipId = item.MembershipId; }
                    if (item.IsRequestedMemberShip) { this.RequestedMemberShipId = item.MembershipId; }
                });
                this.membershipList = res.Data;
            });
    }

    ShowUpgradePopup(MembershipItem) {

        if (MembershipItem && MembershipItem.IsRequestedMemberShip) {
            this.membershipRequestedAlready = true;
        }

        if (this.RequestedMemberShipId == '0' && !MembershipItem.IsCurrentMemberShip
            && this.CurrentMemberShipId < MembershipItem.MembershipId) {
            this.SelectMemberShipId = MembershipItem.EncryptedMembershipId;
            this.SelectedMemberShipName = MembershipItem.MembershipName;
            $.fancybox.open({
                src: '#upgrademembershipplan',
                modal: true
            });
        }

        if (this.RequestedMemberShipId == MembershipItem.MembershipId) {
            this.encryptedMembershipId = MembershipItem.OrderInvoiceId;
            this.SelectedMemberShipName = MembershipItem.MembershipName;
            $.fancybox.open({
                src: '#submittedpop1',
                modal: true
            });
        }
    }

    UpgradeMembership() {
        this.dataService.upgradeMembership(this.SelectMemberShipId, this.selectedCurrency)
            .subscribe(res => {
                this.getMembershipDetail();
                this.encryptedMembershipId = res.Data;
                $.fancybox.close();
                $.fancybox.open({
                    src: '#submittedpop1',
                    modal: true
                });
            });
    }


    backtohome() {
        if (this.queryparam) this.router.navigate(['/dashboard'], { queryParams: { data: this.queryparam } });
        else this.router.navigate(['/dashboard']);
    }


}
