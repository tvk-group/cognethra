(() => {
  const APP_URL = "/app/";
  let deferredPrompt = null;

  const isStandalone = () =>
    window.matchMedia("(display-mode: standalone)").matches ||
    window.navigator.standalone === true;

  const isIos = () => /iphone|ipad|ipod/i.test(navigator.userAgent);

  const registerSw = () => {
    if (!("serviceWorker" in navigator)) return;
    window.addEventListener("load", () => {
      navigator.serviceWorker.register("/sw.js", { scope: "/" }).catch(() => {});
    });
  };

  const bindInstallButton = (btn) => {
    if (!btn) return;
    btn.addEventListener("click", async () => {
      if (deferredPrompt) {
        deferredPrompt.prompt();
        await deferredPrompt.userChoice;
        deferredPrompt = null;
        btn.hidden = true;
        return;
      }
      window.location.href = APP_URL;
    });
  };

  const mountInstallUi = () => {
    if (isStandalone()) return;

    const btn = document.getElementById("pwa-install-btn");
    const bannerBtn = document.getElementById("pwa-install-banner-btn");
    const iosHint = document.getElementById("pwa-ios-hint");
    const banner = document.getElementById("pwa-install-banner");

    if (isIos() && iosHint) iosHint.hidden = false;

    window.addEventListener("beforeinstallprompt", (e) => {
      e.preventDefault();
      deferredPrompt = e;
      if (btn) btn.hidden = false;
      if (banner) banner.hidden = false;
    });

    bindInstallButton(btn);
    bindInstallButton(bannerBtn);
  };

  registerSw();
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", mountInstallUi);
  } else {
    mountInstallUi();
  }

  window.COGNETHRA_PWA = { isStandalone, isIos, getAppUrl: () => APP_URL };
})();
