document.addEventListener('DOMContentLoaded', () => {
  const burgerButtons = document.querySelectorAll('.navbar-burger');
  const menus = document.querySelectorAll('.navbar-menu');
  const closeButtons = document.querySelectorAll('.navbar-close');
  const backdrops = document.querySelectorAll('.navbar-backdrop');

  if (burgerButtons.length && menus.length) {
    burgerButtons.forEach(burger => {
      burger.addEventListener('click', () => {
        menus.forEach(menu => {
          menu.classList.remove('hidden');
          menu.classList.remove('animate-slideOut');
          menu.classList.add('animate-slideIn');
        });
      });
    });
  }

  if (closeButtons.length) {
    closeButtons.forEach(close => {
      close.addEventListener('click', () => {
        menus.forEach(menu => {
          menu.classList.add('hidden');
        });
      });
    });
  }

  if (backdrops.length) {
    backdrops.forEach(backdrop => {
      backdrop.addEventListener('click', () => {
        menus.forEach(menu => {
          menu.classList.add('hidden');
        });
      });
    });
  }
});
