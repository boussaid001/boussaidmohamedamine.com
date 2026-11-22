/* site.js · interactions for the static clone: theme, cmd-k, email copy,
   mascot sprite, scroll reveal, blog tag filter. Vanilla JS, no deps. */
(function () {
  'use strict';

  /* ---------- theme ---------- */
  var root = document.documentElement;
  var moon = function () { return document.querySelector('.icon-moon'); };
  var sun = function () { return document.querySelector('.icon-sun'); };
  function syncIcons() {
    var dark = root.classList.contains('dark');
    var m = moon(), s = sun();
    if (m) m.classList.toggle('hidden', dark);
    if (s) s.classList.toggle('hidden', !dark);
  }
  var themeBtn = document.getElementById('theme-toggle');
  if (themeBtn) {
    syncIcons();
    themeBtn.addEventListener('click', function () {
      root.classList.toggle('dark');
      try { localStorage.setItem('theme', root.classList.contains('dark') ? 'dark' : 'light'); } catch (e) {}
      syncIcons();
    });
  }

  /* ---------- mac key hint: Ctrl -> Cmd ---------- */
  if (/Mac|iPhone|iPad|iPod/.test(navigator.platform || '')) {
    document.querySelectorAll('kbd').forEach(function (k) {
      if (k.textContent.trim() === 'Ctrl') k.textContent = '⌘';
    });
  }

  /* ---------- scroll reveal ---------- */
  var revealEls = document.querySelectorAll('.animate-in-up-on-view');
  if (revealEls.length && 'IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('in-view'); io.unobserve(e.target); }
      });
    }, { threshold: 0.05, rootMargin: '0px 0px -8% 0px' });
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add('in-view'); });
  }

  /* ---------- email copy ---------- */
  var em = document.getElementById('email-copy');
  if (em) {
    em.addEventListener('click', function () {
      var addr = em.getAttribute('data-email') || em.textContent.trim();
      var done = function () {
        var icons = em.querySelectorAll('svg');
        if (icons.length >= 2) {
          icons[0].classList.remove('opacity-100'); icons[0].classList.add('opacity-0', 'scale-50');
          icons[1].classList.remove('opacity-0', 'scale-50'); icons[1].classList.add('opacity-100');
          setTimeout(function () {
            icons[0].classList.add('opacity-100'); icons[0].classList.remove('opacity-0', 'scale-50');
            icons[1].classList.add('opacity-0', 'scale-50'); icons[1].classList.remove('opacity-100');
          }, 1400);
        }
      };
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(addr).then(done, done);
      } else { done(); }
    });
  }

  /* ---------- mascot: direction sprite + boop ---------- */
  var mascot = document.getElementById('mascot');
  if (mascot) {
    var layers = mascot.querySelectorAll('span > span');
    var dirLayer = null, reactLayer = null;
    mascot.querySelectorAll('span').forEach(function (s) {
      var bg = s.style.backgroundImage || '';
      if (bg.indexOf('directions') > -1) dirLayer = s;
      if (bg.indexOf('reactions') > -1) reactLayer = s;
    });
    var boopTimer = null;
    if (dirLayer) {
      var idle = '50% 50%';
      document.addEventListener('mousemove', function (ev) {
        if (boopTimer) return;
        var r = mascot.getBoundingClientRect();
        var cx = r.left + r.width / 2, cy = r.top + r.height / 2;
        var dx = ev.clientX - cx, dy = ev.clientY - cy;
        if (Math.abs(dx) < 8 && Math.abs(dy) < 8) { dirLayer.style.backgroundPosition = idle; return; }
        var col = dx < -8 ? 0 : dx > 8 ? 100 : 50;
        var row = dy < -8 ? 0 : dy > 8 ? 100 : 50;
        dirLayer.style.backgroundPosition = col + '% ' + row + '%';
      });
      mascot.addEventListener('click', function () {
        if (!reactLayer) return;
        var cells = ['0% 0%', '50% 0%', '100% 0%', '0% 50%', '100% 50%', '0% 100%', '50% 100%', '100% 100%'];
        reactLayer.style.backgroundPosition = cells[Math.floor(Math.random() * cells.length)];
        reactLayer.style.opacity = '1';
        clearTimeout(boopTimer);
        boopTimer = setTimeout(function () {
          reactLayer.style.opacity = '0';
          boopTimer = null;
        }, 650);
      });
    }
  }

  /* ---------- blog tag filter + show all ---------- */
  var tagFilter = document.getElementById('tag-filter');
  if (tagFilter) {
    var items = Array.prototype.slice.call(document.querySelectorAll('.blog-list-item'));
    var itemTags = items.map(function (it) {
      return Array.prototype.map.call(it.querySelectorAll('span'), function (s) {
        return s.textContent.trim();
      }).filter(function (t) {
        return s_tagLike(t);
      });
    });
    function s_tagLike(t) {
      return t && t.length < 24 && !/read more|more/i.test(t);
    }
    var pills = Array.prototype.slice.call(tagFilter.querySelectorAll('button'));
    var showAllBtn = null, activeTag = 'All';
    var tagSet = {};
    pills.forEach(function (b) {
      if (b.hasAttribute('data-showall')) { showAllBtn = b; return; }
      var tag = b.getAttribute('data-tag') || 'All';
      tagSet[tag] = b;
      b.addEventListener('click', function () {
        activeTag = tag;
        applyFilter();
      });
    });
    // hidden extra tags derived from items
    var known = Object.keys(tagSet);
    var extra = [];
    itemTags.forEach(function (ts) {
      ts.forEach(function (t) {
        if (t !== 'All' && known.indexOf(t) === -1 && extra.indexOf(t) === -1) extra.push(t);
      });
    });
    var extraBtns = [];
    extra.forEach(function (t) {
      var b = showAllBtn ? showAllBtn.cloneNode(false) : null;
      if (!b) return;
      b.removeAttribute('data-showall');
      b.setAttribute('data-tag', t);
      b.style.display = 'none';
      var count = 0;
      itemTags.forEach(function (ts) { if (ts.indexOf(t) > -1) count++; });
      b.textContent = t;
      var badge = document.createElement('span');
      badge.className = 'ml-1.5 inline-flex items-center justify-center rounded-full px-1.5 py-0 text-[10px] font-medium leading-none bg-primary-foreground/20 text-primary-foreground';
      badge.textContent = count;
      b.appendChild(badge);
      b.addEventListener('click', function () { activeTag = t; applyFilter(); });
      tagFilter.insertBefore(b, showAllBtn);
      tagSet[t] = b; extraBtns.push(b); known.push(t);
    });
    if (showAllBtn) {
      showAllBtn.addEventListener('click', function () {
        var open = showAllBtn.getAttribute('aria-expanded') === 'true';
        showAllBtn.setAttribute('aria-expanded', String(!open));
        extraBtns.forEach(function (b) { b.style.display = open ? 'none' : ''; });
        showAllBtn.textContent = open ? 'Show all' : 'Show less';
      });
    }
    function applyFilter() {
      items.forEach(function (it, i) {
        var show = activeTag === 'All' || itemTags[i].indexOf(activeTag) > -1;
        it.style.display = show ? '' : 'none';
      });
      Object.keys(tagSet).forEach(function (t) {
        var b = tagSet[t], on = t === activeTag;
        b.classList.toggle('bg-primary', on);
        b.classList.toggle('text-primary-foreground', on);
        b.classList.toggle('bg-muted', !on);
        b.classList.toggle('text-muted-foreground', !on);
      });
    }
  }

  /* ---------- quote card ---------- */
  var QUOTES = [
    { q: 'First, solve the problem. Then, write the code.', a: 'John Johnson' },
    { q: 'Make it work, make it right, make it fast.', a: 'Kent Beck' },
    { q: 'Simplicity is the soul of efficiency.', a: 'Austin Freeman' },
    { q: 'Code is like humor. When you have to explain it, it is bad.', a: 'Cory House' },
    { q: 'Talk is cheap. Show me the code.', a: 'Linus Torvalds' }
  ];
  var qmount = document.getElementById('quote-card');
  if (qmount) {
    var pick = QUOTES[Math.floor(Math.random() * QUOTES.length)];
    qmount.innerHTML =
      '<figure class="relative overflow-hidden rounded-xl border border-border bg-muted/20 px-6 py-6 sm:px-8">' +
      '  <span aria-hidden="true" class="pointer-events-none absolute -top-3 left-3 select-none font-serif text-[80px] leading-none text-muted-foreground/15">&ldquo;</span>' +
      '  <blockquote class="relative font-serif text-lg italic leading-relaxed text-secondary">' + pick.q + '</blockquote>' +
      '  <figcaption class="relative mt-1 text-right font-serif text-sm italic text-muted-foreground">&middot; ' + pick.a + '</figcaption>' +
      '</figure>';
  }

  /* ---------- oneko pet picker (right-click the cat) ---------- */
  var ONEKO_VARIANTS = [
    ['classic', 'Classic'],
    ['dog', 'Dog'],
    ['tora', 'Tora'],
    ['maia', 'Maia'],
    ['vaporwave', 'Vaporwave'],
    ['ramxcodes', 'Boussaid']
  ];
  var petPicker = null;
  function closePetPicker() { if (petPicker) { petPicker.remove(); petPicker = null; } }
  function openPetPicker() {
    closePetPicker();
    var neko = document.getElementById('oneko');
    var nx = neko ? parseFloat(neko.style.left) || 100 : 100;
    var ny = neko ? parseFloat(neko.style.top) || 100 : 100;
    petPicker = document.createElement('div');
    petPicker.setAttribute('role', 'menu');
    petPicker.className = 'fixed z-[100000] min-w-44 rounded-xl border border-border bg-popover p-1.5 shadow-lg';
    petPicker.style.left = Math.max(8, Math.min(nx - 8, window.innerWidth - 200)) + 'px';
    petPicker.style.top = Math.max(8, Math.min(ny - 8, window.innerHeight - 260)) + 'px';
    var label = document.createElement('div');
    label.className = 'px-2 py-1.5 text-[11px] font-medium uppercase tracking-wide text-muted-foreground';
    label.textContent = 'Choose your pet';
    petPicker.appendChild(label);
    ONEKO_VARIANTS.forEach(function (v) {
      var b = document.createElement('button');
      b.type = 'button';
      b.className = 'flex w-full items-center rounded-md px-2 py-1.5 text-left text-sm text-foreground transition-colors hover:bg-muted';
      b.textContent = v[1];
      b.addEventListener('click', function () {
        window.dispatchEvent(new CustomEvent('oneko:set-variant', { detail: v[0] }));
        closePetPicker();
      });
      petPicker.appendChild(b);
    });
    document.body.appendChild(petPicker);
    setTimeout(function () {
      document.addEventListener('click', closePetPicker, { once: true });
      document.addEventListener('keydown', function esc(ev) {
        if (ev.key === 'Escape') { closePetPicker(); document.removeEventListener('keydown', esc); }
      });
    }, 0);
  }
  window.addEventListener('oneko:right-click', openPetPicker);
  window.addEventListener('oneko:open-picker', openPetPicker);

  /* ---------- cmd-k palette ---------- */
  var CMDK_ITEMS = [
    { t: 'Home', u: 'index.html', g: 'Pages' },
    { t: 'Work', u: 'work.html', g: 'Pages' },
    { t: 'Blog', u: 'blog.html', g: 'Pages' },
    { t: 'Resume', u: 'resume.html', g: 'Pages' },
    { t: 'Projects', u: 'projects.html', g: 'Pages' },
    { t: 'Gears', u: 'gears.html', g: 'Pages' },
    { t: 'Setup', u: 'setup.html', g: 'Pages' },
    { t: 'Terminal', u: 'terminal.html', g: 'Pages' },
    { t: 'Books', u: 'books.html', g: 'Pages' },
    { t: 'Movies', u: 'movies.html', g: 'Pages' },
  ];

  var openBtn = document.getElementById('cmdk-open');
  var overlay = null, input = null, listEl = null, selIdx = 0;
  var base = location.pathname.indexOf('/blog/') > -1 ? '../' : '';

  function buildOverlay() {
    overlay = document.createElement('div');
    overlay.id = 'cmdk';
    overlay.className = 'fixed inset-0 z-[100] hidden';
    overlay.innerHTML =
      '<div class="absolute inset-0 bg-black/40 backdrop-blur-sm" data-cmdk-close></div>' +
      '<div class="relative mx-auto mt-[15vh] w-[calc(100%-2rem)] max-w-lg rounded-xl border border-border bg-background shadow-2xl overflow-hidden">' +
      '  <div class="flex items-center gap-2 border-b border-border px-4">' +
      '    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 256 256" class="size-4 text-muted-foreground"><path d="M229.66,218.34l-50.07-50.06a88.11,88.11,0,1,0-11.31,11.31l50.06,50.07a8,8,0,0,0,11.32-11.32ZM40,112a72,72,0,1,1,72,72A72.08,72.08,0,0,1,40,112Z"/></svg>' +
      '    <input id="cmdk-input" type="text" placeholder="Search pages and news..." class="w-full bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground" autocomplete="off"/>' +
      '    <kbd class="pointer-events-none inline-flex h-5 items-center rounded-sm px-1.5 text-[10px] text-muted-foreground bg-black/5 dark:bg-white/10">ESC</kbd>' +
      '  </div>' +
      '  <div id="cmdk-list" class="max-h-72 overflow-y-auto p-1.5"></div>' +
      '</div>';
    document.body.appendChild(overlay);
    input = overlay.querySelector('#cmdk-input');
    listEl = overlay.querySelector('#cmdk-list');
    overlay.querySelector('[data-cmdk-close]').addEventListener('click', closeCmdk);
    input.addEventListener('input', render);
    input.addEventListener('keydown', function (e) {
      var rows = listEl.querySelectorAll('[data-row]');
      if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
        e.preventDefault();
        selIdx = (selIdx + (e.key === 'ArrowDown' ? 1 : -1) + rows.length) % Math.max(rows.length, 1);
        paintSel(rows);
      } else if (e.key === 'Enter' && rows[selIdx]) {
        location.href = rows[selIdx].getAttribute('data-href');
      } else if (e.key === 'Escape') { closeCmdk(); }
    });
  }

  function render() {
    var q = (input.value || '').toLowerCase();
    var rows = CMDK_ITEMS.filter(function (i) { return i.t.toLowerCase().indexOf(q) > -1; });
    selIdx = 0;
    var html = '', lastG = '';
    rows.forEach(function (i, n) {
      if (i.g !== lastG) { html += '<div class="px-2.5 pb-1 pt-2 text-[10px] font-medium uppercase tracking-wider text-muted-foreground">' + i.g + '</div>'; lastG = i.g; }
      html += '<div data-row data-href="' + base + i.u + '" class="cmdk-row flex cursor-pointer items-center justify-between rounded-md px-2.5 py-2 text-sm text-secondary"><span>' + i.t + '</span><span class="text-xs text-muted-foreground">' + i.g.toLowerCase() + '</span></div>';
    });
    listEl.innerHTML = html || '<div class="px-3 py-6 text-center text-sm text-muted-foreground">No results.</div>';
    listEl.querySelectorAll('[data-row]').forEach(function (r) {
      r.addEventListener('click', function () { location.href = r.getAttribute('data-href'); });
      r.addEventListener('mousemove', function () {
        selIdx = Array.prototype.indexOf.call(listEl.querySelectorAll('[data-row]'), r);
        paintSel(listEl.querySelectorAll('[data-row]'));
      });
    });
    paintSel(listEl.querySelectorAll('[data-row]'));
  }

  function paintSel(rows) {
    rows.forEach(function (r, i) {
      r.classList.toggle('bg-muted', i === selIdx);
      r.classList.toggle('text-primary', i === selIdx);
    });
  }

  var newsLoaded = false;
  function ensureNews() {
    if (newsLoaded) return;
    newsLoaded = true;
    fetch('https://dev.to/api/articles?top=7&per_page=40').then(function (r) { return r.json(); }).then(function (data) {
      (data || []).forEach(function (a) {
        if (a.type_of === 'article') CMDK_ITEMS.push({ t: a.title, u: 'post.html?id=' + a.id, g: 'Tech News' });
      });
      if (overlay && !overlay.classList.contains('hidden')) render();
    }).catch(function () {});
  }

  function openCmdk() {
    ensureNews();
    if (!overlay) buildOverlay();
    overlay.classList.remove('hidden');
    input.value = ''; render();
    setTimeout(function () { input.focus(); }, 0);
    document.body.style.overflow = 'hidden';
  }
  function closeCmdk() {
    if (overlay) overlay.classList.add('hidden');
    document.body.style.overflow = '';
  }
  if (openBtn) openBtn.addEventListener('click', openCmdk);
  document.addEventListener('keydown', function (e) {
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') { e.preventDefault(); openCmdk(); }
    else if (e.key === 'Escape') { closeCmdk(); }
  });
})();

