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
  })();
  

  function initZingRiyalFormatter() {
    function process(scope) {
        (scope || document)
            .querySelectorAll(".zing-loyalty-popup__box-description:not(.has-riyal)")
            .forEach(function (el) {
            var text = (el.textContent || "").replace(/\s+/g, " ").trim();

            if (!text.includes("ريال")) return;

            text = text.replace(/ريال/g, "").replace(/\s+/g, " ").trim();

            var m = text.match(/(\d{1,3}(?:,\d{3})*(?:\.\d+)?|\d+(?:\.\d+)?)/);
            if (!m) return;

            var amount = m[1];

            el.innerHTML = text.replace(
                amount,
                '<span class="zing-amount">' + amount + "</span>"
            );

            el.classList.add("has-riyal");
            });
    }


    process(document);

    var observer = new MutationObserver(function (mutations) {
        mutations.forEach(function (m) {
        if (!m.addedNodes) return;
        m.addedNodes.forEach(function (node) {
            if (node.nodeType === 1) process(node);
        });
        });
    });

    observer.observe(document.body, { childList: true, subtree: true });
    }

    
// Phone number normalization for customer registration
function initPhoneNormalization() {
  const form = document.querySelector('.create-customer-form') || document.querySelector('form[action*="/account"]') || document.querySelector('form');
  const visible = document.getElementById('RegisterForm-phone-visible');
  const countrySelect = document.getElementById('RegisterForm-countryCode');
  const hidden = document.getElementById('RegisterForm-phone-real');

  if (!form || !visible || !hidden || !countrySelect) return;

  function normalizePhoneForCountry(visibleRaw, countryCode) {
    if (!visibleRaw) return '';

    let s = String(visibleRaw).trim();
    s = s.replace(/[^\d\+]/g, '');

    if (s.startsWith('+')) s = s.slice(1);

    if (s.startsWith(countryCode)) {
      s = s.slice(countryCode.length);
    }

    if (s.length > 0 && s.startsWith('0')) {
      s = s.replace(/^0+/, '');
    }

    if (countryCode === '966') {
      if (/^5\d{8}$/.test(s)) return '+' + countryCode + s;
      return '';
    }

    if (/^\d{6,12}$/.test(s)) {
      return '+' + countryCode + s;
    }

    return '';
  }

  visible.addEventListener('input', function () {
    const v = visible.value;
    const keep = v.replace(/[^\d\+]/g, '');
    visible.value = keep;
  });

  form.addEventListener('submit', function (e) {
    const countryCode = countrySelect.value;
    const visibleVal = visible.value || '';

    const normalized = normalizePhoneForCountry(visibleVal, countryCode);

    if (!normalized) {
      e.preventDefault();
      alert('Please enter a valid phone number for selected country (e.g., for +966 enter 501234567 or 0501234567).');
      visible.focus();
      return;
    }

    hidden.value = normalized;
  });
}


document.addEventListener("DOMContentLoaded", function () {
  initZingRiyalFormatter();
  initPhoneNormalization();
});