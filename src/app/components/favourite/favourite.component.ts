import { Component, OnInit } from '@angular/core';
import { window } from 'rxjs/operators/window';
import { DataService } from '../../Services/data.service';
import { CustomerFavourite } from '../../models/customerFavourite';
import { Router, ActivatedRoute, Params } from '@angular/router';
declare var $;

@Component({
    selector: 'app-favourite',
    templateUrl: './favourite.component.html',
    styleUrls: ['./favourite.component.css']
})

export class Favourite implements OnInit {
    favourites: CustomerFavourite[] = [];
    constructor(private dataService: DataService,private router: Router) { }

    ngOnInit() {$('body').removeClass('main_login');this.getFavourites();}

    getFavourites() {this.dataService.getCustomerFavourites().subscribe(res => {this.favourites = res.Data;});}


    viewfavcar(item){
        if(item.AuctionTypeId != 5 ){
            this.router.navigate(['/unit-detail'], { queryParams: { 
                'source': item.AuctionTypeId ,
                'lotNum': item.LotNumber ,
                'id': item.ReferenceId , 
                'hitby': 'favourite'
            }})
        }else{
            this.router.navigate(['/unit-detail-stock'], { queryParams: { 
                'ProductId': '',
                'ReferenceId': item.ReferenceId, 
                'CountryId' : '',
                'AuctionHouseId': '',
                'IsCarFavourite': true
            }})
        }
    }

}
