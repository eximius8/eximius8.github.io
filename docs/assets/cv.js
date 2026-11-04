// Shared behaviour for trunov.me (EN and DE pages)
(function () {
  var de = (document.documentElement.lang || '').indexOf('de') === 0;

  // Tenure since Nov 2021, kept current automatically
  var start = new Date(2021, 10, 1), now = new Date();
  var months = (now.getFullYear() - start.getFullYear()) * 12 + (now.getMonth() - start.getMonth());
  var y = Math.floor(months / 12), m = months % 12, parts = [];
  if (y) parts.push(y + (de ? (y === 1 ? ' Jahr' : ' Jahre') : (y === 1 ? ' year' : ' years')));
  if (m) parts.push(m + (de ? ' Mon.' : ' mo'));
  var el = document.getElementById('tenure');
  if (el && parts.length) el.textContent = parts.join(' ');
  var yr = document.getElementById('year');
  if (yr) yr.textContent = now.getFullYear();

  // Theme toggle
  var btn = document.getElementById('themeToggle');
  if (btn) btn.addEventListener('click', function () {
    var root = document.documentElement;
    var cur = root.getAttribute('data-theme') ||
      (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    var next = cur === 'dark' ? 'light' : 'dark';
    root.setAttribute('data-theme', next);
    try { localStorage.setItem('theme', next); } catch (e) {}
  });
})();
