// SlideSection custom element for Swiper integration
// Based on working project implementation

class SlideSection extends HTMLElement {
  constructor() {
    super();
    this.globalSlide = null;
    this.init();
  }

  init() {
    if (document.body.classList.contains("index")) {
      let pos = window.pageYOffset;
      if (pos > 0 || document.body.classList.contains("swiper-lazy")) {
        this.initSlide();
      } else {
        if (this.classList.contains("lazy-loading-swiper-before")) {
          this.initSlide();
        } else {
          this.classList.add("lazy-loading-swiper-after");
        }
      }
    } else {
      this.initSlide();
    }
  }

  initSlide() {
    const _this = this;
    var autoplaying = _this?.dataset.autoplay === "true";
    const loop = _this?.dataset.loop === "true";
    const itemDesktop = _this?.dataset.desktop ? _this?.dataset.desktop : 4;
    var itemTablet = _this?.dataset.tablet ? _this?.dataset.tablet : "";
    const itemMobile = _this?.dataset.mobile ? _this?.dataset.mobile : 1;
    const direction = _this?.dataset.direction
      ? _this?.dataset.direction
      : "horizontal";
    var autoplaySpeed = _this?.dataset.autoplaySpeed
      ? _this?.dataset.autoplaySpeed * 1000
      : 3000;
    var speed = _this?.dataset.speed ? _this?.dataset.speed : 400;
    const effect = _this?.dataset.effect ? _this?.dataset.effect : "slide";
    const row = _this?.dataset.row ? _this?.dataset.row : 1;
    var spacing = _this?.dataset.spacing ? _this?.dataset.spacing : 30;
    const progressbar = _this?.dataset.paginationProgressbar === "true";
    const autoItem = _this?.dataset.itemMobile === "true";
    const autoHeight = _this?.dataset.autoHeight === "true";
    const paginationCustom = _this?.dataset.customPagination;
    const slideShow = _this?.dataset.slideshow === "true";
    const revealSlideshow = _this?.dataset.revealSlideshow === "true";
    const customNavigation = _this?.dataset.customNavigation === "true";
    const customPrev = _this?.dataset.customPrev;
    const customNext = _this?.dataset.customNext;
    const arrowCenterimage = _this?.dataset.arrowCenterimage
      ? _this?.dataset.arrowCenterimage
      : 0;
    spacing = Number(spacing);
    autoplaySpeed = Number(autoplaySpeed);
    speed = Number(speed);
    if (autoplaying) {
      autoplaying = { delay: autoplaySpeed };
    }
    if (!itemTablet) {
      if (itemDesktop < 2) {
        itemTablet = 1;
      } else if (itemDesktop < 3) {
        itemTablet = 2;
      } else {
        itemTablet = 3;
      }
    }
    if (direction == "vertical") {
      _this.style.maxHeight = _this.offsetHeight + "px";
    }
    
    // Check if Swiper is available
    if (typeof Swiper === 'undefined') {
      console.warn('Swiper library is not loaded. Please add Swiper library to your theme.');
      return;
    }

    this.globalSlide = new Swiper(_this, {
      slidesPerView: autoItem ? "auto" : itemMobile,
      spaceBetween: spacing >= 15 ? 15 : spacing,
      autoplay: autoplaying,
      direction: direction,
      loop: loop,
      effect: effect,
      autoHeight: autoHeight,
      speed: speed,
      watchSlidesProgress: true,
      watchSlidesVisibility: true,
      centeredSlides: false,
      grabCursor: true,
      grid: {
        rows: row,
        fill: "row",
      },
      navigation: {
        nextEl: customNavigation ? document.querySelector(`.${customNext}`) : _this.querySelector(".swiper-button-next"),
        prevEl: customNavigation ? document.querySelector(`.${customPrev}`) : _this.querySelector(".swiper-button-prev"),
      },
      pagination: {
        clickable: true,
        el: paginationCustom == undefined ? 
          _this.querySelector(".parent-pagination") ||
          _this.querySelector(".swiper-pagination") : _this.querySelector(`.${paginationCustom}`),
        type: progressbar ? "progressbar" : "bullets",
      },
      breakpoints: {
        768: {
          slidesPerView: itemTablet,
          spaceBetween: spacing >= 30 ? 30 : spacing,
          pagination: {
            type: progressbar ? "progressbar" : "bullets",
          },
          autoHeight: false,
          centeredSlides: false
        },
        1025: {
          slidesPerView: itemDesktop,
          spaceBetween: spacing,
          pagination: {
            type: progressbar ? "progressbar" : "bullets",
          },
          autoHeight: false,
          centeredSlides: slideShow && itemDesktop == 1.5 ? true : false,
        },
      },
      thumbs: {
        swiper: this.thumbnailSlide ? this.thumbnailSlide : null,
      },

      on: {
        init: function (e) {
          e.autoplay.stop();
          if (_this?.dataset.autoplay === "true") {
            // Use IntersectionObserver or similar for autoplay on view
            const observer = new IntersectionObserver((entries) => {
              entries.forEach(entry => {
                if (entry.isIntersecting) {
                  e.autoplay.start();
                } else {
                  e.autoplay.stop();
                }
              });
            }, { margin: "0px 0px -50px 0px" });
            observer.observe(_this);
          }
        },
        slideChange: function () {
          // Handle slide change events if needed
        },
        slideChangeTransitionStart: function () {
          // Handle transition start if needed
        },
        slideChangeTransitionEnd: function () {
          // Handle transition end if needed
        }
      },
    });
  }
}

// Register the custom element
if (typeof customElements !== 'undefined') {
  customElements.define("slide-section", SlideSection);
}

