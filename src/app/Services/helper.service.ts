import { Injectable } from '@angular/core';
import { day } from '../models/day';
import { ToastrService } from './toastr.service';

declare var $: any;
declare var moment: any;

@Injectable()
export class HelperService {

  constructor(private toastrservice: ToastrService) { }

  getMinMaxArray(fromYear: number, toYear: number, additionBy: number): any[] {
    let numberArray: any[] = []
    let index = 1
    if (fromYear == 0) {
      fromYear = 1900;
    }
    while (fromYear <= toYear) {
      numberArray.push({ Id: index++, Title: fromYear })
      fromYear = fromYear + additionBy
    }
    return numberArray;
  }

  arrayGenerator(array: any[]): any[] {
    let newArray: any[] = []
    let index = 1
    for (let i = 0; i < array.length; i++) {
      newArray.push({ Id: index++, Title: array[i] })
    }
    return newArray
  }


  loadMakeFunction() {
    $('#myInput').keyup(function () {
      var valThis = $(this).val().toLowerCase();

      if (valThis == "") {
        $(this).parent().next().find('.make-sect-list-elem > li').show();
      } else {
        $(this).parent().next().find('.make-sect-list-elem > li').each(function () {

          var text = $(this).find("span").text().toLowerCase();
          (text.indexOf(valThis) >= 0) ? $(this).show() : $(this).hide();
        });
      }
    });
    $('#auct-list-k').keyup(function () {
      var valThis = $(this).val().toLowerCase();
      if (valThis == "") {
        $('.aucthouses-sect-list-elem > li').show();
      } else {
        $('.aucthouses-sect-list-elem > li').each(function () {

          var text = $(this).find("span").text().toLowerCase();
          (text.indexOf(valThis) >= 0) ? $(this).show() : $(this).hide();
        });
      }
    });
  }

  loadModelFunctions() {
    $('#mdlinput').keyup(function () {
      var valThis = $(this).val().toLowerCase();
      if (valThis == "") {
        $('.model-sect-list-eleme > li').show();
      } else {
        $('.model-sect-list-eleme > li').each(function () {

          var text = $(this).find("span").text().toLowerCase();
          (text.indexOf(valThis) >= 0) ? $(this).show() : $(this).hide();
        });
      }
    });




  }

  loadOtherAuctionSerachFunction() {
    $('#chsinput').keyup(function () {
      var valThis = $(this).val().toLowerCase();
      if (valThis == "") {
        $('.chs-sect-list-eleme > li').show();
      } else {
        $('.chs-sect-list-eleme > li').each(function () {
          var text = $(this).find("span").text().toLowerCase();
          (text.indexOf(valThis) >= 0) ? $(this).show() : $(this).hide();
        });
      }
    });
    $('#condlinput').keyup(function () {
      var valThis = $(this).val().toLowerCase();
      if (valThis == "") {
        $('.condition-sect-inner-lst > li').show();
      } else {
        $('.condition-sect-inner-lst > li').each(function () {
          var text = $(this).find("span").text().toLowerCase();
          (text.indexOf(valThis) >= 0) ? $(this).show() : $(this).hide();
        });
      }
    });
    $('#colorslinput').keyup(function () {
      var valThis = $(this).val().toLowerCase();
      if (valThis == "") {
        $('.colors-sect-lst-in > li').show();
      } else {
        $('.colors-sect-lst-in > li').each(function () {
          var text = $(this).find("span").text().toLowerCase();
          (text.indexOf(valThis) >= 0) ? $(this).show() : $(this).hide();
        });
      }
    });
  }

  loadBidPricePopUp() {
    $("body").on("click", ".hlp-icon a", function () {
      $(this).parent().next(".popshd").fadeIn(600);
    });

    $("body").on("click", ".colpexp-ic", function () {

      $(this).parent().next().toggleClass("active", 1000);
      $(this).toggleClass("active", 1000);


    });
    $("body").on("click", ".cnfrd", function () {
      if ($(this).prop("checked", true)) {
        //$(this).parent().closest(".slpopdet-sel").next().addClass("srv");
        $(this).closest(".slpop-innerdv").find(".serv-char").slideUp(300);
        $(this).closest(".slpop-innerdv").find(".cnfbsed").slideDown(300);
      }

    }).on("click", ".servrd", function () {
      if ($(this).prop("checked", true)) {
        //$(this).parent().closest(".slpopdet-sel").next().next().addClass("srv");
        $(this).closest(".slpop-innerdv").find(".cnfbsed").slideUp(300);
        $(this).closest(".slpop-innerdv").find(".serv-char").slideDown(300);
      }
    });
  }

