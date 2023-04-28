function setTheme(theme) {
  if (theme === 'Dark') {
    document.documentElement.classList.add('dark');
    localStorage.theme = 'dark';
  } else if (theme === 'Light') {
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

  var colorSchemeSelect = document.getElementById('select-ember88');
  colorSchemeSelect.addEventListener('change', function () {
    setTheme(colorSchemeSelect.value);
  });
});
