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

  const getSaved = () => {
    const saved = localStorage.getItem('theme');
    return THEMES.hasOwnProperty(saved) ? saved : 'system';
  };

  const applyTheme = mode => {
    const validMode = THEMES.hasOwnProperty(mode) ? mode : 'system';
    const resolved = validMode === 'system' ? getSystem() : validMode;
    html.classList.toggle('dark', resolved === 'dark');
    icon.src = THEMES[validMode].icon;
    label.textContent = THEMES[validMode].name;
  };

  const setTheme = mode => {
    if (mode === 'system') {
      localStorage.removeItem('theme');
    } else if (THEMES.hasOwnProperty(mode)) {
      localStorage.setItem('theme', mode);
    } else {
      console.warn(`Thème invalide ignoré : ${mode}`);
      return;
    }
    applyTheme(mode);
    options.classList.add('hidden');
    dropdown.setAttribute('aria-expanded', 'false');
  };

  // Initialisation
  applyTheme(getSaved());

  // Ouverture/fermeture du menu
  dropdown.addEventListener('click', () => {
    options.classList.toggle('hidden');
    dropdown.setAttribute(
      'aria-expanded',
      options.classList.contains('hidden') ? 'false' : 'true'
    );
  });

  // Choix du thème
  options.querySelectorAll('li').forEach(option => {
    option.addEventListener('click', () => {
      const theme = option.getAttribute('data-theme');
      setTheme(theme);
    });
  });

  // Fermeture du menu si clic en dehors
  document.addEventListener('click', e => {
    if (!dropdown.contains(e.target) && !options.contains(e.target)) {
      options.classList.add('hidden');
      dropdown.setAttribute('aria-expanded', 'false');
    }
  });
});
