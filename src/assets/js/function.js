$(document).ready(function () {

// payment history new popup jquery
$("body").on("click",".rdbtninput-are-u input[type='checkbox']",function(){
    if($(this).prop("checked")){
        $(this).parent().next("input[type='text']").removeAttr("disabled");
    }
    else{
        $(this).parent().next("input[type='text']").prop("disabled","true");
    }
});


$("body").on("click",".sup-saver ul li",function(){
    // alert();
    $(".sup-saver ul li").removeClass('up-active');
    $(this).addClass('up-active');


});

    /************************View and COnfirm JS********************** */


    var addedProductCodes = [];
    $("body").on("click",".alertation-selct-list li",function(){
        $(this).addClass("active");
    var td_productCode = $(this).find("span").text();
    var index = $.inArray(td_productCode, addedProductCodes);
    console.log(addedProductCodes);
    if (index >= 0) {
        //alert("You already added this Product");
        //if($(".test2-list li").find("span").text()=="")
        // $(".alertation-selct-bd-right ul li").find("span:contains['"+ td_productCode +"']").closest("li").remove();
        // $(".alertation-selct-bd-right ul ").find("li").children("span:contains['"+ td_productCode +"']").remove().closest("li");
    } else {
        $('.alertation-selct-bd-right ul').append("<li><label><span>"+ td_productCode +"</span><a href='javascript:;'><i class='fa fa-times' aria-hidden='true'></i></a></label>");

        addedProductCodes.push(td_productCode);

    }
});
$("body").on("click",".alertation-selct-bd-right ul li a",function(){
    var getvr=$(this).prev().text();
    // $(".alertation-selct-list li").find("span:contains['"+  +"']").closest("li").removeClass("active");
    $(this).closest("li").remove();
    console.log(getvr);


});
    /************************View and COnfirm JS********************** */
    $("body").on("click",".colpexp-ic",function(){

      $(this).parent().next().toggleClass("active",1000);
      $(this).toggleClass("active",1000);


    });

    $("body").on("click",".cnfrd",function(){
        if($(this).prop("checked",true)){
            //$(this).parent().closest(".slpopdet-sel").next().addClass("srv");
            $(this).closest(".slpop-innerdv").find(".serv-char").slideUp(300);
            $(this).closest(".slpop-innerdv").find(".cnfbsed").slideDown(300);
        }

     }).on("click",".servrd",function(){
        if($(this).prop("checked",true)){
            //$(this).parent().closest(".slpopdet-sel").next().next().addClass("srv");
            $(this).closest(".slpop-innerdv").find(".cnfbsed").slideUp(300);
            $(this).closest(".slpop-innerdv").find(".serv-char").slideDown(300);





        }

     });





//=====ICREMENT-DECREMENT-SCRIPT

var listlength=0;
$(".accordion-content").each(function(){
    var listlength=$(this).find(".table_body.agent_shortlist ").size();
    $(this).prev().find(".input-group-field").val(listlength);

    $(this).prev().find(".input-group-field").attr('data-length',listlength);
    console.log(listlength);
});



$("body").on("click",".button.hollow.circle.decr",function(){

	var ingptval2=$(this).parent().next().val();
		console.log("val<"+ingptval2);
		if(ingptval2>1){
			ingptval2--;
			$(this).parent().next().val(ingptval2);
		}
});
$("body").on("click",".button.hollow.circle.incr",function(){

    var ingptvallength=$(this).parent().prev().attr('data-length');
    var ingptval1=$(this).parent().prev().val();
		console.log("val>"+ingptval1);
		if(ingptval1<ingptvallength){
			ingptval1++;
			$(this).parent().prev().val(ingptval1);
		}
});
//=====ICREMENT-DECREMENT-SCRIPT

//=====COPIED-LINK-SCRIPT


    $('.addqt').click(function() {
        var $this = $(this);
        var originalText = $this.text();
        var originialcolor= $this.css("background-color");
        $this.text('Added');
        $this.css("background","#2d2d2d");


      });
$('.addquoteadded').click(function() {
        var $this = $(this);
        var originalText = $this.text();
        var originialcolor= $this.css("background-color");
        $this.text('Added');
        $this.css("background","#2d2d2d");


      });

      $('.copied').click(function() {
        var $this = $(this);
        var originalText = $this.text();
        var originialcolor= $this.css("background-color");
        $this.text('Copied Link');
        $this.css("background","#2d2d2d");


      });
      $('.addquotebtn').click(function() {
        var $this = $(this);
        var originalText = $this.text();
        var originialcolor= $this.css("background-color");
        $this.text('Added');
        $this.css("background","#2d2d2d");


      });
//=====COPIED-LINK-SCRIPT

//    mdlfind();

    $('.adfvt').click(function() {
        var $this = $(this);
        var originalText = $this.text();
        var originialcolor= $this.css("background-color");
        $this.text('Favourite Added');
        $this.css("background","#2d2d2d");


      });
    // $("body").on("click","#btnhlp",function(){
    //     window.location.href="/dashboard.asp?multipage=demostart";
    // });


        // $(".rec-actv .introjs-button.introjs-nextbutton.introjs-disabled").bind("click",function(){
        //     window.location.href="/list-view-customer.asp?multipage";
        // });
        // $(".rec-actv .introjs-button.introjs-nextbutton.introjs-disabled").css({'cursor':'pointer'});


    //introJs(".demo-intro").start();
/************************** */
    $(".currenc-sel a").click(function () {
        var currTag1 = $(this).text();
        $('.currenc-sel a').removeClass('actve');
        $(this).addClass("actve");
        $('.current-currency').text(currTag1);
    });
    $("body").on("click",".hlp-icon a",function(){
        $(this).parent().next(".popshd").fadeIn(600);
    });
    $("body").on("click",".hlp-icon a",function(){
        $(this).closest("strong").next(".popshd").fadeIn(600);
    });
    $("body").on("click",".close-popshd",function(){
        $(this).closest("div.popshd").fadeOut(600);
    });
    //car-images-big

    $('.car-images-big').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: true,
        asNavFor: '.car-images-small-list'
    });
    $('.car-images-small-list').slick({
        focusOnSelect: true, centerMode: true, centerPadding: 0,
        slidesToShow:3,
        horizontal: true,
        slidesToScroll: 1,
        asNavFor: '.car-images-big',
        dots: false,
        arrows:false,
        responsive: [{
            breakpoint: 600,
            settings: {
                slidesToShow: 3,
                slidesToScroll: 1
            }
        }// You can unslick at a given breakpoint now by adding:
            // settings: "unslick"
            // instead of a settings object
        ]
    });



/*****************************Car detail page chj ********/


$('.crdt-mn-sld-inner').slick({
    slidesToShow:1,
    slidesToScroll: 1,
    arrows: true,
    asNavFor: '.crdt-mn-sld-sm',responsive: [{
        breakpoint: 600,
        settings: {
            arrows:false
        }
    }
    ]
});
$('.crdt-mn-sld-sm').slick({
    focusOnSelect: true, centerMode: true, centerPadding: 0,
    slidesToShow:5,
    horizontal: true,
    slidesToScroll: 1,
    asNavFor: '.crdt-mn-sld-inner',
    dots: false,
    arrows:false,
    responsive: [{
        breakpoint: 600,
        settings: {
            slidesToShow: 3,
            slidesToScroll: 1,arrows:true
        }
    }// You can unslick at a given breakpoint now by adding:
        // settings: "unslick"
        // instead of a settings object
    ]
});


/********************************************************* */

