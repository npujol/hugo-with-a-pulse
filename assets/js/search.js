(() => {
  const form = document.getElementById('search-form');
  if (!form) return;

  const input = document.getElementById('search-input');
  const list = document.getElementById('search-results');
  const maxResults = parseInt(form.dataset.maxResults || '8', 10);
  let index = null;
  let results = [];
  let active = -1;

  const esc = s => s.replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));

  const loadIndex = () => {
    if (index) return Promise.resolve();
    return fetch(form.dataset.indexUrl)
      .then(r => r.ok ? r.json() : [])
      .then(data => { index = data; })
      .catch(() => { index = []; });
  };

  const highlight = (text, query) => {
    const safe = esc(text);
    if (!query) return safe;
    const re = new RegExp('(' + query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + ')', 'gi');
    return safe.replace(re, '<mark>$1</mark>');
  };

  const excerpt = (content, query) => {
    const pos = content.toLowerCase().indexOf(query.toLowerCase());
    if (pos === -1) return content.slice(0, 140);
    const start = Math.max(0, pos - 60);
    return (start > 0 ? '…' : '') + content.slice(start, pos + query.length + 80) + '…';
  };

  const render = () => {
    if (!results.length) {
      if (input.value.trim()) {
        list.innerHTML = '<li class="search-empty" role="option" aria-disabled="true">No results found.</li>';
        list.hidden = false;
      } else {
        hide();
      }
      return;
    }
    list.innerHTML = results.map((r, i) => (
      '<li role="option" aria-selected="' + (i === active ? 'true' : 'false') + '"' +
      (i === active ? ' class="active" id="search-active"' : '') + '>' +
      '<a href="' + r.url + '">' +
      '<span class="search-result-title">' + highlight(r.title, input.value.trim()) + '</span>' +
      '<span class="search-result-excerpt">' + highlight(excerpt(r.content || '', input.value.trim()), input.value.trim()) + '</span>' +
      '</a></li>'
    )).join('');
    if (active >= 0 && list.children[active]) {
      input.setAttribute('aria-activedescendant', 'search-active');
    } else {
      input.removeAttribute('aria-activedescendant');
    }
    list.hidden = false;
    input.setAttribute('aria-expanded', 'true');
  };

  const hide = () => {
    list.hidden = true;
    list.innerHTML = '';
    results = [];
    active = -1;
    input.setAttribute('aria-expanded', 'false');
    input.removeAttribute('aria-activedescendant');
  };

  const search = () => {
    const q = input.value.trim();
    if (!q || !index) { hide(); return; }
    const lower = q.toLowerCase();
    results = index.filter(p =>
      (p.title && p.title.toLowerCase().includes(lower)) ||
      (p.content && p.content.toLowerCase().includes(lower))
    ).slice(0, maxResults);
    active = -1;
    render();
  };

  let timer;
  input.addEventListener('input', () => {
    clearTimeout(timer);
    timer = setTimeout(() => { loadIndex().then(search); }, 150);
  });

  input.addEventListener('keydown', e => {
    if (list.hidden || !results.length) {
      if (e.key === 'Escape') { input.value = ''; hide(); }
      return;
    }
    if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
      e.preventDefault();
      active = e.key === 'ArrowDown'
        ? (active + 1) % results.length
        : (active <= 0 ? results.length - 1 : active - 1);
      render();
    } else if (e.key === 'Enter') {
      e.preventDefault();
      const i = active >= 0 ? active : 0;
      if (results[i]) window.location.href = results[i].url;
    } else if (e.key === 'Escape') {
      input.value = '';
      hide();
    }
  });

  document.addEventListener('keydown', e => {
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
      e.preventDefault();
      input.focus();
      input.select();
    }
  });

  form.addEventListener('submit', e => {
    if (results.length) {
      e.preventDefault();
      window.location.href = results[active >= 0 ? active : 0].url;
    }
  });

  document.addEventListener('click', e => {
    if (!form.contains(e.target)) hide();
  });
})();
