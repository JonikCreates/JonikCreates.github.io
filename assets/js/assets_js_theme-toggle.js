/* Small theme toggle script.
   - Stores preference in localStorage under 'site-theme'
   - Applies .dark to :root for dark mode
   - Uses prefers-color-scheme if no saved preference
*/

(function () {
  const STORAGE_KEY = 'site-theme';
  const DARK_CLASS = 'dark';
  const toggleId = 'theme-toggle';

  function getStoredTheme() {
    try {
      return localStorage.getItem(STORAGE_KEY);
    } catch (e) {
      return null;
    }
  }

  function storeTheme(theme) {
    try {
      localStorage.setItem(STORAGE_KEY, theme);
    } catch (e) {
      // ignore
    }
  }

  function systemPrefersDark() {
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  }

  function applyTheme(theme) {
    const root = document.documentElement;
    const btn = document.getElementById(toggleId);

    if (theme === 'dark') {
      root.classList.add(DARK_CLASS);
    } else {
      root.classList.remove(DARK_CLASS);
    }

    if (btn) {
      // show a simple icon — moon for light mode (to switch to dark), sun for dark mode (to switch to light)
      btn.textContent = theme === 'dark' ? '☀️' : '🌙';
      btn.setAttribute('aria-pressed', theme === 'dark' ? 'true' : 'false');
    }
  }

  function init() {
    const btn = document.getElementById(toggleId);
    let theme = getStoredTheme();

    if (!theme) {
      theme = systemPrefersDark() ? 'dark' : 'light';
    }

    applyTheme(theme);

    if (!btn) return;

    btn.addEventListener('click', function () {
      const currentlyDark = document.documentElement.classList.contains(DARK_CLASS);
      const next = currentlyDark ? 'light' : 'dark';
      applyTheme(next);
      storeTheme(next);
    });
  }

  // Run on DOMContentLoaded so the toggle button is present
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();