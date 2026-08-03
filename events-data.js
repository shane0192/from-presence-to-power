    // ─────────────────────────────────────────────────────────────────────────
    // EVENTS DATA
    //
    // To let the client manage events via Google Sheets:
    //   1. Create a Sheet with columns: date,city,title,meta,link
    //      (date = YYYY-MM-DD, link = full URL or leave blank)
    //   2. File → Share → Publish to web → Sheet1 → CSV → Publish
    //   3. Paste the published CSV URL into SHEET_CSV_URL below
    //
    // When SHEET_CSV_URL is set, the page fetches that CSV on load.
    // If the fetch fails, it falls back to the EVENTS array below.
    // When SHEET_CSV_URL is empty, only the EVENTS array is used.
    // ─────────────────────────────────────────────────────────────────────────

    var SHEET_CSV_URL = '';

    // Hardcoded fallback — also used when SHEET_CSV_URL is empty.
    // titleHtml: developer-authored HTML (allows orange <span class="name"> highlighting).
    // title:     plain-text fallback (used for sheet-loaded events).
    // meta:      plain text — time • venue • address (shown in mono under the title).
    // link:      RSVP/ticket URL. Empty = static card with no button.
    var EVENTS = [
      {
        id: 'global-black-economic-forum',
        date: '2026-07-03', month: 'Jul', day: '3', dow: 'Fri',
        city: 'New Orleans, LA',
        titleHtml: 'Panel with <span class="name">Senator Cory Booker</span>, <span class="name">Congresswoman Jasmine Crockett</span> &amp; <span class="name">Nicole Austin-Hillary</span>',
        meta: 'Fri 7/3 • Global Black Economic Forum @ Essence Fest • “Defining Power Against Ongoing Assaults”',
        link: 'https://gbef.com/events'
      },
      {
        id: 'jane-fonda',
        date: '2026-07-27', month: 'Jul', day: '27', dow: 'Mon',
        city: 'Manhattan, NY',
        titleHtml: 'Book Launch with <span class="name">Jane Fonda</span>',
        meta: 'MON 7/27 AT 7:00 PM • IFC CENTER • 323 6TH AVE, NEW YORK, NY 10014',
        link: 'https://www.ifccenter.com/films/from-presence-to-power-book-launch-rashad-robinson-in-conversation-with-jane-fonda/'
      },
      {
        id: 'joy-reid',
        date: '2026-07-28', month: 'Jul', day: '28', dow: 'Tue',
        city: 'Washington, DC',
        titleHtml: 'Book Launch with <span class="name">Joy Reid</span>',
        meta: 'Tues 7/28 at 7:00 PM • Politics & Prose • 5015 Connecticut Ave NW, Washington, DC 20008 • Live Stream Available',
        link: 'https://politics-prose.com/rashad-robinson-072826'
      },
      {
        id: 'commonwealth-club',
        date: '2026-07-29', month: 'Jul', day: '29', dow: 'Wed',
        city: 'San Francisco, CA',
        titleHtml: 'The Commonwealth Club',
        meta: 'Wed 7/29 at 5:30 PM • Commonwealth Club, Toni Rembe Auditorium • 110 The Embarcadero, San Francisco, CA • Live Stream Available',
        link: 'https://www.commonwealthclub.org/events/2026-07-29/rashad-robinson-presence-power'
      },
      {
        id: 'reparations-club',
        date: '2026-07-30', month: 'Jul', day: '30', dow: 'Thu',
        city: 'Los Angeles, CA',
        titleHtml: 'In conversation with <span class="name">Lena Waithe</span>',
        meta: 'THURS 7/30 AT 6:30 PM • BLACKBIRD HOUSE • 3520 SCHAEFER ST, CULVER CITY, CA 90232',
        link: 'https://docs.google.com/forms/d/e/1FAIpQLScS2VJb6Fb8PMDJinso6mjDTVerA0449rm65GoHciYTKxdqEQ/viewform'
      },
      {
        id: 'angela-rye',
        date: '2026-08-05', month: 'Aug', day: '5', dow: 'Wed',
        city: 'Seattle, WA',
        titleHtml: 'In conversation with <span class="name">Angela Rye</span>',
        meta: 'WED AUG 5 AT 7:30 PM • TOWN HALL • 1119 8TH AVE, SEATTLE, WA 98101',
        link: 'https://ticketing.townhallseattle.org/events/019f4d48-ccf3-3638-6b8d-0b95b3df28ea'
      },
      {
        id: 'marthas-vineyard',
        date: '2026-08-10', month: 'Aug', day: '10', dow: 'Mon',
        city: "Martha's Vineyard, MA",
        titleHtml: 'In conversation with <span class="name" style="text-transform:none">dream hampton</span>',
        meta: 'Mon 8/10 5-7PM  •  Reserve your spot: events@rashadrobinson.com',
        link: ''
      },
      {
        id: 'nadine-smith',
        date: '2026-08-14', month: 'Aug', day: '14', dow: 'Fri',
        city: "Martha's Vineyard, MA",
        titleHtml: 'In conversation with <span class="name">Nadine Smith</span>',
        meta: 'Fri 8/14 12-2PM • Hosted by ColorHaus during Color Of Change\'s 20th anniversary week • Request an invitation: kishshana.palmer@colorofchange.org',
        link: ''
      },
      {
        id: 'melissa-murray',
        date: '2026-08-18', month: 'Aug', day: '18', dow: 'Tue',
        city: "Martha's Vineyard, MA",
        titleHtml: 'In conversation with <span class="name">Melissa Murray</span>',
        meta: 'Tues 8/18 4-6PM • Rashad & Melissa talk about their new books • Reserve your spot: karenrsmith1@gmail.com',
        link: ''
      },
      {
        id: 'atlanta',
        date: '2026-09-24', month: 'Sep', day: '24', dow: 'Thu',
        city: 'Atlanta, GA',
        titleHtml: 'Atlanta',
        meta: 'MON 8/24 AT 7PM • AUBURN AVENUE RESEARCH LIBRARY • 101 AUBURN AVE NE, ATLANTA, GA 30303',
        link: ''
      },
      {
        id: 'austin',
        date: '2026-09-10', month: 'Sep', day: '10', dow: 'Thu',
        city: 'Austin, TX',
        titleHtml: 'In conversation with <span class="name">Cristina Tzintzún Ramirez</span>',
        meta: 'THURSDAY 9/10 AT 5PM • LBJ SCHOOL OF PUBLIC AFFAIRS • 2315 RED RIVER ST, AUSTIN, TX 78712 • Reserve your spot: events@rashadrobinson.com',
        link: ''
      },
      {
        id: 'houston',
        date: '2026-09-11', month: 'Sep', day: '11', dow: 'Fri',
        city: 'Houston, TX',
        titleHtml: 'In conversation with <span class="name">Kendrick Sampson</span>',
        meta: 'FRI 9/11 AT 7:00PM • KINDRED STORIES • 2310 ELGIN ST #2, HOUSTON, TX 77004',
        link: 'https://kindredstorieshtx.com/products/author-talk-from-presence-to-power-with-rashad-robinson-september-11-7-pm?_pos=1&_sid=a42c163c4&_ss=r&variant=48903565934847'
      },
      {
        id: 'dc-april-verrett',
        date: '2026-09-18', month: 'Sep', day: '18', dow: 'Fri',
        city: 'Washington, DC',
        titleHtml: 'In conversation with <span class="name">April Verrett</span>',
        meta: 'FRI 9/18 AT 5PM • MLK LIBRARY • SEIU EVENT • Reserve your spot: events@rashadrobinson.com',
        link: ''
      },
      {
        id: 'baltimore',
        date: '2026-09-20', month: 'Sep', day: '20', dow: 'Sun',
        city: 'Baltimore, MD',
        titleHtml: 'Baltimore',
        meta: 'SUN 9/20 AT 12PM • REGINALD F. LEWIS MUSEUM',
        link: ''
      },
      {
        id: 'charles-blow',
        date: '2026-09-22', month: 'Sep', day: '22', dow: 'Tue',
        city: 'New Orleans, LA',
        titleHtml: 'In conversation with <span class="name">Charles Blow</span>',
        meta: 'Tues 9/22 at 6:00 PM • Baldwin & Co • 1030 Elysian Fields Ave, New Orleans, LA 70117',
        link: 'https://www.eventbrite.com/e/social-justice-leader-rashad-robinson-author-talk-and-book-signing-tickets-1993710177811'
      },
      {
        id: 'brooklyn',
        date: '2026-09-28', month: 'Sep', day: '28', dow: 'Mon',
        city: 'Brooklyn, NY',
        titleHtml: 'In conversation with <span class="name">Heather McGhee</span>',
        meta: 'MON 9/28 AT 6:30PM • 128 PIERREPONT ST, BROOKLYN, NY 11201',
        link: ''
      },
      {
        id: 'banned-book-week',
        date: '2026-10-07', month: 'Oct', day: '7–8', dow: 'Wed–Thu',
        city: 'Buffalo, NY',
        titleHtml: 'Banned Book Week',
        meta: '',
        link: ''
      }
    ];

