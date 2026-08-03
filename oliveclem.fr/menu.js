// Ancres : décalage exact sous l'en-tête collant
// 1) mesure la hauteur réelle de l'en-tête -> variable CSS --header-h
// 2) recale la position après le chargement des polices (évite le décalage
//    quand on arrive sur une page avec une ancre, ex. index.html#apropos)
(function () {
  var header = document.querySelector('.site-header');
  if (!header) return;
  var GAP = 12; // respiration entre l'en-tête et le titre de section

  function mesurer() {
    var h = Math.round(header.getBoundingClientRect().height);
    if (h > 0) document.documentElement.style.setProperty('--header-h', h + 'px');
    return h;
  }
  mesurer();
  window.addEventListener('resize', mesurer);
  if (window.ResizeObserver) new ResizeObserver(mesurer).observe(header);

  // Le visiteur a repris la main : on ne le repositionne plus.
  var libre = false;
  ['wheel', 'touchstart', 'keydown'].forEach(function (evt) {
    window.addEventListener(evt, function () { libre = true; }, { passive: true, once: true });
  });

  function recaler() {
    if (libre || !location.hash) return;
    var cible;
    try { cible = document.getElementById(decodeURIComponent(location.hash.slice(1))); } catch (e) { return; }
    if (!cible) return;
    var y = cible.getBoundingClientRect().top + window.pageYOffset - (mesurer() + GAP);
    window.scrollTo({ top: Math.max(y, 0), behavior: 'auto' });
  }
  window.addEventListener('load', recaler);
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(recaler);
})();

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

// Sous-menus déroulants (ex. « Pédicurie & Podologie »)
(function () {
  var triggers = document.querySelectorAll('.nav-group-trigger');
  triggers.forEach(function (btn) {
    var group = btn.closest('.nav-group');
    btn.addEventListener('click', function (e) {
      e.preventDefault();
      var open = group.classList.toggle('open');
      btn.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
  });
  // Fermer les sous-menus ouverts au clic à l'extérieur
  document.addEventListener('click', function (e) {
    document.querySelectorAll('.nav-group.open').forEach(function (group) {
      if (!group.contains(e.target)) {
        group.classList.remove('open');
        var t = group.querySelector('.nav-group-trigger');
        if (t) t.setAttribute('aria-expanded', 'false');
      }
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
