(function() {
    function initNewsletterBanner(root) {
      if (!root) return;
  
      root.addEventListener('click', function (e) {
        var btn = e.target.closest('[data-toggle-newsletter]');
        if (!btn) return;
  
        var item = btn.closest('[data-banner-item]');
        if (!item) return;
  
        var wrap = item.querySelector('[data-newsletter-wrap]');
        if (!wrap) return;
  
        var isHidden = (wrap.style.display === 'none' || wrap.style.display === '');
        wrap.style.display = isHidden ? 'block' : 'none';
        btn.style.display = isHidden ? 'none' : 'inline-block';
  
        if (isHidden) {
          var email = wrap.querySelector('input[type="email"]');
          if (email) setTimeout(function(){ email.focus(); }, 50);
        }
      });
  
      var forms = root.querySelectorAll('form[class*="ai-newsletter-form"]');
      forms.forEach(function(form) {
        form.addEventListener('submit', function(e) {
          try {
            var wrap = form.closest('[data-newsletter-wrap]');
            var item = wrap ? wrap.closest('[data-banner-item]') : form.closest('[data-banner-item]');
            var errorContainer = root.querySelector('[data-newsletter-errors]');
  
            setTimeout(function() {
              try {
                var urlParams = new URLSearchParams(window.location.search);
                var customerPost = urlParams.get('customer_posted');
                var formErrors = form.querySelector('.note--error, .errors, .form-error');
                var formSuccess = !!(
                  form.querySelector('.note--success') ||
                  form.classList.contains('form-success') ||
                  customerPost === 'true'
                );
                
                if (formErrors) {
                } else if (formSuccess) {
                  form.style.display = 'none';
                  var successMsg = wrap ? wrap.querySelector('[data-newsletter-success]') : (item ? item.querySelector('[data-newsletter-success]') : null);
                  if (successMsg) {
                    successMsg.removeAttribute('style');
                    successMsg.style.cssText = 'display: block !important; margin-top: 16px;';
                    successMsg.textContent = 'Thank you! You\'ve been subscribed successfully.';
                    successMsg.classList.add('show');
                  }
                  if (item) {
                    var toggleBtn = item.querySelector('[data-toggle-newsletter]');
                    if (toggleBtn) {
                      toggleBtn.style.display = 'none';
                    }
                  }
                }
              } catch(err) {
                if (errorContainer) {
                  errorContainer.style.display = 'none';
                }
              }
            }, 500);
          } catch(err) {
            var errorContainer = root.querySelector('[data-newsletter-errors]');
            if (errorContainer) {
              errorContainer.style.display = 'none';
            }
          }
        });
      });
  
      if (window.location.search.indexOf('customer_posted=true') > -1) {
        var wraps = root.querySelectorAll('[data-newsletter-wrap]');
        wraps.forEach(function(wrap) {
          var form = wrap.querySelector('form');
          var successMsg = wrap.querySelector('[data-newsletter-success]');
          if (form && successMsg) {
            form.style.display = 'none';
            successMsg.classList.add('show');
            wrap.style.display = 'block';
            var item = wrap.closest('[data-banner-item]');
            if (item) {
              var toggleBtn = item.querySelector('[data-toggle-newsletter]');
              if (toggleBtn) {
                toggleBtn.style.display = 'none';
              }
            }
          }
        });
      }
    }
    
  
    var banners = document.querySelectorAll('[data-newsletter-banner]');
    banners.forEach(function(banner) {
      initNewsletterBanner(banner);
    });
  
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', function() {
        var banners = document.querySelectorAll('[data-newsletter-banner]');
        banners.forEach(function(banner) {
          initNewsletterBanner(banner);
        });
      });
    }

    // Style asterisks in Globo Form paragraph headings
    function styleGloboFormAsterisks() {
      var headings = document.querySelectorAll('.globo-form.contact-form .globo-paragraph h4');
      headings.forEach(function(heading) {
        // Replace asterisk with wrapped version for red styling
        heading.innerHTML = heading.innerHTML.replace(/\*/g, '<span class="required-asterisk">*</span>');
      });
    }

    // Run on DOM ready
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', styleGloboFormAsterisks);
    } else {
      styleGloboFormAsterisks();
    }

    // Also run when Globo form is loaded dynamically
    var observer = new MutationObserver(function(mutations) {
      mutations.forEach(function(mutation) {
        mutation.addedNodes.forEach(function(node) {
          if (node.nodeType === 1 && (node.classList.contains('globo-form') || node.querySelector('.globo-form'))) {
            styleGloboFormAsterisks();
          }
        });
      });
    });

    if (document.body) {
      observer.observe(document.body, { childList: true, subtree: true });
    }
  })();
  

  // ── Zing loyalty riyal formatter (commented out — replaced by Appstle version below) ──
  // function initZingRiyalFormatter() {
  //   function process(scope) {
  //       (scope || document)
  //           .querySelectorAll(".zing-loyalty-popup__box-description:not(.has-riyal)")
  //           .forEach(function (el) {
  //           var text = (el.textContent || "").replace(/\s+/g, " ").trim();
  //
  //           if (!text.includes("ريال")) return;
  //
  //           text = text.replace(/ريال/g, "").replace(/\s+/g, " ").trim();
  //
  //           var m = text.match(/(\d{1,3}(?:,\d{3})*(?:\.\d+)?|\d+(?:\.\d+)?)/);
  //           if (!m) return;
  //
  //           var amount = m[1];
  //
  //           el.innerHTML = text.replace(
  //               amount,
  //               '<span class="zing-amount">' + amount + "</span>"
  //           );
  //
  //           el.classList.add("has-riyal");
  //           });
  //   }
  //
  //   process(document);
  //
  //   var observer = new MutationObserver(function (mutations) {
  //       mutations.forEach(function (m) {
  //       if (!m.addedNodes) return;
  //       m.addedNodes.forEach(function (node) {
  //           if (node.nodeType === 1) process(node);
  //       });
  //       });
  //   });
  //
  //   observer.observe(document.body, { childList: true, subtree: true });
  // }
  //
  // document.addEventListener("DOMContentLoaded", function () {
  //   initZingRiyalFormatter();
  // });

  // ── Appstle loyalty riyal formatter ──
  // The referral widget renders inside Appstle's iframe, so we search both
  // the main document and any accessible iframe contentDocuments.
  function initAppstleRiyalFormatter() {
    var SELECTORS = [
      ".loyalty-referring-friend-get-info-description:not(.has-riyal)",
      ".loyalty-referrals-friend-get-info-description:not(.has-riyal)"
    ].join(",");


    var IFRAME_CSS_BASE = [
      '@font-face{font-family:"MHE-Riyal-Sign";',
      'src:url("https://zero-dot-zero.myshopify.com/cdn/shop/t/2/assets/MHERiyalSign-Regular.woff2") format("woff2"),',
      'url("https://zero-dot-zero.myshopify.com/cdn/shop/t/2/assets/MHERiyalSign-Regular.woff") format("woff"),',
      'url("https://zero-dot-zero.myshopify.com/cdn/shop/t/2/assets/MHERiyalSign-Regular.ttf") format("truetype");',
      'font-weight:normal;font-style:normal;}',

      '.loyalty-referring-friend-get-info-description .appstle-amount{display:inline-block;white-space:nowrap;direction:ltr;unicode-bidi:isolate;}',
      '.loyalty-referrals-friend-get-info-description .appstle-amount{display:inline-block;white-space:nowrap;direction:ltr;unicode-bidi:isolate;}',
      '.loyalty-referring-friend-get-info-description .appstle-amount::before{content:"A\u00A0";font-family:"MHE-Riyal-Sign" !important;font-weight:700;line-height:1;}',
      '.loyalty-referrals-friend-get-info-description .appstle-amount::before{content:"A\u00A0";font-family:"MHE-Riyal-Sign" !important;font-weight:700;line-height:1;}',

      'button{border-radius:50px !important;}',
      '.loyalty-cart-widget-rewards-btn{border-radius:50px !important;}'
    ].join('');

    var IFRAME_CSS_RTL = [
      '.loyalty-referring-friend-get-info-description{direction:rtl;text-align:right;}',
      '.loyalty-referrals-friend-get-info-description{direction:rtl;text-align:right;}',

      'body{direction:rtl;text-align:right;}',

      '.al-fixed.al-inset-0{direction:ltr !important;flex-direction:row !important;}',

      '.al-referral-you-get-block{direction:rtl;}',
      '.al-referral-they-get-block{direction:rtl;}',
      '.al-referral-you-get-container{flex-direction:row-reverse !important;}',
      '.al-referral-they-get-container{flex-direction:row-reverse !important;}',
      '.loyalty-referring-friend-get-left-icon{margin-right:0 !important;margin-left:0.75rem !important;}',
      '.loyalty-referring-friend-get-info-container{text-align:right;}',
      '.loyalty-referrals-friend-get-info-container{text-align:right;}',
      '.al-mr-3{margin-right:0;margin-left:0.75rem;}',

      '[data-testid="nav-faq"]{flex-direction:row-reverse;gap:6px;}',
      '[data-testid="nav-faq"] .al-ml-1{margin-left:0;}',

      '.loyalty-home-info-container{direction:rtl;text-align:right;}',
      '.loyalty-home-welcome-title{text-align:right !important;}',
      '.loyalty-home-loyalty-title{text-align:right !important;}',
      '.loyalty-home-community-title{text-align:right !important;}',
      '.loyalty-home-card,.loyalty-home-earn-title,.loyalty-home-earn-description{direction:rtl;text-align:right !important;}',
      '.al-overflow-y-auto,.al-flex-col:not(.al-fixed){direction:rtl;}'
    ].join('');

    function injectCss(iDoc) {
      if (iDoc.getElementById('appstle-bi-styles')) return;
      var isRtl = document.documentElement.dir === 'rtl' || document.documentElement.lang === 'ar';
      var s = iDoc.createElement('style');
      s.id = 'appstle-bi-styles';
      s.textContent = IFRAME_CSS_BASE + (isRtl ? IFRAME_CSS_RTL : '');
      (iDoc.head || iDoc.documentElement).appendChild(s);
    }

    function processDoc(doc) {
      doc.querySelectorAll(SELECTORS).forEach(function (el) {
        var text = (el.textContent || "").replace(/\s+/g, " ").trim();
        if (!text.includes("ريال")) return;
        text = text.replace(/ريال/g, "").replace(/\s+/g, " ").trim();
        var m = text.match(/(\d{1,3}(?:,\d{3})*(?:\.\d+)?|\d+(?:\.\d+)?)/);
        if (!m) return;
        var amount = m[1];
        el.innerHTML = text.replace(amount, '<span class="appstle-amount">' + amount + "</span>");
        el.classList.add("has-riyal");
      });
    }

    var observedIframes = new WeakSet();

    function attachToIframe(iframe) {
      if (observedIframes.has(iframe)) return;
      observedIframes.add(iframe);

      function runInIframe() {
        try {
          var iDoc = iframe.contentDocument || iframe.contentWindow.document;
          if (!iDoc || !iDoc.body) return;
          injectCss(iDoc);
          processDoc(iDoc);
          var iObs = new MutationObserver(function () { injectCss(iDoc); processDoc(iDoc); });
          iObs.observe(iDoc.body, { childList: true, subtree: true });
        } catch (e) {}
      }

      runInIframe();
      iframe.addEventListener("load", runInIframe);
    }

    function scanAll() {
      processDoc(document);
      document.querySelectorAll("iframe").forEach(function (f) { attachToIframe(f); });
    }

    scanAll();

    var debounceTimer;
    var mainObserver = new MutationObserver(function (mutations) {
      mutations.forEach(function (m) {
        m.addedNodes.forEach(function (node) {
          if (node.nodeType !== 1) return;
          if (node.tagName === "IFRAME") attachToIframe(node);
          node.querySelectorAll && node.querySelectorAll("iframe").forEach(function (f) { attachToIframe(f); });
        });
      });
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(function () { processDoc(document); }, 150);
    });
    mainObserver.observe(document.body, { childList: true, subtree: true });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initAppstleRiyalFormatter);
  } else {
    initAppstleRiyalFormatter();
  }