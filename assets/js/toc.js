(() => {
  const article = document.querySelector('.post-page');
  if (!article) return;

  const content = article.querySelector('.post-content');
  const openButton = document.querySelector('[data-toc-open]');
  const closeButton = document.querySelector('[data-toc-close]');
  const drawer = document.querySelector('[data-post-toc]');
  const backdrop = document.querySelector('[data-toc-backdrop]');
  const list = document.querySelector('[data-toc-list]');

  if (!content || !openButton || !drawer || !backdrop || !list) return;

  const headings = Array.from(content.querySelectorAll('h2, h3'));
  if (!headings.length) {
    openButton.hidden = true;
    return;
  }

  const usedIds = new Set(Array.from(document.querySelectorAll('[id]')).map((el) => el.id));
  const slugify = (text) => {
    const base = (text || '')
      .trim()
      .toLowerCase()
      .normalize('NFKD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^\p{L}\p{N}\s-]/gu, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '') || 'section';

    let id = base;
    let n = 2;
    while (usedIds.has(id)) id = `${base}-${n++}`;
    usedIds.add(id);
    return id;
  };

  const links = [];

  headings.forEach((heading) => {
    if (!heading.id) heading.id = slugify(heading.textContent);
    heading.classList.add('toc-anchor-target');

    const link = document.createElement('a');
    link.href = `#${encodeURIComponent(heading.id)}`;
    link.className = `post-toc-link toc-level-${heading.tagName === 'H3' ? '3' : '2'}`;
    link.textContent = heading.textContent.trim();
    link.dataset.targetId = heading.id;

    link.addEventListener('click', (event) => {
      event.preventDefault();
      const top = heading.getBoundingClientRect().top + window.scrollY - 82;
      window.scrollTo({ top, behavior: 'smooth' });
      history.replaceState(null, '', `#${encodeURIComponent(heading.id)}`);
      setToc(false);
    });

    list.appendChild(link);
    links.push(link);
  });

  const setToc = (open) => {
    drawer.classList.toggle('is-open', open);
    backdrop.classList.toggle('is-visible', open);
    drawer.setAttribute('aria-hidden', String(!open));
    backdrop.setAttribute('aria-hidden', String(!open));
    document.body.classList.toggle('toc-open', open);
    if (open) {
      const active = list.querySelector('.is-active');
      if (active) active.scrollIntoView({ block: 'nearest' });
      if (closeButton) closeButton.focus();
    } else {
      openButton.focus({ preventScroll: true });
    }
  };

  const updateActive = () => {
    const marker = window.scrollY + 120;
    let current = headings[0];
    for (const heading of headings) {
      if (heading.offsetTop <= marker) current = heading;
      else break;
    }
    links.forEach((link) => link.classList.toggle('is-active', link.dataset.targetId === current.id));
  };

  let ticking = false;
  const onScroll = () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      updateActive();
      ticking = false;
    });
  };

  openButton.addEventListener('click', () => setToc(true));
  if (closeButton) closeButton.addEventListener('click', () => setToc(false));
  backdrop.addEventListener('click', () => setToc(false));
  window.addEventListener('scroll', onScroll, { passive: true });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && drawer.classList.contains('is-open')) setToc(false);
  });

  updateActive();
})();
