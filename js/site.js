(() => {
  const THEME_KEY = "portfolio:darkMode";
  const THEME_FADE_MS = 320;

  const darkToggle = document.querySelector("#dark-toggle");
  let themeFadeTimer;

  const applyDarkMode = (enabled) => {
    if (darkToggle) {
      darkToggle.checked = enabled;
    }
    document.body.classList.toggle("dark-mode", enabled);
  };

  if (darkToggle) {
    let savedDarkMode = false;
    try {
      savedDarkMode = localStorage.getItem(THEME_KEY) === "true";
    } catch (_) {
      savedDarkMode = false;
    }

    applyDarkMode(savedDarkMode);

    darkToggle.addEventListener("change", () => {
      const enabled = darkToggle.checked;

      document.body.classList.add("theme-switching");
      clearTimeout(themeFadeTimer);
      requestAnimationFrame(() => {
        applyDarkMode(enabled);
      });
      themeFadeTimer = setTimeout(() => {
        document.body.classList.remove("theme-switching");
      }, THEME_FADE_MS);

      try {
        localStorage.setItem(THEME_KEY, String(enabled));
      } catch (_) {
        // Ignore storage failures (private mode, blocked storage, etc.).
      }
    });
  }

  const year = new Date().getFullYear();
  document.querySelectorAll(".footer-year").forEach((node) => {
    node.textContent = String(year);
  });
})();
