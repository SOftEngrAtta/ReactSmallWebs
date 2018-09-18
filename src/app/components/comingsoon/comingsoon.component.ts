import { Component, OnInit } from '@angular/core';


declare var $;

@Component({
    selector: 'app-comingsoon',
    templateUrl: './comingsoon.component.html',
    styleUrls: ['./comingsoon.component.css']
})
export class ComingSoon implements OnInit {
    constructor() { }
    ngOnInit() { 
        
        var addThreeDays = new Date();
        addThreeDays.setDate(addThreeDays.getDate() + 3);

        var countDownDate = new Date(addThreeDays).getTime();
        var x = setInterval(function() {
            var now = new Date().getTime();
            var distance = countDownDate - now;
            // Time calculations for days, hours, minutes and seconds
            var days = Math.floor(distance / (1000 * 60 * 60 * 24));
            var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            var seconds = Math.floor((distance % (1000 * 60)) / 1000);
                $(".dys").text('0'+days);
                $(".hrs").text(hours);
                $(".mnts").text(minutes);
                $(".scnds").text(seconds);
            if (distance < 0) {
                clearInterval(x);
                $(".counttbl table tr ").html("<td style='text-align:center;border-left:none'><span >EXPIRED</span></td>");
                
            }
        }, 1000);
    }
}