/*************** */
    $('#tabs li a:not(:first)').addClass('inactive');
    $('.tabcontainer').hide();
    $('.tabcontainer:first').show();
    $('#tabs li a').click(function () {
        var t = $(this).attr('id');
        if ($(this).hasClass('inactive')) { //this is the start of our condition
            $('#tabs li a').addClass('inactive');
            $(this).removeClass('inactive');
            $('.tabcontainer').hide();

            $('#' + t + 'C').fadeIn('slow');
        }

    });

    if ($(window).width() <= 568) {
        $(".adv-sectmemb-list").slick({
        slidesToShow: 2,
        autoplay:true,
        autoplaySpeed:3000,
        cssEase: 'linear',
        slidesToScroll: 1,
        arrows: true,responsive: [
            {
                breakpoint: 375,
                settings: {
                    slidesToShow: 1,
                    vertical: false,
                    slidesToScroll: 1,

                }
            }
            // You can unslick at a given breakpoint now by adding:
            // settings: "unslick"
            // instead of a settings object
        ]

    });

        // $("body").on("click", ".srcbox-hd", function () {
        //     if ($(this).closest("div").hasClass("auct-days-sect")) {
        //         $(this).siblings("div").toggleClass("dspdv");
        //     }
        //     else {
        //         $(this).siblings("div").slideToggle("200");
        //     }



        // });
    }
    $(".agent-list-page .searchpan").addClass("showdv");

    $(".list-customer-page .searchpan").addClass("showdv");

    $("body").on("click", ".auct-days-sect-list-sl li span:not(.disabled)", function () {
        $(this).toggleClass("actived");
    });

    $("body").on("click",".srchmkic",function(){
        $(this).fadeOut(100);
        $(this).next(".srchmkic-dv").fadeIn(300);
        $(this).next().find(".srchmkic-cls").fadeIn(300);

    }).on("click",".srchmkic-cls",function(){
        $(this).fadeOut(100);
        $(this).parent().fadeOut(300);
        $(this).parent().prev(".srchmkic").fadeIn(300);
        $(this).prev("#myInput").val('');
        $(this).parent().next().find("ul").children("li").css("display","block");
    });

    // $('.mkfind').keyup(function(){
    //     var valThis = $(this).val();
    //     $(this).closest(".srchmkic-dv").siblings(".make-sect-list-inner").find('.make-sect-list-inner ul li').each(function(){
    //       var text = $(this).text().toLowerCase();
    //          (text.indexOf(valThis) == 0) ? $(this).show() : $(this).hide();
    //     });
    //  });



    // $("body").on("click", ".month-list-sel li", function () {

    //     $(this).toggleClass("active");
    // }).on("click", ".make-sect-list-inner li", function () {

    //     $(".make-sect-list-inner li").removeClass("active");
    //     $('.loading-page').fadeOut();
    //     $(this).addClass("active");
    // }).on("click", ".model-sect-list-inner li", function () {

    //     $(".model-sect-list-inner li").removeClass("active");
    //     $(this).addClass("active");
    //     var getv=$(this).find("span").text().toUpperCase();
    //     $(".mdltxt").text(getv);
    //     $(".dvrght-inner").slideDown(200);
    // });
    days_slider();

    $(".resetbutton").on("click", function () {
        $("input[type='text']").val('');
        $("select").prop("selectedIndex", 0);
        $("ul li").removeClass("active");
        $("span").removeClass("actived");
        $(".icheckbox_flat-blue").removeClass("checked");
        $('.range_slider').slider('refresh');

    });


    $("body").on("change", ".range_slider", function () {
        var abc = $(this).val(),
            bcd = abc.split(",");
        for (var a in bcd) {
            var variable = bcd[0],
                variable1 = bcd[1];
            $(this).siblings("strong").find("#val1").text(variable).next("#val2").text(variable1);//text(variable);
        }
    });


    $("body").on("click", ".collapbtn", function () {
        $(this).toggleClass("act");
        // $(".vehicle-add-sect").toggleClass("btm");
        $(".admorbtns").slideToggle(400);
        $(".caritemslist").toggleClass("colp");
        $(".caritemslist .toggleaddcar").slideToggle(500);


    });

    $("body").on("click",".search-bar-notif-response.search-bar-notif .fa.fa-search.icon-srch",function(){
        $(this).prev(".search-hd").fadeIn(100);
        $(this).toggleClass("fa fa-search");
        $(this).toggleClass("fa fa-times");
        $(".logo").animate({'opacity':'0'});
        $(".bid-notification-carwcarl-main .header_top .user_img").toggle();
        $(".bid-notification-carwcarl-main .search-bar-notif-response.search-bar-notif").animate({'width':'100%'},200);
    });

    $("body").on("click",".search-bar-notif-response.search-bar-notif .fa.fa-times.icon-srch",function(){
        $(this).prev(".search-hd").css("display","none");
        $(this).toggleClass("fa fa-search");
        $(this).toggleClass("fa fa-times");
        $(".logo").animate({'opacity':'1'});

        $(".bid-notification-carwcarl-main .search-bar-notif-response.search-bar-notif").css("width","90%");
        $(".bid-notification-carwcarl-main .header_top .user_img").toggle();
    });





    $("body").on("click", ".cartcount", function () {
        $(".collapbtn").toggleClass("act");
        // $(".vehicle-add-sect").toggleClass("btm");


    });


    $(".currencies a").click(function () {
        var currTag = $(this).text();
        $('.currencies a').removeClass('active');
        $(this).addClass("active");
        $('.curtag').text(currTag);
    });

    $(".popurl").on("click", function () {
        $(this).next(".servchrpop").fadeIn();

    });

    $("body").on("click", ".membplan-list li div", function () {

        $('.membplan-list li div').removeClass('selected');
        $(this).addClass("selected");
    });

    $("body").on("click", ".language li a", function () {

        $('.language li').removeClass('ac');
        $(this).parent("li").addClass("ac");
    });

    $("body").on("click", ".creditlimit", function () {

        $(this).addClass("limitexceed");
    });
    $("body").on("click", ".circle_list:not(.circle_disable)", function () {
        $(".circles .circle_list").removeClass("circle_selected");
        $(this).addClass("circle_selected");
    });







    // $("body").on("load",".consigneedet-pop",function(){
    //     if($(".consigneedet-lft-mn").find(".consigneedet-lft-inn").length>1){
    //         $(".consigneedet-lft-mn").slick({
    //             infinite: true,
    //             slidesToShow: 1,
    //             slidesToScroll: 1

    //         });
    //     }
    // });

// $(".consigneedet-pop").fancybox({
//    afterShow:function(){

//    },
// });

// $('.consigneedet-lft-mn').slick('setPosition');
$('.consigneedet-lft-mn').slick({
    infinite: true,
            slidesToShow: 1,
            slidesToScroll: 1,
            autoplaySpeed: 2000,
        //autoplay: true

});
    $('.pay-upc-det').slick({
        infinite: true,
        speed: 1000,
        fade: true,
        autoplaySpeed: 2000,
        autoplay: true,
        arrows: false, dots: true,

    });

    $('.quotation-images').slick({
        slidesToShow: 3,
        vertical: true,
        slidesToScroll: 1,
        nextArrow: '<button class="nextbtn"><i class="fa fa-caret-down" aria-hidden="true"></i></button>',
        prevArrow: '<button class="prevbtn"><i class="fa fa-caret-up" aria-hidden="true"></i></button>',

        responsive: [
            {
                breakpoint: 767,
                settings: {
                    slidesToShow: 1,
                    vertical: false,
                    slidesToScroll: 1,
                    dots: true
                }
            },
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1
                }
            }

            // You can unslick at a given breakpoint now by adding:
            // settings: "unslick"
            // instead of a settings object
        ]
    });


    $('.addtble-mov').slick();
    /*$(".pckg_prcing tr td label").on("click",function(){


        if($(this).find("input:checkbox:checked").length<1){
            $(this).parent().next().find("strong").removeClass("strike");
            }
        else{
                $(this).parent().next().find("strong").addClass("strike");
                }
    });*/


    //$('.inpst').on('ifChanged', function(){
    //alert(event.type + ' callback');
    //  $(this).closest("td").next().find("strong").removeClass("strike");//addClass("312312")//removeClass("strike");
    //alert('checked = ' + event.target.checked);
    //if(event.target.checked)
    //});


    $('input').on('ifChecked', function () {
        //$(this).closest("input").attr('checked', true);
        $(this).closest("td").next().find("strong").removeClass("strike");
    });
    $('input').on('ifUnchecked', function () {
        //$(this).closest("input").attr('checked', false);
        $(this).closest("td").next().find("strong").addClass("strike");
    });


    $('input.individualbuyer').on('ifChecked', function () {
        //$(this).closest("input").attr('checked', true);
        $(".signup_box_body.individualform").show(); $(".signup_box_body.dealerform").hide();
    });
    $('input.dealerbuyer').on('ifChecked', function () {
        //$(this).closest("input").attr('checked', true);
        $(".signup_box_body.individualform").hide(); $(".signup_box_body.dealerform").show();
    });

