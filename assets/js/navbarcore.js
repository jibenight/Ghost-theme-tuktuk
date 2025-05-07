document.addEventListener('DOMContentLoaded', function () {
  const burger = document.querySelector('.navbar-burger');
  const menu = document.querySelector('.navbar-menu');
  const close = document.querySelector('.navbar-close');
  const backdrop = document.querySelector('.navbar-backdrop');
  const header = document.getElementById('site-header');

  let isHeaderVisible = true;
  let lastScrollTop = 0;
  let mouseLastMoved = Date.now();
  let inactivityTimer;
  let scrollPosition = 0;

  function getScrollbarWidth() {
    return window.innerWidth - document.documentElement.clientWidth;
  }

  // --- MENU BURGER ----
  function openMenu() {
    if (menu) {
      scrollPosition = window.scrollY;

      // Bloque le scroll et garde la position visuellement
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollPosition}px`;
      document.body.style.left = '0';
      document.body.style.right = '0';
      document.body.style.width = '100%';

      menu.classList.remove('hidden', 'animate-slide-fade-out');
      void menu.offsetWidth;
      menu.classList.add(
        'fixed',
        'inset-0',
        'w-screen',
        'h-screen',
        'z-[999]',
        'animate-slide-fade-in'
      );
    }
  }

  function closeMenu() {
    if (menu) {
      menu.classList.remove('animate-slide-fade-in');
      menu.classList.add('animate-slide-fade-out');

      setTimeout(() => {
        menu.classList.add('hidden');
        menu.classList.remove(
          'fixed',
          'inset-0',
          'w-screen',
          'h-screen',
          'z-[999]'
        );

        // Restaure la position scroll sans effet de saut
        const scrollY = parseInt(document.body.style.top || '0') * -1;
        document.body.style.position = '';
        document.body.style.top = '';
        document.body.style.left = '';
        document.body.style.right = '';
        document.body.style.width = '';
        window.scrollTo(0, scrollY);
      }, 300);
    }
  }

  // --- HEADER VISIBILITY ---
  function showHeader() {
    if (!isHeaderVisible) {
      header.classList.remove('translate-y-neg-120');
      isHeaderVisible = true;
    }
  }

  function hideHeader() {
    const scrollTop = window.scrollY;
    if (
      isHeaderVisible &&
      scrollTop > 0 &&
      header.classList.contains('w-[30%]')
    ) {
      header.classList.add('translate-y-neg-120');
      isHeaderVisible = false;
    }
  }

  function resetInactivityTimer() {
    if (inactivityTimer) clearTimeout(inactivityTimer);
    inactivityTimer = setTimeout(() => {
      hideHeader();
    }, 2000);
  }

  // --- HEADER WIDTH ---
  function updateHeaderWidth() {
    const scrollTop = window.scrollY;
    const isDesktop = window.innerWidth > 768;

    if (!isDesktop) return;

    if (scrollTop === 0) {
      header.classList.add('w-full', 'py-2');
      header.classList.remove('w-[30%]', 'shadow-md');
      showHeader(); // Toujours visible en haut de page
    } else {
      const wasCompact = header.classList.contains('w-[30%]');
      header.classList.add('w-[30%]', 'shadow-md');
      header.classList.remove('w-full', 'py-2');

      // Si on vient juste de compacter → lancer timer
      if (!wasCompact) {
        resetInactivityTimer();
      }
    }
  }

  // --- ÉVÉNEMENTS ---
  if (burger) burger.addEventListener('click', openMenu);
  if (close) close.addEventListener('click', closeMenu);
  if (backdrop) backdrop.addEventListener('click', closeMenu);

  window.addEventListener('scroll', () => {
    updateHeaderWidth();
    // On ne reset pas l'inactivité ici (plus de disparition au scroll seul)
  });

  window.addEventListener('mousemove', () => {
    mouseLastMoved = Date.now();
    showHeader();

    if (header.classList.contains('w-[30%]')) {
      resetInactivityTimer();
    }
  });

  window.addEventListener('resize', updateHeaderWidth);

  // --- INIT ---
  updateHeaderWidth();
  showHeader();
});
