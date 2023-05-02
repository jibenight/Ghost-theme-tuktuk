function setTheme(theme) {
  if (theme === 'dark') {
    document.documentElement.classList.add('dark');
    localStorage.theme = 'dark';
  } else if (theme === 'light') {
    document.documentElement.classList.remove('dark');
    localStorage.theme = 'light';
  } else {
    localStorage.removeItem('theme');
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }
}

document.addEventListener('DOMContentLoaded', function () {
  if (
    localStorage.theme === 'dark' ||
    (!('theme' in localStorage) &&
      window.matchMedia('(prefers-color-scheme: dark)').matches)
  ) {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }

  document.getElementById('light-mode').addEventListener('click', function () {
    setTheme('light');
  });

  document.getElementById('dark-mode').addEventListener('click', function () {
    setTheme('dark');
  });

  document.getElementById('auto-mode').addEventListener('click', function () {
    setTheme('auto');
  });
});
