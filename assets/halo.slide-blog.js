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

                var isRTL =
                    document.documentElement.getAttribute('dir') === 'rtl' ||
                    (window.Shopify && Shopify.locale && Shopify.locale.toLowerCase().startsWith('ar')) ||
                    document.body.classList.contains('layout_rtl');

                if(self.not('.slick-initialized')) {
                    if (isRTL) {
                        var items = self.find('.halo-item').get().reverse();
                        self.empty().append(items);
                        itemCount = self.find('.halo-item').length;
                    }
                    
                    // When autoplay is enabled, ensure enough items for infinite loop
                    // Duplicate items if we don't have enough for proper cloning
                    if (autoplay && itemCount > 0) {
                        var itemsNeeded = rows * 2;
                        if (itemCount < itemsNeeded) {
                            var originalItems = self.find('.halo-item');
                            var clonesNeeded = Math.ceil(itemsNeeded / itemCount);
                            for (var i = 1; i < clonesNeeded; i++) {
                                originalItems.clone().appendTo(self);
                            }
                        }
                    }
                    
                    self.slick({
                        slidesToShow: rows,
                        slidesToScroll: 1,
                        speed: 1000,
                        autoplay: autoplay,
                        autoplaySpeed: autoplaySpeed,
                        infinite: autoplay ? true : (itemCount > rows),
                        swipeToSlide: false,
                        variableWidth: false,
                        centerMode: false,
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
                                    slidesToScroll: 1,
                                    dots: true,
                                    arrows: false,
                                    autoplay: autoplay,
                                    autoplaySpeed: autoplaySpeed,
                                    infinite: autoplay ? true : (itemCount > 2),
                                    swipeToSlide: false,
                                }
                            },
                            {
                                breakpoint: 480,
                                settings: {
                                    slidesToShow: 1,
                                    slidesToScroll: 1,
                                    dots: true,
                                    arrows: false,
                                    autoplay: autoplay,
                                    autoplaySpeed: autoplaySpeed,
                                    infinite: autoplay ? true : (itemCount > 1),
                                    swipeToSlide: false,
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
