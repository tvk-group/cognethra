(() => {
  const mobileToggle = document.querySelector("[data-mobile-toggle]");
  const mobileMenu = document.querySelector("[data-mobile-menu]");
  const languageSelects = document.querySelectorAll("[data-language-select]");
  const header = document.querySelector("header");

  if (mobileToggle && mobileMenu) {
    mobileToggle.addEventListener("click", () => {
      const isOpen = document.body.classList.toggle("menu-open");
      mobileToggle.setAttribute("aria-expanded", String(isOpen));
    });
    mobileMenu.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        document.body.classList.remove("menu-open");
        mobileToggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  languageSelects.forEach((select) => {
    select.addEventListener("change", (event) => {
      const target = event.target.value;
      if (!target) return;
      const pageKind = select.dataset.pageKind || "home";
      if (pageKind === "home") {
        window.location.href = target.endsWith("/") ? target : `${target}/`;
        return;
      }
      window.location.href = target.startsWith("/") ? target : `/${target}`;
    });
  });

  const setActiveNav = () => {
    const sections = ["about", "capabilities", "process", "ecosystem", "usecases", "roadmap", "contact"];
    const scrollY = window.scrollY + 120;
    let current = "";
    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el && el.offsetTop <= scrollY) current = id;
    });
    document.querySelectorAll('.nav-links a[href^="#"]').forEach((a) => {
      a.classList.toggle("active", a.getAttribute("href") === `#${current}`);
    });
  };

  const onScroll = () => {
    if (header) {
      header.classList.toggle("header-scrolled", window.scrollY > 40);
    }
    setActiveNav();
  };

  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  const revealEls = document.querySelectorAll("[data-reveal]");
  if (revealEls.length && "IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    revealEls.forEach((el, i) => {
      el.style.setProperty("--reveal-delay", `${Math.min(i * 60, 240)}ms`);
      observer.observe(el);
    });
  } else {
    revealEls.forEach((el) => el.classList.add("is-visible"));
  }

  const heroCopy = document.querySelector(".hero-copy");
  if (heroCopy) {
    requestAnimationFrame(() => heroCopy.classList.add("hero-entered"));
  }
})();