  getAuctionSearchMonths() {
    let months = [
      { Id: 1, Title: "Month 1", EnumVal: 1 },
      { Id: 2, Title: "Month 2", EnumVal: 2 },
      { Id: 3, Title: "Month 3", EnumVal: 3 }
    ];
    return months
  }

  getAuctionSerachDays() {
    let days: day[] = [
      { Id: 1, Title: 'MON', EnumVal: 2 },
      { Id: 2, Title: 'TUE', EnumVal: 3 },
      { Id: 3, Title: 'WED', EnumVal: 4 },
      { Id: 4, Title: 'THU', EnumVal: 5 },
      { Id: 5, Title: 'FRI', EnumVal: 6 },
      { Id: 6, Title: 'SAT', EnumVal: 7 },
      { Id: 7, Title: 'SUN', EnumVal: 1, }
    ]
    let todayDay: string = moment().format('ddd');
    let newDays: any[] = [];
    days.forEach(element => {
      if (element.Title == todayDay.toUpperCase()) {
        for (let i = 0; i < 5; i++) {
          let getDay: string = moment().day(element.Id + i).format('ddd')
          let filterDay = days.filter(x => x.Title == getDay.toUpperCase())[0]
          newDays.push(filterDay)
        }
      }
    });
    return newDays;
  }

