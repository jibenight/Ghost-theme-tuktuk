let currentTheme = 'auto';

function setTheme(theme) {
  if (theme === 'dark') {
    document.documentElement.classList.add('dark');
    localStorage.theme = 'dark';
  } else if (theme === 'light') {
    document.documentElement.classList.remove('dark');
    localStorage.theme = 'light';
  } else {
    localStorage.theme = 'auto';
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }
}

function setInitialTheme() {
  const themeButton = document.getElementById('toggle-theme');

  if (
    localStorage.theme === 'dark' ||
    (!('theme' in localStorage) &&
      window.matchMedia('(prefers-color-scheme: dark)').matches)
  ) {
    document.documentElement.classList.add('dark');
    currentTheme = 'dark';
    themeButton.innerHTML = '<img src="../../partials/icons/moon.svg" >';
  } else if (localStorage.theme === 'light') {
    document.documentElement.classList.remove('dark');
    currentTheme = 'light';
    themeButton.innerHTML = '<img src="../../partials/icons/sun.svg" >';
  } else {
    currentTheme = 'auto';
    setTheme(currentTheme);
    themeButton.innerHTML = '<img src="../../partials/icons/auto.svg" >';
  }
}

document.addEventListener('DOMContentLoaded', function () {
  setInitialTheme();
  document
    .getElementById('toggle-theme')
    .addEventListener('click', function () {
      const themeButton = document.getElementById('toggle-theme');
      if (currentTheme === 'light') {
        currentTheme = 'dark';
        themeButton.innerHTML = '<img src="../../partials/icons/moon.svg" >';
      } else if (currentTheme === 'dark') {
        currentTheme = 'auto';
        themeButton.innerHTML = '<img src="../../partials/icons/auto.svg" >';
      } else {
        currentTheme = 'light';
        themeButton.innerHTML = '<img src="../../partials/icons/sun.svg" >';
      }
      setTheme(currentTheme);
    });
});
