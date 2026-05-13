(function () {

  function domReady(fn) {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', fn);
    } else {
      fn();
    }
  }

  /* ── Newsletter Banner ── */
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
      btn.style.display  = isHidden ? 'none' : 'inline-block';
      if (isHidden) {
        var email = wrap.querySelector('input[type="email"]');
        if (email) setTimeout(function () { email.focus(); }, 50);
      }
    });

    root.querySelectorAll('form[class*="ai-newsletter-form"]').forEach(function (form) {
      form.addEventListener('submit', function () {
        try {
          var wrap           = form.closest('[data-newsletter-wrap]');
          var item           = wrap ? wrap.closest('[data-banner-item]') : form.closest('[data-banner-item]');
          var errorContainer = root.querySelector('[data-newsletter-errors]');
          setTimeout(function () {
            try {
              var urlParams   = new URLSearchParams(window.location.search);
              var formErrors  = form.querySelector('.note--error, .errors, .form-error');
              var formSuccess = !!(
                form.querySelector('.note--success') ||
                form.classList.contains('form-success') ||
                urlParams.get('customer_posted') === 'true'
              );
              if (!formErrors && formSuccess) {
                form.style.display = 'none';
                var successMsg = wrap
                  ? wrap.querySelector('[data-newsletter-success]')
                  : (item ? item.querySelector('[data-newsletter-success]') : null);
                if (successMsg) {
                  successMsg.removeAttribute('style');
                  successMsg.style.cssText = 'display: block !important; margin-top: 16px;';
                  successMsg.textContent   = "Thank you! You've been subscribed successfully.";
                  successMsg.classList.add('show');
                }
                if (item) {
                  var toggleBtn = item.querySelector('[data-toggle-newsletter]');
                  if (toggleBtn) toggleBtn.style.display = 'none';
                }
              }
            } catch (err) {
              if (errorContainer) errorContainer.style.display = 'none';
            }
          }, 500);
        } catch (err) {
          var errorContainer = root.querySelector('[data-newsletter-errors]');
          if (errorContainer) errorContainer.style.display = 'none';
        }
      });
    });

    if (window.location.search.indexOf('customer_posted=true') > -1) {
      root.querySelectorAll('[data-newsletter-wrap]').forEach(function (wrap) {
        var form       = wrap.querySelector('form');
        var successMsg = wrap.querySelector('[data-newsletter-success]');
        if (form && successMsg) {
          form.style.display = 'none';
          successMsg.classList.add('show');
          wrap.style.display = 'block';
          var item = wrap.closest('[data-banner-item]');
          if (item) {
            var toggleBtn = item.querySelector('[data-toggle-newsletter]');
            if (toggleBtn) toggleBtn.style.display = 'none';
          }
        }
      });
    }
  }

  /* ── Globo Form Asterisks ── */
  function styleGloboFormAsterisks() {
    document.querySelectorAll('.globo-form.contact-form .globo-paragraph h4').forEach(function (heading) {
      heading.innerHTML = heading.innerHTML.replace(/\*/g, '<span class="required-asterisk">*</span>');
    });
  }

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
  //       if (!el.innerHTML.includes('ريال')) return;
  //       var newHtml = el.innerHTML.replace(
  //         /<span class="riyal-font"><\/span>(\d{1,3}(?:,\d{3})*(?:\.\d+)?|\d+(?:\.\d+)?)([^<ر]*)ريال/g,
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
  // domReady(initAppstleRiyalFormatter);

  /* ── Blog Row Equalizer ── */
  function equalizeBlogRowHeights() {
    document.querySelectorAll('.blog-row').forEach(function (row) {
      var items = row.querySelectorAll('[data-masonry-item]');
      if (!items.length) return;
      var groups = {};
      items.forEach(function (item) {
        var top = parseInt(item.style.top) || 0;
        if (!groups[top]) groups[top] = [];
        groups[top].push(item);
      });
      Object.keys(groups).forEach(function (top) {
        var group = groups[top];
        group.forEach(function (item) {
          var summary = item.querySelector('.blog-summary');
          var title   = item.querySelector('.blog-title');
          if (summary) summary.style.height = '';
          if (title)   title.style.height   = '';
        });
        var maxSummary = 0, maxTitle = 0;
        group.forEach(function (item) {
          var summary = item.querySelector('.blog-summary');
          var title   = item.querySelector('.blog-title');
          if (summary) maxSummary = Math.max(maxSummary, summary.offsetHeight);
          if (title)   maxTitle   = Math.max(maxTitle,   title.offsetHeight);
        });
        group.forEach(function (item) {
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
    window.addEventListener('load', equalizeBlogRowHeights);
    var resizeTimer;
    window.addEventListener('resize', function () {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(equalizeBlogRowHeights, 200);
    });
    document.querySelectorAll('.blog-row').forEach(function (row) {
      var obs = new MutationObserver(function () {
        clearTimeout(obs._timer);
        obs._timer = setTimeout(equalizeBlogRowHeights, 50);
      });
      obs.observe(row, { attributes: true, attributeFilter: ['style'], subtree: true });
    });
  }

  /* ── Shared register-form helpers ── */

  function setFieldError(inputEl, wrapEl, errEl, show) {
    if (errEl) { errEl.textContent = show ? (errEl.dataset.message || '') : ''; errEl.style.display = show ? 'block' : 'none'; }
    if (inputEl) inputEl.classList.toggle('error', !!show);
    if (wrapEl)  wrapEl.classList.toggle('form-field--error', !!show);
  }

  function checkPhoneValid() {
    var h = document.getElementById('RegisterForm-phone-hidden');
    return !!(h && h.value);
  }

  function checkBirthdateValid() {
    var noteEl = document.getElementById('RegisterForm-birthdate-note');
    if (!noteEl || !noteEl.value) return false;
    var m = noteEl.value.match(/Birth Date: (\d{4})-(\d{2})-(\d{2})/);
    if (!m) return false;
    var y = parseInt(m[1]), mo = parseInt(m[2]) - 1, d = parseInt(m[3]);
    var now = new Date(); now.setHours(0, 0, 0, 0);
    var age = now.getFullYear() - y;
    var diff = now.getMonth() - mo;
    if (diff < 0 || (diff === 0 && now.getDate() < d)) age--;
    return age >= 18;
  }

  function checkPasswordMatch() {
    var pw = document.getElementById('RegisterForm-password');
    var cf = document.getElementById('RegisterForm-confirm-password');
    return !!(pw && cf && pw.value === cf.value);
  }

  function refreshSubmitButton(form) {
    var btn = form && form.querySelector('input[type="submit"], button.button--primary, button[type="submit"]');
    if (!btn) return;
    var valid = checkPhoneValid() && checkBirthdateValid() && checkPasswordMatch();
    btn.disabled            = !valid;
    btn.style.opacity       = valid ? '' : '0.5';
    btn.style.cursor        = valid ? '' : 'not-allowed';
    btn.setAttribute('aria-disabled', valid ? 'false' : 'true');
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

    var monthNames = Array.from({ length: 12 }, function (_, i) {
      return new Intl.DateTimeFormat(lang, { month: 'long' }).format(new Date(2000, i, 1));
    });
    var dayNames = Array.from({ length: 7 }, function (_, i) {
      return new Intl.DateTimeFormat(lang, { weekday: 'short' }).format(new Date(2000, 0, 2 + i));
    });

    var YEARS_PER_PAGE = 20;
    var mode      = 'days';
    var viewYear  = currentYear - 18;
    var viewMonth = 0;
    var yearPage  = 1;
    var selected  = null;

    displayEl.placeholder = isAr ? 'يوم/شهر/ سنة' : 'dd/mm/yyyy';

    // Allow typing even when the picker is open and remove placeholder on focus
    displayEl.addEventListener('focus', function () {
      displayEl.placeholder = ''; // Remove placeholder on focus
    });

    displayEl.addEventListener('blur', function () {
      if (!displayEl.value) {
        displayEl.placeholder = isAr ? 'يوم/شهر/ سنة' : 'dd/mm/yyyy'; // Restore placeholder if empty
      }
    });

    picker.querySelector('.bd-input-wrap').addEventListener('click', function () {
      dropdown.classList.toggle('bd-open');
      if (dropdown.classList.contains('bd-open')) render();
      displayEl.focus(); // Ensure typing is possible even when picker is open
    });

    document.addEventListener('click', function (e) {
      var path = e.composedPath ? e.composedPath() : [];
      if (path.indexOf(picker) === -1 && !picker.contains(e.target)) {
        dropdown.classList.remove('bd-open');
      }
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
      bodyEl.className     = 'bd-body bd-days';
      bodyEl.innerHTML     = '';
      dayNames.forEach(function (n) {
        var s = document.createElement('span');
        s.className   = 'bd-wday';
        s.textContent = n;
        bodyEl.appendChild(s);
      });
      var firstDay    = new Date(viewYear, viewMonth, 1).getDay();
      for (var i = 0; i < firstDay; i++) bodyEl.appendChild(document.createElement('span'));
      var daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();
      for (var d = 1; d <= daysInMonth; d++) {
        var btn     = document.createElement('button');
        btn.type    = 'button';
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
      bodyEl.className     = 'bd-body bd-years';
      bodyEl.innerHTML     = '';
      for (var y = endY; y >= startY; y--) {
        var btn = document.createElement('button');
        btn.type        = 'button';
        btn.textContent = y;
        btn.className   = 'bd-yr' + (y === viewYear ? ' bd-sel' : '');
        (function (year) {
          btn.addEventListener('click', function (e) { e.stopPropagation(); viewYear = year; mode = 'months'; render(); });
        })(y);
        bodyEl.appendChild(btn);
      }
    }

    function renderMonths() {
      titleBtn.textContent = viewYear;
      bodyEl.className     = 'bd-body bd-months';
      bodyEl.innerHTML     = '';
      for (var m = 0; m < 12; m++) {
        var btn = document.createElement('button');
        btn.type        = 'button';
        btn.textContent = new Intl.DateTimeFormat(lang, { month: 'short' }).format(new Date(2000, m, 1));
        btn.className   = 'bd-mon' + (m === viewMonth ? ' bd-sel' : '');
        (function (month) {
          btn.addEventListener('click', function (e) { e.stopPropagation(); viewMonth = month; mode = 'days'; render(); });
        })(m);
        bodyEl.appendChild(btn);
      }
    }

    function pad(n) { return String(n).padStart(2, '0'); }

    function selectDate(year, month, day) {
      selected        = { year: year, month: month, day: day };
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
      setFieldError(null, null, ageError, blocked);
      refreshSubmitButton(form);
    }

    form && form.addEventListener('submit', function () {
      if (!displayEl.value || !selected) {
        ageError.style.display = 'block';
        ageError.textContent = ageError.dataset.message || 'This field is required.';
        dropdown.classList.add('bd-open');
        render();
        displayEl.focus();
      } else if (calcAge(selected.year, selected.month, selected.day) < 18) {
        setBlocked(true);
      }
    });
    // Defensive: block submit if user tries to type or clear the field manually
    displayEl.addEventListener('input', function () {
      if (!displayEl.value) {
        selected = null;
        noteEl.value = '';
        setBlocked(false);
        return;
      }
      // Parse dd/mm/yyyy
      var m = displayEl.value.match(/^(\d{2})\/(\d{2})\/(\d{4})$/);
      if (m) {
        var day = parseInt(m[1], 10);
        var month = parseInt(m[2], 10) - 1;
        var year = parseInt(m[3], 10);
        var isValid = !isNaN(day) && !isNaN(month) && !isNaN(year) && day >= 1 && day <= 31 && month >= 0 && month <= 11 && year > 1900 && year <= currentYear;
        var dateObj = new Date(year, month, day);
        // Check for valid date (e.g., not 31/02/2020)
        if (isValid && dateObj.getDate() === day && dateObj.getMonth() === month && dateObj.getFullYear() === year && dateObj <= today) {
          selected = { year: year, month: month, day: day };
          noteEl.value = 'Birth Date: ' + year + '-' + pad(month + 1) + '-' + pad(day);
          setBlocked(calcAge(year, month, day) < 18);
        } else {
          selected = null;
          noteEl.value = '';
          setBlocked(false);
        }
      } else {
        selected = null;
        noteEl.value = '';
        setBlocked(false);
      }
    });

    // Automatically format input as dd/mm/yyyy while typing and update picker on Enter
    displayEl.addEventListener('input', function () {
      var raw = displayEl.value.replace(/\D/g, ''); // Remove non-numeric characters
      if (raw.length > 8) raw = raw.slice(0, 8); // Limit to 8 digits

      var formatted = raw;
      if (raw.length > 4) {
        formatted = raw.slice(0, 2) + '/' + raw.slice(2, 4) + '/' + raw.slice(4);
      } else if (raw.length > 2) {
        formatted = raw.slice(0, 2) + '/' + raw.slice(2);
      }

      displayEl.value = formatted;

      if (raw.length === 8) {
        updatePickerFromInput(raw);
      } else {
        selected = null;
        noteEl.value = '';
        setBlocked(false);
      }
    });

    displayEl.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.keyCode === 13) {
        var raw = displayEl.value.replace(/\D/g, '');
        if (raw.length === 8) {
          updatePickerFromInput(raw);
        }
      }
    });

    function updatePickerFromInput(raw) {
      var day = parseInt(raw.slice(0, 2), 10);
      var month = parseInt(raw.slice(2, 4), 10) - 1;
      var year = parseInt(raw.slice(4), 10);
      var isValid = !isNaN(day) && !isNaN(month) && !isNaN(year) && day >= 1 && day <= 31 && month >= 0 && month <= 11 && year > 1900 && year <= currentYear;
      var dateObj = new Date(year, month, day);
      // Check for valid date (e.g., not 31/02/2020)
      if (isValid && dateObj.getDate() === day && dateObj.getMonth() === month && dateObj.getFullYear() === year && dateObj <= today) {
        selected = { year: year, month: month, day: day };
        noteEl.value = 'Birth Date: ' + year + '-' + pad(month + 1) + '-' + pad(day);
        setBlocked(calcAge(year, month, day) < 18);
        viewYear = year; // Update picker view year
        viewMonth = month; // Update picker view month
        render(); // Update picker UI

        // Highlight the selected day after rendering
        setTimeout(function () {
          var dayButtons = bodyEl.querySelectorAll('.bd-day');
          dayButtons.forEach(function (btn) {
            var btnDay = parseInt(btn.textContent, 10);
            if (btnDay === day && !btn.disabled) {
              btn.classList.add('bd-sel');
            } else {
              btn.classList.remove('bd-sel');
            }
          });
        }, 50); // Delay to ensure rendering is complete
      } else {
        selected = null;
        noteEl.value = '';
        setBlocked(false);
      }
    }
  }

  /* ── Phone picker shared data & helpers ── */
  var _ppLang  = document.documentElement.lang || 'en';
  var _ppIsAr  = _ppLang === 'ar';
  var _ppFlags = 'https://flagcdn.com/w20/';
  var _ppList  = [
    { code: 'BH', dial: '+973', nameEn: 'Bahrain',      nameAr: 'البحرين',  pattern: /^3\d{7}$/,             placeholder: '3X XXX XXX'  },
    { code: 'KW', dial: '+965', nameEn: 'Kuwait',        nameAr: 'الكويت',   pattern: /^[569]\d{7}$/,         placeholder: '5X XXX XXX'  },
    { code: 'OM', dial: '+968', nameEn: 'Oman',          nameAr: 'عُمان',    pattern: /^9\d{7}$/,             placeholder: '9X XXX XXX'  },
    { code: 'QA', dial: '+974', nameEn: 'Qatar',         nameAr: 'قطر',      pattern: /^[3-7]\d{7}$/,         placeholder: '5X XXX XXX'  },
    { code: 'SA', dial: '+966', nameEn: 'Saudi Arabia',  nameAr: 'السعودية', pattern: /^0?5[03456789]\d{7}$/, placeholder: '5X XXX XXXX' },
    { code: 'AE', dial: '+971', nameEn: 'UAE',           nameAr: 'الإمارات', pattern: /^5[02-8]\d{7}$/,       placeholder: '5X XXX XXXX' }
  ];

  function _ppFlag(code, alt) {
    return '<img src="' + _ppFlags + code.toLowerCase() + '.png" alt="' + alt + '" width="20" height="15">';
  }

  function _ppFmt(digits, placeholder) {
    var groups    = placeholder.split(' ').map(function(g) { return g.length; });
    var maxDigits = groups.reduce(function(a, b) { return a + b; }, 0);
    var capped    = digits.slice(0, maxDigits);
    var result = '', pos = 0;
    for (var i = 0; i < groups.length; i++) {
      if (pos >= capped.length) break;
      if (i > 0) result += ' ';
      result += capped.slice(pos, pos + groups[i]);
      pos += groups[i];
    }
    return result;
  }

  /* ── Generic phone picker factory ── */
  function _ppInit(wrap, opts) {
    if (!wrap || wrap.dataset.ppInit) return;
    wrap.dataset.ppInit = '1';

    var btn       = wrap.querySelector('.phone-country-btn');
    var flagEl    = wrap.querySelector('.phone-flag');
    var dialEl    = wrap.querySelector('.phone-dialcode');
    var list      = wrap.querySelector('.phone-country-list');
    var input     = wrap.querySelector('.phone-number-input');
    var fieldWrap = wrap.closest('.form-field');
    var hidden    = fieldWrap ? fieldWrap.querySelector('input[type="hidden"]') : null;
    var errorSpan = fieldWrap ? fieldWrap.querySelector('.field-error-msg') : null;
    var form      = opts.form || wrap.closest('form');
    var selected  = _ppList[4]; // SA default
    var isOpen    = false;

    function syncHidden() {
      if (!hidden) return;
      var raw = input.value.replace(/\D/g, '');
      hidden.value = selected.pattern.test(raw) ? selected.dial + raw : '';
    }

    function showError(show) {
      if (errorSpan) { errorSpan.textContent = show ? (errorSpan.dataset.message || '') : ''; errorSpan.hidden = !show; }
      input.classList.toggle('error', !!show);
      if (fieldWrap) fieldWrap.classList.toggle('form-field--error', !!show);
    }

    function applyCountry(country) {
      selected           = country;
      flagEl.innerHTML   = _ppFlag(country.code, country.nameEn);
      dialEl.textContent = country.dial;
      input.placeholder  = country.placeholder;
      list.querySelectorAll('.phone-country-item').forEach(function(li) {
        li.classList.toggle('is-active', li.dataset.code === country.code);
      });
      var raw = input.value.replace(/\D/g, '');
      input.value = raw ? _ppFmt(raw, country.placeholder) : '';
      syncHidden();
      if (opts.refreshFn) opts.refreshFn();
      if (raw) showError(!selected.pattern.test(raw));
      else showError(false);
    }

    function openDropdown()  { isOpen = true;  list.hidden = false; btn.setAttribute('aria-expanded', 'true');  }
    function closeDropdown() { isOpen = false; list.hidden = true;  btn.setAttribute('aria-expanded', 'false'); }

    _ppList.forEach(function(country) {
      var li = document.createElement('li');
      li.className    = 'phone-country-item';
      li.dataset.code = country.code;
      li.setAttribute('role', 'option');
      var name = _ppIsAr ? country.nameAr : country.nameEn;
      li.innerHTML = _ppFlag(country.code, country.nameEn)
        + '<span class="phone-item-name">' + name + '</span>'
        + '<span class="phone-item-dial">' + country.dial + '</span>';
      li.addEventListener('click', function() {
        var c = _ppList.find(function(x) { return x.code === li.dataset.code; });
        if (c) { applyCountry(c); input.focus(); }
        closeDropdown();
      });
      list.appendChild(li);
    });

    // Pre-populate from existing saved value (address edit forms)
    if (hidden && hidden.value) {
      var pre = _ppList.find(function(c) { return hidden.value.startsWith(c.dial); });
      if (pre) {
        selected    = pre;
        input.value = _ppFmt(hidden.value.slice(pre.dial.length).replace(/\D/g, ''), pre.placeholder);
      }
    }

    applyCountry(selected);

    btn.addEventListener('click', function(e) { e.stopPropagation(); isOpen ? closeDropdown() : openDropdown(); });
    list.addEventListener('click', function(e) { e.stopPropagation(); });
    document.addEventListener('click', function() { if (isOpen) closeDropdown(); });
    document.addEventListener('keydown', function(e) {
      if (isOpen && (e.key === 'Escape' || e.keyCode === 27)) closeDropdown();
    });

    input.addEventListener('input', function() {
      var cursorPos          = input.selectionStart;
      var oldVal             = input.value;
      var digitsBeforeCursor = oldVal.slice(0, cursorPos).replace(/\D/g, '').length;
      var raw                = oldVal.replace(/\D/g, '');
      var formatted          = _ppFmt(raw, selected.placeholder);
      input.value            = formatted;
      var newCursor = 0, digitCount = 0;
      for (var i = 0; i < formatted.length; i++) {
        if (digitCount === digitsBeforeCursor) break;
        if (/\d/.test(formatted[i])) digitCount++;
        newCursor = i + 1;
      }
      input.setSelectionRange(newCursor, newCursor);
      syncHidden();
      if (opts.refreshFn) opts.refreshFn();
      if (raw) showError(!selected.pattern.test(raw));
      else showError(false);
    });

    if (form) {
      form.addEventListener('submit', function(e) {
        var raw = input.value.replace(/\D/g, '');
        if (!raw || !selected.pattern.test(raw)) {
          if (opts.preventSubmit) e.preventDefault();
          showError(true);
          input.focus();
          return;
        }
        showError(false);
        syncHidden();
        if (opts.onSubmit) opts.onSubmit(selected.dial, raw);
      });
    }
  }

  /* ── Phone Number Picker (register form) ── */
  function initPhonePicker() {
    var wrap = document.getElementById('phone-field-wrap');
    if (!wrap) return;
    var form = document.querySelector('.create-customer-form');
    if (!form) return;
    _ppInit(wrap, {
      form: form,
      refreshFn: function() { refreshSubmitButton(form); },
      onSubmit: function(dial, raw) {
        var noteEl = document.getElementById('RegisterForm-birthdate-note');
        if (noteEl) {
          var base = noteEl.value.replace(/\nPhone:.*$/m, '').replace(/^Phone:.*$/m, '').trim();
          noteEl.value = (base ? base + '\n' : '') + 'Phone: ' + dial + raw;
        }
      }
    });
  }

  /* ── Phone Number Pickers (address forms) ── */
  function initAddressPhonePickers() {
    if (!document.querySelector('.addresses-page')) return;
    document.querySelectorAll('.addresses-page .phone-field-wrap').forEach(function(wrap) {
      _ppInit(wrap, { preventSubmit: true });
    });
  }

  /* ── Confirm password validation ── */
  function initConfirmPassword() {
    var form = document.querySelector('.create-customer-form');
    if (!form) return;
    var pwInput      = document.getElementById('RegisterForm-password');
    var confirmInput = document.getElementById('RegisterForm-confirm-password');
    var errorSpan    = document.getElementById('confirm-password-error');
    if (!pwInput || !confirmInput) return;

    function isMatch() { return confirmInput.value === pwInput.value; }

    function showMismatch(show) {
      setFieldError(
        confirmInput,
        document.getElementById('RegisterForm-confirm-password-wrapper'),
        errorSpan,
        show
      );
    }

    confirmInput.addEventListener('input', function () {
      showMismatch(confirmInput.value ? !isMatch() : false);
      refreshSubmitButton(form);
    });

    pwInput.addEventListener('input', function () {
      if (confirmInput.value) { showMismatch(!isMatch()); refreshSubmitButton(form); }
    });

    confirmInput.addEventListener('blur', function () {
      if (confirmInput.value) showMismatch(!isMatch());
    });

    // UX focus only — gatekeeper handles blocking
    form.addEventListener('submit', function () {
      if (!isMatch()) { showMismatch(true); confirmInput.focus(); }
    });
  }

  /* ── Form Submit Gatekeeper ── */
  /* Single authoritative capture-phase handler — fires before every other submit
     handler regardless of button state. If any validation fails the form never
     submits, even if someone enables the button via dev-tools. */
  function initFormGatekeeper() {
    var form = document.querySelector('.create-customer-form');
    if (!form) return;

    function allValid() {
      var ok = true;
      var phone = checkPhoneValid();
      var bd    = checkBirthdateValid();
      var pw    = checkPasswordMatch();
      if (!phone) {
        ok = false;
        setFieldError(
          document.getElementById('RegisterForm-phone-input'),
          document.getElementById('RegisterForm-phone-wrapper'),
          document.getElementById('phone-error-msg'),
          true
        );
      }
      if (!bd) {
        ok = false;
        setFieldError(null, null, document.getElementById('age-error-msg'), true);
      }
      if (!pw) {
        ok = false;
        setFieldError(
          document.getElementById('RegisterForm-confirm-password'),
          document.getElementById('RegisterForm-confirm-password-wrapper'),
          document.getElementById('confirm-password-error'),
          true
        );
      }
      return ok;
    }

    // Layer 1: intercept button click before Shopify reCAPTCHA gets it
    // Shopify reCAPTCHA bypasses the submit event by calling HTMLFormElement.prototype.submit.call()
    // directly after its own click handler — so we must block at the click level first.
    var submitBtn = form.querySelector('input[type="submit"], button.button--primary, button[type="submit"]');
    if (submitBtn) {
      submitBtn.addEventListener('click', function (e) {
        if (!allValid()) {
          e.preventDefault();
          e.stopImmediatePropagation();
        }
      }, true); // capture phase — fires before Shopify's reCAPTCHA click handler
    }

    // Layer 2: submit event (catches Enter-key submissions and non-reCAPTCHA paths)
    form.addEventListener('submit', function (e) {
      if (!allValid()) { e.preventDefault(); return false; }
    }, true);

    // Layer 3: block programmatic form.submit() calls from browser console
    var nativeSubmit = HTMLFormElement.prototype.submit.bind(form);
    form.submit = function () {
      if (allValid()) nativeSubmit();
    };
  }

  /* ── Initialization — each function is independent ── */
  domReady(function () {
    document.querySelectorAll('[data-newsletter-banner]').forEach(initNewsletterBanner);
    styleGloboFormAsterisks();
    if (document.body) {
      new MutationObserver(function (mutations) {
        mutations.forEach(function (mutation) {
          mutation.addedNodes.forEach(function (node) {
            if (node.nodeType === 1 && (node.classList.contains('globo-form') || node.querySelector('.globo-form'))) {
              styleGloboFormAsterisks();
            }
          });
        });
      }).observe(document.body, { childList: true, subtree: true });
    }
  });

  domReady(initBlogRowEqualizer);
  domReady(initBirthdatePicker);
  domReady(initFormGatekeeper);  // must run before initPhonePicker / initConfirmPassword so it's the first capture handler
  domReady(initPhonePicker);
  domReady(initConfirmPassword);
  domReady(initAddressPhonePickers);

})();
