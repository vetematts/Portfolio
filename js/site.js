(() => {
  const year = new Date().getFullYear();
  document.querySelectorAll(".footer-year").forEach((node) => {
    node.textContent = String(year);
  });
})();
