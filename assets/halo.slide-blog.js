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
                    
                    // Only enable infinite if there are enough slides to prevent empty slides
                    // For proper infinite loop without empty spaces, we need enough slides to duplicate
                    // Minimum: slidesToShow + 1, but for smooth odd/even handling, use slidesToShow * 2
                    // However, if totalSlides is exactly divisible by slidesToShow, we can use a lower threshold
                    var remainder = totalSlides % rows;
                    var isDivisible = remainder === 0;
                    
                    // Enable infinite if: 
                    // - Setting is enabled AND
                    // - Either slides are divisible by rows (clean fit) OR we have at least rows * 2 slides
                    var infinite = infiniteSetting && (isDivisible ? totalSlides > rows : totalSlides >= (rows * 2));
                    
                    // Same logic for responsive breakpoints
                    var remainderTablet = totalSlides % 2;
                    var isDivisibleTablet = remainderTablet === 0;
                    var infiniteTablet = infiniteSetting && (isDivisibleTablet ? totalSlides > 2 : totalSlides >= 4);
                    
                    var remainderMobile = totalSlides % 1;
                    var isDivisibleMobile = remainderMobile === 0;
                    var infiniteMobile = infiniteSetting && (isDivisibleMobile ? totalSlides > 1 : totalSlides >= 2);
                    
                    self.slick({
                        slidesToShow: rows,
                        slidesToScroll: 1,
                        speed: 1000,
                        autoplay: autoplay,
                        autoplaySpeed: autoplaySpeed,
                        infinite: infinite,
                        dots: false,
                        arrows: true,
                        nextArrow: isRTL ? window.arrows.icon_prev : window.arrows.icon_next,
                        prevArrow: isRTL ? window.arrows.icon_next : window.arrows.icon_prev,
                        rtl: isRTL,
                        responsive: [
                            {
                                breakpoint: 992,
                                settings: {
                                    slidesToShow: 2,
                                    dots: true,
                                    arrows: false,
                                    autoplay: autoplay,
                                    autoplaySpeed: autoplaySpeed,
                                    infinite: infiniteTablet,
                                }
                            },
                            {
                                breakpoint: 480,
                                settings: {
                                    slidesToShow: 1,
                                    dots: true,
                                    arrows: false,
                                    autoplay: autoplay,
                                    autoplaySpeed: autoplaySpeed,
                                    infinite: infiniteMobile,
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
