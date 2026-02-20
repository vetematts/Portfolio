(() => {
  const THEME_KEY = "portfolio:darkMode";
  const DARK_THEME_COLOR = "#0d1a33";
  const LIGHT_THEME_COLOR = "#e7d8bb";
  const DARK_FAVICON = "images/favicon-dark.png";
  const LIGHT_FAVICON = "images/favicon-light.png";
  const FIGMA_ICON_LIGHT = "images/figma-icon.svg";
  const FIGMA_ICON_DARK = "images/figma-icon-dark.svg";
  const OFFICE_ICON_LIGHT = "images/office-icon.svg";
  const OFFICE_ICON_DARK = "images/office-icon-dark.svg";

  const darkToggle = document.querySelector("#dark-toggle");
  const themeMeta = document.querySelector('meta[name="theme-color"]');
  let faviconLink = document.querySelector('link[rel="icon"]');
  const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
  let hasStoredPreference = false;

  const setFavicon = (enabled) => {
    if (!faviconLink) {
      faviconLink = document.createElement("link");
      faviconLink.rel = "icon";
      faviconLink.type = "image/png";
      document.head.appendChild(faviconLink);
    }
    faviconLink.setAttribute("href", enabled ? DARK_FAVICON : LIGHT_FAVICON);
  };

  const setSkillsIcons = (enabled) => {
    const updates = [
      [FIGMA_ICON_LIGHT, FIGMA_ICON_DARK],
      [OFFICE_ICON_LIGHT, OFFICE_ICON_DARK],
    ];

    updates.forEach(([lightSrc, darkSrc]) => {
      const selector = `img[src$="${lightSrc}"], img[src$="${darkSrc}"]`;
      document.querySelectorAll(selector).forEach((img) => {
        img.setAttribute("src", enabled ? darkSrc : lightSrc);
      });
    });
  };

  const applyDarkMode = (enabled) => {
    if (darkToggle) {
      darkToggle.checked = enabled;
    }
    document.body.classList.toggle("dark-mode", enabled);
    document.documentElement.style.colorScheme = enabled ? "dark" : "light";
    if (themeMeta) {
      themeMeta.setAttribute("content", enabled ? DARK_THEME_COLOR : LIGHT_THEME_COLOR);
    }
    setFavicon(enabled);
    setSkillsIcons(enabled);
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
