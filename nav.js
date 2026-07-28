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
      '<li class="nav-dropdown">' +
        '<a href="index.html#rashad">About Rashad</a>' +
        '<ul class="nav-dropdown-menu">' +
          '<li><a href="index.html#rashad">Bio</a></li>' +
          '<li><a href="https://www.rashadrobinson.com" target="_blank" rel="noopener">rashadrobinson.com</a></li>' +
        '</ul>' +
      '</li>' +
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
  var modalStyles =
    '<style>' +
    '#appendix-overlay{position:fixed;inset:0;background:rgba(20,14,14,0.72);backdrop-filter:blur(6px);-webkit-backdrop-filter:blur(6px);z-index:9999;display:flex;align-items:center;justify-content:center;padding:24px;opacity:0;pointer-events:none;transition:opacity 0.4s ease;}' +
    '#appendix-overlay.active{opacity:1;pointer-events:all;}' +
    '#appendix-card{background:var(--cream,#EFEDEC);width:100%;max-width:520px;position:relative;overflow:hidden;transform:translateY(24px);transition:transform 0.4s cubic-bezier(0.16,1,0.3,1);}' +
    '#appendix-overlay.active #appendix-card{transform:translateY(0);}' +
    '#appendix-accent{height:6px;background:linear-gradient(135deg,#E55F1D 0%,#FF9A5C 100%);}' +
    '#appendix-close{position:absolute;top:16px;right:20px;background:none;border:none;font-size:24px;color:#545452;cursor:pointer;line-height:1;padding:4px;transition:color 0.2s;}' +
    '#appendix-close:hover{color:#281D1D;}' +
    '#appendix-body{padding:48px 48px 44px;}' +
    '#appendix-eyebrow{display:block;font-family:var(--font-mono,"IBM Plex Mono",monospace);font-size:11px;letter-spacing:0.32em;text-transform:uppercase;color:#E55F1D;margin-bottom:16px;}' +
    '#appendix-headline{font-family:var(--font-display,"Big Shoulders Display",sans-serif);font-size:clamp(40px,6vw,64px);line-height:0.95;letter-spacing:-0.02em;text-transform:uppercase;color:#281D1D;margin-bottom:20px;}' +
    '#appendix-desc{font-family:var(--font-body,"Inter",sans-serif);font-size:15px;line-height:1.6;color:#545452;margin-bottom:32px;}' +
    '#appendix-form{display:flex;gap:8px;margin-bottom:16px;}' +
    '#appendix-email{flex:1;background:transparent;border:1px solid var(--border,#DAD6CB);border-radius:0;padding:13px 16px;font-family:var(--font-body,"Inter",sans-serif);font-size:14px;color:#281D1D;outline:none;transition:border-color 0.2s;}' +
    '#appendix-email::placeholder{color:#545452;}' +
    '#appendix-email:focus{border-color:#E55F1D;}' +
    '#appendix-btn{background:linear-gradient(135deg,#E55F1D 0%,#FF9A5C 100%);color:#fff;font-family:var(--font-mono,"IBM Plex Mono",monospace);font-size:11px;font-weight:600;letter-spacing:0.1em;text-transform:uppercase;padding:13px 24px;border:none;border-radius:0;cursor:pointer;white-space:nowrap;transition:opacity 0.2s;}' +
    '#appendix-btn:hover{opacity:0.88;}' +
    '#appendix-dismiss{display:block;background:none;border:none;font-family:var(--font-mono,"IBM Plex Mono",monospace);font-size:11px;letter-spacing:0.08em;text-transform:uppercase;color:#545452;cursor:pointer;padding:0;transition:color 0.2s;}' +
    '#appendix-dismiss:hover{color:#281D1D;}' +
    '#appendix-success{font-family:var(--font-body,"Inter",sans-serif);font-size:15px;line-height:1.6;color:#545452;display:none;}' +
    '@media(max-width:600px){#appendix-body{padding:36px 28px 32px;}#appendix-form{flex-direction:column;}#appendix-btn{justify-content:center;}}' +
    '</style>';

  document.head.insertAdjacentHTML('beforeend', modalStyles);

  var modalHTML =
    '<div id="appendix-overlay" role="dialog" aria-modal="true" aria-labelledby="appendix-headline" aria-hidden="true">' +
      '<div id="appendix-card">' +
        '<div id="appendix-accent"></div>' +
        '<button id="appendix-close" aria-label="Close">&times;</button>' +
        '<div id="appendix-body">' +
          '<span id="appendix-eyebrow">Book Extras</span>' +
          '<h2 id="appendix-headline">Appendix</h2>' +
          '<p id="appendix-desc">The Appendix is coming in mid August. Enter your email and we\'ll let you know the moment it\'s live.</p>' +
          '<form id="appendix-form">' +
            '<input id="appendix-email" type="email" placeholder="Your email address" aria-label="Email address" required>' +
            '<button id="appendix-btn" type="submit">Notify Me</button>' +
          '</form>' +
          '<p id="appendix-success">You\'re on the list. We\'ll reach out when the Appendix drops.</p>' +
          '<button id="appendix-dismiss">No thanks</button>' +
        '</div>' +
      '</div>' +
    '</div>';

  document.body.insertAdjacentHTML('beforeend', modalHTML);

  var modal = document.getElementById('appendix-overlay');

  function openModal() {
    modal.classList.add('active');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    setTimeout(function () {
      var input = document.getElementById('appendix-email');
      if (input && input.style.display !== 'none') input.focus();
    }, 50);
  }

  function closeModal() {
    modal.classList.remove('active');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  document.getElementById('appendix-close').addEventListener('click', closeModal);
  document.getElementById('appendix-dismiss').addEventListener('click', closeModal);
  modal.addEventListener('click', function (e) { if (e.target === modal) closeModal(); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') closeModal(); });

  document.getElementById('appendix-form').addEventListener('submit', function (e) {
    e.preventDefault();
    var email = document.getElementById('appendix-email').value;
    var btn = document.getElementById('appendix-btn');
    btn.disabled = true;
    btn.textContent = '...';
    fetch('/api/appendix-signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: email })
    }).finally(function () {
      document.getElementById('appendix-form').style.display = 'none';
      document.getElementById('appendix-dismiss').style.display = 'none';
      document.getElementById('appendix-success').style.display = 'block';
    });
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
