/* First and South — small progressive-enhancement layer. No dependencies. */
(function () {
  'use strict';

  /* --- Trading hours, in minutes past midnight, America/New_York ---------
     Index matches Date.getDay(): 0 = Sunday. `null` means closed.
     Single source of truth — the status bar, the week grid and the hours
     table on /visit all read from here. */
  var HOURS = [
    { open: 10 * 60, close: 15 * 60, label: '10am – 3pm', note: 'Brunch only' }, // Sun
    { open: 12 * 60, close: 20 * 60, label: '12pm – 8pm' },                      // Mon
    { open: 12 * 60, close: 20 * 60, label: '12pm – 8pm' },                      // Tue
    null,                                                                        // Wed
    { open: 12 * 60, close: 20 * 60, label: '12pm – 8pm' },                      // Thu
    { open: 12 * 60, close: 21 * 60, label: '12pm – 9pm' },                      // Fri
    { open: 12 * 60, close: 21 * 60, label: '12pm – 9pm' }                       // Sat
  ];
  var DAY_NAMES = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  /* Current wall-clock time in Greenport, regardless of the visitor's zone. */
  function greenportNow() {
    var parts = new Intl.DateTimeFormat('en-US', {
      timeZone: 'America/New_York',
      weekday: 'short', hour: 'numeric', minute: 'numeric', hour12: false
    }).formatToParts(new Date());
    var get = function (type) {
      var p = parts.find(function (x) { return x.type === type; });
      return p ? p.value : '';
    };
    var day = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].indexOf(get('weekday'));
    var hour = parseInt(get('hour'), 10) % 24;
    return { day: day < 0 ? new Date().getDay() : day, minutes: hour * 60 + parseInt(get('minute'), 10) };
  }

  function nextOpenDay(from) {
    for (var i = 1; i <= 7; i++) {
      var d = (from + i) % 7;
      if (HOURS[d]) return { day: d, hours: HOURS[d] };
    }
    return null;
  }

  function renderStatus() {
    var el = document.querySelector('[data-status]');
    if (!el) return;

    var now = greenportNow();
    var today = HOURS[now.day];
    var isOpen = !!today && now.minutes >= today.open && now.minutes < today.close;
    var detail;

    if (isOpen) {
      var mins = today.close - now.minutes;
      detail = mins <= 60
        ? 'Last call in under an hour — kitchen closes at <strong>' + today.label.split('–')[1].trim() + '</strong>'
        : 'Today <strong>' + today.label + '</strong>' + (today.note ? ' · ' + today.note : '');
    } else if (today && now.minutes < today.open) {
      detail = 'Opening today at <strong>' + today.label.split('–')[0].trim() + '</strong>';
    } else {
      var next = nextOpenDay(now.day);
      detail = next
        ? 'Back <strong>' + DAY_NAMES[next.day] + ', ' + next.hours.label + '</strong>'
        : '';
    }

    el.querySelector('[data-status-now]').setAttribute('data-open', String(isOpen));
    el.querySelector('[data-status-label]').textContent = isOpen ? 'Open now' : 'Closed right now';
    el.querySelector('[data-status-detail]').innerHTML = detail;
  }

  /* Highlight today wherever the week is laid out. */
  function markToday() {
    var day = greenportNow().day;
    document.querySelectorAll('[data-weekday]').forEach(function (node) {
      if (parseInt(node.getAttribute('data-weekday'), 10) === day) {
        node.setAttribute('data-today', 'true');
      }
    });
  }

  /* Mobile navigation. */
  function initNav() {
    var toggle = document.querySelector('.nav__toggle');
    var links = document.getElementById('nav-links');
    if (!toggle || !links) return;

    toggle.addEventListener('click', function () {
      var open = toggle.getAttribute('aria-expanded') === 'true';
      toggle.setAttribute('aria-expanded', String(!open));
      links.classList.toggle('is-open', !open);
    });

    links.addEventListener('click', function (e) {
      if (e.target.closest('a')) {
        toggle.setAttribute('aria-expanded', 'false');
        links.classList.remove('is-open');
      }
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && links.classList.contains('is-open')) {
        toggle.setAttribute('aria-expanded', 'false');
        links.classList.remove('is-open');
        toggle.focus();
      }
    });
  }

  function initStickyHeader() {
    var header = document.querySelector('.site-header');
    if (!header) return;
    var onScroll = function () { header.classList.toggle('is-stuck', window.scrollY > 8); };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  /* A photo slot whose file is not (yet) in images/ falls back to a labelled
     chalk panel rather than a broken-image icon. */
  function initPhotoSlots() {
    var fail = function (img) {
      var slot = img.closest('.shot');
      if (slot) slot.classList.add('is-empty');
      img.remove();
    };
    document.querySelectorAll('.shot img').forEach(function (img) {
      if (img.complete) {
        if (!img.naturalWidth) fail(img);
      } else {
        img.addEventListener('error', function () { fail(img); }, { once: true });
      }
    });
  }

  function initReveal() {
    var items = document.querySelectorAll('.reveal');
    if (!items.length) return;
    if (!('IntersectionObserver' in window) ||
        window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      items.forEach(function (el) { el.classList.add('is-in'); });
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-in');
          io.unobserve(entry.target);
        }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.05 });
    items.forEach(function (el) { io.observe(el); });
  }

  function init() {
    initNav();
    initStickyHeader();
    initPhotoSlots();
    initReveal();
    renderStatus();
    markToday();
    // Keep the open/closed badge honest if a tab is left open across service.
    setInterval(renderStatus, 60 * 1000);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