// $("body").on("click",".addedcarimages1 li .carimagespar",function(){
//     $(".addedcarimages1 li .carimagespar").removeClass("activecl");
//     $(this).addClass("activecl");
// });
$("body").on("click",".addedcarimages1  li ",function(){
	$(".addedcarimages1  li ").removeClass('slick-current');
	$(this).addClass('slick-current');
	});
    $(".closepop").on("click", function () {
        $(this).parent().fadeOut(600);
    });
    $(".servpop").on("click", function () {
        $(this).next(".servchrpop").fadeIn();
    });











    $(".closediv").click(function () {
        $(this).parent().closest("li").fadeOut(200);
    });

    $(".error-frm-search a").click(function () {
        $(this).parent().fadeOut(300); //slid(300);
        //$("select").removeClass("error");

    });


    $(".dropdown ul li").on("click", function () {
        var dropdownval = $(this).text();
        $(this).parent().prev().text(dropdownval).append("<span class='caret'></span>");
        $(".bidding-page1 h5 strong").text(dropdownval);
    });

    $(".cancel-button").click(function () {
        $(".searchpan").slideUp(500);
    });

    $(".view-bid-order", ".mk-payment-btn").click(function () {
        $(this).parent().parent().stopPropagation();

    });
    //$("body").on("click",".orderslistdet button",function(){

    //e.parent().stopPropagation();
    //$("ul.orderslistdet").preventDefault();
    //event.stopPropagation();
    //event.parent().addClass("checkprop");
    //event.parent().parent().stopPropagation();
    //$(this).parent().parent().attr("onClick","false");

    //});

    $("body").on("click", ".showbasket", function () {
        $(".vehicle-add-sect").animate({ right: '0px' });
        //$(".vehicle-add-sect").insertBefore("<a class='closecart'>x</a>");
    });

    $("body").on("click", ".closecart", function () {
        $(".vehicle-add-sect").animate({ right: '-300px' });
        //$(".vehicle-add-sect").insertBefore("<a class='closecart'>x</a>");
    });

    $(".view-btn").click(function () {
        //$(this).closest("ul").stopPropagation();
        //alert($(this).parent().parent());
    });
	/*$(".mk-payment-btn").click(function(){
		$(this).parent().parent().stopPropagation();

	});*/


    $(".resetbutton").on("click", function () {
        $("input[type='text']").val('');
        $("select").prop("selectedIndex", 0);
    });

    $(".addmoremeil").click(function () {
        $(this).parent().slideUp(500);
        $(".admorediv").slideDown(500);

    });

    $(".hidemoreem").click(function () {
        $(".addmoremeil").parent().slideDown(500);
        $(".admorediv").slideUp(500);
    });

    $(function ($) {
        $('input[name="file1"]').change(function () {
            if ($(this).val()) {
                error = false;

                var filename = $(this).val();

                $(this).closest('.file-upload1').find('.file-name1').html(filename);

                if (error) {
                    parent.addClass('error').prepend.after('<div class="alert alert-error">' + error + '</div>');
                }
            }
        });
    });

    $(function ($) {
        $('input[name="file2"]').change(function () {
            if ($(this).val()) {
                error = false;

                var filename = $(this).val();

                $(this).closest('.file-upload2').find('.file-name2').html(filename);

                if (error) {
                    parent.addClass('error').prepend.after('<div class="alert alert-error">' + error + '</div>');
                }
            }
        });
    });



    if ($(".order-detail-cars-list").find("li").length > 7) {
        $(".order-detail-cars-list").slick({
            infinite: true,
            slidesToShow: 7,
            slidesToScroll: 1,
            responsive: [
                {
                    breakpoint: 1024,
                    settings: {
                        slidesToShow: 5,
                        slidesToScroll: 1,
                        infinite: true

                    }
                },
                {
                    breakpoint: 600,
                    settings: {
                        slidesToShow: 3,
                        slidesToScroll: 1
                    }
                },
                {
                    breakpoint: 480,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 1
                    }
                }

            ]
        });
    }
    else {

    }


    if ($(".individualcars").find("li").length > 8) {
        $('.individualcars').slick({
            infinite: true,
            slidesToShow: 8,
            slidesToScroll: 1, centerPadding: 0,

            responsive: [
                {
                    breakpoint: 1024,
                    settings: {
                        slidesToShow: 5,
                        slidesToScroll: 1,
                        infinite: true

                    }
                },
                {
                    breakpoint: 600,
                    settings: {
                        slidesToShow: 3,
                        slidesToScroll: 1
                    }
                },
                {
                    breakpoint: 480,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 1
                    }
                }

            ]
        });
    }
    else {

    }

    if ($(".addedcarimages.addedcarimages_old").find("li").length > 6) {
        $('.addedcarimages.addedcarimages_old').slick({
            infinite: true,
            slidesToShow: 5,
            slidesToScroll: 1,
            responsive: [
                {
                    breakpoint: 1024,
                    settings: "unslick"
                }

            ]
        });
    }
    else {

    }



    // if ($(".addedcarimages").find("li").length > 6) {
    //     $('.addedcarimages').slick({
    //         infinite: true,
    //         slidesToShow: 6,
    //         slidesToScroll: 1,
    //         responsive: [
    //             {
    //                 breakpoint: 1024,
    //                 settings: "unslick"
    //             }
    //         ]
    //     });
    // }
    // else {

    // }
    if ($(".addedcarimages1").find("li").length > 6) {
        $('.addedcarimages1').slick({
            infinite: true,
            slidesToShow: 6,

            slidesToScroll: 1,
            responsive: [
                {
                    breakpoint: 1024,
                    settings: {
                        slidesToShow: 5,
                        slidesToScroll: 1,
                        infinite: true

                    }
                },
                {
                    breakpoint: 768,
                    settings: {
                        slidesToShow: 4,
                        slidesToScroll: 1,
                        infinite: true

                    }
                },
                {
                    breakpoint: 600,
                    settings: {
                        slidesToShow: 3,
                        slidesToScroll: 1
                    }
                },
                {
                    breakpoint: 480,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 1
                    }
                }

            ]
        });
    }
    else {

    }

   if ($(".sliderimgscars-inner").find("li").length > 6) {
        $('.sliderimgscars-inner').slick({
            infinite: true,
            slidesToShow: 7,
            slidesToScroll: 1,
            responsive: [
                {
                    breakpoint: 1024,
                    settings: {
                        slidesToShow: 5,
                        slidesToScroll: 1,
                        infinite: true

                    }
                },
                {
                    breakpoint: 768,
                    settings: {
                        slidesToShow: 4,
                        slidesToScroll: 1,
                        infinite: true

                    }
                },
                {
                    breakpoint: 600,
                    settings: {
                        slidesToShow: 3,
                        slidesToScroll: 1
                    }
                },
                {
                    breakpoint: 480,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 1
                    }
                }

            ]
        });
    }
    else {

    }

    $("body").on("click", ".order-detail-cars-list  li ", function () {
        $(".order-detail-cars-list  li ").removeClass('active');
        $(this).addClass('active');
    });

    $("body").on("click", ".addedcarimages  li ", function () {
        $(".addedcarimages  li ").removeClass('slick-current');
        $(this).addClass('slick-current');
    });

    $("body").on("click", ".individualcars  li ", function () {
        $(".individualcars  li ").removeClass('actvtab');
        $(this).addClass('actvtab');
        if($(this).find(".ordr-detail-carinfo").text()=='Car lost'){
            $(".rebiddvsh").slideDown(200);
        }
        else{
            $(".rebiddvsh").slideUp(200);
        }
    });






    /*$('.addedcarimages').slick({

            slidesToShow: 7,
            horizontal: true,
            slidesToScroll: 1,
            dots: false
        // You can unslick at a given breakpoint now by adding:
            // settings: "unslick"
            // instead of a settings object

        });*/

    /*$("body").on("click",".unit-details-page .addmorebox .addedcarimages li",function(){
        $('.unit-details-page .addmorebox .addedcarimages li').removeClass('current');
        $(this).addClass("current");

        });*/


    // $(".ordr-detail-cars > ul > li").click(function () {
    //     $(this).addClass("actvtab").siblings().removeClass("actvtab");
    // });

    // $(".ordr-detail-tabsbtn > ul > li").click(function () {
    //     var $index = $(".ordr-detail-tabsbtn > ul > li").index(this);
    //     $index = $index + 1;
    //     $(".ordr-detail-status > ul:nth-child(" + $index + ")").fadeIn('fast').siblings().fadeOut(0);
    //     $(this).addClass("actvtab").siblings().removeClass("actvtab");

    // });

    $(".details-timeline ul li:not(.disabled):not(.juststate)").click(function () {
        $(".details-timeline ul li").removeClass("active");
        $(this).addClass("active");
    });
        // $("body").on("click",".mvmenu > a",function(){
        //     //alert();
        //     $(this).parent().find(".inner-menu").toggle();
        // });

    // $(".orderslistdet li button.view-btn.sendlink").click(function(e){
    //     e.stopPropagation();
    // });
    // $('button.view-btn.sendlink').click(function() {
    //     $(this).closest("ul").
    // });
    // $(".orderslistdet ").click(function() {
    //     // Do something
    // }).children().on("button.view-btn.sendlink", function(e) {
    //     e.stopPropagation();
    // });

    $("body").on("click", ".details-timeline li:not(.juststate)", function () {


        $('html,body').animate({
            scrollTop: $(".tmcontent").offset().top
        },
            'slow');

        var imagepath = $(this).attr("data-imageshow");
        var invoicepath = $(this).attr("data-valpop");
        var dvshow = $(this).attr("data-dvshow");
        if (imagepath) {
            var txt = $(this).find("h6").text();
            $('.order-det-image').attr('src', imagepath);
            $('.order-det-image').closest("a").attr('data-src', invoicepath);
            $('.order-det-image').closest("a").attr('href', "");
            $(".samplehd").css("display", "block").html(txt);

            $(".rightdt").css("display", "block");
            $(".rightdt .samplehd").css({'display':'block'});
            $(".trackordrsect ").css({'z-index':"-1"});
            $(".main-order-deatils-edit .car-feature-slider ").css({'z-index':"-1"});
        }
        else {
            //alert(";");
            if (dvshow) {

                $(".main-order-deatils-edit .car-feature-slider ").css({'z-index':"-1"});
                $(".trackordrsect").css({'z-index':"9"});
                $(".rightdt .samplehd").css({'display':'none'});

                //$(".rightdt").css("display", "none");
            }
        }
        //alert(animalType);
    });






