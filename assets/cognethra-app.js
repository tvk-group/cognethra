(() => {
  const showPanel = (id) => {
    document.querySelectorAll(".app-panel").forEach((panel) => {
      panel.classList.toggle("active", panel.dataset.panel === id);
    });
    document.querySelectorAll(".app-tabbar a[data-tab]").forEach((link) => {
      const active = link.dataset.tab === id;
      link.classList.toggle("active", active);
      if (active) link.setAttribute("aria-current", "page");
      else link.removeAttribute("aria-current");
    });
    if (id && id !== "home") window.location.hash = id;
    else if (id === "home") history.replaceState(null, "", window.location.pathname);
  };

  document.querySelectorAll(".app-tabbar a[data-tab]").forEach((link) => {
    link.addEventListener("click", (event) => {
      event.preventDefault();
      showPanel(link.dataset.tab);
    });
  });

  document.querySelectorAll("[data-goto-tab]").forEach((link) => {
    link.addEventListener("click", (event) => {
      event.preventDefault();
      showPanel(link.dataset.gotoTab);
    });
  });

  const hash = window.location.hash.replace("#", "");
  const valid = ["home", "runtime", "memory", "research"];
  showPanel(valid.includes(hash) ? hash : "home");

  window.addEventListener("hashchange", () => {
    const next = window.location.hash.replace("#", "");
    if (valid.includes(next)) showPanel(next);
  });
})();
