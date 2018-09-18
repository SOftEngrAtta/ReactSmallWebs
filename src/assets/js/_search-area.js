$(document).ready(function () {

    $("body").on("click",".advancebtn",function(){
        $(this).parent().toggleClass("actv") ;
        $(this).next().slideToggle();
        $(this).toggleClass('act');
});
    //mdlfind();

   
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
            //$('.auct-days-sect-list-sl').slick('setPosition');
        }

    });

    $('#tabs-search li a:not(:first)').addClass('inactive');
    $('.tabcontainer-search').hide();
    $('.tabcontainer-search:first').show();
    $('#tabs-search li a').click(function () {
        var t = $(this).attr('id');
        if ($(this).hasClass('inactive')) { //this is the start of our condition 
            $('#tabs-search li a').addClass('inactive');
            $(this).removeClass('inactive');
            $('.tabcontainer-search').hide();

            $('#' + t + 'C').fadeIn('slow');
            $('.auct-days-sect-list-sl').slick('setPosition');
        }

    });


    $("body").on("click",".panel-heading",function(e){
        $(this).find(".ba_togglepanel").toggleClass("ba_open").parent().toggleClass("ba_pantgle").next().slideToggle("fast"),e.stopImmediatePropagation()
});


$("body").on("click", ".month-list-sel li", function () {
    //$(".month-list-sel li").removeClass("active");
    $(this).toggleClass("active");
}).on("click", ".make-sect-list-inner li", function () {
    //$(".make-sect-list-inner li").removeClass("active");
    
    $(".make-sect-list-inner li").removeClass("active");
    $('.loading-page').fadeOut();
    $(this).addClass("active");
}).on("click", ".model-sect-list-inner li", function () {
    //$(".model-sect-list-inner li").removeClass("active");
    if($(".make-sect-list-inner li").hasClass("active")){
        $(".model-sect-list-inner li").removeClass("active");
    $(this).addClass("active");
    $(".src-selects-mn .src-selects.src-selectsn .src-selects-year").slideDown(200);
    var getv = $(this).find("span").text().toUpperCase();
    $(".mdltxt").text(getv);
    $(this).closest(".model-sect-list").next().next().next(".dvrght").find(".dvrght-inner").slideDown(200);
    }
}).on("click",".aucthouses-sect-list li",function(){
        $(this).toggleClass("active");
});


    if($(window).width() <= 568){

        $(".resetbutton").on("click", function () {
            $("input[type='text']").val('');
            $("select").prop("selectedIndex", 0);
            $("ul li").removeClass("active");
            $("span").removeClass("actived");
            $(".rdbtn").siblings("input[type='radio']").prop("checked",false);
            //$(".icheckbox_flat-blue").removeClass("checked");
            //$('.range_slider').slider('refresh');
    
            $(".month-sect.month-sect1 .month-list-sel ul li").removeClass("active").closest(".month-sect.month-sect1 .month-list-sel").css("height","auto").animate(200);
            $(".month-sect.month-sect1 .month-list-sel ul li").css("display","block");
            $(".month-sect.month-sect1 .month-list-sel ul li").children(".closbtn1").fadeOut(200);
            $(".dvrght-inner").slideUp(200);
            $(".src-selects-mn .src-selects.src-selectsn .src-selects-year").slideUp(200);
    
            $(".make-sect-list-inner li").removeClass("active");
            $(".make-sect-list-inner").css("height","auto").animate(200);
            $(".make-sect-list-inner li").siblings().css("display","block")
            $(".make-sect-list-inner li").children(".closbtn").fadeOut(200)
            $(".make-sect-list-inner li").height("auto").css("padding","3px 0px 3px 0px");
    
    
            $(".model-sect-list-inner li").removeClass("active");
            $(".model-sect-list-inner").css("height","auto").animate(200);
            $(".model-sect-list-inner li").siblings().css("display","block")
            $(".model-sect-list-inner li").children(".closbtn").fadeOut(200);
            $(".model-sect-list-inner li").height("auto").css("padding","3px 0px 3px 0px");
            $(".model-sect-list .model-sect-list-inner").slideUp(300);
            
            $(".mdl-filter-sect .mdl-filter-sect-inner-mn").slideUp(300);
            //$(this).height("auto");
    
    
    
    
    
    
        });
            // $("body").on("click", ".srcbox-hd", function () {
            //     if ($(this).closest("div").hasClass("auct-days-sect")) {
            //         $(this).siblings("div").toggleClass("dspdv");
            //     }
            //     else {
            //         $(this).siblings("div").slideToggle("200");
            //     }
    
    
    
            // });
            //.make-sect-list.make-sect-listn .make-sect-list-inner

            $("body").on("click", ".month-list-sel li", function () {
                //$(".month-list-sel li").removeClass("active");
                

                $(".month-list-sel li").removeClass("active");
                //$('.loading-page').fadeOut();
                $(this).addClass("active");

                $(this).height("30px");
                //$(this).closest(".make-sect-list-inner").slideUp(400);
                var hghtcurrent=$(this).height();
                
                $(this).css("display","block").closest(".month-list-sel").height(hghtcurrent).animate(500);

                 $(this).append("<a class='closbtn1' style='position:absolute;right:5px;top:3px;font-size:13px;color:#9e9e9e;z-index:99999;'><i class='fa fa-times' aria-hidden='true'></i></a>");
                $(this).siblings().slideUp(200);
                
            }).on("click", ".make-sect-list-inner li", function () {
                //$(".make-sect-list-inner li").removeClass("active");
                $(".make-sect-list-inner li").removeClass("active");
                $('.loading-page').fadeOut();

                $(this).addClass("active");
                $(this).height("30px").css("padding-top","5px");
                //$(this).closest(".make-sect-list-inner").slideUp(400);
                var hghtcurrent=$(this).height();
                
                $(this).css("display","block").closest(".make-sect-list-inner").height(hghtcurrent).animate(500);

                 $(this).append("<a class='closbtn' style='position:absolute;right:10px;top:46px;font-size:13px;color:#9e9e9e;z-index:99999;'><i class='fa fa-times' aria-hidden='true'></i></a>");
                $(this).siblings().slideUp(200);
                $(this).closest(".make-sect-list").nextAll().find(".model-sect-list-inner").slideDown(400);
                // if($(this).closest(".make-sect-listn.make-sect-listn").next().find(".model-sect-list-inner").height()<="100px"){
                //     alert();
                // }
                
                //.model-sect-list.model-sect-listn .model-sect-list-inner
                // $(this).closest(".make-sect-listn.make-sect-listn").next().find(".model-sect-list-inner").slideDown(function(){
                //     $(this).height("190px");

                // },400);
                
                //.model-sect-list-inner
            }).on("click", ".model-sect-list-inner li", function () {
                //$(".model-sect-list-inner li").removeClass("active");
                if($(".make-sect-list-inner li").hasClass("active")){
                    $(".model-sect-list-inner li").removeClass("active");
                $(this).addClass("active");
                var getv = $(this).find("span").text().toUpperCase();
                $(".mdltxt").text(getv);
                //$(this).parent(".model-sect-list.model-sect-listn").next(".dvrght").find(".dvrght-inner").slideDown(200);
                //$("")    

                $(this).height("30px").css("padding-top","5px").css("font-size","13px");
                //$(this).closest(".make-sect-list-inner").slideUp(400);
                var hghtcurrent=$(this).height();
                
                $(this).css("display","block").closest(".model-sect-list-inner").height(hghtcurrent).animate(500);

                 $(this).append("<a class='closbtnmdl' style='position:absolute;right:10px;top:46px;font-size:13px;color:#9e9e9e;z-index:99999;'><i class='fa fa-times' aria-hidden='true'></i></a>");
                $(this).siblings().slideUp(200);
                $(this).closest(".model-sect-list").next().css({
                    "height":"230px","min-height":"230px"
                })
                $(this).closest(".model-sect-list").next().find(".mdl-filter-sect-inner-mn").slideDown(400).css({
                    "height":"190px","min-height":"190px"
                });
                

                }
            }).on("click",".make-sect-list-inner li.active",function(){
                $(this).removeClass("active").closest(".make-sect-list-inner").css("height","auto").animate(200);
                $(this).siblings().css("display","block");
                $(this).children(".closbtn").fadeOut(200);
                $(this).height("auto").css("padding","3px 0px 3px 0px");
                $(this).closest(".make-sect-list").next(".model-sect-list").children(".model-sect-list-inner").css("height","auto");
                $(this).closest(".make-sect-list").next(".model-sect-list").children(".model-sect-list-inner").slideUp(400);
                $(this).closest(".make-sect-list").next(".model-sect-list").find("li.active").css("height","auto");
                $(this).closest(".make-sect-list").next(".model-sect-list").find(".closbtnmdl").fadeOut();
                $(this).closest(".make-sect-list").next(".model-sect-list").find("li").removeClass("active");
                $(this).closest(".make-sect-list").next(".model-sect-list").find("li").css("display","block");

                $(this).closest(".make-sect-list").next().next().css({
                    "height":"85px","min-height":"85px"
                })
                $(this).closest(".make-sect-list").next().next().find(".mdl-filter-sect-inner-mn").css({
                    "height":"30px","min-height":"30px"
                });
                $(".src-selects-mn .src-selects.src-selectsn .src-selects-year").slideUp(200);
                $(this).closest(".make-sect-list").next().next().next().find(".dvrght-inner").slideUp(200);
                
                
            }).on("click",".model-sect-list-inner li.active",function(){
                $(this).removeClass("active").closest(".model-sect-list-inner").css("height","auto").animate(200);
                $(this).siblings().css("display","block");
                $(this).children(".closbtnmdl").fadeOut(200);
                $(this).height("auto").css("padding","3px 0px 3px 0px");

                
            }).on("click",".month-list-sel li.active",function(){
                $(this).removeClass("active").closest(".month-list-sel").css("height","auto").animate(200);
                $(this).siblings().css("display","block");
                $(this).children(".closbtn1").fadeOut(200);
                $(this).height("auto");
            });





        }
    
 

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
    }).on("click",".srcbox-hd:not('.mdltxt,.gearhd')",function(){
        
        $(this).next().fadeOut(100);
        $(this).next().next(".srchmkic-dv").fadeIn(300);
        $(this).next().next().find(".srchmkic-cls").fadeIn(300);
    });

       

   
    days_slider();

    $(".resetbutton").on("click", function () {
        $("input[type='text']").val('');
        $("select").prop("selectedIndex", 0);
        $("ul li").removeClass("active");
        $("span").removeClass("actived");
        $(".rdbtn").siblings("input[type='radio']").prop("checked",false);
        //$(".icheckbox_flat-blue").removeClass("checked");
        //$('.range_slider').slider('refresh');

        $(".month-sect.month-sect1 .month-list-sel ul li").removeClass("active").closest(".month-sect.month-sect1 .month-list-sel").css("height","auto").animate(200);
        $(".month-sect.month-sect1 .month-list-sel ul li").css("display","block");
        $(".month-sect.month-sect1 .month-list-sel ul li").children(".closbtn1").fadeOut(200);
        $(".dvrght-inner").slideUp(200);


        $(".make-sect-list-inner li").removeClass("active");
       
       
       
       


        $(".model-sect-list-inner li").removeClass("active");
       
       
       
       
        
       
        //$(this).height("auto");






    });



});







$(window).load(function () {
  
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



//      $('#myInput1').keyup(function(){
//         var valThis = $(this).val().toLowerCase();

//          if(valThis == ""){
//              $(this).parent().next().find('.make-sect-list-elem li').show();           
//          } else {
//             $(this).parent().next().find('.make-sect-list-elem li').each(function(){

//                  var text = $(this).find("span").text().toLowerCase();
//                  (text.indexOf(valThis) >= 0) ? $(this).show() : $(this).hide();
//              });
//         }
//      });
//      $('#mdlinput1').keyup(function(){
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
//      $('#chsinput1').keyup(function(){
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
//      $('#condlinput1').keyup(function(){
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
//      $('#colorslinput1').keyup(function(){
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





//      $('#myInput2').keyup(function(){
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
//      $('#mdlinput2').keyup(function(){
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
//      $('#chsinput2').keyup(function(){
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
//      $('#condlinput2').keyup(function(){
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
//      $('#colorslinput2').keyup(function(){
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

//      $('#minput4').keyup(function(){
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
