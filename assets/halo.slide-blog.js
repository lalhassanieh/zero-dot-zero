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
                // If attribute doesn't exist, default to false (infinite disabled)
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
                    
                    // Count total slides for stopping autoplay when infinite is disabled
                    var totalSlides = self.find('.halo-item').length;
                    
                    // Use infiniteSetting directly - no conditions, respect user's choice
                    self.slick({
                        slidesToShow: rows,
                        slidesToScroll: 1,
                        speed: 1000,
                        autoplay: autoplay,
                        autoplaySpeed: autoplaySpeed,
                        infinite: infiniteSetting,
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
                                    infinite: infiniteSetting,
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
                                    infinite: infiniteSetting,
                                }
                            }
                        ]
                    });
                    
                    // When infinite is disabled and autoplay is on, ensure it stops at the end
                    if (!infiniteSetting && autoplay) {
                        self.on('afterChange', function(event, slick, currentSlide) {
                            // Get current slidesToShow value (may change on responsive)
                            var currentSlidesToShow = slick.slickGetOption('slidesToShow') || rows;
                            // Calculate the last slide index where we should stop
                            var lastSlide = totalSlides - currentSlidesToShow;
                            
                            // If we've reached or passed the last slide, pause autoplay
                            if (currentSlide >= lastSlide) {
                                self.slick('slickPause');
                            }
                        });
                    }
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
