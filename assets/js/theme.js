(() => {
  const root = document.documentElement;
  const button = document.querySelector('.theme-toggle');
  const label = document.querySelector('[data-theme-label]');
  const saved = localStorage.getItem('theme');
  const systemDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  const initial = saved || (systemDark ? 'dark' : 'light');

  const apply = (theme) => {
    root.dataset.theme = theme;
    if (label) label.textContent = theme === 'dark' ? 'Dark' : 'Light';
    localStorage.setItem('theme', theme);
  };

  apply(initial);

  if (button) {
    button.addEventListener('click', () => {
      apply(root.dataset.theme === 'dark' ? 'light' : 'dark');
    });
  }
})();
