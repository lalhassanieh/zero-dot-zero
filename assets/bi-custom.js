(function() {
  function initNewsletterBanner(root) {
    if (!root) return;

    root.addEventListener('click', function (e) {
      var btn = e.target.closest('[data-subscribe-logged-in]');
      if (btn) {
        var autoForm = root.querySelector('form[class*="ai-newsletter-auto-subscribe"]');
        if (autoForm) {
          var submitBtn = autoForm.querySelector('[data-auto-subscribe]');
          if (submitBtn) {
            submitBtn.click();
            btn.style.display = 'none';
            var item = btn.closest('[data-banner-item]');
            if (item) {
              var successMsg = item.querySelector('[data-newsletter-success]');
              if (successMsg) {
                successMsg.classList.add('show');
              }
            }
          }
        }
        return;
      }

      btn = e.target.closest('[data-toggle-newsletter]');
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

    var forms = root.querySelectorAll('form[class*="ai-newsletter-form"], form[class*="ai-newsletter-auto-subscribe"]');
    forms.forEach(function(form) {
      form.addEventListener('submit', function(e) {
        var wrap = form.closest('[data-newsletter-wrap]');
        var item = wrap ? wrap.closest('[data-banner-item]') : form.closest('[data-banner-item]');

        setTimeout(function() {
          var urlParams = new URLSearchParams(window.location.search);
          var customerPost = urlParams.get('customer_posted');
          var formSuccess = form.querySelector('.note--success') || 
                           form.closest('form').classList.contains('form-success') ||
                           customerPost === 'true';
          
          if (formSuccess || form.querySelector('input[type="email"]').value) {
            form.style.display = 'none';
            var successMsg = wrap ? wrap.querySelector('[data-newsletter-success]') : item.querySelector('[data-newsletter-success]');
            if (successMsg) {
              successMsg.classList.add('show');
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
          }
        }, 500);
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