$("body").on("click",".car-feature-slider-sh",function(){

    $(".main-order-deatils-edit .car-feature-slider ").css({'z-index':"5"});
    $(".trackordrsect ").css({'z-index':"-1"});
    // $(".rightdt a img").attr("src","");
    // $('.car-images-big').slick({
    //     slidesToShow: 1,
    //     slidesToScroll: 1,
    //     arrows: true,
    //     asNavFor: '.car-images-small-list'
    // });
    // $('.car-images-small-list').slick({
    //     focusOnSelect: true, centerMode: true, centerPadding: 0,
    //     slidesToShow:3,
    //     horizontal: true,
    //     slidesToScroll: 1,
    //     asNavFor: '.car-images-big',
    //     dots: false,
    //     arrows:false,
    //     responsive: [{
    //         breakpoint: 600,
    //         settings: {
    //             slidesToShow: 3,
    //             slidesToScroll: 1
    //         }
    //     }// You can unslick at a given breakpoint now by adding:
    //         // settings: "unslick"
    //         // instead of a settings object
    //     ]
    // });

});






    $(".unit-details-page .addmorebox .addedcarimages li.current:after").offset("bottom");
    $(".clicktohide").on("click", function () {

        $(this).parent().closest('section').slideUp(400);

    });


    $('.preview1').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        asNavFor: '.car-sm-image-list'
    });
    $('.car-sm-image-list').slick({
        focusOnSelect: true, centerMode: true, centerPadding: 0,
        slidesToShow: 5,
        horizontal: true,
        slidesToScroll: 1,
        asNavFor: '.preview1',
        dots: false,
        responsive: [{
            breakpoint: 600,
            settings: {
                slidesToShow: 3,
                slidesToScroll: 1
            }
        },{
            breakpoint: 568,
            settings: {
                slidesToShow: 3,
                slidesToScroll: 1
            }
        },{
            breakpoint: 414,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 1
            }
        },{
            breakpoint: 320,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 1
            }
        }// You can unslick at a given breakpoint now by adding:
            // settings: "unslick"
            // instead of a settings object
        ]
    });

    $('.preview2').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        asNavFor: '.car-sm-image-list2'
    });
    $('.car-sm-image-list2').slick({
        focusOnSelect: true, centerMode: true, centerPadding: 0,
        slidesToShow: 3,
        horizontal: true,
        slidesToScroll: 1,
        asNavFor: '.preview2',
        dots: false,
        responsive: [{
            breakpoint: 600,
            settings: {
                slidesToShow: 3,
                slidesToScroll: 1
            }
        }// You can unslick at a given breakpoint now by adding:
            // settings: "unslick"
            // instead of a settings object
        ]
    });

    $('.preview2-res').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false, adaptiveHeight: true,
        asNavFor: '.car-sm-image-list2-res'
    });
    $('.car-sm-image-list2-res').slick({
        focusOnSelect: true, centerMode: true, centerPadding: 0,
        slidesToShow: 3,
        horizontal: true,
        slidesToScroll: 1,
        asNavFor: '.preview2-res',
        dots: false,
        responsive: [{
            breakpoint: 600,
            settings: {
                slidesToShow: 3,
                slidesToScroll: 1
            }
        }// You can unslick at a given breakpoint now by adding:
            // settings: "unslick"
            // instead of a settings object
        ]
    });



    $(".btn-editshowa").on('click', function () {
        $('.cnf-inputbox').removeAttr("disabled");
        $('.fob-inputbox').removeAttr("disabled");
        //$(".btn-editshowa").hide();
        //	 $(".editdt").css('display','block');
        $(".editdt").css({
            'display': "block"
        });
        $(".showeditw").css({
            'display': "none"
        });
        /*if($('.cnf-inputbox').attr("disabled") && $('.fob-inputbox').attr("disabled"))
	{
	 $('.cnf-inputbox').removeAttr("disabled");

	 $('.fob-inputbox').removeAttr("disabled");

	}

	else{
		 //$('.cnf-inputbox').add("disabled");attr('disabled', 'value');
		 $('.cnf-inputbox').prop('disabled', true);
		 $('.fob-inputbox').prop('disabled', true);
	 }*/
        //$('.fob-inputbox').removeAttr("disabled");

    });
    $(".signup_btn3").click(function () {

        $('.cnf-inputbox').attr("disabled");
        $('.fob-inputbox').attr("disabled");
        $(".btn-editshowa").show();

        $(".editdt").css({
            'display': "none"
        });
        $(".showeditw").css({
            'display': "block"
        });

    });

    $('#pagination-dm').twbsPagination({
        totalPages: 35,
        visiblePages: 7,
        onPageClick: function (event, page) {
            $('#page-content').text('Page ' + page);
        }
    });


    $('#pagination-dm1').twbsPagination({
        totalPages: 35,
        visiblePages: 7,
        onPageClick: function (event, page) {
            $('#page-content').text('Page ' + page);
        }
    });

    $("input[name='f_name']").keypress(function (e) {
        var key = e.keyCode;
        if (key >= 48 && key <= 57) {
            e.preventDefault();
        }
    });
    $("input[name='l_name']").keypress(function (e) {
        var key = e.keyCode;
        if (key >= 48 && key <= 57) {
            e.preventDefault();
        }
    });

    function readURL(input) {

        if (input.files && input.files[0]) {
            var reader = new FileReader();

            reader.onload = function (e) {
                $('#uploadimage').attr('src', e.target.result);
            }

            reader.readAsDataURL(input.files[0]);
        }
    }

    $("#upload_image").change(function () {
        readURL(this);
    });



    // $('input').iCheck({
    //     checkboxClass: 'icheckbox_flat-blue',
    //     radioClass: 'iradio_flat-blue'
    // });

    $('.accordion').find('.accordion-toggle').click(function () {
        $(this).next().slideToggle('600');
        //$(".accordion-content").not($(this).next()).slideUp('600');
    }).on('click', 'button', function () {
        $('.accordion-toggle').stopPropagation();
    }).on("click", '.numbitemslist li a', function () {
        $('.accordion-toggle').stopPropagation();
    }).on('click','.input-group-field',function(){
        $('.accordion-toggle').stopPropagation();
    });



    $('.accordion-toggle').on('click', function () {
        $(this).toggleClass('active');
    });

    //$(".searchpan").hide();
    $(".search-btn").on('click', function () {

        $(".searchpan").toggleClass("showdv", 'slow', "easeOutSine");
        // $(".searchpan").animate({height: '551px'},500);
        days_slider();

    });
    $(".search-btn").on('click', function () {
        $(".searchpan").slideToggle(500);
    });
    if ($(window).width() > 767) {
        $(".btn-new-ord").on('click', function () {
            $(".searchpan").slideToggle(500);
        });

    }
    $(".sec_two_a").hide();
    $(".adv-search-btn").on('click', function () {
        $(".advancepanel-bef").slideToggle(500);
        $(".advancepanel").slideToggle(500);
        $(this).toggleClass("active");
    });

    $('[data-toggle="tooltip"]').tooltip();
    $('.tag_autos').tokenfield({
    });
    var $elem = $(".bit_win_val");

    if ($elem.hasClass('checked')) {
        $(".bit_win_val").addClass("selected");
    }

    $(".preview1  > img:not(:first)").hide();
    $(".car-sm-image-list > li img").click(function () {
        var $index = $(this).index();
        $(".preview1  > img").eq($index).fadeIn('fast').siblings("img").hide();

    });



    if ($(window).width() <= 768) {

        $(".signup_btn button").after("<a class='xs_forgot_password'>Forgot your password?</a>");
        $(".create_acc").html("Create new account");

        $(".membership_plan").slick({
            slidesToShow: 2,
            slidesToScroll: 1,
            horizontal: true,
            dots: false, centerPadding: 0,
            responsive: [{
                breakpoint: 768,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    horizontal: true,
                    dots: false, centerPadding: 0,
                }
            }, {
                breakpoint: 737,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                    horizontal: true,
                    dots: false, centerPadding: 0
                }
            }, {
                breakpoint: 600,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    horizontal: true,
                    dots: false, centerPadding: 0
                }
            }

            ]

        });


    }
    $(".viewordr1").closest(".introjs-tooltipReferenceLayer").addClass("asdasdsad4dgdfgf");
    //prev(".introjs-helperLayer.introjs-fixedTooltip").addClass("checkkrlo");



    $("body").on('click', '.payment_method li:not(.disabled)', function () {
        $('.payment_method li:not(".availfunds")').removeClass('active');
        $(this).addClass('active');
        $(this).find('input[type=checkbox]').prop("checked", !$(this).find('input[type=checkbox]').prop("checked"));
        $(this).parent().next("div").slideDown().siblings("div").slideUp();
    }).on('click', '.dashboard-reminder-disc .clicktohide', function () {
        $(this).closest(".dashboard-reminder-disc ").remove();
    });


    $('body').on("click", ".availfunds", function () {
        if ($(this).hasClass("active")) {
            if ($("ul.funds.rmb").hasClass('lessamt')) {
                $(".displayonlessamt").show();
            }
        }
    });

    /* $("input[type='text']").on("click", function() {
         $(".user-input-icon").addClass("user-input-icon-active");
     });
     $("input[type='text']").focusout(function() {
         $(".user-input-icon-active").removeClass("user-input-icon-active");
     });
     $("input[type='password']").on("click", function() {
         $(".user-input-pass-icon").addClass("user-input-pass-icon-active");
     });
     $("input[type='password']").focusout(function() {
         $(".user-input-pass-icon-active").removeClass("user-input-pass-icon-active");
     });*/


    function labeled() {
        $('.ordhist-oddet > li').each(function () {
            var getLabel = $(this).find('span[data-dt]').attr("data-dt");
            $(this).find('span[data-dt]').before("<strong class='clnhd'>" + getLabel + "</strong>");
        });
        $('.carw-oddet > li').each(function () {
            var getLabel = $(this).find('span[data-dt]').attr("data-dt");
            $(this).find('span[data-dt]').before("<strong class='clnhd'>" + getLabel + "</strong>");
        });
        $('.incomp-oddet > li').each(function () {
            var getLabel = $(this).find('span[data-dt]').attr("data-dt");
            $(this).find('span[data-dt]').before("<strong class='clnhd'>" + getLabel + "</strong>");
        });
        $('.memeplanquote-listdet > li').each(function () {
            var getLabel = $(this).find('span[data-dt]').attr("data-dt");
            $(this).find('span[data-dt]').before("<strong class='clnhd'>" + getLabel + "</strong>");
        });
        //market-pricehd
        //market-pricedet

    }




    if ($('.clnhd').length == 0) {
        var bfrAdded = false;

        if ($(window).width() <= 991) {
            labeled();
            bfrAdded = true;
            (function ($) {
                $.fn.jPushMenu = function (customOptions) {
                    var o = $.extend({}, $.fn.jPushMenu.defaultOptions, customOptions);

                    $('body').addClass(o.pushBodyClass);

                    // Add class to toggler
                    $(this).addClass('jPushMenuBtn');

                    $(this).click(function (e) {
                        e.stopPropagation();

                        var target = ''
                            , push_direction = '';

                        // Determine menu and push direction
                        if ($(this).is('.' + o.showLeftClass)) {
                            target = '.cbp-spmenu-left';
                            push_direction = 'toright';
                        } else if ($(this).is('.' + o.showRightClass)) {
                            target = '.cbp-spmenu-right';
                            push_direction = 'toleft';
                        } else if ($(this).is('.' + o.showTopClass)) {
                            target = '.cbp-spmenu-top';
                        } else if ($(this).is('.' + o.showBottomClass)) {
                            target = '.cbp-spmenu-bottom';
                        }

                        if (target == '') {
                            return;
                        }

                        $(this).toggleClass(o.activeClass);
                        $(target).toggleClass(o.menuOpenClass);

                        if ($(this).is('.' + o.pushBodyClass) && push_direction != '') {
                            $('body').toggleClass(o.pushBodyClass + '-' + push_direction);
                        }

                        // Disable all other buttons
                        $('.jPushMenuBtn').not($(this)).toggleClass('disabled');

                        return;
                    });

                    var jPushMenu = {
                        close: function (o) {
                            $('.jPushMenuBtn,body,.cbp-spmenu').removeClass('disabled ' + o.activeClass + ' ' + o.menuOpenClass + ' ' + o.pushBodyClass + '-toleft ' + o.pushBodyClass + '-toright');
                        }
                    }

                    // Close menu on clicking outside menu
                    if (o.closeOnClickOutside) {
                        $(document).click(function () {
                            jPushMenu.close(o);
                        });
                    }

                    // Close menu on clicking menu link
                    if (o.closeOnClickLink) {
                        $('.cbp-spmenu a').on('click', function () {
                            jPushMenu.close(o);
                        });
                    }
                }
                    ;

                /*
        * In case you want to customize class name,
        * do not directly edit here, use function parameter when call jPushMenu.
        */
                $.fn.jPushMenu.defaultOptions = {
                    pushBodyClass: 'push-body',
                    showLeftClass: 'menu-left',
                    showRightClass: 'menu-right',
                    showTopClass: 'menu-top',
                    showBottomClass: 'menu-bottom',
                    activeClass: 'menu-active',
                    menuOpenClass: 'menu-open',
                    closeOnClickOutside: true,
                    closeOnClickLink: true
                };
            }
            )(jQuery);
            $('.toggle-menu').jPushMenu();

            $(".membplan-list-slk").slick({
                slidesToShow: 3,
                slidesToScroll: 1,
                horizontal: true,
                dots: false, centerPadding: 0,
                responsive: [{
                    breakpoint: 768,
                    settings: {
                        slidesToShow: 3,
                        slidesToScroll: 1,
                        horizontal: true,
                        dots: false, centerPadding: 0,
                    }
                }, {
                    breakpoint: 737,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1,
                        horizontal: true,
                        dots: false, centerPadding: 0
                    }
                }

                ]




            });



        }

        $(window).resize(function () {

            if (($(window).width() <= 991) && !bfrAdded) {
                labeled();
                bfrAdded = true;


            }



        });
    }







    /*$('.ordhist-oddet > li').each(function(){


        var dtval=$(this).find("span").attr("data-dt");
        var $this = $(this);

    if ($('.clnhd').length > 0) {
        var afterAdded = false;

      if ($(window).width() < 991) {
        $this.prepend("<strong class='clnhd'>"+ dtval +"</strong>");
        afterAdded = true;
      }

      $(window).resize(function () {
        if (($(window) .width() < 991) && ! afterAdded) {
          $this.prepend("<strong class='clnhd'>"+ dtval +"</strong>");
          afterAdded = true;
        }
      });
    }
    });*/

