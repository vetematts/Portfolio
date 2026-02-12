(() => {
  const THEME_KEY = "portfolio:darkMode";
  const DARK_THEME_COLOR = "#0d1a33";
  const LIGHT_THEME_COLOR = "#e7d8bb";

  const darkToggle = document.querySelector("#dark-toggle");
  const themeMeta = document.querySelector('meta[name="theme-color"]');
  const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
  let hasStoredPreference = false;

  const applyDarkMode = (enabled) => {
    if (darkToggle) {
      darkToggle.checked = enabled;
    }
    document.body.classList.toggle("dark-mode", enabled);
    document.documentElement.style.colorScheme = enabled ? "dark" : "light";
    if (themeMeta) {
      themeMeta.setAttribute("content", enabled ? DARK_THEME_COLOR : LIGHT_THEME_COLOR);
    }
  };

  let initialDarkMode = mediaQuery.matches;
  try {
    const stored = localStorage.getItem(THEME_KEY);
    if (stored === "true" || stored === "false") {
      hasStoredPreference = true;
      initialDarkMode = stored === "true";
    }
  } catch (_) {
    hasStoredPreference = false;
  }

  applyDarkMode(initialDarkMode);

  if (darkToggle) {
    darkToggle.addEventListener("change", () => {
      const enabled = darkToggle.checked;
      hasStoredPreference = true;
      applyDarkMode(enabled);

      try {
        localStorage.setItem(THEME_KEY, String(enabled));
      } catch (_) {
        // Ignore storage failures (private mode, blocked storage, etc.).
      }
    });
  }

  const handleSystemThemeChange = (event) => {
    if (hasStoredPreference) {
      return;
    }
    applyDarkMode(event.matches);
  };

  if (typeof mediaQuery.addEventListener === "function") {
    mediaQuery.addEventListener("change", handleSystemThemeChange);
  } else if (typeof mediaQuery.addListener === "function") {
    mediaQuery.addListener(handleSystemThemeChange);
  }

  const year = new Date().getFullYear();
  document.querySelectorAll(".footer-year").forEach((node) => {
    node.textContent = String(year);
  });
})();
