// Importing Internal Modules
import { Component, OnInit } from '@angular/core';

// Importing Services
import { DataService } from '../../Services/data.service';

// Importing Route
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-paymentredirector',
  templateUrl: './paymentredirector.component.html',
  styleUrls: ['./paymentredirector.component.css']
})
export class PaymentredirectorComponent implements OnInit {
  encryptedQueryString: string;

  constructor(
    private dataService: DataService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.encryptedQueryString = this.route.snapshot.queryParams['data'];
    this.redirectToPayment(this.encryptedQueryString);
  }

  redirectToPayment(encryptedQueryString) {
    this.dataService.getPaymentUrl(encryptedQueryString)
      .subscribe(res => {
        window.location.href = res.Data;
      });
  }

}
