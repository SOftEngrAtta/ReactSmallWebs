import {
    Component,
    OnInit
} from '@angular/core';
import {
    window
} from 'rxjs/operators/window';
import {
    NgbModal,
    ModalDismissReasons
} from '@ng-bootstrap/ng-bootstrap';
declare var $;

@Component({
    selector: 'app-home',
    templateUrl: './upcomingpayment.component.html',
    styleUrls: ['./upcomingpayment.component.css']
})
export class UpcomingPayment implements OnInit {
    closeResult : string ;
    constructor(private modalService: NgbModal) { }

    ngOnInit() {
        $('body').removeClass('main_login');
    }


    open(content) {
        this.modalService.open(content).result.then((result) => {
            this.closeResult = `Closed with: ${result}`;
        }, (reason) => {
            this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        });
    }

    private getDismissReason(reason: any): string {
        if (reason === ModalDismissReasons.ESC) {
            return 'by pressing ESC';
        } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
            return 'by clicking on a backdrop';
        } else {
            return `with: ${reason}`;
        }
    }

}
