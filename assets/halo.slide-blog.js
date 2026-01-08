(function ($) {
    var halo = {
        initBlogPostSlider: function() {
            var blogBlock = $('[data-blogs-slider]');

            blogBlock.each(function() {
                var self = $(this),
                    rows = self.data('rows'),
                    autoplay = self.data('autoplay') !== undefined ? self.data('autoplay') : false,
                    autoplaySpeed = (self.data('autoplay-speed') || 3) * 1000,
                    infinite = self.data('infinite') !== undefined ? self.data('infinite') : true;

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
                                    infinite: infinite,
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
                                    infinite: infinite,
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
