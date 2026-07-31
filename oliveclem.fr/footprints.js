/* Traces de pas animées le long d'une courbe de Bézier.
   Ne fait rien si l'élément .foots (hero d'accueil) est absent.
   Empreintes réparties par longueur d'arc -> foulée régulière. */
(function () {
  var host = document.querySelector('.foots');
  if (!host) return;

  var paths = {
    courbe:        [[6, 90], [34, 52], [58, 82], [94, 22]],
    diagonale:     [[8, 88], [34, 66], [62, 42], [92, 16]],
    vague:         [[4, 74], [30, 18], [68, 96], [97, 42]],
    vagueBasse:    [[5, 80], [33, 93], [65, 70], [95, 86]],
    montante:      [[10, 90], [34, 55], [60, 72], [90, 12]],
    basseMontante: [[7, 86], [42, 92], [70, 82], [93, 15]]
  };
  var cfg = { pathStyle: 'basseMontante', count: 12, speed: 0.9, stride: 13, ink: '#2E6E60', inkOpacity: 0.5 };

  function point(cp, t) {
    var u = 1 - t, b = [u * u * u, 3 * u * u * t, 3 * u * t * t, t * t * t],
        d = [-3 * u * u, 3 * u * u - 6 * u * t, 6 * u * t - 3 * t * t, 3 * t * t];
    var x = 0, y = 0, dx = 0, dy = 0;
    for (var i = 0; i < 4; i++) { x += b[i] * cp[i][0]; y += b[i] * cp[i][1]; dx += d[i] * cp[i][0]; dy += d[i] * cp[i][1]; }
    return { x: x, y: y, dx: dx, dy: dy };
  }

  var svg = '<svg viewBox="0 0 46 100" style="display:block;width:100%;TRANSFORM">'
    + '<g fill="' + cfg.ink + '" fill-opacity="' + cfg.inkOpacity + '">'
    + '<path d="M9.6 33.5C6.6 40.5 7.2 47.2 11.8 51.4C16.2 55.4 17.6 59.6 16.9 66C16.2 72 16.7 79 19.5 84.8C22.4 90.8 30.2 91.6 33.2 85.8C36 80.2 35.7 72.6 34.2 66.6C32.8 60.8 32.5 56.6 34 51.8C36.4 44 38 38.4 36.4 31.6C34.7 24.4 28.2 21.4 20.6 22.1C14.2 22.7 11.3 27.5 9.6 33.5Z"></path>'
    + '<ellipse cx="11.5" cy="13" rx="7" ry="8.4" transform="rotate(-14 11.5 13)"></ellipse>'
    + '<ellipse cx="23" cy="8.2" rx="4.6" ry="5.9" transform="rotate(-5 23 8.2)"></ellipse>'
    + '<ellipse cx="31" cy="10.2" rx="4.1" ry="5.2" transform="rotate(5 31 10.2)"></ellipse>'
    + '<ellipse cx="37.6" cy="14" rx="3.4" ry="4.4" transform="rotate(12 37.6 14)"></ellipse>'
    + '<ellipse cx="42.4" cy="19.4" rx="2.7" ry="3.4" transform="rotate(20 42.4 19.4)"></ellipse>'
    + '<g fill-opacity="0.3"><ellipse cx="22.5" cy="35" rx="12.5" ry="9" transform="rotate(-6 22.5 35)"></ellipse>'
    + '<ellipse cx="26" cy="80" rx="8.4" ry="9.6"></ellipse></g></g></svg>';

  var n = cfg.count, step = 0.62 / cfg.speed, cycle = (n * step + 2.6).toFixed(2) + 's',
      cp = paths[cfg.pathStyle] || paths.vagueBasse;

  // Échantillonnage par longueur d'arc -> foulée régulière (marche naturelle)
  var SAMP = 240, seg = [{ t: 0, len: 0 }], total = 0, prevP = point(cp, 0);
  for (var s = 1; s <= SAMP; s++) {
    var tt = s / SAMP, pp = point(cp, tt);
    total += Math.hypot(pp.x - prevP.x, pp.y - prevP.y);
    seg.push({ t: tt, len: total }); prevP = pp;
  }
  function tAtLen(target) {
    for (var k = 1; k < seg.length; k++) {
      if (seg[k].len >= target) {
        var a = seg[k - 1], bb = seg[k], r = (target - a.len) / ((bb.len - a.len) || 1);
        return a.t + (bb.t - a.t) * r;
      }
    }
    return 1;
  }

  var out = '';
  for (var i = 0; i < n; i++) {
    var t = n === 1 ? 0.5 : tAtLen((i / (n - 1)) * total), p = point(cp, t);
    var angle = Math.atan2(p.dy * 0.56, p.dx) * 180 / Math.PI + 90;
    var side = i % 2 === 0 ? -1 : 1;
    var tr = 'translate(-50%,-50%) rotate(' + angle.toFixed(1) + 'deg) translateX(' + (side * cfg.stride) + 'px)';
    var flip = side < 0 ? 'transform:scaleX(-1)' : '';
    out += '<div class="foot" style="left:' + p.x.toFixed(2) + '%;top:' + p.y.toFixed(2) + '%;transform:' + tr
      + ';animation-delay:' + (i * step).toFixed(2) + 's;animation-duration:' + cycle + '">'
      + svg.replace('TRANSFORM', flip) + '</div>';
  }
  host.innerHTML = out;
})();
