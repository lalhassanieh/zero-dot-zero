(function () {
  /* ===============================
   * NEWSLETTER
   * =============================== */
  function initNewsletterBanner(root) {
    if (!root) return;

    root.addEventListener("click", function (e) {
      var btn = e.target.closest("[data-toggle-newsletter]");
      if (!btn) return;

      var item = btn.closest("[data-banner-item]");
      if (!item) return;

      var wrap = item.querySelector("[data-newsletter-wrap]");
      if (!wrap) return;

      var isHidden = wrap.style.display === "none" || wrap.style.display === "";
      wrap.style.display = isHidden ? "block" : "none";
      btn.style.display = isHidden ? "none" : "inline-block";

      if (isHidden) {
        var email = wrap.querySelector('input[type="email"]');
        if (email) setTimeout(function () { email.focus(); }, 50);
      }
    });

    var forms = root.querySelectorAll('form[class*="ai-newsletter-form"]');
    forms.forEach(function (form) {
      form.addEventListener("submit", function () {
        try {
          var wrap = form.closest("[data-newsletter-wrap]");
          var item = wrap ? wrap.closest("[data-banner-item]") : form.closest("[data-banner-item]");
          var errorContainer = root.querySelector("[data-newsletter-errors]");

          setTimeout(function () {
            try {
              var urlParams = new URLSearchParams(window.location.search);
              var customerPost = urlParams.get("customer_posted");
              var formErrors = form.querySelector(".note--error, .errors, .form-error");
              var formSuccess = !!(
                form.querySelector(".note--success") ||
                form.classList.contains("form-success") ||
                customerPost === "true"
              );

              if (formErrors) {
                // keep default behavior
              } else if (formSuccess) {
                form.style.display = "none";

                var successMsg = wrap
                  ? wrap.querySelector("[data-newsletter-success]")
                  : item
                  ? item.querySelector("[data-newsletter-success]")
                  : null;

                if (successMsg) {
                  successMsg.removeAttribute("style");
                  successMsg.style.cssText = "display: block !important; margin-top: 16px;";
                  successMsg.textContent = "Thank you! You've been subscribed successfully.";
                  successMsg.classList.add("show");
                }

                if (item) {
                  var toggleBtn = item.querySelector("[data-toggle-newsletter]");
                  if (toggleBtn) toggleBtn.style.display = "none";
                }
              }
            } catch (err) {
              if (errorContainer) errorContainer.style.display = "none";
            }
          }, 500);
        } catch (err) {
          var errorContainer = root.querySelector("[data-newsletter-errors]");
          if (errorContainer) errorContainer.style.display = "none";
        }
      });
    });

    if (window.location.search.indexOf("customer_posted=true") > -1) {
      var wraps = root.querySelectorAll("[data-newsletter-wrap]");
      wraps.forEach(function (wrap) {
        var form = wrap.querySelector("form");
        var successMsg = wrap.querySelector("[data-newsletter-success]");
        if (form && successMsg) {
          form.style.display = "none";
          successMsg.classList.add("show");
          wrap.style.display = "block";

          var item = wrap.closest("[data-banner-item]");
          if (item) {
            var toggleBtn = item.querySelector("[data-toggle-newsletter]");
            if (toggleBtn) toggleBtn.style.display = "none";
          }
        }
      });
    }
  }

  function initAllNewsletterBanners() {
    var banners = document.querySelectorAll("[data-newsletter-banner]");
    banners.forEach(function (banner) {
      initNewsletterBanner(banner);
    });
  }

  /* ===============================
   * ZING RIYAL (replace "ريال" + add class)
   * =============================== */
  function processZingRiyal(scope) {
    var root = scope || document;

    root
      .querySelectorAll(".zing-loyalty-popup__box-description:not(.has-riyal)")
      .forEach(function (el) {
        var txt = (el.textContent || "").replace(/\s+/g, " ").trim();
        if (txt.indexOf("ريال") === -1) return;

        // Remove the word "ريال" and normalize spaces
        var cleaned = txt.replace(/ريال/g, "").replace(/\s+/g, " ").trim();

        el.textContent = cleaned;
        el.classList.add("has-riyal");
      });
  }

  function observeZingPopup() {
    // run once
    processZingRiyal(document);

    // watch for dynamic injected nodes
    var observer = new MutationObserver(function (mutations) {
      mutations.forEach(function (m) {
        if (!m.addedNodes || !m.addedNodes.length) return;

        m.addedNodes.forEach(function (node) {
          if (node.nodeType !== 1) return;
          processZingRiyal(node);
        });
      });
    });

    observer.observe(document.body, { childList: true, subtree: true });
  }

  /* ===============================
   * LISTENERS / BOOTSTRAP
   * =============================== */
  initAllNewsletterBanners();
  observeZingPopup();

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", function () {
      initAllNewsletterBanners();
      processZingRiyal(document);
    });
  }
})();
