/* Theme toggle script
   - Stores preference in localStorage under 'site-theme'
   - Toggles .dark on documentElement
   - Button displays the word "Theme" as requested
*/

(function () {
  const STORAGE_KEY = 'site-theme';
  const DARK_CLASS = 'dark';
  const TOGGLE_ID = 'theme-toggle';

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
      // ignore storage errors
    }
  }

  function systemPrefersDark() {
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  }

  function applyTheme(theme) {
    const root = document.documentElement;
    const btn = document.getElementById(TOGGLE_ID);

    if (theme === 'dark') root.classList.add(DARK_CLASS);
    else root.classList.remove(DARK_CLASS);

    if (btn) {
      btn.textContent = 'Theme';
      btn.setAttribute('aria-pressed', theme === 'dark' ? 'true' : 'false');
      btn.setAttribute('aria-label', theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme');
    }
  }

  function init() {
    const btn = document.getElementById(TOGGLE_ID);
    let theme = getStoredTheme();

    if (!theme) theme = systemPrefersDark() ? 'dark' : 'light';

    applyTheme(theme);

    if (!btn) return;

    btn.addEventListener('click', function (e) {
      e.preventDefault();
      const currentlyDark = document.documentElement.classList.contains(DARK_CLASS);
      const next = currentlyDark ? 'light' : 'dark';
      applyTheme(next);
      storeTheme(next);
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
