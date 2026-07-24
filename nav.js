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
      '<li><a href="fyp.html"' + active('fyp.html') + '>Find Your Power</a></li>' +
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
  menu.querySelectorAll('a').forEach(function (a) { a.addEventListener('click', function () { setOpen(false); }); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') setOpen(false); });
})();
