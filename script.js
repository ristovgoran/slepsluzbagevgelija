const toggle = document.querySelector(".menu-toggle");
const nav = document.querySelector(".nav");

if (toggle && nav) {
  toggle.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("open");
    toggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
    toggle.textContent = isOpen ? "Затвори" : "Мени";

    if (!isOpen) {
      document.querySelectorAll(".has-dropdown.open").forEach((wrap) => {
        wrap.classList.remove("open");
        const btn = wrap.querySelector(".drop-trigger");
        if (btn) btn.setAttribute("aria-expanded", "false");
      });
    }
  });
}

document.querySelectorAll(".has-dropdown .drop-trigger").forEach((btn) => {
  btn.addEventListener("click", (e) => {
    e.preventDefault();
    const wrap = btn.closest(".has-dropdown");
    const isOpen = wrap.classList.toggle("open");
    btn.setAttribute("aria-expanded", isOpen ? "true" : "false");
  });
});

document.addEventListener("click", (e) => {
  document.querySelectorAll(".has-dropdown.open").forEach((wrap) => {
    if (!wrap.contains(e.target)) {
      wrap.classList.remove("open");
      const btn = wrap.querySelector(".drop-trigger");
      if (btn) btn.setAttribute("aria-expanded", "false");
    }
  });
});

(() => {
  const path = window.location.pathname.replace(/index\.html$/, "");
  const home = document.querySelector('.nav a[data-nav="home"]');
  const contact = document.querySelector('.nav a[data-nav="contact"]');
  const services = document.querySelector('.nav .has-dropdown[data-nav="services"]');
  const regions = document.querySelector('.nav .has-dropdown[data-nav="regions"]');

  if (path === "/" || path === "") home?.classList.add("active");
  if (path.startsWith("/uslugi/")) services?.classList.add("active");
  if (path.startsWith("/lokacii/")) regions?.classList.add("active");
  if (path.startsWith("/kontakt/")) contact?.classList.add("active");
})();

if (window.location.protocol === "file:") {
  const scriptTag = document.currentScript || document.querySelector('script[src*="script.js"]');
  const scriptSrc = scriptTag ? scriptTag.src : window.location.href;
  const root = scriptSrc.replace(/\/script\.js.*$/, "/");

  document.querySelectorAll('a[href^="/"]').forEach((a) => {
    const raw = a.getAttribute("href");
    let path = raw === "/" ? "index.html" : raw.replace(/^\//, "");
    if (path.endsWith("/")) path += "index.html";
    a.href = root + path;
  });

  document.querySelectorAll('img[src^="/"]').forEach((img) => {
    const src = img.getAttribute("src").replace(/^\//, "");
    img.src = root + src;
  });
}
