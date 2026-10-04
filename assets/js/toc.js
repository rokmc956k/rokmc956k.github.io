(() => {
  function initPostToc() {
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

    // Use deterministic IDs instead of browser-dependent Unicode slug parsing.
    const existingIds = new Set(
      Array.from(document.querySelectorAll('[id]'))
        .map((el) => el.id)
        .filter(Boolean)
    );

    headings.forEach((heading, index) => {
      if (!heading.id) {
        let id = `section-${index + 1}`;
        let suffix = 2;
        while (existingIds.has(id)) id = `section-${index + 1}-${suffix++}`;
        heading.id = id;
        existingIds.add(id);
      }
      heading.classList.add('toc-anchor-target');
    });

    function setOpen(open) {
      drawer.classList.toggle('is-open', open);
      backdrop.classList.toggle('is-visible', open);
      drawer.setAttribute('aria-hidden', open ? 'false' : 'true');
      backdrop.setAttribute('aria-hidden', open ? 'false' : 'true');
      openButton.setAttribute('aria-expanded', open ? 'true' : 'false');
      document.body.classList.toggle('toc-open', open);

      if (open) {
        const active = list.querySelector('.is-active');
        if (active && typeof active.scrollIntoView === 'function') {
          active.scrollIntoView({ block: 'nearest' });
        }
      }
    }

    function jumpToHeading(heading) {
      setOpen(false);

      // scrollIntoView is more reliable across mobile browsers/WebViews.
      try {
        heading.scrollIntoView({ behavior: 'smooth', block: 'start' });
      } catch (_) {
        heading.scrollIntoView();
      }

      try {
        history.replaceState(null, '', `#${heading.id}`);
      } catch (_) {
        location.hash = heading.id;
      }
    }

    const fragment = document.createDocumentFragment();
    const links = headings.map((heading) => {
      const link = document.createElement('a');
      link.href = `#${heading.id}`;
      link.className = `post-toc-link ${heading.tagName === 'H3' ? 'toc-level-3' : 'toc-level-2'}`;
      link.textContent = heading.textContent.trim();
      link.dataset.targetId = heading.id;
      link.addEventListener('click', (event) => {
        event.preventDefault();
        jumpToHeading(heading);
      });
      fragment.appendChild(link);
      return link;
    });

    list.replaceChildren(fragment);

    function updateActive() {
      const marker = window.scrollY + 130;
      let activeHeading = headings[0];
      for (const heading of headings) {
        if (heading.offsetTop <= marker) activeHeading = heading;
        else break;
      }
      for (const link of links) {
        link.classList.toggle('is-active', link.dataset.targetId === activeHeading.id);
      }
    }

    openButton.addEventListener('click', (event) => {
      event.preventDefault();
      setOpen(true);
    });

    if (closeButton) {
      closeButton.addEventListener('click', (event) => {
        event.preventDefault();
        setOpen(false);
      });
    }

    backdrop.addEventListener('click', () => setOpen(false));

    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && drawer.classList.contains('is-open')) setOpen(false);
    });

    let scheduled = false;
    window.addEventListener('scroll', () => {
      if (scheduled) return;
      scheduled = true;
      window.requestAnimationFrame(() => {
        updateActive();
        scheduled = false;
      });
    }, { passive: true });

    // Support direct links such as #section-3 after the TOC has initialized.
    if (location.hash) {
      try {
        const target = document.getElementById(decodeURIComponent(location.hash.slice(1)));
        if (target) target.classList.add('toc-anchor-target');
      } catch (_) {}
    }

    setOpen(false);
    updateActive();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initPostToc, { once: true });
  } else {
    initPostToc();
  }
})();
