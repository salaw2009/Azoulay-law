/*
 * share.js — social share bar for Azoulay-law blog articles.
 * Injects a WhatsApp / Facebook / X / LinkedIn / copy-link bar right after
 * the article meta line, using the page's own canonical URL and <h1> title.
 * Styling matches the site's dark/gold theme (rendered over the navy hero).
 */
(function () {
    'use strict';

    var meta = document.querySelector('.article-meta');
    if (!meta || document.querySelector('.share-bar')) return;

    var canonical = document.querySelector('link[rel="canonical"]');
    var url = (canonical && canonical.href) ? canonical.href : window.location.href;
    var h1 = document.querySelector('.article-hero h1') || document.querySelector('h1');
    var title = (h1 ? h1.textContent : document.title).trim();

    var eu = encodeURIComponent(url);
    var et = encodeURIComponent(title);

    var ICONS = {
        whatsapp: '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.71.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.885-9.885 9.885M20.52 3.449C18.24 1.245 15.24 0 12.045 0 5.463 0 .104 5.359.101 11.892c0 2.096.549 4.14 1.595 5.945L0 24l6.335-1.652a11.947 11.947 0 005.71 1.454h.005c6.582 0 11.946-5.359 11.949-11.893a11.821 11.821 0 00-3.479-8.46"/></svg>',
        facebook: '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>',
        x: '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>',
        linkedin: '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>',
        link: '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M3.9 12c0-1.71 1.39-3.1 3.1-3.1h4V7H7c-2.76 0-5 2.24-5 5s2.24 5 5 5h4v-1.9H7c-1.71 0-3.1-1.39-3.1-3.1zM8 13h8v-2H8v2zm9-6h-4v1.9h4c1.71 0 3.1 1.39 3.1 3.1s-1.39 3.1-3.1 3.1h-4V17h4c2.76 0 5-2.24 5-5s-2.24-5-5-5z"/></svg>',
        check: '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>'
    };

    var css = '' +
        '.share-bar{display:flex;align-items:center;flex-wrap:wrap;gap:10px;margin-top:26px}' +
        '.share-bar__label{font-size:.85rem;font-weight:600;color:rgba(255,255,255,.75);margin-inline-end:2px}' +
        '.share-btn{width:40px;height:40px;padding:0;border-radius:50%;display:inline-flex;align-items:center;justify-content:center;background:rgba(255,255,255,.08);border:1px solid rgba(201,168,76,.35);color:#fff;cursor:pointer;text-decoration:none;transition:.25s cubic-bezier(.4,0,.2,1);-webkit-tap-highlight-color:transparent}' +
        '.share-btn svg{width:18px;height:18px;fill:currentColor}' +
        '.share-btn:hover,.share-btn:focus-visible{background:var(--gold,#C9A84C);border-color:var(--gold,#C9A84C);color:#0A1628;transform:translateY(-2px);outline:none}' +
        '.share-btn--copied{background:var(--gold,#C9A84C);border-color:var(--gold,#C9A84C);color:#0A1628}' +
        '.share-copied-msg{font-size:.82rem;font-weight:600;color:var(--gold,#C9A84C);opacity:0;transform:translateY(2px);transition:.25s ease}' +
        '.share-copied-msg.is-visible{opacity:1;transform:none}' +
        '@media (max-width:900px){.share-btn{width:38px;height:38px}}';

    var style = document.createElement('style');
    style.textContent = css;
    document.head.appendChild(style);

    var bar = document.createElement('div');
    bar.className = 'share-bar';
    bar.setAttribute('aria-label', 'שיתוף המאמר');

    var label = document.createElement('span');
    label.className = 'share-bar__label';
    label.textContent = 'שיתוף:';
    bar.appendChild(label);

    function addLink(href, aria, iconKey) {
        var a = document.createElement('a');
        a.className = 'share-btn';
        a.href = href;
        a.target = '_blank';
        a.rel = 'noopener noreferrer';
        a.setAttribute('aria-label', aria);
        a.innerHTML = ICONS[iconKey];
        bar.appendChild(a);
    }

    addLink('https://wa.me/?text=' + et + '%20' + eu, 'שיתוף ב-WhatsApp', 'whatsapp');
    addLink('https://www.facebook.com/sharer/sharer.php?u=' + eu, 'שיתוף בפייסבוק', 'facebook');
    addLink('https://twitter.com/intent/tweet?text=' + et + '&url=' + eu, 'שיתוף ב-X (טוויטר)', 'x');
    addLink('https://www.linkedin.com/sharing/share-offsite/?url=' + eu, 'שיתוף בלינקדאין', 'linkedin');

    var copyBtn = document.createElement('button');
    copyBtn.type = 'button';
    copyBtn.className = 'share-btn';
    copyBtn.setAttribute('aria-label', 'העתקת קישור למאמר');
    copyBtn.innerHTML = ICONS.link;

    var msg = document.createElement('span');
    msg.className = 'share-copied-msg';
    msg.setAttribute('role', 'status');
    msg.setAttribute('aria-live', 'polite');

    var revertTimer;
    function markCopied(ok) {
        copyBtn.classList.add('share-btn--copied');
        copyBtn.innerHTML = ICONS.check;
        msg.textContent = ok ? '✓ הקישור הועתק' : 'לחצו והעתיקו ידנית';
        msg.classList.add('is-visible');
        clearTimeout(revertTimer);
        revertTimer = setTimeout(function () {
            copyBtn.classList.remove('share-btn--copied');
            copyBtn.innerHTML = ICONS.link;
            msg.classList.remove('is-visible');
        }, 2200);
    }

    copyBtn.addEventListener('click', function () {
        if (navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText(url).then(function () { markCopied(true); }, function () { fallbackCopy(); });
        } else {
            fallbackCopy();
        }
    });

    function fallbackCopy() {
        try {
            var ta = document.createElement('textarea');
            ta.value = url;
            ta.style.position = 'fixed';
            ta.style.opacity = '0';
            document.body.appendChild(ta);
            ta.select();
            var ok = document.execCommand('copy');
            document.body.removeChild(ta);
            markCopied(ok);
        } catch (e) {
            markCopied(false);
        }
    }

    bar.appendChild(copyBtn);
    bar.appendChild(msg);

    meta.parentNode.insertBefore(bar, meta.nextSibling);
})();