if(($(window).width() > 991) ){
            // $("body").on("click",".carimagespar-inner",function(){
            //     $(".admorbtns").slideToggle(400);
            //     $(".caritemslist").toggleClass("colp");
            //     $(".caritemslist .toggleaddcar").slideToggle(500);
            //     $(".collapbtn").toggleClass("act");


            // });
        }

});





$(window).load(function () {
    bottomFixSec('.vehicle-add-sect');
    // $(".range_slider").each(function () {
    //     var min = $(this).data('slider').options.value[0],
    //         max = $(this).data('slider').options.value[1];
    //     $(this).siblings("strong").find("#val1").text(min).next("#val2").text(max);

    // });

    var gthdval=$(".crdt-hd h1").text();
$(".mblshow h1").text(gthdval);

});

function bottomFixSec(elem) {
    // $(elem).each(function () {
    //     if ($(this).css("position") === "fixed") {
    //         var h = $(this).outerHeight() + 5;
    //         $(this).prev("*").css("margin-bottom", h + "px");
    //     }
    // });
}
$(".closeadvancepan").on('click', function () {
    $(".advancepanel-bef").slideToggle(500);
    $(".advancepanel").slideToggle(500);
    $(".adv-search-btn").toggleClass("active");
});
function days_slider() {
    $('.auct-days-sect-list-sl1').slick({
        slidesToShow: 5,
        slidesToScroll: 1,
        arrows: true,
        prevArrow: "<button type='button' class='slick-prev'><i class='fa fa-angle-left' aria-hidden='true'></i></button>",
        nextArrow: "<button type='button' class='slick-next'><i class='fa fa-angle-right' aria-hidden='true'></i></button>"
        , responsive: [{
            breakpoint: 1024,
            settings: {
                slidesToShow: 4,
                slidesToScroll: 1,
                horizontal: true

            }
        }, {
            breakpoint: 768,
            settings: {
                slidesToShow: 3,
                slidesToScroll: 1,
                horizontal: true

            }
        }, {
            breakpoint: 737,
            settings: {
                slidesToShow: 4,
                slidesToScroll: 1,
                horizontal: true,
                dots: false, centerPadding: 0
            }
        }

        ]


    });

}
$(window).on('resize orientationchange', function() {
    $('.membplan-list-slk').slick('resize');
  });

  function startIntro() {
    var intro = introJs();
    intro.setOptions({
        showBullets: false,
        nextLabel: 'Next',
        // showStepNumbers: 'false',
        doneLabel:'Next page',
        tooltipClass: 'gen',
        keyboardNavigation: !1,
        steps: [{
                tooltipClass: 'gen entryd',
                intro: "<span class='hdtool text-center'>Welcome to</span> <p class='tooldesc'>Car Hub Japan's Customer Dashboard.</p>"
            }, {
                element: document.querySelector(".demo-intro"),
                tooltipClass: 'gen centbtm',
                intro: "<span class='hdtool'>Select Currency</span> <p class='tooldesc'>Select currency to know an instant estimate of the car and its exchange value.</p>",
                position: 'bottom'
            },
            {
                element: document.querySelector('.second-stp'),
                tooltipClass: "gen mfv",
                intro: "<span class='hdtool'>My Favourites</span> <p class='tooldesc'>By clicking here, you can add cars to favorites.</p><a class='nxtbtnintro' href='/my-favourite.asp?multipage=8'>Next</a>",
                position: 'bottom'
            },
            {
                element: document.querySelector('.thrd-stp'),
                tooltipClass: "gen ntf",
                intro: "<span class='hdtool'>Notifications</span> <p class='tooldesc'>Notifications update you with the useful information about your favorite cars.</p><a class='bck-btn' href='/my-favourite.asp?multipage=8'></a>",
                position: 'bottom'
            },
            {
                element: document.querySelector('.profnav.frth-step'),
                tooltipClass: "gen lgn",
                intro: "<span class='hdtool'>Login</span> <p class='tooldesc'>Click here to access your profile.</p>",
                position: 'top'

            },
            {
                element: document.querySelector('.hlpbtn.fifth'),
                tooltipClass: "gen hlptip",
                intro: "<span class='hdtool'>Help</span> <p class='tooldesc'>By help, you can troubleshoot problems or receive information regarding products, procedures, or any technical problem.</p>",
                tooltipPosition: 'bottom'
            },
            {
                element: document.querySelector('.srchbtn.sixth'),
                tooltipClass: "gen srcic",
                intro: "<span class='hdtool'>Search</span> <p class='tooldesc'>Please write the vehicle name in the search bar and find desired results.</p>",
                tooltipPosition: 'bottom'
            },
            {
                element: document.querySelector('.hglt.sxtnth'),
                position: "right",
                tooltipClass: "gen notifauc",
                intro: "<p class='tooldesc'>This area will show you the important information or latest updates.</p>",

            },
            {
                element: document.querySelector('.addordr.svnth'),
                tooltipClass: "gen adnorder",
                intro: "<span class='hdtool'>Add New Order</span> <p class='tooldesc'>To place a new order, click this button and initiate the purchase.</p>",
                tooltipPosition: 'bottom'

            },
            {
                element: document.querySelector('.hglt.eight'),
                position: "right",
                tooltipClass: "gen cwon",
                intro: "<span class='hdtool'>Car Won</span> <p class='tooldesc'>Click here to view cars you have won through the bidding process.</p><a class='nxtbtnintro' href='/car-won.asp?multipage=4'>Next</a>"

            },
            {
                element: document.querySelector('.hglt.ninth'),
                position: "right",
                tooltipClass: "gen cbidinpg",
                intro: "<span class='hdtool'>In Progress</span> <p class='tooldesc'>Click here to view the cars that are currently in the bidding process. </p><a class='bck-btn' href='/car-won.asp?multipage=4'></a> <a class='nxtbtnintro' href='/bidding.asp?multipage=7'>Next</a>"

            }, {
                element: document.querySelector('.hglt.tnthel'),
                position: "right",
                tooltipClass: "gen clost",
                intro: "<span class='hdtool'>Car Lost</span> <p class='tooldesc'>Click here to view cars you have lost in the bidding process. </p><a class='bck-btn' href='/bidding.asp?multipage=7'></a><a class='nxtbtnintro' href='/car-lost.asp?multipage=5'>Next</a>",


            }, {
                element: document.querySelector('.hglt.elvnth'),
                position: "left",
                tooltipClass: "gen uprof",
                intro: "<span class='hdtool'>Profile Completion</span><p class='tooldesc'>Click here to view your profile and complete your information.</p>"


            }, {
                element: document.querySelector('.hglt.svnteth'),
                tooltipClass: "gen avlfnd",
                intro: "<span class='hdtool'>Available Funds</span> <p class='tooldesc'>Click here to add funds, view available funds, credit limit, and utilized amount.</p>",
                position: "right"

            },
            {
                element: document.querySelector('.hglt.eightnth'),
                tooltipClass: "gen upcfnd",
                intro: "<span class='hdtool'>Upcoming Payments</span> <p class='tooldesc'>By clicking here, you can view upcoming payment for your ordered vehicle.</p><a class='nxtbtnintro' href='/upcoming-payments.asp?multipage=11'>Next</a>",
                position: "right"

            },
            {
                element: document.querySelector('.hglt.nintnth'),
                position: "left",
                tooltipClass: "gen crnmem",
                intro: "<span class='hdtool'>Current Membership</span> <p class='tooldesc'>Click here to view your current membership or upgrade your membership plan.</p><a class='bck-btn' href='/payment-completed.asp?multipage=12'></a>"


            },
            {
                element: document.querySelector('.hglt.twentnth'),
                position: "right",
                tooltipClass: "gen myfv",
                intro: "<span class='hdtool'>My Favourite</span> <p class='tooldesc'>Vehicles added to favorites can be viewed here.</p>"


            },
            {
                element: document.querySelector('.hglt.twentnthonth'),
                intro: "<span class='hdtool'>Recent Activities</span> <p class='tooldesc'>You can view your recent activities here.</p>",
                position: "left",
                tooltipClass: 'gen rec-actv',



            }

        ]

    });


    intro.start().onbeforechange(function () {

        if (intro._currentStep == "2") {
            //window.location.href="/my-favourite.asp?multipage=8";
            //$(".gen.mfv .introjs-button.introjs-nextbutton").unbind( "click" );
            //$(".introjs-button.introjs-nextbutton").css("display","none");
        }
        // if (intro._currentStep == "12") {
        //     $(".dashboard-reminder-disc.upgmemb").fadeOut();
        //     $(".dashboard-reminder-disc.profilecomp").slideDown(400);
        // }
        // if (intro._currentStep == "13") {
        //     $(".dashboard-reminder-disc.profilecomp").fadeOut();
        //     $(".dashboard-reminder-disc.cardexpiry").fadeIn(400);
        // }
        // if (intro._currentStep == "14") {
        //     $(".dashboard-reminder-disc.cardexpiry").fadeOut();
        //     $(".dashboard-reminder-disc.addfunds").fadeIn(400);
        // }
        if (intro._currentStep == "7") {
            $(".dashboard-reminder-disc.addfunds").fadeOut();
            $(".dashboard-reminder-disc.firstorder").fadeIn(400);
        }
        if (intro._currentStep == "15") {

            // $(this).children(function(){
            //     $(".introjs-button.introjs-nextbutton.introjs-disabled").css({
            //         'cursor':'pointer'
            //     });
            //    $("body").on("click",".introjs-disabled.introjs-disabled:hover.introjs-disabled:focus",function(){

            //    });
            // });
            intro.oncomplete(function() {
                window.location.href = '/list-view-customer.asp?multipage=1a';
              });

              }

    }).onchange(function(){

    });


    // if (RegExp('multipage', 'gi').test(window.location.search)) {
    //     introJs().setOption('doneLabel',
    //          'Your next Page &rarr; (Name of Page)').start().oncomplete(function() {
    //         window.location.href = '/list-view-customer.asp?multipage=1';
    //     });
    // }

}



