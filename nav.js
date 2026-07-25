(function () {
  var page = window.location.pathname.split('/').pop() || 'index.html';

  function active(href) {
    var target = href.split('/').pop().split('#')[0];
    return (page === target || (page === '' && target === 'index.html')) ? ' class="active"' : '';
  }

  document.getElementById('site-nav').innerHTML =
    '<a href="index.html" class="nav-brand">From Presence to Power</a>' +
    '<ul class="nav-links">' +
      '<li><a href="index.html#book"' + active('index.html') + '>About the Book</a></li>' +
      '<li><a href="events.html"' + active('events.html') + '>Upcoming Events</a></li>' +
      '<li><a href="https://www.rashadrobinson.com/press" target="_blank" rel="noopener">Press</a></li>' +
      '<li><a href="index.html#rashad">About Rashad</a></li>' +
      '<li class="nav-dropdown">' +
        '<a href="fyp.html"' + active('fyp.html') + '>Book Extras</a>' +
        '<ul class="nav-dropdown-menu">' +
          '<li><a href="fyp.html">Find Your Power</a></li>' +
          '<li><a href="#appendix" class="js-appendix-trigger">Appendix</a></li>' +
        '</ul>' +
      '</li>' +
      '<li><a href="https://www.penguinrandomhouse.com/books/676299/from-presence-to-power-by-rashad-robinson/" target="_blank" rel="noopener" class="nav-cta">Order Book</a></li>' +
    '</ul>' +
    '<button class="nav-toggle" id="navToggle" aria-label="Open menu" aria-expanded="false">' +
      '<span></span><span></span><span></span>' +
    '</button>';

  document.getElementById('site-mobile-menu').innerHTML =
    '<a href="index.html#book">About the Book</a>' +
    '<a href="events.html">Upcoming Events</a>' +
    '<a href="https://www.rashadrobinson.com/press" target="_blank" rel="noopener">Press</a>' +
    '<a href="index.html#rashad">About Rashad</a>' +
    '<a href="https://www.rashadrobinson.com" target="_blank" rel="noopener">rashadrobinson.com</a>' +
    '<a href="fyp.html">Find Your Power</a>' +
    '<a href="#appendix" class="js-appendix-trigger">Appendix <span style="font-size:10px;opacity:0.6;letter-spacing:0.04em;">— Coming Soon</span></a>' +
    '<a href="https://www.penguinrandomhouse.com/books/676299/from-presence-to-power-by-rashad-robinson/" target="_blank" rel="noopener" class="mobile-menu-cta">Order the Book</a>';

  // ── Appendix coming-soon modal ──────────────────────────────────────────────
  var modalHTML =
    '<div id="appendix-modal" role="dialog" aria-modal="true" aria-labelledby="appendix-modal-title" style="' +
      'display:none;position:fixed;inset:0;z-index:1000;' +
      'background:rgba(30,20,15,0.55);backdrop-filter:blur(4px);' +
      'align-items:center;justify-content:center;padding:24px;' +
    '">' +
      '<div style="' +
        'background:var(--cream,#F5F2EE);max-width:440px;width:100%;' +
        'padding:48px 40px 40px;position:relative;' +
      '">' +
        '<button id="appendix-modal-close" aria-label="Close" style="' +
          'position:absolute;top:16px;right:16px;background:none;border:none;' +
          'cursor:pointer;font-size:20px;opacity:0.4;line-height:1;padding:4px;' +
        '">✕</button>' +
        '<p style="font-family:var(--font-mono,monospace);font-size:10px;letter-spacing:0.12em;text-transform:uppercase;opacity:0.5;margin:0 0 12px;">Book Extras</p>' +
        '<h2 id="appendix-modal-title" style="font-family:var(--font-display,serif);font-size:28px;font-weight:800;margin:0 0 8px;letter-spacing:0.01em;">Appendix</h2>' +
        '<p style="font-family:var(--font-body,sans-serif);font-size:15px;opacity:0.6;margin:0 0 28px;font-style:italic;">Coming in mid August</p>' +
        '<p style="font-family:var(--font-body,sans-serif);font-size:14px;margin:0 0 14px;">Sign up to be notified when it\'s live:</p>' +
        '<div id="appendix-form-wrap">' +
          '<form id="appendix-form" style="display:flex;gap:8px;">' +
            '<input id="appendix-email" type="email" required placeholder="your@email.com" style="' +
              'flex:1;border:1px solid var(--border,#ccc);background:#fff;' +
              'padding:10px 14px;font-family:var(--font-body,sans-serif);font-size:14px;' +
              'outline:none;border-radius:0;' +
            '">' +
            '<button type="submit" style="' +
              'background:linear-gradient(135deg,#E55F1D 0%,#FF9A5C 100%);' +
              'color:#fff;border:none;padding:10px 20px;cursor:pointer;' +
              'font-family:var(--font-mono,monospace);font-size:11px;' +
              'letter-spacing:0.08em;text-transform:uppercase;white-space:nowrap;' +
            '">Notify Me</button>' +
          '</form>' +
        '</div>' +
      '</div>' +
    '</div>';

  document.body.insertAdjacentHTML('beforeend', modalHTML);

  var modal = document.getElementById('appendix-modal');

  function openModal() {
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
    setTimeout(function () {
      var input = document.getElementById('appendix-email');
      if (input) input.focus();
    }, 50);
  }

  function closeModal() {
    modal.style.display = 'none';
    document.body.style.overflow = '';
  }

  document.getElementById('appendix-modal-close').addEventListener('click', closeModal);
  modal.addEventListener('click', function (e) { if (e.target === modal) closeModal(); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') closeModal(); });

  document.getElementById('appendix-form').addEventListener('submit', function (e) {
    e.preventDefault();
    var email = document.getElementById('appendix-email').value;
    // TODO: wire to Kit/Tally/Mailchimp endpoint — e.g. fetch('/api/subscribe', { method:'POST', body: JSON.stringify({email}) })
    document.getElementById('appendix-form-wrap').innerHTML =
      '<p style="font-family:var(--font-body,sans-serif);font-size:14px;color:#3a7a3a;margin:0;">' +
        '✓ You\'re on the list. We\'ll notify you when the Appendix is live.' +
      '</p>';
  });

  // Wire all appendix trigger links (desktop dropdown + mobile menu)
  document.addEventListener('click', function (e) {
    var trigger = e.target.closest('.js-appendix-trigger');
    if (!trigger) return;
    e.preventDefault();
    // close mobile menu if open
    var toggle = document.getElementById('navToggle');
    if (toggle && toggle.getAttribute('aria-expanded') === 'true') {
      toggle.click();
    }
    openModal();
  });

  // Scroll: add .scrolled class
  var navEl = document.getElementById('site-nav');
  var THRESHOLD = 80, last = false;
  function checkScroll() {
    var y = window.scrollY || window.pageYOffset || 0;
    var s = y > THRESHOLD;
    if (s !== last) { navEl.classList.toggle('scrolled', s); last = s; }
  }
  window.addEventListener('scroll', checkScroll, { passive: true });
  checkScroll();

  // Mobile menu toggle
  var toggle = document.getElementById('navToggle');
  var menu = document.getElementById('site-mobile-menu');
  function setOpen(open) {
    toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    menu.setAttribute('aria-hidden', open ? 'false' : 'true');
    menu.classList.toggle('open', open);
    navEl.classList.toggle('menu-open', open);
    document.body.style.overflow = open ? 'hidden' : '';
  }
  toggle.addEventListener('click', function () { setOpen(toggle.getAttribute('aria-expanded') !== 'true'); });
  menu.querySelectorAll('a:not(.js-appendix-trigger)').forEach(function (a) {
    a.addEventListener('click', function () { setOpen(false); });
  });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') setOpen(false); });
})();
