// Menu mobile (ouverture / fermeture)
(function () {
  const toggle = document.querySelector('.nav-toggle');
  const menu = document.getElementById('menu');
  if (!toggle || !menu) return;
  toggle.addEventListener('click', function () {
    const open = menu.classList.toggle('open');
    toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
  });
  menu.querySelectorAll('a').forEach(function (a) {
    a.addEventListener('click', function () {
      menu.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
    });
  });
})();

// Carte Google Maps : chargement au clic uniquement (RGPD)
(function () {
  var btn = document.getElementById('map-load');
  if (!btn) return;
  btn.addEventListener('click', function () {
    var wrap = document.getElementById('map-embed');
    var src = wrap.getAttribute('data-src');
    var iframe = document.createElement('iframe');
    iframe.setAttribute('src', src);
    iframe.setAttribute('title', 'Localisation du cabinet — 5 place Denis Papin, 95470 Fosses');
    iframe.setAttribute('loading', 'lazy');
    iframe.setAttribute('referrerpolicy', 'no-referrer-when-downgrade');
    iframe.setAttribute('allowfullscreen', '');
    wrap.innerHTML = '';
    wrap.appendChild(iframe);
  });
})();