function startIntro10b() {

    var intro10b = introJs();
    intro10b.setOptions({
        showBullets: false,
        nextLabel: 'Next',
        showStepNumbers: 'false',
        tooltipClass: 'gen',
        doneLabel: 'Next Page',
        keyboardNavigation: !1,
        steps: [{
            element: document.querySelector('.hglt.incmp1basd'),tooltipClass:'gen incmptoolasd',
            intro: "<span class='hdtool'>Incomplete Order</span><p class='tooldesc ext-bot-pd'>Following is the list of your incomplete orders.</p><a class='bck-btn' href='/order_history_new.asp?multipage=9'></a>",
            position: "bottom"

            }
        ].filter(function (obj) {
            return $(obj.element).length;
        })
    });
    intro10b.start().oncomplete(function() {
                window.location.href = '/payment-completed.asp?multipage=12';
              });



}


function startIntro1a() {
    intro1a = introJs();
    intro1a.setOptions({
        showBullets: false,
        nextLabel: 'Next',
        showStepNumbers: 'false',
        tooltipClass: 'gen',
        doneLabel: 'Next Page',
        keyboardNavigation: !1,
        steps: [{
                tooltipClass: 'gen srcdemointro',
                intro: "<span class='hdtool text-center'>Welcome to</span><p class='tooldesc1'>Car Hub Japan's Car Search area. You can search desirable cars and place bid request.</p><a class='bck-btn' href='/dashboard.asp'</a>"
            }, {
                element: document.querySelector('.hglt.twentytwo'),
                position: "bottom",
                tooltipClass: 'gen srctip1',
                intro: "<p class='tooldesc1'>Search cars available for auction, one-priced cars or view the sales statistics here.</p>"


            }, {
                element: document.querySelector('.hglt.twentythree'),
                position: "bottom",
                tooltipClass: 'gen srctip',
                intro: "<span class='hdtool'>Search</span> <p class='tooldesc'>Please enter the required information to search your favorite car.</p>"


            }, {
                element: document.querySelector('.hglt.twentyfour'),
                position: "bottom",
                scrollToElement: ".gen.   advsrc",
                tooltipClass: 'gen advsrc',
                intro: "<span class='hdtool' data-scroll-to-element='true'>Advance Search</span> <p class='tooldesc'>Please enter the additional information for the best possible result.</p>"
                // onload:function(){
                //     alert();
                // }


            }, {
                element: document.querySelector('.hglt.twentyfive'),
                tooltipClass: 'gen srch-resl',
                intro: "<span class='hdtool' data-scroll-to-element='true'>Search Results</span><p class='tooldesc ext-bot-pd'>You can view your search results here.</p>",
                position: "bottom"

            }

        ]

    });


    intro1a.start().oncomplete(function() {
                window.location.href = '/unit-detail-quotation.asp?multipage=2';
             });



}

