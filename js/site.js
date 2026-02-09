(() => {
  const THEME_KEY = "portfolio:darkMode";

  const darkToggle = document.querySelector("#dark-toggle");
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
      applyDarkMode(enabled);
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
