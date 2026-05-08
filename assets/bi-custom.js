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
  
  // ── Appstle loyalty riyal formatter (commented out) ──
  // function initAppstleRiyalFormatter() {
  //   var SELECTORS = [
  //     ".loyalty-referring-friend-get-info-description:not(.has-riyal)",
  //     ".loyalty-referrals-friend-get-info-description:not(.has-riyal)"
  //   ].join(",");
  //
  //   var IFRAME_CSS_BASE = [
  //     '@font-face{font-family:"MHE-Riyal-Sign";',
  //     'src:url("https://zero-dot-zero.myshopify.com/cdn/shop/t/2/assets/MHERiyalSign-Regular.woff2") format("woff2"),',
  //     'url("https://zero-dot-zero.myshopify.com/cdn/shop/t/2/assets/MHERiyalSign-Regular.woff") format("woff"),',
  //     'url("https://zero-dot-zero.myshopify.com/cdn/shop/t/2/assets/MHERiyalSign-Regular.ttf") format("truetype");',
  //     'font-weight:normal;font-style:normal;}',
  //
  //     '.loyalty-referring-friend-get-info-description .appstle-amount{display:inline-block;white-space:nowrap;direction:ltr;unicode-bidi:isolate;}',
  //     '.loyalty-referrals-friend-get-info-description .appstle-amount{display:inline-block;white-space:nowrap;direction:ltr;unicode-bidi:isolate;}',
  //     '.loyalty-referring-friend-get-info-description .appstle-amount::before{content:"A";font-family:"MHE-Riyal-Sign" !important;font-weight:700;line-height:1;}',
  //     '.loyalty-referrals-friend-get-info-description .appstle-amount::before{content:"A";font-family:"MHE-Riyal-Sign" !important;font-weight:700;line-height:1;}',
  //     '.loyalty-home-refer-help-text .appstle-amount{display:inline-block;white-space:nowrap;direction:ltr;unicode-bidi:isolate;}',
  //     '.loyalty-home-refer-help-text .appstle-amount::before{content:"A";font-family:"MHE-Riyal-Sign" !important;font-weight:700;line-height:1;}',
  //
  //     '.loyalty-home-faq-title{white-space:nowrap;}',
  //
  //     '.loyalty-referral-claim-gift-button{background-color:#005339 !important;color:#ffffff !important;border-radius:50px !important;border:2px solid #005339 !important;font-family:"Gilroy Extra Bold","DM Sans",sans-serif !important;font-size:16px !important;font-weight:700 !important;text-transform:uppercase !important;letter-spacing:0 !important;line-height:21px !important;padding:10px 28px !important;transition:color .5s cubic-bezier(.25,.46,.45,.94),background .5s cubic-bezier(.25,.46,.45,.94),border .5s cubic-bezier(.25,.46,.45,.94) !important;}',
  //     '.loyalty-referral-claim-gift-button:hover{background-color:#ffffff !important;color:#005339 !important;border:2px solid #005339 !important;}',
  //
  //     'button{border-radius:50px !important;}',
  //     '.loyalty-cart-widget-rewards-btn{border-radius:50px !important;}'
  //   ].join('');
  //
  //   var IFRAME_CSS_RTL = [
  //     '.loyalty-referring-friend-get-info-description{direction:rtl;text-align:right;}',
  //     '.loyalty-referrals-friend-get-info-description{direction:rtl;text-align:right;}',
  //
  //     'body{direction:rtl;text-align:right;}',
  //
  //     '.al-fixed.al-inset-0{direction:ltr !important;flex-direction:row !important;}',
  //
  //     '.al-referral-you-get-block{direction:rtl;}',
  //     '.al-referral-they-get-block{direction:rtl;}',
  //     '.loyalty-referring-friend-get-left-icon{margin-right:0 !important;margin-left:0.75rem !important;}',
  //     '.loyalty-referrals-friend-get-left-icon{margin-right:0 !important;margin-left:0.75rem !important;}',
  //     '.loyalty-referring-friend-get-info-container{text-align:right;}',
  //     '.loyalty-referrals-friend-get-info-container{text-align:right;}',
  //     '.al-mr-3{margin-right:0 !important;}',
  //
  //     '[data-testid="nav-faq"]{flex-direction:row-reverse;gap:6px;}',
  //     '[data-testid="nav-faq"] .al-ml-1{margin-left:0;}',
  //     '[data-testid="nav-faq"] svg{width:1.25rem !important;height:1.25rem !important;flex-shrink:0;}',
  //
  //     '.loyalty-home-info-container{direction:rtl;text-align:right;}',
  //     '.loyalty-home-welcome-title{text-align:right !important;}',
  //     '.loyalty-home-loyalty-title{text-align:right !important;}',
  //     '.loyalty-home-community-title{text-align:right !important;}',
  //     '.loyalty-home-card,.loyalty-home-earn-title,.loyalty-home-earn-description{direction:rtl;text-align:right !important;}',
  //     '.al-overflow-y-auto,.al-flex-col:not(.al-fixed){direction:rtl;}',
  //     '.loyalty-home-refer-help-text{direction:rtl;text-align:right;}',
  //     '.ways-to-redeem-arrow-icon{transform:rotate(180deg);}',
  //     '.al-fixed.al-inset-0.al-h-16{flex-direction:row-reverse !important;overflow:hidden !important;}',
  //     '.al-fixed.al-inset-0.al-h-16 .loyalty-header-text{text-align:right !important;min-width:0 !important;overflow:hidden !important;}',
  //     '.al-fixed.al-inset-0.al-h-16 .al-mr-8{margin-right:0 !important;margin-left:0 !important;}',
  //     '.al-back-icon{transform:scaleX(-1);}',
  //     '.al-w-16:has(.al-back-icon){width:auto !important;}',
  //     '.al-fixed.al-inset-0.al-h-16 .al-w-16.al-mr-8{width:auto !important;}'
  //   ].join('');
  //
  //   function injectCss(iDoc) {
  //     var isRtl = document.documentElement.dir === 'rtl' || document.documentElement.lang === 'ar';
  //     var css = IFRAME_CSS_BASE + (isRtl ? IFRAME_CSS_RTL : '');
  //     var existing = iDoc.getElementById('appstle-bi-styles');
  //     if (existing) { existing.textContent = css; return; }
  //     var s = iDoc.createElement('style');
  //     s.id = 'appstle-bi-styles';
  //     s.textContent = css;
  //     (iDoc.head || iDoc.documentElement).appendChild(s);
  //   }
  //
  //   function processDoc(doc) {
  //     doc.querySelectorAll(SELECTORS).forEach(function (el) {
  //       var text = (el.textContent || "").replace(/\s+/g, " ").trim();
  //       if (!text.includes("ريال")) return;
  //       text = text.replace(/ريال/g, "").replace(/\s+/g, " ").trim();
  //       var m = text.match(/(\d{1,3}(?:,\d{3})*(?:\.\d+)?|\d+(?:\.\d+)?)/);
  //       if (!m) return;
  //       var amount = m[1];
  //       el.innerHTML = text.replace(amount, '<span class="appstle-amount">' + amount + "</span>");
  //       el.classList.add("has-riyal");
  //     });
  //
  //     doc.querySelectorAll('.loyalty-home-refer-help-text:not(.has-riyal)').forEach(function (el) {
  //       if (!el.innerHTML.includes('\u0631\u064a\u0627\u0644')) return;
  //       var newHtml = el.innerHTML.replace(
  //         /<span class="riyal-font"><\/span>(\d{1,3}(?:,\d{3})*(?:\.\d+)?|\d+(?:\.\d+)?)([^<\u0631]*)\u0631\u064a\u0627\u0644/g,
  //         '<span class="appstle-amount">$1</span>$2'
  //       );
  //       if (newHtml !== el.innerHTML) {
  //         el.innerHTML = newHtml;
  //         el.classList.add('has-riyal');
  //       }
  //     });
  //
  //     doc.querySelectorAll('.al-loyalty-money-sign:not(.has-riyal-font)').forEach(function (el) {
  //       el.textContent = 'A';
  //       el.style.fontFamily = '"MHE-Riyal-Sign"';
  //       el.style.fontWeight = '700';
  //       el.style.setProperty('font-size', '20px', 'important');
  //       el.style.marginRight = '4px';
  //       el.classList.add('has-riyal-font');
  //     });
  //
  //     doc.querySelectorAll('.al-loyalty-money-value').forEach(function (el) {
  //       el.style.setProperty('font-size', '20px', 'important');
  //     });
  //   }
  //
  //   var observedIframes = new WeakSet();
  //
  //   function attachToIframe(iframe) {
  //     if (observedIframes.has(iframe)) return;
  //     observedIframes.add(iframe);
  //
  //     function runInIframe() {
  //       try {
  //         var iDoc = iframe.contentDocument || iframe.contentWindow.document;
  //         if (!iDoc || !iDoc.body) return;
  //         injectCss(iDoc);
  //         processDoc(iDoc);
  //         var iObs = new MutationObserver(function () { injectCss(iDoc); processDoc(iDoc); });
  //         iObs.observe(iDoc.body, { childList: true, subtree: true });
  //       } catch (e) {}
  //     }
  //
  //     runInIframe();
  //     iframe.addEventListener("load", runInIframe);
  //   }
  //
  //   function scanAll() {
  //     processDoc(document);
  //     document.querySelectorAll("iframe").forEach(function (f) { attachToIframe(f); });
  //   }
  //
  //   scanAll();
  //
  //   var debounceTimer;
  //   var mainObserver = new MutationObserver(function (mutations) {
  //     mutations.forEach(function (m) {
  //       m.addedNodes.forEach(function (node) {
  //         if (node.nodeType !== 1) return;
  //         if (node.tagName === "IFRAME") attachToIframe(node);
  //         node.querySelectorAll && node.querySelectorAll("iframe").forEach(function (f) { attachToIframe(f); });
  //       });
  //     });
  //     clearTimeout(debounceTimer);
  //     debounceTimer = setTimeout(function () { processDoc(document); }, 150);
  //   });
  //   mainObserver.observe(document.body, { childList: true, subtree: true });
  // }
  //
  // if (document.readyState === "loading") {
  //   document.addEventListener("DOMContentLoaded", initAppstleRiyalFormatter);
  // } else {
  //   initAppstleRiyalFormatter();
  // }

  // ── Blog masonry row height equalizer ──
  // Groups masonry items by their `top` position (same top = same row),
  // then sets .blog-summary and .blog-title to the tallest in each row.
  function equalizeBlogRowHeights() {
    var rows = document.querySelectorAll('.blog-row');
    rows.forEach(function(row) {
      var items = row.querySelectorAll('[data-masonry-item]');
      if (!items.length) return;

      // Group items by their top offset value
      var groups = {};
      items.forEach(function(item) {
        var top = parseInt(item.style.top) || 0;
        if (!groups[top]) groups[top] = [];
        groups[top].push(item);
      });

      Object.keys(groups).forEach(function(top) {
        var group = groups[top];

        // Reset so we measure natural heights
        group.forEach(function(item) {
          var summary = item.querySelector('.blog-summary');
          var title   = item.querySelector('.blog-title');
          if (summary) summary.style.height = '';
          if (title)   title.style.height   = '';
        });

        // Measure
        var maxSummary = 0;
        var maxTitle   = 0;
        group.forEach(function(item) {
          var summary = item.querySelector('.blog-summary');
          var title   = item.querySelector('.blog-title');
          if (summary) maxSummary = Math.max(maxSummary, summary.offsetHeight);
          if (title)   maxTitle   = Math.max(maxTitle,   title.offsetHeight);
        });

        // Apply
        group.forEach(function(item) {
          var summary = item.querySelector('.blog-summary');
          var title   = item.querySelector('.blog-title');
          if (summary && maxSummary) summary.style.height = maxSummary + 'px';
          if (title   && maxTitle)   title.style.height   = maxTitle   + 'px';
        });
      });
    });
  }

  function initBlogRowEqualizer() {
    if (!document.querySelector('.blog-row')) return;

    equalizeBlogRowHeights();

    // Re-run after all images have loaded (masonry recalculates after images)
    window.addEventListener('load', equalizeBlogRowHeights);

    // Re-run on resize (debounced)
    var resizeTimer;
    window.addEventListener('resize', function() {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(equalizeBlogRowHeights, 200);
    });

    // Watch for masonry repositioning items (style attribute changes on items)
    var blogRows = document.querySelectorAll('.blog-row');
    blogRows.forEach(function(row) {
      var masonryObserver = new MutationObserver(function() {
        clearTimeout(masonryObserver._timer);
        masonryObserver._timer = setTimeout(equalizeBlogRowHeights, 50);
      });
      masonryObserver.observe(row, { attributes: true, attributeFilter: ['style'], subtree: true });
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initBlogRowEqualizer);
  } else {
    initBlogRowEqualizer();
  }


/* ── Birth Date Picker ── */
function initBirthdatePicker() {
  if (!document.getElementById('bd-picker')) return;

  var today       = new Date();
  today.setHours(0, 0, 0, 0);
  var currentYear = today.getFullYear();
  var lang        = document.documentElement.lang || 'en';
  var isAr        = lang === 'ar';

  var picker    = document.getElementById('bd-picker');
  var displayEl = document.getElementById('bd-display');
  var dropdown  = document.getElementById('bd-dropdown');
  var titleBtn  = document.getElementById('bd-title');
  var prevBtn   = document.getElementById('bd-prev');
  var nextBtn   = document.getElementById('bd-next');
  var bodyEl    = document.getElementById('bd-body');
  var noteEl    = document.getElementById('RegisterForm-birthdate-note');
  var ageError  = document.getElementById('age-error-msg');
  var form      = document.querySelector('.create-customer-form');
  var submitBtn = form && form.querySelector('.button--primary, input[type="submit"]');

  var monthNames = Array.from({length: 12}, function(_, i) {
    return new Intl.DateTimeFormat(lang, {month: 'long'}).format(new Date(2000, i, 1));
  });
  var dayNames = Array.from({length: 7}, function(_, i) {
    return new Intl.DateTimeFormat(lang, {weekday: 'short'}).format(new Date(2000, 0, 2 + i));
  });

  var YEARS_PER_PAGE = 20;
  var mode      = 'days';
  var viewYear  = currentYear - 18;
  var viewMonth = 0;
  var yearPage  = 1;
  var selected  = null;

  displayEl.placeholder = isAr ? 'يوم/شهر/سنة' : 'dd/mm/yyyy';

  var inputWrap = picker.querySelector('.bd-input-wrap');
  inputWrap.addEventListener('click', function () {
    dropdown.classList.toggle('bd-open');
    if (dropdown.classList.contains('bd-open')) render();
  });

  document.addEventListener('click', function (e) {
    var path = e.composedPath ? e.composedPath() : [];
    var insidePicker = path.indexOf(picker) !== -1 || picker.contains(e.target);
    if (!insidePicker) dropdown.classList.remove('bd-open');
  });

  prevBtn.addEventListener('click', function () {
    if (mode === 'days') {
      viewMonth--;
      if (viewMonth < 0) { viewMonth = 11; viewYear--; }
    } else if (mode === 'months') {
      viewYear--;
    } else {
      yearPage++;
    }
    render();
  });

  nextBtn.addEventListener('click', function () {
    if (mode === 'days') {
      viewMonth++;
      if (viewMonth > 11) { viewMonth = 0; viewYear++; }
    } else if (mode === 'months') {
      viewYear++;
    } else {
      if (yearPage > 0) yearPage--;
    }
    render();
  });

  titleBtn.addEventListener('click', function () {
    if (mode === 'days') {
      mode = 'months';
    } else if (mode === 'months') {
      mode = 'years';
      yearPage = Math.floor((currentYear - viewYear) / YEARS_PER_PAGE);
    } else {
      mode = 'months';
    }
    render();
  });

  function render() {
    if (mode === 'days') renderDays();
    else if (mode === 'months') renderMonths();
    else renderYears();
  }

  function renderDays() {
    titleBtn.textContent = monthNames[viewMonth] + ' ' + viewYear;
    bodyEl.className = 'bd-body bd-days';
    bodyEl.innerHTML = '';

    dayNames.forEach(function (n) {
      var s = document.createElement('span');
      s.className = 'bd-wday';
      s.textContent = n;
      bodyEl.appendChild(s);
    });

    var firstDay = new Date(viewYear, viewMonth, 1).getDay();
    for (var i = 0; i < firstDay; i++) bodyEl.appendChild(document.createElement('span'));

    var daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();
    for (var d = 1; d <= daysInMonth; d++) {
      var btn = document.createElement('button');
      btn.type = 'button';
      btn.textContent = d;
      var isFuture = new Date(viewYear, viewMonth, d) > today;
      var isToday  = d === today.getDate() && viewMonth === today.getMonth() && viewYear === currentYear;
      var isSel    = selected && selected.year === viewYear && selected.month === viewMonth && selected.day === d;
      btn.className = 'bd-day' + (isToday ? ' bd-today' : '') + (isSel ? ' bd-sel' : '') + (isFuture ? ' bd-dim' : '');
      if (isFuture) btn.disabled = true;
      (function (day) {
        btn.addEventListener('click', function () { selectDate(viewYear, viewMonth, day); });
      })(d);
      bodyEl.appendChild(btn);
    }
  }

  function renderYears() {
    var endY   = currentYear - yearPage * YEARS_PER_PAGE;
    var startY = endY - YEARS_PER_PAGE + 1;
    titleBtn.textContent = startY + ' – ' + endY;
    bodyEl.className = 'bd-body bd-years';
    bodyEl.innerHTML = '';

    for (var y = endY; y >= startY; y--) {
      var btn = document.createElement('button');
      btn.type = 'button';
      btn.textContent = y;
      btn.className = 'bd-yr' + (y === viewYear ? ' bd-sel' : '');
      (function (year) {
        btn.addEventListener('click', function (e) { e.stopPropagation(); viewYear = year; mode = 'months'; render(); });
      })(y);
      bodyEl.appendChild(btn);
    }
  }

  function renderMonths() {
    titleBtn.textContent = viewYear;
    bodyEl.className = 'bd-body bd-months';
    bodyEl.innerHTML = '';

    for (var m = 0; m < 12; m++) {
      var btn = document.createElement('button');
      btn.type = 'button';
      btn.textContent = new Intl.DateTimeFormat(lang, {month: 'short'}).format(new Date(2000, m, 1));
      btn.className = 'bd-mon' + (m === viewMonth ? ' bd-sel' : '');
      (function (month) {
        btn.addEventListener('click', function (e) { e.stopPropagation(); viewMonth = month; mode = 'days'; render(); });
      })(m);
      bodyEl.appendChild(btn);
    }
  }

  function pad(n) { return String(n).padStart(2, '0'); }

  function selectDate(year, month, day) {
    selected = {year: year, month: month, day: day};
    displayEl.value = pad(day) + '/' + pad(month + 1) + '/' + year;
    noteEl.value    = 'Birth Date: ' + year + '-' + pad(month + 1) + '-' + pad(day);
    setBlocked(calcAge(year, month, day) < 18);
    dropdown.classList.remove('bd-open');
  }

  function calcAge(year, month, day) {
    var age = today.getFullYear() - year;
    var md  = today.getMonth() - month;
    if (md < 0 || (md === 0 && today.getDate() < day)) age--;
    return age;
  }

  function setBlocked(blocked) {
    ageError.style.display = blocked ? 'block' : 'none';
    if (blocked) ageError.textContent = ageError.dataset.message;
    if (submitBtn) {
      submitBtn.disabled      = blocked;
      submitBtn.style.opacity = blocked ? '0.5' : '';
      submitBtn.style.cursor  = blocked ? 'not-allowed' : '';
    }
  }

  form && form.addEventListener('submit', function (e) {
    if (!selected) {
      e.preventDefault();
      dropdown.classList.add('bd-open');
      render();
      displayEl.focus();
      return;
    }
    if (calcAge(selected.year, selected.month, selected.day) < 18) {
      e.preventDefault();
      setBlocked(true);
    }
  });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initBirthdatePicker);
} else {
  initBirthdatePicker();
}

