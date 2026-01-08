(function ($) {
    var halo = {
        initBlogPostSlider: function() {
            var blogBlock = $('[data-blogs-slider]');

            blogBlock.each(function() {
                var self = $(this),
                    rows = parseInt(self.data('rows'), 10) || 3,
                    autoplay = self.data('autoplay') !== undefined ? self.data('autoplay') : false,
                    autoplaySpeed = (self.data('autoplay-speed') || 3) * 1000;

                var itemCount = self.find('.halo-item').length;
                
                var enableInfiniteDesktop = autoplay ? true : (itemCount > rows);
                var enableInfiniteTablet = autoplay ? true : (itemCount > 2);
                var enableInfiniteMobile = autoplay ? true : (itemCount > 1);

                var isRTL =
                    document.documentElement.getAttribute('dir') === 'rtl' ||
                    (window.Shopify && Shopify.locale && Shopify.locale.toLowerCase().startsWith('ar')) ||
                    document.body.classList.contains('layout_rtl');

                if(self.not('.slick-initialized')) {
                    if (isRTL) {
                        var items = self.find('.halo-item').get().reverse();
                        self.empty().append(items);
                    }
                    self.slick({
                        slidesToShow: rows,
                        slidesToScroll: 1,
                        speed: 1000,
                        autoplay: autoplay,
                        autoplaySpeed: autoplaySpeed,
                        infinite: enableInfiniteDesktop,
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
                                    infinite: enableInfiniteTablet,
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
                                    infinite: enableInfiniteMobile,
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
