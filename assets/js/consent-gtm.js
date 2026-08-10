(function () {
  var GTM_ID = "GTM-TJD7RD42";
  var STORAGE_KEY = "azoulay-analytics-consent"; // "granted" | "declined"

  function loadGTM() {
    if (window.__gtmLoaded) return;
    window.__gtmLoaded = true;
    (function (w, d, s, l, i) {
      w[l] = w[l] || [];
      w[l].push({ "gtm.start": new Date().getTime(), event: "gtm.js" });
      var f = d.getElementsByTagName(s)[0], j = d.createElement(s), dl = l != "dataLayer" ? "&l=" + l : "";
      j.async = true;
      j.src = "https://www.googletagmanager.com/gtm.js?id=" + i + dl;
      f.parentNode.insertBefore(j, f);
    })(window, document, "script", "dataLayer", GTM_ID);
  }

  function getConsent() {
    try { return localStorage.getItem(STORAGE_KEY); } catch (e) { return null; }
  }
  function setConsent(v) {
    try { localStorage.setItem(STORAGE_KEY, v); } catch (e) {}
  }

  var css = ".consent-banner{position:fixed;left:0;right:0;bottom:0;z-index:99997;background:#FFFFFF;border-top:1px solid #D9DEE3;box-shadow:0 -8px 24px rgba(37,40,43,.12);padding:16px;direction:rtl;font-family:Heebo,Arial,sans-serif}.consent-banner-inner{max-width:920px;margin:0 auto;display:flex;align-items:center;gap:16px;flex-wrap:wrap}.consent-banner p{margin:0;font-size:.85rem;color:#25282B;line-height:1.6;flex:1 1 260px}.consent-banner-btns{display:flex;gap:10px;flex-wrap:wrap}.consent-banner-btns button{font-family:inherit;font-size:.85rem;font-weight:700;border-radius:10px;padding:10px 18px;cursor:pointer;border:1px solid #D9DEE3;background:#FFFFFF;color:#25282B}.consent-banner-btns button.primary{background:#25282B;color:#FFFFFF;border-color:#25282B}@media(max-width:560px){.consent-banner-inner{flex-direction:column;align-items:stretch}.consent-banner-btns{flex-direction:column;align-items:stretch;gap:12px}.consent-banner-btns button{width:100%;padding:14px 18px}}.privacy-settings-link{cursor:pointer;background:none;border:none;padding:0;font:inherit;text-decoration:underline;color:inherit}body.consent-banner-open #xai-launcher,body.consent-banner-open .float-wa,body.consent-banner-open .a11ywidget-a11y-trigger{display:none!important;pointer-events:none!important}";
  var styleTag = document.createElement("style");
  styleTag.textContent = css;
  document.head.appendChild(styleTag);

  var banner = null;
  var bannerTrigger = null;
  function bannerKeydown(e) {
    if (e.key === "Escape") {
      e.preventDefault();
      setConsent("declined");
      hideBanner();
      return;
    }
    if (e.key !== "Tab" || !banner) return;
    var focusable = banner.querySelectorAll('button, a[href], [tabindex]:not([tabindex="-1"])');
    if (focusable.length === 0) return;
    var first = focusable[0], last = focusable[focusable.length - 1];
    if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
    else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
  }
  function showBanner() {
    if (banner) return;
    bannerTrigger = document.activeElement;
    banner = document.createElement("div");
    banner.className = "consent-banner";
    banner.setAttribute("role", "dialog");
    banner.setAttribute("aria-modal", "true");
    banner.setAttribute("aria-label", "הודעת פרטיות ועוגיות");
    banner.setAttribute("tabindex", "-1");
    banner.innerHTML =
      '<div class="consent-banner-inner">' +
      '<p><strong>האתר משתמש בעוגיות ובכלי מדידה סטטיסטיים</strong><br>אנו משתמשים בעוגיות וב-Google Analytics לצורך מדידת השימוש באתר ושיפור השירות, רק לאחר קבלת הסכמתך. ניתן לשנות את הבחירה בכל עת דרך "הגדרות פרטיות" בתחתית האתר.</p>' +
      '<div class="consent-banner-btns">' +
      '<button type="button" class="primary" id="consent-accept">אישור עוגיות</button>' +
      '<button type="button" id="consent-decline">המשך ללא עוגיות לא חיוניות</button>' +
      "</div></div>";
    document.body.appendChild(banner);
    document.body.classList.add("consent-banner-open");
    document.addEventListener("keydown", bannerKeydown);

    document.getElementById("consent-accept").addEventListener("click", function () {
      setConsent("granted");
      loadGTM();
      hideBanner();
    });
    document.getElementById("consent-decline").addEventListener("click", function () {
      setConsent("declined");
      hideBanner();
    });
    banner.focus();
  }
  function hideBanner() {
    if (!banner) return;
    banner.remove();
    banner = null;
    document.body.classList.remove("consent-banner-open");
    document.removeEventListener("keydown", bannerKeydown);
    var settingsLink = document.querySelector(".privacy-settings-link");
    if (settingsLink) settingsLink.focus();
    else if (bannerTrigger) bannerTrigger.focus();
    bannerTrigger = null;
  }

  function injectFooterLink() {
    var footers = document.querySelectorAll("footer, .footer");
    footers.forEach(function (f) {
      if (f.querySelector(".privacy-settings-link")) return;
      var btn = document.createElement("button");
      btn.type = "button";
      btn.className = "privacy-settings-link";
      btn.textContent = "הגדרות פרטיות";
      btn.addEventListener("click", function (e) {
        e.preventDefault();
        showBanner();
      });
      var p = document.createElement("p");
      p.style.fontSize = "0.8rem";
      p.style.marginTop = "8px";
      p.appendChild(btn);
      f.appendChild(p);
    });
  }

  var consent = getConsent();
  if (consent === "granted") {
    loadGTM();
  } else if (consent !== "declined") {
    showBanner();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", injectFooterLink);
  } else {
    injectFooterLink();
  }
})();
