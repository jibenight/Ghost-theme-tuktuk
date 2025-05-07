document.addEventListener('DOMContentLoaded', () => {
  const html = document.documentElement;
  const dropdown = document.getElementById('theme-dropdown-btn');
  const options = document.getElementById('theme-options');
  const icon = document.getElementById('theme-icon');
  const label = document.getElementById('theme-label');

  const THEMES = {
    light: {
      name: 'Clair',
      icon: '/assets/icons/light.webp',
    },
    dark: {
      name: 'Sombre',
      icon: '/assets/icons/moon.webp',
    },
    system: {
      name: 'Système',
      icon: '/assets/icons/system.webp',
    },
  };

  const getSystem = () =>
    window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light';
  const getSaved = () => localStorage.getItem('theme') || 'system';

  const applyTheme = mode => {
    const resolved = mode === 'system' ? getSystem() : mode;
    html.classList.toggle('dark', resolved === 'dark');
    icon.src = THEMES[mode].icon;
    label.textContent = THEMES[mode].name;
  };

  const setTheme = mode => {
    if (mode === 'system') {
      localStorage.removeItem('theme');
    } else {
      localStorage.setItem('theme', mode);
    }
    applyTheme(mode);
    options.classList.add('hidden');
    dropdown.setAttribute('aria-expanded', 'false');
  };

  // Init
  applyTheme(getSaved());

  // Toggle dropdown
  dropdown.addEventListener('click', () => {
    options.classList.toggle('hidden');
    dropdown.setAttribute(
      'aria-expanded',
      options.classList.contains('hidden') ? 'false' : 'true'
    );
  });

  // Click on options
  options.querySelectorAll('li').forEach(option => {
    option.addEventListener('click', () => {
      const theme = option.getAttribute('data-theme');
      setTheme(theme);
    });
  });

  // Close on outside click
  document.addEventListener('click', e => {
    if (!dropdown.contains(e.target) && !options.contains(e.target)) {
      options.classList.add('hidden');
      dropdown.setAttribute('aria-expanded', 'false');
    }
  });
});