function startIntro2() {

    var intro2 = introJs();
    intro2.setOptions({
        showBullets: false,
        nextLabel: 'Next',
        // showStepNumbers: 'false',
        tooltipClass: 'gen',
        doneLabel: 'Next Page',
        keyboardNavigation: !1,
        steps: [{
            tooltipClass: 'gen unitdmintro',
            intro: "<span class='hdtool text-center'>Welcome to</span><p class='tooldesc'>Car Hub Japan's Car details area. You will be able to see car specification, auction sheet, pricing  and much more.</p><a class='bck-btn' href='/list-view-customer.asp?multipage=1'></a>"
             },{
                element: document.querySelector('.hglt.twentysix'),scrollToElement:"true",tooltipClass: 'gen addfvbtn',
                intro: "<span class='hdtool'>Add to Favourite</span><p class='tooldesc'>By clicking here, you can add this vehicle to your favorite list.</p>",
                position: "bottom"

            },{
                element: document.querySelector('.hglt.twentysvn'),tooltipClass: 'gen indvc',
                intro: "<span class='hdtool'>Car</span> <p class='tooldesc'>You can see the vehicle’s pictures here.</p>",
                position: "right"

            },{
                element: document.querySelector('.hglt.twentyeght'),position: "left",scrollToElement:"true",tooltipClass: 'gen prcng',
                intro: "<span class='hdtool'>Pricing</span> <p class='tooldesc'>Following are the pricing details of your desired vehicle.</p>"




            },{
                element: document.querySelector('.hglt.twentynine'),tooltipClass: 'gen aucts',
                intro: "<span class='hdtool'>Auction Sheet</span><p class='tooldesc ext-bot-pd'>You can view the original auction sheet of the car and can also request for its English translation.</p>",
                position: "right"

            },{
                element: document.querySelector('.hglt.thrty'),tooltipClass: 'gen cardt',
                intro: "<span class='hdtool'>Car Details</span><p class='tooldesc ext-bot-pd'>Following are the details of your desired vehicle.</p>",
                position: "left"

            },{
                element: document.querySelector('.hglt.thrtyone'),tooltipClass: 'gen shipmdt',
                intro: "<span class='hdtool'>Shipment Details</span><p class='tooldesc ext-bot-pd'>You can view your shipping details here.</p>",
                position: "left"

            },{
                element: document.querySelector('.hglt.thrtytwo'),tooltipClass: 'gen mktprc',
                intro: "<span class='hdtool'>Market Price</span><p class='tooldesc ext-bot-pd'>You can view pricing of similar cars from up to last three months of data.</p>",
                position: "right"

            },{
                element: document.querySelector('.hglt.thrtyfr'),tooltipClass: 'gen mnf',
                intro: "<span class='hdtool'>Manufacture Year Check</span><p class='tooldesc ext-bot-pd'>Please write the car make, chassis, and lot number to know the manufacture year.</p>",
                position: "left"

            },{
                element: document.querySelector('.hglt.thrtyfv'),tooltipClass: 'gen grpc',
                intro: "<span class='hdtool'>Group Cars</span><p class='tooldesc ext-bot-pd'>In this section, you can view your group cars and add more vehicles to your list.  </p>",
                position: "top"

            },{
                element: document.querySelector('.hglt.thrtysx'),tooltipClass: 'gen viewordr1',
                intro: "<span class='hdtool'>View Order</span><p class='tooldesc ext-bot-pd'>Please click here to view your order. </p>",
                position: "auto"

            },{
                element: document.querySelector('.hglt.thrtysxts'), tooltipClass: 'gen addnc',
                intro: "<span class='hdtool'>Add New Car</span><p class='tooldesc ext-bot-pd'>Please click here to add new car. </p>",
                position: "auto"

            }]

    });
    intro2.start().oncomplete(function() {
                            window.location.href = '/unit-details.asp?multipage=3';
         }).onafterchange(function(targetElement) {
            if (this._currentStep == "10") {
                overlay = document.getElementsByClassName("introjs-helperLayer");
                overlay1 = document.getElementsByClassName("introjs-helperLayer");
                if($(window).width() > 1366){
                    for (i = 0; i < overlay.length; i++) {
                        overlay[i].style.position = 'fixed';
                        overlay[i].style.setProperty("background-color", "#2d2d2d", "important");
                        overlay[i].style.boxShadow = "0px 3px 6px 0px rgba(255, 255, 255, 0.3)";
                        overlay[i].style.borderRadius = "20px";
                        overlay[i].style.fontSize = "13px";
                        overlay[i].textContent="View Order";
                        overlay[i].style.color = "#fff";
                        overlay[i].style.paddingLeft = "25px";
                        overlay[i].style.margin="20px 0 0 0";
                        overlay[i].style.height = "32px";
                        overlay[i].style.width = "95px";

                        overlay[i].style.paddingTop = "9px";
                    }
                }
                    if($(window).width() <= 1366){
                        for (ib = 0; ib < overlay1.length; ib++) {
                            overlay1[ib].style.position = 'fixed';
                            overlay1[ib].style.setProperty("background-color", "#2d2d2d", "important");
                            overlay1[ib].style.boxShadow = "0px 3px 6px 0px rgba(255, 255, 255, 0.3)";
                            overlay1[ib].style.borderRadius = "20px";
                            overlay1[ib].style.fontSize = "13px";
                            overlay[ib].textContent="View Order";
                            overlay1[ib].style.color = "#fff";
                            overlay1[ib].style.paddingLeft = "25px";
                            overlay[ib].style.margin="0px 0 0 0";
                            overlay1[ib].style.height = "32px";
                            overlay[ib].style.width = "95px";
                            overlay[ib].style.margin="20px 0 0 0";
                            overlay1[ib].style.paddingTop = "9px";
                        }

                    }


            }
            if (this._currentStep == "11") {
                overlay = document.getElementsByClassName("introjs-helperLayer");
                for (ia = 0; ia < overlay.length; ia++) {
                    overlay[ia].style.position = 'fixed';
                    overlay[ia].style.setProperty("background-color", "#858585", "important");
                    overlay[ia].style.boxShadow = "0px 3px 6px 0px rgba(255, 255, 255, 0.3)";
                    overlay[ia].style.borderRadius = "20px";
                    overlay[ia].style.fontSize = "13px";
                    overlay[ia].textContent="Add New Car";
                    overlay[ia].style.color = "#fff";
                    overlay[ia].style.paddingLeft = "22px";

                    overlay[ia].style.height = "28px";
                    overlay[ia].style.width = "97px";
                    overlay[ia].style.paddingTop = "11px";
                }
            }
        });

}


function startIntro3() {

    var intro3 = introJs();
    intro3.setOptions({
        showBullets: false,
        nextLabel: 'Next',
        showStepNumbers: 'false',
        tooltipClass: 'gen',
        doneLabel: 'Next Page',
        keyboardNavigation: !1,
        steps: [{
                element: document.querySelector('.hglt.thrtyeght'),tooltipClass: 'gen rmvcar',
                intro: "<span class='hdtool'>Remove Cars</span><p class='tooldesc ext-bot-pd'>You can remove cars previously added in the order. </p> <a class='bck-btn' href='/list-view-customer.asp?multipage=2'></a>",
                position: "right"

            }

        ].filter(function (obj) {
            return $(obj.element).length;
        })
    });

    intro3.start().oncomplete(function() {
                            window.location.href = '/multi-quotation.asp?multipage=13';
         });


}






function startIntro4() {

    var intro4 = introJs();
    intro4.setOptions({
        showBullets: false,
        nextLabel: 'Next',
        showStepNumbers: 'false',
        tooltipClass: 'gen',
        doneLabel: 'Next',
        keyboardNavigation: !1,
        steps: [
            // {
            //     element: document.querySelector('.hglt.carwncat'),tooltipClass: 'gen carwncattool',
            //     intro: "<span class='hdtool'>Select Category</span><p class='tooldesc ext-bot-pd'>Click here to select the bidding status.</p><a class='bck-btn' href='/dashboard.asp?multipage=dwbb'></a>",
            //     position: "bottom"

            // },
            {
                element: document.querySelector('.hglt.carwn'),tooltipClass: 'gen carwntool',
                intro: "<span class='hdtool'>Car Won</span><p class='tooldesc ext-bot-pd'>Click here to view cars you have won through the bidding process. </p>",
                position: "top"
            }
            // ,{
            //     element: document.querySelector('.hglt.carwn2'),tooltipClass: 'gen carwntool2',
            //     intro: "<span class='hdtool'>Select Here</span><p class='tooldesc ext-bot-pd'>Click here to view cars you have won through the bidding process. </p>",
            //     position: "left"
            // }
        ].filter(function (obj) {
            return $(obj.element).length;
        })
    });
    intro4.start().oncomplete(function() {
                window.location.href = '/dashboard.asp?multipage=cwb';
              });


}

function startIntro5() {
    var intro5 = introJs();
    intro5.setOptions({
        showBullets: false,
        nextLabel: 'Next',
        // showStepNumbers: 'false',
        tooltipClass: 'gen',
        doneLabel: 'Next Page',
        keyboardNavigation: !1,
        steps: [{
                element: document.querySelector('.hglt.carlsect'),tooltipClass:'gen carlsecttool',
                intro: "<span class='hdtool'>Car Lost</span><p class='tooldesc ext-bot-pd'>Click here to view cars you have lost in the bidding process.</p><a class='bck-btn' href='/car-won.asp?multipage=4'></a>",
                position: "top"
            }
        ].filter(function (obj) {
            return $(obj.element).length;
        })
    });
    intro5.start().oncomplete(function() {
                window.location.href = '/dashboard.asp?multipage=clb';

    });
}


function startIntro7() {

    var intro7 = introJs();
    intro7.setOptions({
        showBullets: false,
        nextLabel: 'Next',
        showStepNumbers: 'false',
        tooltipClass: 'gen',
        doneLabel: 'Next Page',
        keyboardNavigation: !1,
        steps: [{
                element: document.querySelector('.hglt.bidinprog'),tooltipClass:'gen bidinprogtool',
                intro: "<span class='hdtool'>Bid In Progress</span><p class='tooldesc ext-bot-pd'>Click here to view the cars that are currently in the bidding process.</p> <a class='bck-btn' href='/dashboard.asp?multipage=cwb'></a>",
                position: "top"

            }
        ].filter(function (obj) {
            return $(obj.element).length;
        })
    });
    intro7.start().oncomplete(function() {
                window.location.href = '/dashboard.asp?multipage=cdnd';
               });



}


function startIntro8() {

    var intro8 = introJs();
    intro8.setOptions({
        showBullets: false,
        nextLabel: 'Next',
        showStepNumbers: 'false',
        tooltipClass: 'gen',
        doneLabel: 'Next Page',
        keyboardNavigation: !1,
        steps: [
            {
                element: document.querySelector('.hglt.mfvsect'),tooltipClass:'gen mfvsecttool',
                intro: "<span class='hdtool'>My Favourite</span><p class='tooldesc ext-bot-pd'>In this section, you can view your favorites car here.</p><a class='bck-btn' href='/dashboard.asp?multipage=bb'></a>",
                position: "bottom"

            }
        ].filter(function (obj) {
            return $(obj.element).length;
        })
    });
    intro8.start().oncomplete(function() {
                window.location.href = '/dashboard.asp?multipage=ba';
             });



}


