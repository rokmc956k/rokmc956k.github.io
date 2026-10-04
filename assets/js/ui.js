(() => {
  const body = document.body;
  const drawer = document.querySelector('[data-site-drawer]');
  const drawerOpen = document.querySelector('[data-drawer-open]');
  const drawerClose = document.querySelector('[data-drawer-close]');
  const drawerBackdrop = document.querySelector('[data-drawer-backdrop]');

  const searchOverlay = document.querySelector('[data-search-overlay]');
  const searchOpen = document.querySelector('[data-search-open]');
  const searchClose = document.querySelector('[data-search-close]');
  const searchInput = document.querySelector('[data-search-input]');
  const searchResults = document.querySelector('[data-search-results]');

  const pageLang = body.dataset.lang || 'en';
  const searchUrl = body.dataset.searchUrl || '/search.json';
  let searchIndex = null;

  const setDrawer = (open) => {
    if (!drawer || !drawerBackdrop) return;
    drawer.classList.toggle('is-open', open);
    drawerBackdrop.classList.toggle('is-visible', open);
    drawer.setAttribute('aria-hidden', String(!open));
    drawerBackdrop.setAttribute('aria-hidden', String(!open));
    body.classList.toggle('drawer-open', open);
    if (open && drawerClose) drawerClose.focus();
  };

  const setSearch = async (open) => {
    if (!searchOverlay) return;
    searchOverlay.classList.toggle('is-open', open);
    searchOverlay.setAttribute('aria-hidden', String(!open));
    body.classList.toggle('search-open', open);
    if (open) {
      setDrawer(false);
      if (!searchIndex) {
        try {
          const response = await fetch(searchUrl, { cache: 'no-store' });
          searchIndex = await response.json();
        } catch (error) {
          searchIndex = [];
        }
      }
      window.setTimeout(() => searchInput && searchInput.focus(), 20);
    } else if (searchInput) {
      searchInput.value = '';
      renderSearch('');
    }
  };

  const normalize = (value) => (value || '').toLowerCase().normalize('NFKC');

  const renderSearch = (query) => {
    if (!searchResults) return;
    const q = normalize(query).trim();

    if (!q) {
      searchResults.innerHTML = `<p class="search-hint">${pageLang === 'ko' ? '제목, 설명, 카테고리에서 검색합니다.' : 'Search titles, descriptions, and categories.'}</p>`;
      return;
    }

    const matches = (searchIndex || [])
      .filter((item) => (item.lang || 'en') === pageLang)
      .map((item) => {
        const haystack = normalize(`${item.title} ${item.description} ${item.categories}`);
        const score = normalize(item.title).includes(q) ? 3 : haystack.includes(q) ? 1 : 0;
        return { item, score };
      })
      .filter((entry) => entry.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, 12);

    searchResults.innerHTML = '';

    if (!matches.length) {
      const empty = document.createElement('p');
      empty.className = 'search-empty';
      empty.textContent = pageLang === 'ko' ? '검색 결과가 없습니다.' : 'No matching posts.';
      searchResults.appendChild(empty);
      return;
    }

    matches.forEach(({ item }) => {
      const link = document.createElement('a');
      link.className = 'search-result';
      link.href = item.url;

      const title = document.createElement('strong');
      title.textContent = item.title;
      link.appendChild(title);

      if (item.description) {
        const description = document.createElement('span');
        description.textContent = item.description;
        link.appendChild(description);
      }

      if (item.categories) {
        const categories = document.createElement('small');
        categories.textContent = item.categories;
        link.appendChild(categories);
      }

      searchResults.appendChild(link);
    });
  };

  if (drawerOpen) drawerOpen.addEventListener('click', () => setDrawer(true));
  if (drawerClose) drawerClose.addEventListener('click', () => setDrawer(false));
  if (drawerBackdrop) drawerBackdrop.addEventListener('click', () => setDrawer(false));

  if (searchOpen) searchOpen.addEventListener('click', () => setSearch(true));
  if (searchClose) searchClose.addEventListener('click', () => setSearch(false));
  if (searchOverlay) {
    searchOverlay.addEventListener('click', (event) => {
      if (event.target === searchOverlay) setSearch(false);
    });
  }
  if (searchInput) searchInput.addEventListener('input', (event) => renderSearch(event.target.value));

  document.querySelectorAll('[data-category-move-select]').forEach((select) => {
    select.addEventListener('change', () => {
      const destination = select.value;
      if (!destination) return;

      const postUrl = select.dataset.postUrl || window.location.pathname;
      const postTitle = select.dataset.postTitle || document.title;
      const message = pageLang === 'ko'
        ? `이 포스트를 “${destination}” 폴더로 이동하는 GitHub 변경 요청을 열까요?`
        : `Open a GitHub request to move this post to “${destination}”?`;

      if (!window.confirm(message)) {
        select.value = '';
        return;
      }

      const issueTitle = `[Category Move] ${postTitle}`;
      const issueBody = `post_url: ${postUrl}\ncategory: ${destination}\n\nRequested from the post category dropdown.`;
      const issueUrl = `https://github.com/rokmc956k/rokmc956k.github.io/issues/new?title=${encodeURIComponent(issueTitle)}&body=${encodeURIComponent(issueBody)}`;
      window.open(issueUrl, '_blank', 'noopener');
      select.value = '';
    });
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      setDrawer(false);
      setSearch(false);
    }
    if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
      event.preventDefault();
      setSearch(true);
    }
  });
})();
