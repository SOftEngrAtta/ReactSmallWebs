$(document).ready(function() {

    if (window.location.href.indexOf("?alter-demo") > -1) {
        $('.alteration.alterdemo').click();
    }
    if (window.location.href.indexOf("?po_success_fn") > -1) {
        $('#shownz').click();
    }
    if (window.location.href.indexOf("?notify-popup-show") > -1) {
        $('.notifbuttons').click();
    }
    if (window.location.href.indexOf("?enter-user-name") > -1) {
        $('[name="username"]').addClass('login_textbox_active')
    }

    if (window.location.href.indexOf("?enter-password") > -1) {
        $('[name="password"]').addClass('login_textbox_active')
    }

    if (window.location.href.indexOf("?incorrect-user-name") > -1) {
        $('.user-input-icon').addClass('user-error_icon');
        $('[name="username"]').addClass('error').before('<span class="eror_msg">Opss Please enter a valid Username</span><i class="fa fa-times input_eror_close" aria-hidden="true"></i>');
    }

    if (window.location.href.indexOf("?correct-password") > -1) {
        $('[name="password"]').addClass('login_textbox_active');
        $('[name="username"]').val('John Doe');
    }

    if (window.location.href.indexOf("?validate-username-and-password") > -1) {
        $('[name="username"]').addClass('login_textbox_active_confirm');
		$('[name="password"]').addClass('login_textbox_active_confirm');
		
				//.after('<i class="fa fa-check use_confirm" aria-hidden="true"></i>');
        //$('[name="password"]').addClass('password_confirm');
        $('[name="username"], [name="password"]').val('John Doe');
    }

    if (window.location.href.indexOf("?remember-username-and-password") > -1) {
        $('[name="username"]').addClass('login_textbox_active login_textbox_active').after('<i class="fa fa-check use_confirm" aria-hidden="true"></i>');
        $('[name="password"]').addClass('password_confirm');
        $('[name="username"], [name="password"]').val('John Doe');
        $('.icheckbox_flat-blue').addClass("checked");
    }

    if (window.location.href.indexOf("?low-bid-winning-chances-of-bid") > -1) {
        $('.grnclr').addClass("rdnclr").text("25%");
        
        $('.editdtbtn').addClass("redddbtn").attr(" data-fancybox").attr("data-src","#add_bit");
    }

    if (window.location.href.indexOf("?sales-stats") > -1) {
        $('[data-src="#sales-statistics"]').trigger("click");
    }

    if (window.location.href.indexOf("?bid-calculator") > -1) {
        $('[data-src="#bit_win"]').trigger("click");
    }

    if (window.location.href.indexOf("?invalid-bid-price") > -1) {
        $('.grnclr').addClass("rdnclr").text("25%");
        $('[data-src="#add_bit"]').addClass("redddbtn");
        $('[data-src="#bit_win"]').trigger("click");
        $('.tmpproto').addClass("invalid").after('<label class="lowbiderror enbl">Low bid increase bid</label>');
    }
    if (window.location.href.indexOf("?membership-selection") > -1) {
        $('[data-src="#membership"]').trigger("click");
    }

    if (window.location.href.indexOf("?advance-search") > -1) {
        $('.adv-search-btn').addClass("active");
        $('.sec_two_a').slideDown();
    }

    if (window.location.href.indexOf("?credit-debit") > -1) {
        $('.creditcards').trigger("click");
    }

    if (window.location.href.indexOf("?paypal") > -1) {
        $('.paypayls').trigger("click");
    }

    if (window.location.href.indexOf("?wiretransfer") > -1) {
        $('.wiretransfer').trigger("click");
    }

    if (window.location.href.indexOf("?utilize-available-funds") > -1) {
		$('.availfunds').removeClass("active");
        $('.creditcards, .paypayls, .wiretransfer').addClass("disabled");
        $(".displayonlessamt").css("display", "none");
        $(".lessamt").removeClass("lessamt");
    }
	
	if (window.location.href.indexOf("?select-available-funds") > -1) {
		$('.availfunds').removeClass("active").css({
		    "box-shadow": "0px 3px 15px 3px rgba(220,241,232,1)",
    		"border-color": "#bae5d2"		
		}).find('.nn-tick').css("background"," url(/assets/images/act_tick.png)");
		$('.availfunds .transttl').css("color","#1ba76a");
        $('.creditcards, .paypayls, .wiretransfer').addClass("disabled");
        $(".displayonlessamt").css("display", "none");
        $(".lessamt").removeClass("lessamt");
		
    }
	
	if (window.location.href.indexOf("?selected-available-funds") > -1) {
        $('.creditcards, .paypayls, .wiretransfer').addClass("disabled");
        $(".displayonlessamt").css("display", "none");
        $(".lessamt").removeClass("lessamt");
    }

    if (window.location.href.indexOf("?dashboard-notification-1") > -1) {
        $(".dashboard-reminder-disc.upgmemb").fadeIn(200);
    }
    
    if (window.location.href.indexOf("?dashboard-notification-2") > -1) {
        $(".dashboard-reminder-disc.firstorder").fadeIn(200);
    }

    if (window.location.href.indexOf("?auction-sheet-translation-add-new-email") > -1) {
        $('[data-src="#translate-inspect"], .addmoremeil').trigger("click");
    }
	
	if (window.location.href.indexOf("?auction-sheet-translation-request-confirmation") > -1) {
        $('[data-src="#thankyourmess"], .submitbtn-request').trigger("click");
    }
	
	if (window.location.href.indexOf("?manufacturing-year-check") > -1) {
        $('[data-src="#manufyear"], .button-primary.cancel').trigger("click");
    }

	
	if (window.location.href.indexOf("?order-place-success") > -1) {
        $('[data-src="#po_success"], .place_order > .login_btn3').trigger("click");
    }
	
	if (window.location.href.indexOf("?auction-sheet-display") > -1) {
        $('[data-src="#sheetbig"], .zoomicon').trigger("click");
    }
	
	
	
	if (window.location.href.indexOf("?filter-bid-in-progress") > -1) {
        $('.selectbidd .btn-primary').trigger("click");
		$('.selectbidd .dropdown-menu li:nth-child(2) a').css("color","#42c78b");
    }
	
	if (window.location.href.indexOf("?bid-in-progress") > -1) {
		$('.selectbidd .dropdown-menu li:nth-child(2) a').click();
    }
	
	if (window.location.href.indexOf("?car-lost") > -1) {
		$('.selectbidd .dropdown-menu li:nth-child(3) a').click();
    }
	
	
	if (window.location.href.indexOf("?incomplete-order-empty") > -1) {
		$('.incomplete-empty .contentexist.active').removeClass("active");
		$('.incomplete-empty .empty-page').addClass("active");
		
    }
	
	if (window.location.href.indexOf("?make-payment") > -1) {	
		$('.accordion h4:nth-child(1)').find('.mk-payment-btn').fancybox().trigger('click');
		
    }
	
	if (window.location.href.indexOf("?reset-password-confirmation") > -1) {	
		 $('[data-src="#pass_reset_con"], .btn-primary.view-hist').trigger("click");
		
    }
	if (window.location.href.indexOf("?signup-confirmation-pop") > -1) {	
		 $('[data-src="#signup_success"], .signup_box_one_btns2 .submit_btn').trigger("click");
		
    }
	if (window.location.href.indexOf("?emailv") > -1) {	
		 $('.emailv').trigger("click");
		
    }
	if (window.location.href.indexOf("?ahjthanks") > -1) {	
		 $('.ahjthanks').trigger("click");
		
    }
	if (window.location.href.indexOf("?ahjerrorpop") > -1) {	
		 $('.ahjsorry').trigger("click");
		
    }
	//class="submit_btn"  data-fancybox data-src=""
	

	
	
	setTimeout(function(){ 
	
	
		if (window.location.href.indexOf("?order-invoice") > -1) {	
		$('[data-src="#view_invoice"]').trigger('click');		
    }
	
	
	if (window.location.href.indexOf("?auction-deposit-invoice") > -1) {	
		$('[data-src="#view_invoice_auction-deposit"]').trigger('click');		
    }
	
	
	if (window.location.href.indexOf("?quotation") > -1) {	
		$('[data-src="#view_invoice_quotation"]').trigger('click');		
    }
	
	if (window.location.href.indexOf("?pro-forma-invoice-1") > -1) {	
		$('[data-src="#view_invoice_proforma1"]').trigger('click');		
    }
	
	if (window.location.href.indexOf("?pro-forma-invoice-2") > -1) {	
		$('[data-src="#view_invoice_proforma2"]').trigger('click');		
    }
	
	if (window.location.href.indexOf("?pro-forma-invoice-2") > -1) {	
		$('[data-src="#view_invoice_proforma2"]').trigger('click');		
    }
	
	if (window.location.href.indexOf("?pro-forma-invoice-2") > -1) {	
		$('[data-src="#view_invoice_proforma2"]').trigger('click');		
    }
	
	if (window.location.href.indexOf("?membership-purchase-invoice") > -1) {	
		$('[data-src="#view_invoice_membership-purchase"]').trigger('click');		
    }
	
	}, 1000);


});

