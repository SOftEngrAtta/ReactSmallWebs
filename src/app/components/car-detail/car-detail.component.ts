import { Component, OnInit } from '@angular/core';

// Importing Services
import { DataService } from '../../Services/data.service';

// Importing Route
import { ActivatedRoute } from '@angular/router';

// Importing Models
import { CarDetail } from './../../models/carDetail';

declare var $;

@Component({
  selector: 'app-car-detail',
  templateUrl: './car-detail.component.html',
  styleUrls: ['./car-detail.component.css']
})
export class CarDetailComponent implements OnInit {
  orderId: string;
  documentTypeId = 's5J8N3lqkeE=';
  details: CarDetail = new CarDetail();
  slideConfig = {
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: false,
    // asNavFor: '.cars_slider',
    pauseOnHover: true,
    infinite: false,
    vertical: true,
    dots: false,
    focusOnSelect: true,
    asNavFor: '#slick2'
  };

  slideConfig2 = {
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    swipeToSlide: true,
    infinite: false,
    fade: false,
    asNavFor: '#slick1, #slick3'
    // asNavFor: '.cars_slider_thumbnails'
  };

  slideConfig3 = {
    slidesToShow: 3,
    slidesToScroll: 1,
    // asNavFor: '.cars_slider',
    asNavFor: '#slick2',
    pauseOnHover: true,
    dots: false,
    arrows: false,
    infinite: false,
    focusOnSelect: true
  }

  constructor(
    private dataService: DataService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    $('body').removeClass('main_login');
    this.orderId = this.route.snapshot.queryParams['id'];
    this.documentTypeId = this.route.snapshot.queryParams['type'];
    this.getCarDetail();
    // $('.cars_slider').slick({
    //   slidesToShow: 1,
    //   slidesToScroll: 1,
    //   arrows: true,
    //   swipeToSlide: true,
    //   infinite: false,
    //   fade: false,
    //   asNavFor: '.cars_slider_thumbnails,.cars_slider_thumbnails_hrz',
    // });

    // $('.cars_slider_thumbnails').slick({
    //   slidesToShow: 3,
    //   slidesToScroll: 1,
    //   arrows: false,
    //   asNavFor: '.cars_slider',
    //   pauseOnHover: true,
    //   infinite: false,
    //   vertical: true,
    //   dots: false,
    //   focusOnSelect: true
    // });

    // $('a[data-slide]').click(function (e) {
    //   $("html, body").animate({
    //     scrollTop: $("#slider").offset().top - 1
    //   }, 800)
    //   $('.slides_pne a').removeClass("clso");
    //   $(this).addClass("clso");
    //   e.preventDefault();
    //   var slideno = $(this).data('slide');
    //   $('.cars_slider').slick('slickGoTo', slideno - 1);
    // });

    // $('.cars_slider_thumbnails_hrz').slick({
    //   slidesToShow: 3,
    //   slidesToScroll: 1,
    //   asNavFor: '.cars_slider',
    //   pauseOnHover: true,
    //   dots: false,
    //   arrows: false,
    //   infinite: false,
    //   focusOnSelect: true
    // });
  }

  getCarDetail() {
    this.dataService.getCarDetails(this.orderId, this.documentTypeId)
      .subscribe(res => {
        this.details = res.Data;

      });
  }

}
