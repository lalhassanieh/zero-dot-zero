(function ($) {
    var halo = {
        initBlogPostSlider: function() {
            var blogBlock = $('[data-blogs-slider]');

            blogBlock.each(function() {
                var self = $(this),
                    rows = parseInt(self.data('rows')) || 3,
                    autoplay = self.data('autoplay') !== undefined ? self.data('autoplay') : false,
                    autoplaySpeed = (self.data('autoplay-speed') || 3) * 1000;
                
                // Check if data-infinite attribute exists and is set to true
                var infiniteAttr = self.attr('data-infinite');
                var infiniteSetting = infiniteAttr !== undefined && (infiniteAttr === 'true' || infiniteAttr === true);

                var isRTL =
                    document.documentElement.getAttribute('dir') === 'rtl' ||
                    (window.Shopify && Shopify.locale && Shopify.locale.toLowerCase().startsWith('ar')) ||
                    document.body.classList.contains('layout_rtl');

                if(self.not('.slick-initialized')) {
                    if (isRTL) {
                        var items = self.find('.halo-item').get().reverse();
                        self.empty().append(items);
                    }
                    
                    // Count total slides
                    var totalSlides = self.find('.halo-item').length;
                    
                    // Calculate slides to show (don't show more than available)
                    var showDesktop = Math.min(rows, totalSlides);
                    var showTablet = Math.min(2, totalSlides);
                    var showMobile = 1;
                    
                    self.slick({
                        slidesToShow: showDesktop,
                        slidesToScroll: 1,
                        speed: 1000,
                        autoplay: autoplay,
                        autoplaySpeed: autoplaySpeed,
                        infinite: infiniteSetting && totalSlides > showDesktop,
                        dots: false,
                        arrows: true,
                        nextArrow: isRTL ? window.arrows.icon_prev : window.arrows.icon_next,
                        prevArrow: isRTL ? window.arrows.icon_next : window.arrows.icon_prev,
                        rtl: isRTL,
                        responsive: [
                            {
                                breakpoint: 992,
                                settings: {
                                    slidesToShow: showTablet,
                                    dots: true,
                                    arrows: false,
                                    autoplay: autoplay,
                                    autoplaySpeed: autoplaySpeed,
                                    infinite: infiniteSetting && totalSlides > showTablet,
                                }
                            },
                            {
                                breakpoint: 480,
                                settings: {
                                    slidesToShow: showMobile,
                                    dots: true,
                                    arrows: false,
                                    autoplay: autoplay,
                                    autoplaySpeed: autoplaySpeed,
                                    infinite: infiniteSetting && totalSlides > showMobile,
                                }
                            }
                        ]
                    });
                };
            });
        }
    }
    halo.initBlogPostSlider();
    if ($('body').hasClass('cursor-fixed__show')){
        window.sharedFunctionsAnimation.onEnterButton();
        window.sharedFunctionsAnimation.onLeaveButton();
    }
})(jQuery);
