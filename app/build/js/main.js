$(document).ready(function () {
    var $body = $('body');
    var $campTemplateContent = $('article main');
    var $articleBlock = $('.article-block');
    var $headerDesctop = $('.header-desctop');
    var headerDesctopHeight = $headerDesctop.height();

    // initialize the vh-check
        (function () {
          var isNeeded = vhCheck('browser-address-bar');
        }());

    // var za = 0;
    // $(document).scroll(function ()
    // {
    //     if(za ==0)
    //     {
    //         $.ajax({
    //             type: 'POST',
    //             url: 'youtube-script.php',
    //
    //             success: function (data) {
    //                 $('body').append(data);
    //                 console.log('0');
    //             }
    //         });
    //         za = 1;
    //     }
    // });

    // SLIDER
    $('.slider').slick({
          centerMode: true,
          dots: true,
          centerPadding: '22%',
          slidesToShow: 1,
          prevArrow: $('.prev'),
          nextArrow: $('.next'),
          responsive: [
            {
              breakpoint: 769,
              settings: {
                // arrows: false,
                // centerMode: true,
                centerPadding: '14%',
                slidesToShow: 1
              }
            },
            {
              breakpoint: 480,
              settings: {
                // arrows: false,
                // centerMode: true,
                centerPadding: '13%',
                slidesToShow: 1
              }
            }
          ]
      });

    // VIDEO POP-UP
    $("a.video-popup").YouTubePopUp( { autoplay: 0 } ); // Disable autoplay

    // STICKY LIST
    $('.sidenav').floatit({
        limiter: 'section',
        top_spacing: 219,
        bottom_spacing: 55
    });

    $('.btn-aside-fixed').floatit({
        limiter: 'footer',
        top_spacing: 273,
        bottom_spacing: 200
    });



    $(window).scroll(function(){
        if ($campTemplateContent.length) {
            var lastContentBlockHeight = $('.article-block:last-child').outerHeight();
            var $navLink = $('.sidenav a');
            var startScroll = $campTemplateContent.offset().top - headerDesctopHeight;
            var campTemplateContentHeight = $campTemplateContent.height();
            var endScroll = startScroll + campTemplateContentHeight - headerDesctopHeight;

            $articleBlock.each(function(i,el){

                var top  = $(el).offset().top - 100 - headerDesctopHeight;
                var bottom = top +$(el).height();
                var scroll = $(window).scrollTop();
                var id = $(el).attr('id');
            	if( scroll > top && scroll < bottom){
                    $navLink.removeClass('active');
        			$('.sidenav a[href="#'+id+'"]').addClass('active');
                }
            });

            if ($(document).scrollTop() >= startScroll && $(document).scrollTop() < endScroll) {
                var ratio = ($(document).scrollTop() - startScroll)/ (campTemplateContentHeight - lastContentBlockHeight) *100;
                $(".progress").height(ratio+"%");
            }
        }
    });
    $(".sidenav").on("click","a", function (event) {
        // исключаем стандартную реакцию браузера
        event.preventDefault();
        // получем идентификатор блока из атрибута href
        var id  = $(this).attr('href'),
        // находим высоту, на которой расположен блок
            top = $(id).offset().top - headerDesctopHeight;
        // анимируем переход к блоку, время: 800 мс
        $('body,html').animate({scrollTop: top}, 800);
    });

    // POOL BLOCKS
    var $poolButton = $('.pool-button');
    $poolButton.click(function () {
        $poolButton.removeClass('active');
        $(this).addClass('active');
    });
    // TRAINER BLOCKS
    var $trainerButton = $('.trainer-button');
    $trainerButton.click(function () {
        $trainerButton.removeClass('active');
        $(this).addClass('active');
    });

    // SORT BLOCKS
    var $sortButton = $('.sort-btn-desctop');
    $sortButton.click(function () {
        $sortButton.removeClass('active');
        $(this).addClass('active');
    });

    // SIDEBAR accordion init
    $("div.accordian").accordion({
        heightStyle: "content",
        collapsible: true,
        active: false,
    });
    $(".sidebar-filter-block-wrp").accordion({
        heightStyle: "content",
        collapsible: true,
    });

    // SIDEBAR accordion end
    var checkCookie = $.cookie("sub-nav");
      if (checkCookie !== "") {
        $('.inner-list > li.sub > a:eq('+checkCookie+')').addClass('active').next().show();
      }
      $('.inner-list > li.sub > a').click(function(){
          var navIndex = $('.inner-list > li.sub > a').index(this);

           if($(this).hasClass('active')) {
               $.cookie("sub-nav", navIndex);
               $('.inner-list li ul').slideUp();
                if ($(this).next().is(":visible")){
                    $(this).next().slideUp();
                } else {
                    $(this).next().slideToggle();
                }
                $('.inner-list li a').removeClass('active');
                $(this).removeClass('active');
                return false;
           }
           else {
               $.cookie("sub-nav", navIndex);
               $('.inner-list li ul').slideUp();
                if ($(this).next().is(":visible")){
                    $(this).next().slideUp();
                } else {
                    $(this).next().slideToggle();
                }
                $('.inner-list li a').removeClass('active');
                $(this).addClass('active');
                return false;
           }
      });
        var checkCookie = $.cookie("sub-link");
      if (checkCookie !== "") {
        $('.inner-list > li.sub > ul li a:eq('+checkCookie+')').addClass('active');
      }
        $('.sub ul li a').click(function(){
            var subIndex = $('.sub ul li a').index(this);
            $.cookie("sub-link", subIndex);
            if($(this).hasClass('active')) {
                $('.sub ul li a').removeClass('active');
                $(this).removeClass('active');
            }
            else {
                $('.sub ul li a').removeClass('active');
                $(this).addClass('active');
            }
        });

        $(".accordian h3 a").click(function() {
              window.location = $(this).attr('href');
              return false;
           });

    var $mobileMenu = $('.acc-wrp');
    var $mobileBurger = $('.icon-header-mob.burger-mob-wrp');

    // open/close menu mobile
    $mobileBurger.click(function () {
        if($(this).hasClass('show-menu')){
            $(this).removeClass('show-menu');
            $mobileMenu.removeClass('show-menu');
        }
        else {
            $(this).addClass('show-menu');
            $mobileMenu.addClass('show-menu');
        }
    });

    // OPEN/CLOSE POP-UP ADD CALL
    var $popUpOverlayWRP = $('.pop-up-overlay-wrapper');
    var $darkOverlay = $('.overlay-pop-up');

    // pop Up Add Call
    var $popUpAddCall = $('.pop-up-add-call');
    var $popUpAddCallOpenBtn = $('.order-call-btn');
    var $popUpAddCallCloseBtn = $('.pop-up-add-call-close-btn');

    // pop Up Submi App
    var $popUppSubmitApp = $('.pop-up-submit-app');
    var $popUpSubmitAppOpenBtn = $('.btn-aside-fixed');
    var $popUpSubmitAppCloseBtn = $('.pop-up-submit-app-close-btn');

    // pop-up with phones (mobile)
    var $popUpPhonesMob = $('.pop-up-phones');
    var $popUpPhonesMobOpenBtn = $('.icon-header-mob.phone-mob');
    var $popUpPhonesMobCloseBtn = $('.pop-up-phones-close-btn');

    // pop-up Thnx
    var $popUpThnx = $('.pop-up-thnx');
    var $popUpThnxCloseBtn = $('.pop-up-thnx-close-btn');

    // pop-up Thnx Add to Cart
    var $popUpThnxOrder = $('.pop-up-thnx-order');
    var $popUpThnxOrderCloseBtn = $('.pop-up-thnx-order-close-btn');
    var $continueShopping = $('.continue-shopping');

    // open order call pop-up
    $popUpAddCallOpenBtn.click(function () {
        $popUpPhonesMob.fadeOut();
        $popUpOverlayWRP.fadeIn();
        $popUpAddCall.fadeIn();
    });

    // close order call pop-up
    $popUpAddCallCloseBtn.click(function () {
        $popUpAddCall.fadeOut();
        $popUpOverlayWRP.fadeOut();
    });

    // open submit application pop-up
    // $popUpSubmitAppOpenBtn.click(function () {
    //     $popUpOverlayWRP.fadeIn();
    //     $popUppSubmitApp.fadeIn();
    // });

    // close submit application pop-up
    $popUpSubmitAppCloseBtn.click(function () {
        $popUppSubmitApp.fadeOut();
        $popUpOverlayWRP.fadeOut();
    });

    // open phones mob pop-up
    $popUpPhonesMobOpenBtn.click(function () {
        $popUpOverlayWRP.fadeIn();
        $popUpPhonesMob.fadeIn();
    });

    // close phones mob pop-up
    $popUpPhonesMobCloseBtn.click(function () {
        $popUpPhonesMob.fadeOut();
        $popUpOverlayWRP.fadeOut();
    });

    // close thnx pop-up
    $popUpThnxCloseBtn.click(function () {
        $popUpThnx.fadeOut();
        $popUpOverlayWRP.fadeOut();
    });


    //--- open pop-up  after adding to cart---
    function openPopUpAfterAddingToCart () {
        $popUpOverlayWRP.fadeIn();
        $popUpThnxOrder.fadeIn();
    };


    // close Order pop-up after adding to cart
    $popUpThnxOrderCloseBtn.click(function () {
        $popUpThnxOrder.fadeOut();
        $popUpOverlayWRP.fadeOut();
    });
    // close Order pop-up after adding to cart
    $continueShopping.click(function () {
        $popUpThnxOrder.fadeOut();
        $popUpOverlayWRP.fadeOut();
    });

    // close all pop-ups
    $darkOverlay.click(function () {
        $popUppSubmitApp.fadeOut();
        $popUpAddCall.fadeOut();
        $popUpThnx.fadeOut();
        $popUpThnxOrder.fadeOut();
        $popUpPhonesMob.fadeOut();
        $popUpOverlayWRP.fadeOut();
    });



    // open thnx pop-up
    function openThnxPopUp() {
        $popUpAddCall.fadeOut();
        $popUpThnx.fadeIn();
    };
    // var $thnx = $('.button.input-sections.input-pop-up-add-call');
    // $thnx.click(function () {
    //     openThnxPopUp()
    // });

    // CUT NEWS TEXT -------------------------------
    var size = 140,
    newsContent= $('.news-block-text'),
    servicesContent= $('.services-block-text'),
    servicesText = servicesContent.text(),
    newsText = newsContent.text();

    if(newsText.length > size){
    	newsContent.text(newsText.slice(0, size) + '[...]');
    };
    if(servicesText.length > size){
    	servicesContent.text(servicesText.slice(0, size) + '[...]');
    };
    // CUT NEWS TEXT END --------------------

    // POLICY CODE
    // POLICY double click
    var $policyLink = $('.nav-item a');
    var countClicks = 0;
    $policyLink.click(function (){
        countClicks = countClicks + 1;
        if (countClicks === 1) {
            $(this).click();
        } else {
            return;
        }
    });

    // POLICY MOBILE TABS
    var $btnToggle = $('.btn-toggle');
    var $policyText = $('.policy-text-mob');

    $btnToggle.click(function () {
        $btnToggle.removeClass('active');
        $policyText.removeClass('active');
        $(this).addClass('active');
        var attrValue = $(this).attr("data-nav");
        var $activeText = ($('[data-content = ' + attrValue + ']'));
        $activeText.addClass('active');
        $('body,html').animate({scrollTop: 0}, 800);
    });
    // POLICY CODE END

    // CART CODE
    var $sizeButton = $('.size-btn');
    $sizeButton.click(function () {
        $sizeButton.removeClass('active');
        $(this).addClass('active');
    });
    // SLIDER PRODUCT
    $('.product-img-main').slick({
         slidesToShow: 1,
         slidesToScroll: 1,
         // arrows: false,
         prevArrow: $('.prev-product-block'),
         nextArrow: $('.next-product-block'),
         fade: true,
         asNavFor: '.product-img-prev',
         responsive: [
             {
                 breakpoint: 1179,
                 settings: {
                     dots: true,
                     asNavFor: null,
                     slidesToShow: 1,
                     slidesToScroll: 1
                 }
             }
         ]
    });
    $('.product-img-prev').slick({
         slidesToShow: 3,
         slidesToScroll: 1,
         asNavFor: '.product-img-main',
         dots: false,
         focusOnSelect: true
    });

    // same products slider
    $('.same-products-slider').slick({
          dots: true,
          slidesToShow: 4,
          slidesToScroll: 4,
          prevArrow: $('.prev-same-products'),
          nextArrow: $('.next-same-products'),
          responsive: [
            {
              breakpoint: 1256,
              settings: {
                slidesToShow: 3,
                slidesToScroll: 3
              }
            },
            {
              breakpoint: 980,
              settings: {
                  slidesToShow: 2,
                  slidesToScroll: 2
              }
          },
            {
              breakpoint: 670,
              settings: {
                  slidesToShow: 1,
                  slidesToScroll: 1
              }
            }
          ]
      });

      // INPUT CHANGE AMOUNT
      var $minus = $('.minus');
      var $plus = $('.plus');

      var $deleteCartBlock = $('.delete-block');


       $minus.click(function () {
            var $amountInput = $(this).parent().children('.quantity-product-input');
            var count = parseInt($amountInput.val()) - 1;
            count = count < 1 ? 1 : count;
            $amountInput.val(count);
            $amountInput.change();
            return false;
        });
        $plus.click(function () {
            var $amountInput = $(this).parent().children('.quantity-product-input');
            $amountInput.val(parseInt($amountInput.val()) + 1);
            $amountInput.change();
            return false;
        });

        // DELETE CART-BLOCK
        $deleteCartBlock.click(function () {
            var $cartBlock = $(this).parent('.cart-block');
             $cartBlock.addClass('deleted-cart-block');
             setTimeout(function() {
                  $cartBlock.fadeOut();
             }, 200);
         });

            // initialize ReadMore
            $('.description-text-readmore').readmore({
                speed: 200,
                 lessLink: '<p class="readmore-link readmore-link-opened"><span>Свернуть</span></p>',
                 moreLink: '<p class="readmore-link readmore-link-closed"><span>Показать всё описание </span></p>',
                 maxHeight: 120,
            });
    // CART CODE END ----

    // SELECTIZE --------------
       $(function() {
           $('.select-sort').selectize();
       });

       // show/hide pop-up filters
        var $popUpFilters = $('.pop-up-filters');
        var $openFilterPopUpBtn = $('.open-filter-pop-up');
        var $closeFilterPopUpBtn = $('.go-back');

        $openFilterPopUpBtn.click(function () {
            $popUpFilters.addClass('show-pop-up-filters');
        });

        $closeFilterPopUpBtn.click(function () {
            $popUpFilters.removeClass('show-pop-up-filters');
        });

        // pop-up table
        var $tableOverlayWRP = $('.pop-up-table-sizes-wrp');
        var $tableOverlay = $('.table-overlay');
        var $table = $('.popUpTable');
        var $tableCloseBtn = $('.pop-up-table-app-close-btn');
        var $tableOpen = $('.table-sizes-btn');

        $tableOpen.click(function () {
            $tableOverlayWRP.fadeIn();
            setTimeout(function() {
                 $table.addClass('show-pop-up-tables');
            }, 200);
        });

        $tableCloseBtn.click(function () {
            $table.removeClass('show-pop-up-tables');
            setTimeout(function() {
                $tableOverlayWRP.fadeOut();
            }, 200);
        });

        $tableOverlay.click(function () {
            $table.removeClass('show-pop-up-tables');
            setTimeout(function() {
                $tableOverlayWRP.fadeOut();
            }, 200);
        });


});