  loaderunitdetailfunction() {
    $('body').removeClass('main_login');
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
          slidesToShow: 2,
          slidesToScroll: 1
        }
      }, {
        breakpoint: 568,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1
        }
      }, {
        breakpoint: 414,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1
        }
      }, {
        breakpoint: 320,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1
        }
      }
      ]
    });

    $("body").addClass("individual-unit");

    if (($(window).width() > 991)) {
      $("body").on("click", ".carimagespar-inner", function () {
        $(".admorbtns").slideToggle(400);
        $(".caritemslist").toggleClass("colp");
        $(".caritemslist .toggleaddcar").slideToggle(500);
        $(".collapbtn").toggleClass("act");
      });
    }
  }

  loadspecificquotationpage() {
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

    $(".currenc-sel a").click(function () {
      var currTag1 = $(this).text();
      $('.currenc-sel a').removeClass('actve');
      $(this).addClass("actve");
      $('.current-currency').text(currTag1);
    });

    $("body").on("click", ".order-detail-cars-list  li ", function () {
      $(".order-detail-cars-list  li ").removeClass('active');
      $(this).addClass('active');
    });
  }

  callaccordingtoggle() {
    $('.accordion').find('.accordion-toggle').click(function () {
      $(this).next().slideToggle('600');
    }).on('click', 'button', function () {
      // $('.accordion-toggle').stopPropagation();
    }).on("click", '.numbitemslist li a', function () {
      // $('.accordion-toggle').stopPropagation();
    });
    $('.accordion-toggle').on('click', function () {
      $(this).toggleClass('active');
    });
  }

  isrefresh: boolean = false;
  setRefreshQuotationBar(val: boolean) {
    this.isrefresh = val
  }

  getRefreshQuotationBar() {
    return this.isrefresh;
  }

  loadJs(code) {

    $(".phone").intlTelInput({

      autoHideDialCode: false,
      autoPlaceholder: "off",
      dropdownContainer: "body",
      allowDropdown: false,
      formatOnDisplay: false,
      geoIpLookup: function (callback) {
        $.get("https://ipinfo.io", function () { }, "jsonp").always(function (resp) {
          var countryCode = (resp && resp.country) ? resp.country : "";
          callback(code);
        });
      },
      initialCountry: code,
      nationalMode: true,
      separateDialCode: true,
    });

    $("#upload_image").change(function () {
      readURL(this);
    });

    function readURL(input) {
      if (input.files && input.files[0]) {
        var reader = new FileReader();
        reader.onload = function (e: any) {
          $('#uploadimage').attr('src', e.target.result);
        }
        reader.readAsDataURL(input.files[0]);
      }
    }
  }

  calljsresp() {

    $('#minput5').keyup(function () {
      var valThis = $(this).val().toLowerCase();
      if (valThis == "") {
        $('.model-sect-list-eleme li').show();
      } else {
        //alert();
        $('.model-sect-list-eleme li').each(function () {

          var text = $(this).find("span").text().toLowerCase();
          (text.indexOf(valThis) >= 0) ? $(this).show() : $(this).hide();
        });
      }
    });

    $(document).on("click", ".makelst li", function () {
      $(this).toggleClass('act');
      // if($(this).find("input[type='checkbox']").prop('checked')){
      //   alert();
      // }
    }).on("click", ".shopbyprice-list li", function () {
      // $(".shopbyprice-list li").removeClass('act');
      $(this).toggleClass('act');

    }).on("click", ".shopbytype-list ul li", function () {
      //$(".shopbytype-list ul li").removeClass('active');
      $(this).toggleClass('active');

    }).on("click", ".filt-options li a", function () {
      $(".filt-options li a").removeClass('active');
      $(this).toggleClass('active');
    }).on("click", ".opt-button:not('.active')", function () {
      $(".more-option").slideDown(500);

      $(this).addClass('active');
      $(this).find("span").text('HIDE MORE OPTIONS ');
    }).on("click", ".opt-button.active", function () {
      $(this).find("span").text('SHOW MORE OPTIONS ');
      $(".more-option").slideUp(500);
      $(this).removeClass('active');
    });



    $('#pagination-dm1').twbsPagination({
      totalPages: 35,
      visiblePages: 7,
      onPageClick: function (event, page) {
        $('#page-content').text('Page ' + page);
      }
    });

    $('body').removeClass();
    $('body').addClass('list-customer-page');
    $('#tabs-search li a:not(:first)').addClass('inactive');
    $(".list-customer-page .searchpan").addClass("showdv");
    $('.tabcontainer-search').hide();
    $('.tabcontainer-search:first').show();
    $('#tabs-search li a').click(function (e) {
      var t = $(this).attr('id');
      //if ($(this).hasClass('inactive')) { //this is the start of our condition

      $('#tabs-search li a').addClass('inactive');
      if ($(this).hasClass('inactive')) {
        $(this).removeClass('inactive');
        e.stopPropagation();
      }
      $('.tabcontainer-search').hide();
      $('#' + t + 'C').fadeIn('slow');
    });

    $("body").on("click", ".month-list-sel li", function () {

      $(this).toggleClass("active");
    }).on("click", ".make-sect-list-inner li", function () {


      $(".make-sect-list-inner li").removeClass("active");
      $('.loading-page').fadeOut();
      $(this).addClass("active");
    }).on("click", ".model-sect-list-inner li", function () {
      if ($(".make-sect-list-inner li").hasClass("active")) {
        $(".model-sect-list-inner li").removeClass("active");
        $(this).addClass("active");
        $(".src-selects-mn .src-selects.src-selectsn .src-selects-year").slideDown(200);
        var getv = $(this).find("span").text().toUpperCase();
        $(".mdltxt").text(getv);
        $(this).closest(".model-sect-list.model-sect-listn").next().next(".dvrght").find(".dvrght-inner").slideDown(200);
      }
    });
    if ($(window).width() <= 568) {

      $(".resetbutton").on("click", function () {
        $("input[type='text']").val('');
        $("select").prop("selectedIndex", 0);
        $("ul li").removeClass("active");
        $("span").removeClass("actived");
        $(".rdbtn").siblings("input[type='radio']").prop("checked", false);

        $(".month-sect.month-sect1 .month-list-sel ul li").removeClass("active").closest(".month-sect.month-sect1 .month-list-sel").css("height", "auto").animate(200);
        $(".month-sect.month-sect1 .month-list-sel ul li").css("display", "block");
        $(".month-sect.month-sect1 .month-list-sel ul li").children(".closbtn1").fadeOut(200);
        $(".dvrght-inner").slideUp(200);
        $(".src-selects-mn .src-selects.src-selectsn .src-selects-year").slideUp(200);

        $(".make-sect-list-inner li").removeClass("active");
        $(".make-sect-list-inner").css("height", "auto").animate(200);
        $(".make-sect-list-inner li").siblings().css("display", "block")
        $(".make-sect-list-inner li").children(".closbtn").fadeOut(200)
        $(".make-sect-list-inner li").height("auto").css("padding", "3px 0px 3px 0px");


        $(".model-sect-list-inner li").removeClass("active");
        $(".model-sect-list-inner").css("height", "auto").animate(200);
        $(".model-sect-list-inner li").siblings().css("display", "block")
        $(".model-sect-list-inner li").children(".closbtn").fadeOut(200);
        $(".model-sect-list-inner li").height("auto").css("padding", "3px 0px 3px 0px");
        $(".model-sect-list.model-sect-listn .model-sect-list-inner").slideUp(300);

        $(".mdl-filter-sect.mdl-filter-sect1 .mdl-filter-sect-inner-mn").slideUp(300);

      });

      $("body").on("click", ".month-list-sel li", function () {
        $(".month-list-sel li").removeClass("active");

        $(this).addClass("active");

        $(this).height("30px");
        var hghtcurrent = $(this).height();

        $(this).css("display", "block").closest(".month-list-sel").height(hghtcurrent).animate(500);

        $(this).append("<a class='closbtn1' style='position:absolute;right:5px;top:3px;font-size:13px;color:#9e9e9e;z-index:99999;'><i class='fa fa-times' aria-hidden='true'></i></a>");
        $(this).siblings().slideUp(200);

      }).on("click", ".make-sect-list-inner li", function () {
        $(".make-sect-list-inner li").removeClass("active");
        $('.loading-page').fadeOut();

        $(this).addClass("active");
        $(this).height("30px").css("padding-top", "5px");
        var hghtcurrent = $(this).height();

        $(this).css("display", "block").closest(".make-sect-list-inner").height(hghtcurrent).animate(500);

        $(this).append("<a class='closbtn' style='position:absolute;right:10px;top:46px;font-size:13px;color:#9e9e9e;z-index:99999;'><i class='fa fa-times' aria-hidden='true'></i></a>");
        $(this).siblings().slideUp(200);
        $(this).closest(".make-sect-listn.make-sect-listn").next().find(".model-sect-list-inner").slideDown(400);

      }).on("click", ".model-sect-list-inner li", function () {
        if ($(".make-sect-list-inner li").hasClass("active")) {
          $(".model-sect-list-inner li").removeClass("active");
          $(this).addClass("active");
          var getv = $(this).find("span").text().toUpperCase();
          $(".mdltxt").text(getv);


          $(this).height("30px").css("padding-top", "5px").css("font-size", "13px");

          var hghtcurrent = $(this).height();

          $(this).css("display", "block").closest(".model-sect-list-inner").height(hghtcurrent).animate(500);

          $(this).append("<a class='closbtnmdl' style='position:absolute;right:10px;top:46px;font-size:13px;color:#9e9e9e;z-index:99999;'><i class='fa fa-times' aria-hidden='true'></i></a>");
          $(this).siblings().slideUp(200);
          $(this).closest(".model-sect-list.model-sect-listn").next().css({
            "height": "230px", "min-height": "230px"
          })
          $(this).closest(".model-sect-list.model-sect-listn").next().find(".mdl-filter-sect-inner-mn").slideDown(400).css({
            "height": "190px", "min-height": "190px"
          });


        }
      }).on("click", ".make-sect-list-inner li.active", function () {
        $(this).removeClass("active").closest(".make-sect-list-inner").css("height", "auto").animate(200);
        $(this).siblings().css("display", "block");
        $(this).children(".closbtn").fadeOut(200);
        $(this).height("auto").css("padding", "3px 0px 3px 0px");
        $(this).closest(".make-sect-listn.make-sect-listn").next(".model-sect-list.model-sect-listn").children(".model-sect-list-inner").css("height", "auto");
        $(this).closest(".make-sect-listn.make-sect-listn").next(".model-sect-list.model-sect-listn").children(".model-sect-list-inner").slideUp(400);
        $(this).closest(".make-sect-listn.make-sect-listn").next(".model-sect-list.model-sect-listn").find("li.active").css("height", "auto");
        $(this).closest(".make-sect-listn.make-sect-listn").next(".model-sect-list.model-sect-listn").find(".closbtnmdl").fadeOut();
        $(this).closest(".make-sect-listn.make-sect-listn").next(".model-sect-list.model-sect-listn").find("li").removeClass("active");
        $(this).closest(".make-sect-listn.make-sect-listn").next(".model-sect-list.model-sect-listn").find("li").css("display", "block");

        $(this).closest(".make-sect-listn.make-sect-listn").next().next().css({
          "height": "85px", "min-height": "85px"
        })
        $(this).closest(".make-sect-listn.make-sect-listn").next().next().find(".mdl-filter-sect-inner-mn").css({
          "height": "30px", "min-height": "30px"
        });
        $(".src-selects-mn .src-selects.src-selectsn .src-selects-year").slideUp(200);
        $(this).closest(".make-sect-listn.make-sect-listn").next().next().next().find(".dvrght-inner").slideUp(200);


      }).on("click", ".model-sect-list-inner li.active", function () {
        $(this).removeClass("active").closest(".model-sect-list-inner").css("height", "auto").animate(200);
        $(this).siblings().css("display", "block");
        $(this).children(".closbtnmdl").fadeOut(200);
        $(this).height("auto").css("padding", "3px 0px 3px 0px");


      }).on("click", ".month-list-sel li.active", function () {
        $(this).removeClass("active").closest(".month-list-sel").css("height", "auto").animate(200);
        $(this).siblings().css("display", "block");
        $(this).children(".closbtn1").fadeOut(200);
        $(this).height("auto");
      });
    }


    $('#minput5').keyup(function () {
      var valThis = $(this).val().toLowerCase();
      if (valThis == "") {
        $('.model-sect-list-eleme li').show();
      } else {
        //alert();
        $('.model-sect-list-eleme li').each(function () {

          var text = $(this).find("span").text().toLowerCase();
          (text.indexOf(valThis) >= 0) ? $(this).show() : $(this).hide();
        });
      }
    });

    $('#minput4').keyup(function () {
      var valThis = $(this).val().toLowerCase();
      if (valThis == "") {
        $('.model-sect-list-eleme li').show();
      } else {
        //alert();
        $('.model-sect-list-eleme li').each(function () {

          var text = $(this).find("span").text().toLowerCase();
          (text.indexOf(valThis) >= 0) ? $(this).show() : $(this).hide();
        });
      }
    });


    $('#myInput').keyup(function () {
      var valThis = $(this).val().toLowerCase();

      if (valThis == "") {
        $(this).parent().next().find('.make-sect-list-elem > li').show();
      } else {
        $(this).parent().next().find('.make-sect-list-elem > li').each(function () {

          var text = $(this).find("span").text().toLowerCase();
          (text.indexOf(valThis) >= 0) ? $(this).show() : $(this).hide();
        });
      }
    });
    $('#mdlinput').keyup(function () {
      var valThis = $(this).val().toLowerCase();
      if (valThis == "") {
        $('.model-sect-list-eleme > li').show();
      } else {
        $('.model-sect-list-eleme > li').each(function () {

          var text = $(this).find("span").text().toLowerCase();
          (text.indexOf(valThis) >= 0) ? $(this).show() : $(this).hide();
        });
      }
    });




    $('#chsinput').keyup(function () {
      var valThis = $(this).val().toLowerCase();
      if (valThis == "") {
        $('.chs-sect-list-eleme > li').show();
      } else {
        $('.chs-sect-list-eleme > li').each(function () {

          var text = $(this).find("span").text().toLowerCase();
          (text.indexOf(valThis) >= 0) ? $(this).show() : $(this).hide();
        });
      }
    });
    $('#condlinput').keyup(function () {
      var valThis = $(this).val().toLowerCase();
      if (valThis == "") {
        $('.condition-sect-inner-lst > li').show();
      } else {
        $('.condition-sect-inner-lst > li').each(function () {

          var text = $(this).find("span").text().toLowerCase();
          (text.indexOf(valThis) >= 0) ? $(this).show() : $(this).hide();
        });
      }
    });
    $('#colorslinput').keyup(function () {
      var valThis = $(this).val().toLowerCase();
      if (valThis == "") {
        $('.colors-sect-lst-in > li').show();
      } else {
        $('.colors-sect-lst-in > li').each(function () {

          var text = $(this).find("span").text().toLowerCase();
          (text.indexOf(valThis) >= 0) ? $(this).show() : $(this).hide();
        });
      }
    });
    $('#myInput1').keyup(function () {
      var valThis = $(this).val().toLowerCase();

      if (valThis == "") {
        $(this).parent().next().find('.make-sect-list-elem li').show();
      } else {
        $(this).parent().next().find('.make-sect-list-elem li').each(function () {

          var text = $(this).find("span").text().toLowerCase();
          (text.indexOf(valThis) >= 0) ? $(this).show() : $(this).hide();
        });
      }
    });
    $('#mdlinput1').keyup(function () {
      var valThis = $(this).val().toLowerCase();
      if (valThis == "") {
        $('.model-sect-list-eleme li').show();
      } else {
        $('.model-sect-list-eleme li').each(function () {

          var text = $(this).find("span").text().toLowerCase();
          (text.indexOf(valThis) >= 0) ? $(this).show() : $(this).hide();
        });
      }
    });

    $('#chsinput1').keyup(function () {
      var valThis = $(this).val().toLowerCase();
      if (valThis == "") {
        $('.chs-sect-list-eleme > li').show();
      } else {
        $('.chs-sect-list-eleme > li').each(function () {

          var text = $(this).find("span").text().toLowerCase();
          (text.indexOf(valThis) >= 0) ? $(this).show() : $(this).hide();
        });
      }
    });
    $('#condlinput1').keyup(function () {
      var valThis = $(this).val().toLowerCase();
      if (valThis == "") {
        $('.condition-sect-inner-lst > li').show();
      } else {
        $('.condition-sect-inner-lst > li').each(function () {

          var text = $(this).find("span").text().toLowerCase();
          (text.indexOf(valThis) >= 0) ? $(this).show() : $(this).hide();
        });
      }
    });
    $('#colorslinput1').keyup(function () {
      var valThis = $(this).val().toLowerCase();
      if (valThis == "") {
        $('.colors-sect-lst-in > li').show();
      } else {
        $('.colors-sect-lst-in > li').each(function () {

          var text = $(this).find("span").text().toLowerCase();
          (text.indexOf(valThis) >= 0) ? $(this).show() : $(this).hide();
        });
      }
    });
    $('#myInput2').keyup(function () {
      var valThis = $(this).val().toLowerCase();

      if (valThis == "") {
        $(this).parent().next().find('.make-sect-list-elem > li').show();
      } else {
        $(this).parent().next().find('.make-sect-list-elem > li').each(function () {

          var text = $(this).find("span").text().toLowerCase();
          (text.indexOf(valThis) >= 0) ? $(this).show() : $(this).hide();
        });
      }
    });
    $('#mdlinput2').keyup(function () {
      var valThis = $(this).val().toLowerCase();
      if (valThis == "") {
        $('.model-sect-list-eleme > li').show();
      } else {
        $('.model-sect-list-eleme > li').each(function () {

          var text = $(this).find("span").text().toLowerCase();
          (text.indexOf(valThis) >= 0) ? $(this).show() : $(this).hide();
        });
      }
    });
    $('#chsinput2').keyup(function () {
      var valThis = $(this).val().toLowerCase();
      if (valThis == "") {
        $('.chs-sect-list-eleme > li').show();
      } else {
        $('.chs-sect-list-eleme > li').each(function () {

          var text = $(this).find("span").text().toLowerCase();
          (text.indexOf(valThis) >= 0) ? $(this).show() : $(this).hide();
        });
      }
    });
    $('#condlinput2').keyup(function () {
      var valThis = $(this).val().toLowerCase();
      if (valThis == "") {
        $('.condition-sect-inner-lst > li').show();
      } else {
        $('.condition-sect-inner-lst > li').each(function () {

          var text = $(this).find("span").text().toLowerCase();
          (text.indexOf(valThis) >= 0) ? $(this).show() : $(this).hide();
        });
      }
    });
    $('#colorslinput2').keyup(function () {
      var valThis = $(this).val().toLowerCase();
      if (valThis == "") {
        $('.colors-sect-lst-in > li').show();
      } else {
        $('.colors-sect-lst-in > li').each(function () {

          var text = $(this).find("span").text().toLowerCase();
          (text.indexOf(valThis) >= 0) ? $(this).show() : $(this).hide();
        });
      }
    });
    $('#auct-list-k').keyup(function () {
      var valThis = $(this).val().toLowerCase();
      if (valThis == "") {
        $('.aucthouses-sect-list-elem > li').show();
      } else {
        $('.aucthouses-sect-list-elem > li').each(function () {

          var text = $(this).find("span").text().toLowerCase();
          (text.indexOf(valThis) >= 0) ? $(this).show() : $(this).hide();
        });
      }
    });
    $('#auct-list-k1').keyup(function () {
      var valThis = $(this).val().toLowerCase();
      if (valThis == "") {
        $('.aucthouses-sect-list-elem > li').show();
      } else {
        $('.aucthouses-sect-list-elem > li').each(function () {

          var text = $(this).find("span").text().toLowerCase();
          (text.indexOf(valThis) >= 0) ? $(this).show() : $(this).hide();
        });
      }
    });
    $('#auct-list-k2').keyup(function () {
      var valThis = $(this).val().toLowerCase();
      if (valThis == "") {
        $('.aucthouses-sect-list-elem > li').show();
      } else {
        $('.aucthouses-sect-list-elem > li').each(function () {

          var text = $(this).find("span").text().toLowerCase();
          (text.indexOf(valThis) >= 0) ? $(this).show() : $(this).hide();
        });
      }
    });


    $('#mdlinput1').keyup(function () {
      alert();
      var valThis = $(this).val().toLowerCase();
      if (valThis == "") {
        $('.model-sect-list-eleme23 > li').show();
      } else {
        $('.model-sect-list-eleme23 > li').each(function () {

          var text = $(this).find("span").text().toLowerCase();
          (text.indexOf(valThis) >= 0) ? $(this).show() : $(this).hide();
        });
      }
    });

  }

  manualorderservice() {


    function readURL_upauction(input) {

      if (input.files && input.files[0]) {
        var reader = new FileReader();

        reader.onload = function (e: any) {
          $('#upauc').attr('src', e.target.result);
        }

        reader.readAsDataURL(input.files[0]);
      }
    }

    $("#upload_auc").change(function () {
      readURL_upauction(this);
    });
  }
  quotationFunc() {

    $(function () {

      $(".car-auct-sheet [data-fancybox]").fancybox({
        buttons: [
          'slideShow',
          'fullScreen',
          'thumbs',
          //'share',
          //'download',
          'zoom',
          'close'
        ],
        animationEffect: false
      });


      if ($(window).width() > 900) {
        $('body').on('click', '.fancybox-button--zoom', function () {

          $('.fancybox-image-wrap').toggleClass('zoomingg')

        })
      }
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
    $('.slider-for').slick({
      slidesToShow: 1,
      slidesToScroll: 1,
      arrows: false,
      fade: true,
      asNavFor: '.slider-nav'
    });
    $('.slider-nav').slick({
      slidesToShow: 5,
      slidesToScroll: 1,
      asNavFor: '.slider-for',
      dots: false,
      centerMode: true,
      vertical: true,
      focusOnSelect: true,
      responsive: [{
        breakpoint: 767,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          vertical: false,
          dots: false,
          arrows: false,
          autoplay: true,
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          vertical: false,
          dots: false,
          arrows: false,
          autoplay: true,
        }
      }

      ]
    });
  }

  loadphone() {
    $(".phone").intlTelInput({

      autoHideDialCode: false,
      autoPlaceholder: "off",
      dropdownContainer: "body",
      allowDropdown: true,
      formatOnDisplay: false,
      geoIpLookup: function (callback) {
        $.get("https://ipinfo.io", function () { }, "jsonp").always(function (resp) {
          var countryCode = (resp && resp.country) ? resp.country : "";
          callback(countryCode);
        });
      },
      initialCountry: 'us',
      nationalMode: true,
      separateDialCode: true,
    });
  }

  openDatePicker(name, date) {
    $('input[name="' + name + '"]').daterangepicker({
      singleDatePicker: true,
      showDropdowns: true,
      minYear: 1901,
      // maxYear: parseInt(moment().format('YYYY'),10)
      startDate: date,
    }, function (start, end, label) {
      var years = moment().diff(start, 'years');
      $('input[name="' + name + '"]').val(end.format('YYYY-MM-DD'));
    });
  }

  loadprofilejs(code) {
    $('.main_login').css('background-color', '#fff !important');
    // $('..main_login').css('background','#fff');

    $(".phone1").intlTelInput({
      initialCountry: code,
      nationalMode: true,
      separateDialCode: true,
      allowDropdown: false
    });

    $(".phone").intlTelInput({

      autoHideDialCode: false,
      autoPlaceholder: "off",
      dropdownContainer: "body",
      allowDropdown: true,
      formatOnDisplay: false,
      geoIpLookup: function (callback) {
        $.get("https://ipinfo.io", function () { }, "jsonp").always(function (resp) {
          var countryCode = (resp && resp.country) ? resp.country : "";
          callback(code);
        });
      },
      initialCountry: code,
      nationalMode: true,
      separateDialCode: true,
    });

    function readURL(input) {

      if (input.files && input.files[0]) {
        var reader = new FileReader();

        reader.onload = function (e: any) {
          $('#uploadimage').attr('src', e.target.result);
        }

        reader.readAsDataURL(input.files[0]);
      }
    }

    $("#upload_image").change(function () {
      readURL(this);
    });
  }

  displayMsg(err_suc, msg) {
    this.toastrservice.clear();
    if (err_suc == 'error') { this.toastrservice.error(msg) }
    if (err_suc == 'success') { this.toastrservice.success(msg) }
    setTimeout(() => this.toastrservice.clear(), 4000);
  }

  getTransmission() {
    return [
      { Id: 1, Title: 'MT' },
      { Id: 2, Title: 'AT' },
      { Id: 3, Title: 'CA' },
      { Id: 4, Title: 'CAT' },
      { Id: 5, Title: 'DA' },
      { Id: 6, Title: 'F6' },
      { Id: 7, Title: 'FAT	' },
      { Id: 8, Title: 'FCVT' },
      { Id: 9, Title: 'IAT' }
    ]
  }

  getBodyType() {
    return [
      { Id: 1, Title: 'Sedan' },
      { Id: 2, Title: 'Coupe' },
      { Id: 3, Title: 'Hatchback' },
      { Id: 4, Title: 'Station Wagon' },
      { Id: 5, Title: 'SUV' },
      { Id: 6, Title: 'Pickup' },
      { Id: 7, Title: 'Bus' },
      { Id: 8, Title: 'Truck' },
      { Id: 9, Title: 'Motorcycle' },
      { Id: 10, Title: 'Wagon' },
      { Id: 11, Title: 'Van' },
      { Id: 12, Title: 'Mini Van' },
      { Id: 13, Title: 'Convertible' },
    ]
  }


  loadstockdetails() {
    $('.big-slide-images').slick({
      slidesToShow: 1,
      slidesToScroll: 1,
      arrows: false,
      asNavFor: '.small-slide-images'
    });
    $('.small-slide-images').slick({
      focusOnSelect: true,
      centerMode: false,
      centerPadding: 0,
      slidesToShow: 6,
      horizontal: true,
      arrows: true,
      slidesToScroll: 1,
      asNavFor: '.big-slide-images',
      dots: false,
      responsive: [
        {
          breakpoint: 1030,
          settings: {
            slidesToShow: 5,
            slidesToScroll: 1,
            infinite: true,
            dots: false,
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
            slidesToShow: 3,
            slidesToScroll: 1
          }
        }
      ]
    });
  }
}