/* ---- dev.to tech news (blog page) ---- */
(function () {
  var list = document.getElementById('news-list');
  if (!list) return;
  var filterBox = document.getElementById('tag-filter');
  var stateBox = document.getElementById('news-state');

  var TAGS = [
    { slug: '', label: 'All' },
    { slug: 'ai', label: 'AI' },
    { slug: 'openai', label: 'OpenAI' },
    { slug: 'gemini', label: 'Gemini' },
    { slug: 'claude', label: 'Claude' },
    { slug: 'copilot', label: 'Copilot' },
    { slug: 'llm', label: 'LLM' },
    { slug: 'devops', label: 'DevOps' },
    { slug: 'kubernetes', label: 'Kubernetes' },
    { slug: 'docker', label: 'Docker' },
    { slug: 'architecture', label: 'Architecture' },
    { slug: 'cloud', label: 'Cloud' },
    { slug: 'terraform', label: 'Terraform' },
    { slug: 'cicd', label: 'CI/CD' },
    { slug: 'security', label: 'Security' },
    { slug: 'sre', label: 'SRE' },
    { slug: 'webdev', label: 'Web Dev' }
  ];
  var VISIBLE = 8;
  var cache = {};
  var active = '';

  var PILL_BASE = 'group/button inline-flex shrink-0 items-center justify-center border border-transparent bg-clip-padding whitespace-nowrap outline-none select-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50 h-8 gap-1.5 px-2.5 rounded-full text-sm font-normal transition-colors ';
  var PILL_ON = 'bg-primary text-primary-foreground';
  var PILL_OFF = 'bg-muted text-muted-foreground hover:bg-muted/80';
  var CAL_SVG = '<svg class="size-3.5" fill="currentColor" viewBox="0 0 256 256"><path d="M208,32H184V24a8,8,0,0,0-16,0v8H88V24a8,8,0,0,0-16,0v8H48A16,16,0,0,0,32,48V208a16,16,0,0,0,16,16H208a16,16,0,0,0,16-16V48A16,16,0,0,0,208,32ZM72,48v8a8,8,0,0,0,16,0V48h80v8a8,8,0,0,0,16,0V48h24V80H48V48ZM208,208H48V96H208V208Zm-68-76a12,12,0,1,1-12-12A12,12,0,0,1,140,132Zm44,0a12,12,0,1,1-12-12A12,12,0,0,1,184,132ZM96,172a12,12,0,1,1-12-12A12,12,0,0,1,96,172Zm44,0a12,12,0,1,1-12-12A12,12,0,0,1,140,172Zm44,0a12,12,0,1,1-12-12A12,12,0,0,1,184,172Z"/></svg>';
  var ARR_SVG = '<svg class="size-4" fill="currentColor" viewBox="0 0 256 256"><path d="M221.66,133.66l-72,72a8,8,0,0,1-11.32-11.32L196.69,136H40a8,8,0,0,1,0-16H196.69L138.34,61.66a8,8,0,0,1,11.32-11.32l72,72A8,8,0,0,1,221.66,133.66Z"/></svg>';

  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }

  function renderPills() {
    var html = '';
    TAGS.forEach(function (t, i) {
      html += '<button type="button" data-tag="' + t.slug + '" class="' +
        PILL_BASE + (t.slug === active ? PILL_ON : PILL_OFF) +
        (i >= VISIBLE ? ' tag-extra" style="display:none' : '') + '">' + esc(t.label) + '</button>';
    });
    if (TAGS.length > VISIBLE) {
      var hidden = TAGS.length - VISIBLE;
      html += '<button type="button" data-showall="1" class="' + PILL_BASE + PILL_OFF + '">' +
        hidden + ' Show all</button>';
    }
    filterBox.innerHTML = html;
  }

  function skeleton() {
    var html = '';
    for (var i = 0; i < 5; i++) {
      html += '<div class="flex flex-col gap-3 py-4 sm:flex-row sm:items-center sm:gap-4">' +
        '<div class="news-thumb shrink-0 animate-pulse rounded-lg bg-muted"></div>' +
        '<div class="min-w-0 flex-1 space-y-2">' +
        '<div class="h-5 w-3/4 animate-pulse rounded bg-muted"></div>' +
        '<div class="h-4 w-full animate-pulse rounded bg-muted"></div>' +
        '<div class="h-3 w-24 animate-pulse rounded bg-muted"></div></div></div>';
    }
    list.innerHTML = html;
    stateBox.innerHTML = '';
  }

  function fmtDate(iso) {
    var d = new Date(iso);
    if (isNaN(d)) return '';
    return d.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
  }

  function renderItems(items) {
    if (!items.length) {
      list.innerHTML = '';
      stateBox.innerHTML = '<p class="py-8 text-center text-sm text-muted-foreground">No stories right now - try another tag.</p>';
      return;
    }
    var html = '';
    items.forEach(function (a, i) {
      var img = a.cover_image || a.social_image;
      var tags = (a.tag_list || []).slice(0, 3).map(function (t) {
        return '<span class="inline-flex items-center rounded-md bg-muted px-2 py-0.5 text-xs text-muted-foreground">' + esc(t) + '</span>';
      }).join('');
      html += '<div class="blog-list-item" style="animation-delay:' + (i * 40) + 'ms">' +
        '<article class="group relative isolate py-4"><a class="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4" href="post.html?id=' + a.id + '">' +
        (img ? '<img alt="" class="news-thumb shrink-0 rounded-lg border border-border" loading="lazy" decoding="async" onload="this.style.opacity=1" onerror="this.style.display=\'none\'" src="' + esc(img) + '">' : '') +
        '<div class="min-w-0 flex-1 space-y-1">' +
        '<h3 class="text-lg font-semibold leading-tight group-hover:text-primary transition-colors z-10">' + esc(a.title) + '</h3>' +
        (a.description ? '<p class="line-clamp-2 text-sm text-secondary">' + esc(a.description) + '</p>' : '') +
        (tags ? '<div class="flex flex-wrap gap-1.5">' + tags + '</div>' : '') +
        '<time class="hidden items-center gap-1.5 text-xs text-muted-foreground sm:flex" datetime="' + esc(a.published_at) + '">' + CAL_SVG + esc(fmtDate(a.published_at)) + '</time>' +
        '</div>' +
        '<span class="inline-flex shrink-0 items-center gap-1.5 text-sm text-muted-foreground transition-colors group-hover:text-primary">Read more' + ARR_SVG + '</span>' +
        '</a></article></div>';
    });
    list.innerHTML = html;
    stateBox.innerHTML = '';
  }

  function load(slug) {
    active = slug;
    renderPills();
    if (cache[slug]) { renderItems(cache[slug]); return; }
    skeleton();
    var url = 'https://dev.to/api/articles?top=7&per_page=30' + (slug ? '&tag=' + slug : '');
    fetch(url).then(function (r) {
      if (!r.ok) throw new Error(r.status);
      return r.json();
    }).then(function (data) {
      var seen = {};
      var items = (data || []).filter(function (a) {
        if (seen[a.id] || a.type_of !== 'article') return false;
        seen[a.id] = 1;
        return true;
      });
      items.sort(function (a, b) { return new Date(b.published_at) - new Date(a.published_at); });
      cache[slug] = items;
      try { localStorage.setItem('news:cache:' + (slug || ''), JSON.stringify(items.slice(0, 30))); } catch (e) {}
      if (slug === active) renderItems(items);
    }).catch(function () {
      if (slug !== active) return;
      var fallback = null;
      try { fallback = JSON.parse(localStorage.getItem('news:cache:' + (slug || ''))); } catch (e) {}
      if (fallback && fallback.length) { cache[slug] = fallback; renderItems(fallback); return; }
      list.innerHTML = '';
      stateBox.innerHTML = '<div class="py-8 text-center"><p class="mb-3 text-sm text-muted-foreground">Couldn\'t load news right now.</p>' +
        '<button type="button" data-retry="1" class="' + PILL_BASE + PILL_OFF + '">Retry</button></div>';
    });
  }

  filterBox.addEventListener('click', function (e) {
    var b = e.target.closest('button');
    if (!b) return;
    if (b.hasAttribute('data-showall')) {
      var extras = filterBox.querySelectorAll('.tag-extra');
      var showing = b.getAttribute('data-open') === '1';
      extras.forEach(function (x) { x.style.display = showing ? 'none' : ''; });
      b.setAttribute('data-open', showing ? '0' : '1');
      b.innerHTML = showing ? (TAGS.length - VISIBLE) + ' Show all' : 'Show less';
      return;
    }
    var slug = b.getAttribute('data-tag');
    if (slug !== null && slug !== active) load(slug);
  });

  stateBox.addEventListener('click', function (e) {
    if (e.target.closest('[data-retry]')) load(active);
  });

  load('');
})();


