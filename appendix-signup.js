(function () {
  var css = '<style>' +
    '.appendix-signup{padding:28px;margin-top:12px;}' +
    '.appendix-signup__text{font-family:var(--font-body,"Inter",sans-serif);font-size:12.5px;line-height:1.5;color:rgba(239,237,236,0.65);margin-bottom:12px;}' +
    '.appendix-signup__form{display:flex;flex-direction:column;gap:8px;}' +
    '.appendix-signup__email{background:transparent;border:1px solid rgba(239,237,236,0.25);border-radius:0;padding:10px 12px;font-family:var(--font-body,"Inter",sans-serif);font-size:13px;color:#EFEDEC;outline:none;width:100%;}' +
    '.appendix-signup__email::placeholder{color:rgba(239,237,236,0.4);}' +
    '.appendix-signup__email:focus{border-color:#E55F1D;}' +
    '.appendix-signup__btn{background:linear-gradient(135deg,#E55F1D 0%,#FF9A5C 100%);color:#fff;font-family:var(--font-mono,"IBM Plex Mono",monospace);font-size:11px;font-weight:600;letter-spacing:0.1em;text-transform:uppercase;padding:11px 16px;border:none;border-radius:0;cursor:pointer;}' +
    '.appendix-signup__btn:hover{opacity:0.88;}' +
    '.appendix-signup__success{font-family:var(--font-body,"Inter",sans-serif);font-size:12.5px;line-height:1.5;color:rgba(239,237,236,0.65);display:none;}' +
    '.appendix-signup--index{border-top:1px solid var(--border,#DAD6CB);margin-top:56px;padding:40px 0 0;max-width:520px;}' +
    '.appendix-signup--index .appendix-signup__text,.appendix-signup--index .appendix-signup__success{color:var(--fg-muted,#545452);font-size:15px;}' +
    '.appendix-signup--index .appendix-signup__form{flex-direction:row;}' +
    '.appendix-signup--index .appendix-signup__email{color:#281D1D;border-color:var(--border,#DAD6CB);}' +
    '.appendix-signup--index .appendix-signup__email::placeholder{color:#545452;}' +
    '@media(max-width:600px){.appendix-signup--index .appendix-signup__form{flex-direction:column;}}' +
    '@media(max-width:860px){.sidebar-col .appendix-signup{padding:24px 0 0;margin-top:24px;}' +
    '.sidebar-col .appendix-signup__text{font-size:13px;}' +
    '.sidebar-col .appendix-signup__email{padding:12px;font-size:13px;border-color:rgba(239,237,236,0.25);}' +
    '.sidebar-col .appendix-signup__btn{padding:12px 16px;}}' +
    '</style>';
  document.head.insertAdjacentHTML('beforeend', css);
  function block(extra) {
    return '<div class="appendix-signup ' + (extra || '') + '">' +
      '<p class="appendix-signup__text">Check back in September for the rest of the Appendix. Sign up to be notified.</p>' +
      '<form class="appendix-signup__form">' +
        '<input class="appendix-signup__email" type="email" placeholder="Your email address" aria-label="Email address" required>' +
        '<button class="appendix-signup__btn" type="submit">Notify Me</button>' +
      '</form>' +
      '<p class="appendix-signup__success">You\'re on the list.</p>' +
    '</div>';
  }
  var side = document.querySelector('.sidebar-col__inner');
  if (side) side.insertAdjacentHTML('beforeend', block());
  var list = document.querySelector('.appendix-list');
  if (list) list.insertAdjacentHTML('afterend', block('appendix-signup--index'));
  document.querySelectorAll('.appendix-signup__form').forEach(function (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var email = form.querySelector('.appendix-signup__email').value;
      var btn = form.querySelector('.appendix-signup__btn');
      btn.disabled = true; btn.textContent = '...';
      fetch('/api/appendix-signup', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email: email }) })
        .finally(function () { form.style.display = 'none'; form.nextElementSibling.style.display = 'block'; });
    });
  });
})();
