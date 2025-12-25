(function() {
  function initNewsletterBanner(root) {
    if (!root) return;

    root.addEventListener('click', function (e) {
      var btn = e.target.closest('[data-subscribe-logged-in]');
      if (btn) {
        console.log('Subscribe button clicked for logged-in customer');
        try {
          var item = btn.closest('[data-banner-item]');
          if (!item) {
            console.log('Banner item not found');
            return;
          }
          var autoForm = item.querySelector('form[class*="ai-newsletter-auto-subscribe"]');
          if (autoForm) {
            console.log('Auto-subscribe form found in correct item');
            btn.style.display = 'none';
            console.log('Button hidden, submitting form...');
            
            var submitBtn = autoForm.querySelector('[data-auto-subscribe]');
            if (submitBtn) {
              console.log('Submitting form using submit button click');
              submitBtn.click();
            } else {
              console.log('Submitting form directly');
              autoForm.submit();
            }
            
            setTimeout(function() {
              console.log('Checking subscription status after form submission');
              var urlParams = new URLSearchParams(window.location.search);
              var customerPost = urlParams.get('customer_posted');
              var formSuccess = customerPost === 'true' || autoForm.querySelector('.note--success');
              var formError = autoForm.querySelector('.note--error, .errors, .form-error');
              
              console.log('Form success after submission:', formSuccess, 'customer_posted:', customerPost);
              console.log('Form error found:', formError ? formError.textContent : 'none');
              
              if (formError) {
                console.log('Shopify returned an error:', formError.textContent);
                var successMsg = item ? item.querySelector('[data-newsletter-success]') : null;
                if (successMsg) {
                  successMsg.removeAttribute('style');
                  successMsg.style.cssText = 'display: block !important; margin-top: 16px;';
                  successMsg.textContent = 'Please check your email to confirm your subscription, or contact support if you continue to have issues.';
                  successMsg.classList.add('show');
                }
              } else if (formSuccess) {
                var successMsg = item ? item.querySelector('[data-newsletter-success]') : null;
                if (successMsg) {
                  console.log('Success message element found:', successMsg);
                  successMsg.removeAttribute('style');
                  successMsg.style.cssText = 'display: block !important; margin-top: 16px;';
                  successMsg.textContent = 'Thank you! You\'ve been subscribed successfully.';
                  successMsg.classList.add('show');
                  console.log('Success message displayed, computed style:', window.getComputedStyle(successMsg).display);
                } else {
                  console.log('Success message element NOT found in item');
                }
              } else {
                console.log('Subscription not confirmed by Shopify yet - may require email confirmation');
                var successMsg = item ? item.querySelector('[data-newsletter-success]') : null;
                if (successMsg) {
                  successMsg.removeAttribute('style');
                  successMsg.style.cssText = 'display: block !important; margin-top: 16px;';
                  successMsg.textContent = 'If your store uses double opt-in, please confirm the subscription from the email we sent you.';
                  successMsg.classList.add('show');
                }
              }
            }, 1500);
          } else {
            console.log('Auto-subscribe form not found');
          }
        } catch(err) {
          console.error('Auto-subscribe error:', err);
        }
        return;
      }

      btn = e.target.closest('[data-toggle-newsletter]');
      if (!btn) return;

      console.log('Toggle newsletter button clicked (guest user)');
      var item = btn.closest('[data-banner-item]');
      if (!item) return;

      var wrap = item.querySelector('[data-newsletter-wrap]');
      if (!wrap) return;

      var isHidden = (wrap.style.display === 'none' || wrap.style.display === '');
      console.log('Form is hidden:', isHidden);
      wrap.style.display = isHidden ? 'block' : 'none';
      btn.style.display = isHidden ? 'none' : 'inline-block';

      if (isHidden) {
        console.log('Showing email form for guest user');
        var email = wrap.querySelector('input[type="email"]');
        if (email) setTimeout(function(){ email.focus(); }, 50);
      } else {
        console.log('Hiding email form');
      }
    });

    var forms = root.querySelectorAll('form[class*="ai-newsletter-form"], form[class*="ai-newsletter-auto-subscribe"]');
    forms.forEach(function(form) {
      var isAutoSubscribe = form.className.indexOf('ai-newsletter-auto-subscribe') > -1;
      
      form.addEventListener('submit', function(e) {
        console.log('Form submitted, isAutoSubscribe:', isAutoSubscribe);
        try {
          var wrap = form.closest('[data-newsletter-wrap]');
          var item = wrap ? wrap.closest('[data-banner-item]') : form.closest('[data-banner-item]');
          var errorContainer = root.querySelector('[data-newsletter-errors]');

          if (isAutoSubscribe && item) {
            console.log('Logged-in customer subscribing...');
            var loggedInBtn = item.querySelector('[data-subscribe-logged-in]');
            if (loggedInBtn) {
              loggedInBtn.style.display = 'none';
              console.log('Logged-in button hidden');
            }
          } else {
            console.log('Guest user submitting email form');
          }

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
              
              console.log('Form success check:', formSuccess, 'isAutoSubscribe:', isAutoSubscribe);
              console.log('Form errors found:', formErrors ? formErrors.textContent : 'none');
              
              if (formErrors) {
                console.log('Shopify returned an error:', formErrors.textContent);
                var successMsg = wrap ? wrap.querySelector('[data-newsletter-success]') : (item ? item.querySelector('[data-newsletter-success]') : null);
                if (successMsg) {
                  successMsg.removeAttribute('style');
                  successMsg.style.cssText = 'display: block !important; margin-top: 16px;';
                  successMsg.textContent = 'Please check your email to confirm your subscription, or contact support if you continue to have issues.';
                  successMsg.classList.add('show');
                }
                if (errorContainer) {
                  errorContainer.style.display = 'none';
                }
              } else if (formSuccess) {
                console.log('Subscription successful (confirmed by Shopify), showing success message');
                form.style.display = 'none';
                var successMsg = wrap ? wrap.querySelector('[data-newsletter-success]') : (item ? item.querySelector('[data-newsletter-success]') : null);
                if (successMsg) {
                  successMsg.removeAttribute('style');
                  successMsg.style.cssText = 'display: block !important; margin-top: 16px;';
                  successMsg.textContent = 'Thank you! You\'ve been subscribed successfully.';
                  successMsg.classList.add('show');
                  console.log('Success message displayed, computed style:', window.getComputedStyle(successMsg).display);
                } else {
                  console.log('Success message element not found');
                }
                if (item) {
                  var toggleBtn = item.querySelector('[data-toggle-newsletter]');
                  var loggedInBtn = item.querySelector('[data-subscribe-logged-in]');
                  if (toggleBtn) {
                    toggleBtn.style.display = 'none';
                  }
                  if (loggedInBtn) {
                    loggedInBtn.style.display = 'none';
                  }
                }
              } else {
                console.log('Form submission may have failed');
              }
            } catch(err) {
              console.error('Newsletter form error:', err);
              if (errorContainer) {
                errorContainer.style.display = 'none';
              }
            }
          }, 500);
        } catch(err) {
          console.error('Newsletter form submission error:', err);
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

