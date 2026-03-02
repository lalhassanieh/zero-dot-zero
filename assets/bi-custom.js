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

  // Generic normalizer:
  // - countryCode: numeric string without plus (e.g., "966")
  // - visible contains whatever user typed
  // Returns normalized E.164 string like "+9665XXXXXXXX" or '' if invalid.
  function normalizePhoneForCountry(visibleRaw, countryCode) {
    if (!visibleRaw) return '';

    // strip spaces, parentheses, dashes, letters except leading +
    let s = String(visibleRaw).trim();
    // If user pasted a full international number like +9665..., accept and normalize
    s = s.replace(/[^\d\+]/g, '');

    // If starts with +, remove plus then treat rest as digits
    if (s.startsWith('+')) s = s.slice(1);

    // If user pasted the country code at start (e.g., 9665...), remove redundant countryCode
    if (s.startsWith(countryCode)) {
      s = s.slice(countryCode.length);
    }

    // Remove any leading 0 (local trunk) — common for many countries
    if (s.length > 0 && s.startsWith('0')) {
      // remove only one leading 0
      s = s.replace(/^0+/, '');
    }

    // Basic sanity checks:
    // For Saudi (966) prefer 9-digit mobile that starts with 5 (5xxxxxxxx)
    if (countryCode === '966') {
      if (/^5\d{8}$/.test(s)) return '+' + countryCode + s;
      // otherwise invalid
      return '';
    }

    // Generic fallback for other countries:
    // If resulting digits are between 6 and 12, accept (best-effort)
    if (/^\d{6,12}$/.test(s)) {
      return '+' + countryCode + s;
    }

    // Otherwise invalid
    return '';
  }

  // Validate and show visual feedback
  function validatePhoneInput() {
    const countryCode = countrySelect.value;
    const visibleVal = visible.value || '';
    
    if (!visibleVal) {
      visible.style.borderColor = '';
      return false;
    }
    
    const normalized = normalizePhoneForCountry(visibleVal, countryCode);
    
    if (!normalized) {
      // Show error state
      visible.style.borderColor = '#ff0000';
      visible.style.borderWidth = '2px';
      
      // Show specific error message for Saudi numbers
      if (countryCode === '966') {
        visible.title = 'Saudi mobile numbers must start with 5 and be 9 digits (e.g., 501234567 or 0501234567)';
      }
      return false;
    } else {
      // Valid - remove error state
      visible.style.borderColor = '#00b300';
      visible.style.borderWidth = '2px';
      visible.title = 'Valid phone number: ' + normalized;
      return true;
    }
  }

  // Keep visible input sanitized (digits only)
  visible.addEventListener('input', function () {
    // allow plus if user intentionally types it — but strip other non-digits
    const v = visible.value;
    // keep any leading + and digits only after
    const keep = v.replace(/[^\d\+]/g, '');
    visible.value = keep;
    
    // Validate on input for real-time feedback
    if (visible.value.length >= 9) {
      validatePhoneInput();
    } else {
      visible.style.borderColor = '';
      visible.style.borderWidth = '';
    }
  });

  // Validate on blur
  visible.addEventListener('blur', function() {
    if (visible.value) {
      validatePhoneInput();
    }
  });

  // Reset border color when country changes
  countrySelect.addEventListener('change', function() {
    visible.style.borderColor = '';
    visible.style.borderWidth = '';
    if (visible.value) {
      validatePhoneInput();
    }
  });

  form.addEventListener('submit', function (e) {
    const countryCode = countrySelect.value; // e.g., "966"
    const visibleVal = visible.value || '';

    const normalized = normalizePhoneForCountry(visibleVal, countryCode);

    if (!normalized) {
      // block submit and show message so user corrects number
      e.preventDefault();
      
      // Show specific error for Saudi numbers
      let errorMsg = 'Please enter a valid phone number.';
      if (countryCode === '966') {
        errorMsg = 'Saudi mobile numbers must start with 5 and be 9 digits long.\n\nExamples:\n• 501234567\n• 0501234567';
      }
      
      alert(errorMsg);
      visible.focus();
      visible.style.borderColor = '#ff0000';
      visible.style.borderWidth = '2px';
      return;
    }

    // set the hidden field to E.164 for Shopify to save
    hidden.value = normalized;
    // allow form to submit
  });
}


// Initialize all functions on DOMContentLoaded
document.addEventListener("DOMContentLoaded", function () {
  initZingRiyalFormatter();
  initPhoneNormalization();
});