/* ---- news post page (post.html?id=N) ---- */
(function () {
  var post = document.getElementById('news-post');
  if (!post) return;
  var state = document.getElementById('post-state');
  var id = new URLSearchParams(location.search).get('id');
  if (!id) { location.replace('blog.html'); return; }

  var sk = '<div class="space-y-4 pt-4"><div class="h-10 w-3/4 animate-pulse rounded bg-muted"></div>' +
    '<div class="h-4 w-40 animate-pulse rounded bg-muted"></div><div class="h-64 w-full animate-pulse rounded-xl bg-muted"></div>' +
    '<div class="space-y-2"><div class="h-4 w-full animate-pulse rounded bg-muted"></div>' +
    '<div class="h-4 w-full animate-pulse rounded bg-muted"></div><div class="h-4 w-2/3 animate-pulse rounded bg-muted"></div></div></div>';
  state.innerHTML = sk;

  var EMBED_RE = new RegExp('{%\\s*(embed|link|tweet|youtube|github|gist|codepen|codesandbox|jsfiddle|replit|asciinema|twitter|x|instagram|soundcloud|spotify|vimeo|twitch|podcast|medium|devcomment|stackblitz|glitch|codepen)\\s+([^%}\\s][^%}]*)\\s*%}', 'gi');
  var LIQUID_RE = new RegExp('{%[^%]*%}', 'g');

  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }
  function fixTables(seg) {
    if (!/\|\s*:?-{2,}/.test(seg)) return seg;
    // 1. merge table rows that wrap across multiple lines (row ends when line ends with |)
    var lines = seg.split('\n'), out = [], acc = null;
    for (var i = 0; i < lines.length; i++) {
      var ln = lines[i];
      if (acc === null) {
        if (/^\s*\|/.test(ln)) {
          var prev = out.length ? out[out.length - 1] : '';
          if (prev.trim() !== '' && !/^\s*\|/.test(prev)) out.push('');  // blank line before table only
          acc = ln.trim();
        } else { out.push(ln); continue; }
      } else {
        if (/^\s*\|/.test(ln)) { out.push(acc); acc = ln.trim(); continue; }  // already a row
        acc += ' ' + ln.trim();
      }
      if (/\|\s*$/.test(acc)) { out.push(acc); acc = null; }
    }
    if (acc !== null) out.push(acc);
    // 2. split `||` / `| |` row boundaries left on a single line (only real multi-row runs)
    return out.join('\n').replace(/\|(?:[^|\n]+\|)+/g, function (m) {
      var rows = m.split(/\|\s*\|/);
      if (rows.length < 2) return m;
      rows = rows.map(function (r) {
        r = r.trim();
        if (r.charAt(0) !== '|') r = '| ' + r;
        if (r.slice(-1) !== '|') r += ' |';
        return r;
      });
      return '\n\n' + rows.join('\n') + '\n\n';
    });
  }
  function fixHeads(seg) {
    return seg.replace(/(\S)\s+(#{1,6} )/g, '$1\n\n$2');
  }
  function cleanMd(md) {
    md = String(md || '');
    md = md.replace(EMBED_RE, function (_, kind, url) {
      return '**[View embedded content](' + url.trim() + ')**';
    });
    md = md.replace(LIQUID_RE, '');
    var parts = md.split(/(```[\s\S]*?```|`[^`\n]+`)/);
    var out = [];
    for (var i = 0; i < parts.length; i++) {
      out.push(i % 2 === 0 ? fixHeads(fixTables(parts[i])) : parts[i]);
    }
    return out.join('');
  }
  function sanitize(html) {
    html = html.replace(/<\/?(script|iframe|object|embed|form|input|button|textarea|select|link|meta|style)[^>]*>/gi, '');
    html = html.replace(/\son\w+="[^"]*"/gi, '').replace(/\son\w+='[^']*'/gi, '');
    html = html.replace(/href="javascript:[^"]*"/gi, 'href="#"');
    return html;
  }

  fetch('https://dev.to/api/articles/' + encodeURIComponent(id))
    .then(function (r) { if (!r.ok) throw new Error(r.status); return r.json(); })
    .then(function (a) {
      document.title = a.title + ' | Mohamed Amine Boussaid';
      var ogSet = { 'og:title': a.title, 'og:description': a.description || '', 'og:image': a.cover_image || a.social_image || '' };
      Object.keys(ogSet).forEach(function (k) {
        var m = document.querySelector('meta[property="' + k + '"]');
        if (m) m.setAttribute('content', ogSet[k]);
      });
      document.getElementById('np-title').textContent = a.title;
      var d = new Date(a.published_at);
      document.getElementById('np-date').textContent = isNaN(d) ? '' : d.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
      document.getElementById('np-read').textContent = (a.reading_time_minutes ? '· ' + a.reading_time_minutes + ' min read' : '');
      var tags = (a.tags || a.tag_list || []).map(function (t) {
        return '<span class="inline-flex items-center rounded-md bg-muted px-2 py-0.5 text-xs text-muted-foreground">' + esc(t) + '</span>';
      }).join('');
      document.getElementById('np-tags').innerHTML = tags;
      var cover = a.cover_image || a.social_image;
      if (cover) { var im = document.getElementById('np-cover'); im.src = cover; im.style.display = ''; }
      var md = cleanMd(a.body_markdown);
      var html = (typeof marked !== 'undefined') ? marked.parse(md) : '<p>' + esc(md) + '</p>';
      document.getElementById('np-body').innerHTML = sanitize(html);
      // external links open in new tab; images lazy
      document.querySelectorAll('#np-body a').forEach(function (l) {
        if (/^https?:/.test(l.href)) { l.target = '_blank'; l.rel = 'noopener noreferrer'; }
      });
      document.querySelectorAll('#np-body img').forEach(function (im2) { im2.loading = 'lazy'; im2.style.borderRadius = '8px'; });
      state.innerHTML = '';
      post.style.display = '';
    })
    .catch(function () {
      state.innerHTML = '<div class="py-10 text-center"><p class="mb-3 text-sm text-muted-foreground">Couldn\'t load this article.</p>' +
        '<a class="inline-flex items-center gap-1.5 rounded-full bg-muted px-3 py-1.5 text-sm text-muted-foreground hover:bg-muted/80" href="blog.html">Back to blog</a></div>';
    });
})();

/* ---- copy buttons on code blocks ---- */
(function () {
  document.addEventListener('click', function (e) {
    var btn = e.target.closest('button');
    if (!btn) return;
    // auto-detect: button inside a zone containing a code block, or labelled Copy
    var zone = btn.closest('[data-copy-zone]') ||
      (btn.textContent.trim() === 'Copy' ? (btn.closest('div') && findCodeZone(btn)) : null);
    if (!zone) return;
    var code = zone.querySelector('code') || zone.querySelector('pre');
    if (!code) return;
    var text = code.innerText;
    var done = function () {
      var orig = btn.innerHTML;
      btn.innerHTML = orig.replace('Copy', 'Copied');
      setTimeout(function () { btn.innerHTML = orig; }, 1500);
    };
    if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(text).then(done, done);
  });
  function findCodeZone(btn) {
    var el = btn;
    for (var i = 0; i < 6 && el.parentElement; i++) {
      el = el.parentElement;
      if (el.querySelector('pre code') || el.querySelector('pre')) return el;
    }
    return null;
  }
})();

/* ---- click-to-copy chips ([class=cp]) ---- */
(function () {
  document.addEventListener('click', function (e) {
    var el = e.target.closest('.cp');
    if (!el) return;
    var text = el.textContent;
    var done = function () {
      var orig = el.textContent;
      el.textContent = 'copied!';
      setTimeout(function () { el.textContent = orig; }, 1200);
    };
    if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(text).then(done, done);
  });
})();