/* ── Phone Number Picker ── */
function initPhonePicker() {
  var wrap = document.getElementById('phone-field-wrap');
  if (!wrap || wrap.dataset.phonePickerInit) return;
  wrap.dataset.phonePickerInit = '1';

  var form = document.querySelector('.create-customer-form');
  if (!form) return;

  var lang = document.documentElement.lang || 'en';
  var isAr = lang === 'ar';
  var FLAG_BASE = 'https://flagcdn.com/w20/';

  var COUNTRIES = [
    { code: 'BH', dial: '+973', nameEn: 'Bahrain',      nameAr: 'البحرين',  pattern: /^[36]\d{7}$/,   placeholder: '36XXXXXX'  },
    { code: 'KW', dial: '+965', nameEn: 'Kuwait',        nameAr: 'الكويت',   pattern: /^[569]\d{7}$/,  placeholder: '5XXXXXXX'  },
    { code: 'OM', dial: '+968', nameEn: 'Oman',          nameAr: 'عُمان',    pattern: /^[79]\d{7}$/,   placeholder: '9XXXXXXX'  },
    { code: 'QA', dial: '+974', nameEn: 'Qatar',         nameAr: 'قطر',      pattern: /^[3-7]\d{7}$/,  placeholder: '5XXXXXXX'  },
    { code: 'SA', dial: '+966', nameEn: 'Saudi Arabia',  nameAr: 'السعودية', pattern: /^5\d{8}$/,      placeholder: '5XXXXXXXX' },
    { code: 'AE', dial: '+971', nameEn: 'UAE',           nameAr: 'الإمارات', pattern: /^5\d{8}$/,      placeholder: '5XXXXXXXX' }
  ];

  var selected  = COUNTRIES.find(function(c) { return c.code === 'SA'; });
  var flagEl    = document.getElementById('phone-flag');
  var dialEl    = document.getElementById('phone-dialcode');
  var btn       = document.getElementById('phone-country-btn');
  var list      = document.getElementById('phone-country-list');
  var input     = document.getElementById('RegisterForm-phone-input');
  var hidden    = document.getElementById('RegisterForm-phone-hidden');
  var errorSpan = document.getElementById('phone-error-msg');

  function flagImg(code, alt) {
    return '<img src="' + FLAG_BASE + code.toLowerCase() + '.png" alt="' + alt + '" width="20" height="15">';
  }

  COUNTRIES.forEach(function(country) {
    var li = document.createElement('li');
    li.className = 'phone-country-item' + (country.code === selected.code ? ' selected' : '');
    li.setAttribute('role', 'option');
    li.setAttribute('data-code', country.code);
    li.innerHTML =
      '<span class="phone-item-flag">' + flagImg(country.code, country.nameEn) + '</span>' +
      '<span class="phone-item-name">' + (isAr ? country.nameAr : country.nameEn) + '</span>' +
      '<span class="phone-item-dial">' + country.dial + '</span>';
    li.addEventListener('click', function() { selectCountry(country); });
    list.appendChild(li);
  });

  function applyCountry(country) {
    flagEl.innerHTML     = flagImg(country.code, country.nameEn);
    dialEl.textContent   = country.dial;
    input.placeholder    = country.placeholder;
    Array.from(list.querySelectorAll('.phone-country-item')).forEach(function(el) {
      el.classList.toggle('selected', el.getAttribute('data-code') === country.code);
    });
  }

  function selectCountry(country) {
    selected = country;
    applyCountry(country);
    closeDropdown();
    input.focus();
  }

  function openDropdown()  { list.classList.add('is-open');    btn.setAttribute('aria-expanded', 'true'); }
  function closeDropdown() { list.classList.remove('is-open'); btn.setAttribute('aria-expanded', 'false'); }

  applyCountry(selected);

  btn.addEventListener('click', function(e) {
    e.stopPropagation();
    list.classList.contains('is-open') ? closeDropdown() : openDropdown();
  });

  document.addEventListener('click', function(e) {
    if (!wrap.contains(e.target)) closeDropdown();
  });

  function showError(show) {
    if (errorSpan) {
      if (show) { errorSpan.textContent = errorSpan.dataset.message; errorSpan.style.display = 'block'; }
      else { errorSpan.style.display = 'none'; }
    }
    input.classList.toggle('error', show);
    var fw = document.getElementById('RegisterForm-phone-wrapper');
    if (fw) fw.classList.toggle('form-field--error', show);
  }

  input.addEventListener('input', function() {
    if (errorSpan && errorSpan.style.display === 'block') {
      if (selected.pattern.test(input.value.trim())) showError(false);
    }
  });

  form.addEventListener('submit', function(e) {
    var raw = input.value.trim();
    if (!raw || !selected.pattern.test(raw)) {
      e.preventDefault();
      showError(true);
      input.focus();
      return;
    }
    showError(false);
    hidden.value = selected.dial + raw;
  }, true);
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initPhonePicker);
} else {
  initPhonePicker();
}