function startIntro9() {

    var intro9 = introJs();
    intro9.setOptions({
        showBullets: false,
        nextLabel: 'Next',
        showStepNumbers: 'false',
        tooltipClass: 'gen',
        doneLabel: 'Next Page',
        keyboardNavigation: !1,
        steps: [
            {
                element: document.querySelector('.hglt.ordrinpro'),tooltipClass:'gen ordrinprotool',
                intro: "<span class='hdtool'>Order In Progress</span><p class='tooldesc ext-bot-pd'>This area provides you each vehicle’s status information.</p><a class='bck-btn' href='/my-favourite.asp?multipage=8'></a>",
                position: "bottom"

            }
        ].filter(function (obj) {
            return $(obj.element).length;
        })
    });
    intro9.start().oncomplete(function() {
                window.location.href = '/incomplete_order.asp?multipage=1b';
             });



}



function startIntro11() {

    var intro11 = introJs();
    intro11.setOptions({
        showBullets: false,
        nextLabel: 'Next',
        showStepNumbers: 'false',
        tooltipClass: 'gen',
        doneLabel: 'Next Page',
        keyboardNavigation: !1,
        steps: [
           {
                element: document.querySelector('.hglt.upcpayt'),tooltipClass:'gen upcpaytool',
                intro: "<span class='hdtool'>Upcoming Payments</span><p class='tooldesc ext-bot-pd'>Following is the list of your active orders for upcoming payment.</p><a class='bck-btn' href='/dashboard.asp?multipage=upcback'></a>",
                position: "bottom"

            }
        ].filter(function (obj) {
            return $(obj.element).length;
        })
    });
    intro11.start().oncomplete(function() {
                window.location.href = '/payment-completed.asp?multipage=12';
              });



}


function startIntro12() {

    var intro12 = introJs();
    intro12.setOptions({
        showBullets: false,
        nextLabel: 'Next',
        showStepNumbers: 'false',
        tooltipClass: 'gen',
        doneLabel: 'Next Page',
        keyboardNavigation: !1,
        steps: [
            {
                element: document.querySelector('.hglt.paycomp'),tooltipClass:'gen paycomptool',
                intro: "<span class='hdtool'>Payment Completed</span><p class='tooldesc ext-bot-pd'>Your payment has been made for the following orders.</p><a class='bck-btn' href='/upcoming-payments.asp?multipage=11'></a>",
                position: "bottom"

            }
        ].filter(function (obj) {
            return $(obj.element).length;
        })
    });
    intro12.start().oncomplete(function() {
                window.location.href = '/dashboard.asp?multipage=memb';
              });



}



function startIntro13() {

    var intro13 = introJs();
        intro13.setOptions({
        showBullets: false,
        nextLabel: 'Next',
        showStepNumbers: 'false',
        tooltipClass: 'gen',
        doneLabel: 'Next Page',
        keyboardNavigation: !1,
        steps: [{
                element: document.querySelector('.hglt.membsld'),tooltipClass:'gen membsldtool',
                intro: "<span class='hdtool'>Membership Plan</span><p class='tooldesc ext-bot-pd'>Choose your desired membership plan here.</p><a class='bck-btn' href='/payment-completed.asp?multipage=12'></a>",
                position: "bottom"

            },{
                element: document.querySelector('.hglt.membsct'),tooltipClass:'gen membscttool',
                intro: "<span class='hdtool'>Membership Plan</span><p class='tooldesc ext-bot-pd'>Selecting this membership plan gets you the following benefits.</p>",
                position: "top"

            }
        ].filter(function (obj) {
            return $(obj.element).length;
        })
    });
    intro13.start().oncomplete(function() {
                    window.location.href = '/order-detail.asp?multipage=14';
             });



}


// intro10.start().oncomplete(function(){
//     //window.location.href = '/upcoming-payments.asp?multipage=11';
//     alert();
// });
function startIntro14() {

    var intro14 = introJs();
    intro14.setOptions({
        showBullets: false,
        nextLabel: 'Next',
        showStepNumbers: 'false',
        tooltipClass: 'gen',
        doneLabel: 'Finish',
        keyboardNavigation: !1,
        steps: [{
            tooltipClass:'gen ordetdetdemo',
            intro: "<span class='hdtool'>Welcome to</span><p class='tooldesc ext-bot-pd'>Car Hub Japan’s Order detail area. You will be able to view car status, car documentation, delivery report and much more just a click away.</p><a class='bck-btn' href='/multi-quotation.asp?multipage=13'></a>"


        },{
                element: document.querySelector('.hglt.thrtynine'),tooltipClass:'gen admcar',
                intro: "<span class='hdtool'>Add More Cars</span><p class='tooldesc ext-bot-pd'>Please click here to add more cars to your order. </p>",
                position: "bottom"

            },{
                element: document.querySelector('.hglt.frty'),tooltipClass:'gen grpc1',
                intro: "<span class='hdtool'>Group Cars</span><p class='tooldesc ext-bot-pd'>You can add multiple cars and create a group. You can also create multiple groups in the same order. </p>",
                position: "bottom"
            },{
                element: document.querySelector('.hglt.frtyone'),tooltipClass:'gen grpc2',
                intro: "<span class='hdtool'>Unit Car</span><p class='tooldesc ext-bot-pd'>You can view list of cars added in a group and see each car’s progress status.</p>",
                position: "bottom"

            },{
                element: document.querySelector('.hglt.frtytwo'),tooltipClass:'gen mkdltooltip',
                intro: "<p class='tooldesc'>In this section you can view the selected car’s details related to specification ,shipping and pricing. </p>",
                position: "bottom"

            },{
                element: document.querySelector('.hglt.frtythree'),tooltipClass:'gen timel',
                intro: "<p class='tooldesc'>You can view each step of the process for every vehicle you have purchase, all the way from bidding to delivery. </p> <p class='tooldesc'>Details of each lifecycle step can be viewed here. </p>",
                position: "right"

            }]

    });
    intro14.start().oncomplete(function() {
        window.location.href = '/dashboard.asp';
 }).onbeforechange(function(){
        if(intro14._currentStep=="5")
        {
            $(".details-timeline ul li:nth-child(3)").trigger("click");
            //alert();
        }

 });


}

// function makeefind() {
//     var input, filter, ul, li, a, i;
//     input = document.getElementById("myInput");
//     filter = input.value.toUpperCase();
//     ul = document.getElementById("myUL");
//     li = ul.getElementsByTagName("li");
//     for (i = 0; i < li.length; i++) {
//         a = li[i].getElementsByTagName("span")[0];
//         if (a.innerHTML.toUpperCase().indexOf(filter) > -1) {
//             li[i].style.display = "";
//         } else {
//             li[i].style.display = "none";

//         }
//     }
// }

// function mdlfind() {

//     $('#myInput').keyup(function(){
//         var valThis = $(this).val().toLowerCase();

//          if(valThis == ""){
//              $(this).parent().next().find('.make-sect-list-elem > li').show();
//          } else {
//             $(this).parent().next().find('.make-sect-list-elem > li').each(function(){

//                  var text = $(this).find("span").text().toLowerCase();
//                  (text.indexOf(valThis) >= 0) ? $(this).show() : $(this).hide();
//              });
//         }
//      });
//      $('#mdlinput').keyup(function(){
//         var valThis = $(this).val().toLowerCase();
//          if(valThis == ""){
//              $('.model-sect-list-eleme > li').show();
//          } else {
//              $('.model-sect-list-eleme > li').each(function(){

//                  var text = $(this).find("span").text().toLowerCase();
//                  (text.indexOf(valThis) >= 0) ? $(this).show() : $(this).hide();
//              });
//         }
//      });
//      $('#chsinput').keyup(function(){
//         var valThis = $(this).val().toLowerCase();
//          if(valThis == ""){
//              $('.chs-sect-list-eleme > li').show();
//          } else {
//              $('.chs-sect-list-eleme > li').each(function(){

//                  var text = $(this).find("span").text().toLowerCase();
//                  (text.indexOf(valThis) >= 0) ? $(this).show() : $(this).hide();
//              });
//         }
//      });
//      $('#condlinput').keyup(function(){
//         var valThis = $(this).val().toLowerCase();
//          if(valThis == ""){
//              $('.condition-sect-inner-lst > li').show();
//          } else {
//              $('.condition-sect-inner-lst > li').each(function(){

//                  var text = $(this).find("span").text().toLowerCase();
//                  (text.indexOf(valThis) >= 0) ? $(this).show() : $(this).hide();
//              });
//         }
//      });
//      $('#colorslinput').keyup(function(){
//         var valThis = $(this).val().toLowerCase();
//          if(valThis == ""){
//              $('.colors-sect-lst-in > li').show();
//          } else {
//              $('.colors-sect-lst-in > li').each(function(){

//                  var text = $(this).find("span").text().toLowerCase();
//                  (text.indexOf(valThis) >= 0) ? $(this).show() : $(this).hide();
//              });
//         }
//      });


//      $('#auct-list-k').keyup(function(){
//         var valThis = $(this).val().toLowerCase();
//          if(valThis == ""){
//              $('.aucthouses-sect-list-elem > li').show();           
//          } else {
//              $('.aucthouses-sect-list-elem > li').each(function(){
  
//                  var text = $(this).find("span").text().toLowerCase();
//                  (text.indexOf(valThis) >= 0) ? $(this).show() : $(this).hide();
//              });
//         }
//      });
// }