(function () {
  // Normalize path: strip leading slash, .html ext, then grab the last segment
  function slug(path) {
    return path.replace(/^\//, '').replace(/\.html$/, '').split('/').pop() || 'index';
  }
  var page = slug(window.location.pathname);

  function active(href) {
    return slug(href) === page ? ' class="active"' : '';
  }

  document.getElementById('site-nav').innerHTML =
    '<a href="/" class="nav-brand">From Presence to Power</a>' +
    '<ul class="nav-links">' +
      '<li><a href="/"' + active('/') + '>About the Book</a></li>' +
      '<li><a href="/events"' + active('/events') + '>Upcoming Events</a></li>' +
      '<li><a href="https://www.rashadrobinson.com/press" target="_blank" rel="noopener">Press</a></li>' +
      '<li class="nav-dropdown">' +
        '<a href="/#rashad">About Rashad</a>' +
        '<ul class="nav-dropdown-menu">' +
          '<li><a href="/#rashad">Bio</a></li>' +
          '<li><a href="https://www.rashadrobinson.com" target="_blank" rel="noopener">rashadrobinson.com</a></li>' +
        '</ul>' +
      '</li>' +
      '<li><a href="/fyp"' + active('/fyp') + '>Find Your Power</a></li>' +
      '<li><a href="/appendix"' + active('/appendix') + '>Appendix</a></li>' +
      '<li><a href="https://www.penguinrandomhouse.com/books/676299/from-presence-to-power-by-rashad-robinson/" target="_blank" rel="noopener" class="nav-cta">Order Book</a></li>' +
    '</ul>' +
    '<button class="nav-toggle" id="navToggle" aria-label="Open menu" aria-expanded="false">' +
      '<span></span><span></span><span></span>' +
    '</button>';

  document.getElementById('site-mobile-menu').innerHTML =
    '<a href="/">About the Book</a>' +
    '<a href="/events">Upcoming Events</a>' +
    '<a href="https://www.rashadrobinson.com/press" target="_blank" rel="noopener">Press</a>' +
    '<a href="/#rashad">About Rashad</a>' +
    '<a href="https://www.rashadrobinson.com" target="_blank" rel="noopener">rashadrobinson.com</a>' +
    '<a href="/fyp">Find Your Power</a>' +
    '<a href="/appendix">Appendix</a>' +
    '<a href="https://www.penguinrandomhouse.com/books/676299/from-presence-to-power-by-rashad-robinson/" target="_blank" rel="noopener" class="mobile-menu-cta">Order the Book</a>';

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
  menu.querySelectorAll('a').forEach(function (a) {
    a.addEventListener('click', function () { setOpen(false); });
  });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') setOpen(false); });
})();
