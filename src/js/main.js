import gsap from "gsap";

let lastScroll = 0;
const nav = document.querySelector("#omniNav");
const navHeight = nav.offsetHeight;

gsap.set(nav, { y: 0 }); // Initial position

window.addEventListener("scroll", () => {
  const currentScroll =
    window.pageYOffset || document.documentElement.scrollTop;

  if (currentScroll > lastScroll && currentScroll > navHeight) {
    // Scroll down → hide nav
    gsap.to(nav, { y: -navHeight - 20, duration: 0.5, ease: "power2.out" });
  } else if (currentScroll < lastScroll) {
    // Scroll up → show nav
    gsap.to(nav, { y: 0, duration: 0.5, ease: "power2.out" });
  }

  lastScroll = currentScroll <= 0 ? 0 : currentScroll;
});

// Mobile dock navigation
document.querySelectorAll("[data-nav]").forEach((btn) => {
  btn.addEventListener("click", (e) => {
    const target = btn.dataset.nav;
    // Replace this with actual navigation logic
    if (target === "dashboard") window.location.href = "./dashboard.html";
    else if (target === "profile") window.location.href = "./profile.html";
    else if (target === "categories")
      window.location.href = "./categories.html";
    else if (target === "leaderboard")
      window.location.href = "./leaderboard.html";
  });
});

(function () {
  // Elements
  const topLinks = Array.from(document.querySelectorAll(".nav-link[data-nav]"));
  const drawerLinks = Array.from(
    document.querySelectorAll(".drawer-link[data-nav]")
  );
  const dockButtons = Array.from(
    document.querySelectorAll("#mobileDock [data-nav]")
  );
  const dockOpenBtn = document.querySelector("[data-open-drawer]");
  const drawerToggle = document.getElementById("omniDrawer");
  const btnDrawer = document.getElementById("btn-drawer");
  const btnDrawerMd = document.getElementById("btn-drawer-md");
  const navHeader = document.getElementById("omniNav");

  // Utility: setActive (keeps all navs synced)
  function setActive(key) {
    // clear
    topLinks.forEach((el) => el.classList.remove("nav-active"));
    drawerLinks.forEach((el) =>
      el.classList.remove("bg-base-300", "nav-active")
    );
    dockButtons.forEach((el) => el.classList.remove("text-primary"));

    // set
    topLinks
      .filter((x) => x.dataset.nav === key)
      .forEach((el) => el.classList.add("nav-active"));
    drawerLinks
      .filter((x) => x.dataset.nav === key)
      .forEach((el) => el.classList.add("bg-base-300", "nav-active"));
    dockButtons
      .filter((x) => x.dataset.nav === key)
      .forEach((el) => el.classList.add("text-primary"));

    // store
    try {
      localStorage.setItem("psq_active", key);
    } catch (e) {
      /* ignore */
    }
  }

  // Initialize active from localStorage or based on URL path
  function getInitial() {
    try {
      const stored = localStorage.getItem("psq_active");
      if (stored) return stored;
    } catch (e) {}
    // fallback: infer from path
    const path =
      location.pathname.replace(/\/$/, "").split("/").pop() || "home";
    const map = {
      categories: "categories",
      leaderboard: "leaderboard",
      dashboard: "dashboard",
      profile: "profile",
      "": "home",
    };
    return map[path] || path;
  }

  // Attach click handlers: top links
  topLinks.forEach((link) => {
    link.addEventListener("click", (ev) => {
      const key = link.dataset.nav;
      setActive(key);
      // let normal navigation occur after sync
    });
    // mouse move for spotlight
    link.addEventListener("mousemove", (e) => {
      link.style.setProperty("--x", (e.offsetX / link.offsetWidth) * 100 + "%");
      link.style.setProperty(
        "--y",
        (e.offsetY / link.offsetHeight) * 100 + "%"
      );
    });
  });

  // drawer links
  drawerLinks.forEach((link) => {
    link.addEventListener("click", (ev) => {
      const key = link.dataset.nav;
      setActive(key);
      // close drawer when clicking an item (mobile friendly)
      if (drawerToggle) drawerToggle.checked = false;
    });
  });

  // dock buttons
  dockButtons.forEach((btn) => {
    btn.addEventListener("click", (ev) => {
      const key = btn.dataset.nav;
      setActive(key);
      // simulate navigation if desired: window.location = btn.getAttribute('data-href') or href on element
      const href = btn.closest("button")?.getAttribute("data-href") || null;
      // if actual href is wanted, put data-href attr; currently they are intended to be real anchor links or handled by SPA
    });
  });

  // dock open drawer
  if (dockOpenBtn) {
    dockOpenBtn.addEventListener("click", () => {
      if (drawerToggle) drawerToggle.checked = true;
      // focus the drawer close button for accessibility
      setTimeout(() => {
        const close = document.querySelector(
          '.drawer-side label[for="omniDrawer"]'
        );
        if (close) close.focus();
      }, 220);
    });
  }

  // top drawer open buttons sync ARIA
  [btnDrawer, btnDrawerMd].forEach((b) => {
    if (!b) return;
    b.addEventListener("click", () => {
      const expanded = drawerToggle.checked;
      b.setAttribute("aria-expanded", String(!expanded));
    });
  });

  // close drawer on Escape
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && drawerToggle && drawerToggle.checked) {
      drawerToggle.checked = false;
    }
  });

  // shrink-on-scroll micro-interaction
  let lastScroll = 0;
  window.addEventListener(
    "scroll",
    () => {
      const cur = window.scrollY;
      if (cur > lastScroll && cur > 30) {
        navHeader.style.transform = "translate(-50%, -14px) scale(0.97)";
        navHeader.style.opacity = "0.95";
      } else {
        navHeader.style.transform = "translate(-50%, 0) scale(1)";
        navHeader.style.opacity = "1";
      }
      lastScroll = cur;
    },
    { passive: true }
  );

  // initialize active
  setActive(getInitial());

  // responsive: when switching to desktop ensure drawer unchecked
  window.addEventListener("resize", () => {
    if (window.innerWidth >= 768 && drawerToggle) drawerToggle.checked = false;
  });
})();