$(window).load(function() {
    
    if(window.location.href.indexOf("?bidpricechangepop") > -1){
        $(".bidpricechangepop").trigger("click");
    }
    if (window.location.href.indexOf("?document-status") > -1) {
        $('.ordr-detail-tabsbtn li:nth-child(2)').click();
    }
    if (window.location.href.indexOf("?show-shipp-select") > -1) {
        $(".showshippselect").trigger("click");
    }
    if (window.location.href.indexOf("?multipage=demostart") > -1) {
        
        startIntro();
        
    }
    // if (window.location.href.indexOf("?multipage=ba") > -1) {
    //     //startIntro();
        
    //      //introjs.goToStep(3).start();
    //     startIntro();
    //     //introjs.goToStep(3).start();
    //     //$(".gen.entryd .introjs-bullets ul li a:nth-child(4)").click();
        
    //  }
    if(window.location.pathname=="/dashboard.asp"){
        $('#btnhlp').removeAttr('href');
        $('#btnhlp').attr('onClick', ' startIntro();');
    }
	if (window.location.href.indexOf("?multipage=1a") > -1) {
        $('#btnhlp').removeAttr('href');
         $('#btnhlp').attr('onClick', 'startIntro1a();');
        startIntro1a();
        
    }
    if(window.location.pathname=="/list-view-customer.asp"){
        $('#btnhlp').removeAttr('href');
        $('#btnhlp').attr('onClick', 'startIntro1a();');
    }
    if (window.location.href.indexOf("?multipage=2") > -1) {
        startIntro2();
        $('#btnhlp').removeAttr('href');
         $('#btnhlp').attr('onClick', 'startIntro2();');
         
    
    }
    if(window.location.pathname=="unit-detail-quotation.asp.asp"){
        $('#btnhlp').removeAttr('href');
         $('#btnhlp').attr('onClick', 'startIntro2();');
    }
    
    
    if (window.location.href.indexOf("?multipage=3") > -1) {
         startIntro3();
         $('#btnhlp').removeAttr('href');
         $('#btnhlp').attr('onClick', 'startIntro3();');
        
        
    }
    if (window.location.href.indexOf("?multipage=4") > -1) {
        startIntro4();
        $('#btnhlp').removeAttr('href');
        $('#btnhlp').attr('onClick', 'startIntro4();');
       
   }
   if(window.location.pathname=="/car-won.asp"){
        $('#btnhlp').removeAttr('href');
        $('#btnhlp').attr('onClick', 'startIntro4();');
    }
   if (window.location.href.indexOf("?multipage=5") > -1) {
        startIntro5();
        $('#btnhlp').removeAttr('href');
        $('#btnhlp').attr('onClick', 'startIntro5();');
   
    }
    if(window.location.pathname=="/car-lost.asp"){
        $('#btnhlp').removeAttr('href');
        $('#btnhlp').attr('onClick', 'startIntro5();');
    }
    if (window.location.href.indexOf("?multipage=6") > -1) {
        startIntro6();
        $('#btnhlp').removeAttr('href');
        $('#btnhlp').attr('onClick', 'startIntro6();');
      
     }
     if(window.location.pathname=="/bidding.asp"){
        $('#btnhlp').removeAttr('href');
        $('#btnhlp').attr('onClick', 'startIntro7();');
    }
     if (window.location.href.indexOf("?multipage=7") > -1) {
        startIntro7();
        $('#btnhlp').removeAttr('href');
        $('#btnhlp').attr('onClick', 'startIntro7();');
       
     }
     if (window.location.href.indexOf("?multipage=8") > -1) {
        startIntro8();
        $('#btnhlp').removeAttr('href');
        $('#btnhlp').attr('onClick', 'startIntro8();');
       
     }
     if(window.location.pathname=="/my-favourite.asp"){
        $('#btnhlp').removeAttr('href');
        $('#btnhlp').attr('onClick', 'startIntro8();');
    }
     if (window.location.href.indexOf("?multipage=9") > -1) {
        startIntro9();
        $('#btnhlp').removeAttr('href');
        $('#btnhlp').attr('onClick', 'startIntro9();');
       
     }
     if(window.location.pathname=="/order_history_new.asp"){
        $('#btnhlp').removeAttr('href');
        $('#btnhlp').attr('onClick', 'startIntro9();');
    }     
     if (window.location.href.indexOf("?multipage=11") > -1) {
        startIntro11();
        $('#btnhlp').removeAttr('href');
        $('#btnhlp').attr('onClick', 'startIntro11();');
     }
     if (window.location.pathname=="/upcoming-payments.asp") {
        
        $('#btnhlp').removeAttr('href');
        $('#btnhlp').attr('onClick', 'startIntro11();');
     }
     
     if (window.location.href.indexOf("?multipage=12") > -1) {
        startIntro12();
        $('#btnhlp').removeAttr('href');
        $('#btnhlp').attr('onClick', 'startIntro12();');
     }
     if(window.location.pathname=="/payment-completed.asp"){
        $('#btnhlp').removeAttr('href');
        $('#btnhlp').attr('onClick', 'startIntro12();');
    }
     if (window.location.href.indexOf("?multipage=13") > -1) {
        startIntro13();
        $('#btnhlp').removeAttr('href');
        $('#btnhlp').attr('onClick', 'startIntro13();');
     }
     if(window.location.pathname=="/multi-quotation.asp"){
        $('#btnhlp').removeAttr('href');
        $('#btnhlp').attr('onClick', 'startIntro13();');
    }
    
     if (window.location.href.indexOf("?multipage=14") > -1) {
        startIntro14();
        $('#btnhlp').removeAttr('href');
        $('#btnhlp').attr('onClick', 'startIntro14();');
     }
     if(window.location.pathname=="/order-detail.asp"){
        $('#btnhlp').removeAttr('href');
        $('#btnhlp').attr('onClick', 'startIntro14();');
    }
     if (window.location.href.indexOf("?multipage=1b") > -1) {
        startIntro10b();
        $('#btnhlp').removeAttr('href');
        $('#btnhlp').attr('onClick', 'startIntro10b();');
     }
     if(window.location.pathname=="/incomplete_order.asp"){
        $('#btnhlp').removeAttr('href');
        $('#btnhlp').attr('onClick', 'startIntro10b();');
     }
     if (window.location.href.indexOf("?mobile-demostart") > -1) {
        window.location.href="/demo/";
     }
     if (window.location.href.indexOf("?multipage=ba") > -1) {
        //introjs.goToStep(3);
        startIntro();
       $(".introjs-tooltip.gen.entryd .introjs-bullets ul li:nth-child(4) a").click();
       
     }
     if (window.location.href.indexOf("?multipage=bb") > -1) {
        //introjs.goToStep(3);
        startIntro();
       $(".introjs-tooltip.gen.entryd .introjs-bullets ul li:nth-child(3) a").click();
       
     }
     if (window.location.href.indexOf("?multipage=cdnd") > -1) {
        //back to Bid Progress from bid in progress page 
        startIntro();
       $(".introjs-tooltip.gen.entryd .introjs-bullets ul li:nth-child(12) a").click();
       
     }
     if (window.location.href.indexOf("?multipage=ckcl") > -1) {
        //go to car lost after bid in progress page
        startIntro();
       $(".introjs-tooltip.gen.entryd .introjs-bullets ul li:nth-child(12) a").click();
       
     }

     if (window.location.href.indexOf("?multipage=dwbb") > -1) {
        //back to car won
        startIntro();
       $(".introjs-tooltip.gen.entryd .introjs-bullets ul li:nth-child(10) a").click();
       
     }
     if (window.location.href.indexOf("?multipage=cwb") > -1) {
        //go to bid progress after car won page
        startIntro();
       $(".introjs-tooltip.gen.entryd .introjs-bullets ul li:nth-child(11) a").click();
       
     }
     if (window.location.href.indexOf("?multipage=clb") > -1) {
        
        startIntro();
       $(".introjs-tooltip.gen.entryd .introjs-bullets ul li:nth-child(13) a").click();
       
     }
     if (window.location.href.indexOf("?multipage=memb") > -1) {
        
        startIntro();
       $(".introjs-tooltip.gen.entryd .introjs-bullets ul li:nth-child(16) a").click();
       
     }
     if (window.location.href.indexOf("?blank-cart") > -1) {
        
        
      
       
     }
     if (window.location.href.indexOf("?multipage=upcback") > -1) {
        
        startIntro();
       $(".introjs-tooltip.gen.entryd .introjs-bullets ul li:nth-child(15) a").click();
       
     }
     if($(window).width() <= 768){
        if ((window.location.href.indexOf("?multipage=demostart") > -1) ) {
            window.location.href="/demo/";
            
           
           
         }
         else if ((window.location.href.indexOf("?multipage=1a") > -1) ||  (window.location.href.indexOf("?multipage=2") > -1) || (window.location.href.indexOf("?multipage=3") > -1) || (window.location.href.indexOf("?multipage=13") > -1) ||  (window.location.href.indexOf("?multipage=14") > -1) ) {
            window.location.href="/demo/order-details.asp";
            
           
           
         }
         else if ((window.location.href.indexOf("?multipage=4") > -1) ||  (window.location.href.indexOf("?multipage=5") > -1) || (window.location.href.indexOf("?multipage=6") > -1) || (window.location.href.indexOf("?multipage=7") > -1) ||  (window.location.href.indexOf("?multipage=8") > -1) ||  (window.location.href.indexOf("?multipage=9") > -1) ||  (window.location.href.indexOf("?multipage=1b") > -1) ||  (window.location.href.indexOf("?multipage=11") > -1)  ||  (window.location.href.indexOf("?multipage=12") > -1)) {
            window.location.href="/demo/list-view.asp";
            
           
           
         }
         
    }
});


