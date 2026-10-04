(() => {
  const root = document.documentElement;
  const button = document.querySelector('button.theme-toggle');
  const label = document.querySelector('[data-theme-label]');
  const icon = document.querySelector('[data-theme-icon]');
  const saved = localStorage.getItem('theme');
  const systemDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  const initial = saved || (systemDark ? 'dark' : 'light');

  const apply = (theme) => {
    root.dataset.theme = theme;
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    if (label) label.textContent = nextTheme === 'light' ? 'Light' : 'Dark';
    if (icon) icon.textContent = nextTheme === 'light' ? '☀' : '☾';
    if (button) {
      button.setAttribute('aria-label', `Switch to ${nextTheme} theme`);
      button.setAttribute('title', `Switch to ${nextTheme} theme`);
    }
    localStorage.setItem('theme', theme);
  };

  apply(initial);

  if (button) {
    button.addEventListener('click', () => {
      apply(root.dataset.theme === 'dark' ? 'light' : 'dark');
    });
  }
})();
