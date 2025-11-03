// // main.js — Nav, GSAP, optional Lottie fallback, icon micro-animations
// import gsap from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";
// gsap.registerPlugin(ScrollTrigger);

// const nav = document.getElementById("site-nav");
// const mobileToggle = document.getElementById("mobileToggle");
// const mobilePanel = document.getElementById("mobilePanel");
// const navLinks = Array.from(document.querySelectorAll(".nav-link"));
// const themeToggle = document.getElementById("themeToggle");
// const themeIcon = document.getElementById("themeIcon");
// const orbAnimEl = document.getElementById("orbAnim");
// const orbFallback = document.getElementById("orbFallback");

// // theme toggle (simple class toggle)
// let dark = document.documentElement.classList.contains("dark");
// function renderThemeIcon() {
//   if (dark) {
//     themeIcon.innerHTML =
//       '<path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" fill="currentColor"/>';
//   } else {
//     themeIcon.innerHTML =
//       '<path d="M12 3v2M12 19v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round" />';
//   }
// }
// renderThemeIcon();
// themeToggle?.addEventListener("click", () => {
//   dark = !dark;
//   document.documentElement.classList.toggle("dark", dark);
//   renderThemeIcon();
// });

// // mobile toggle (animated)
// let mobileOpen = false;
// mobileToggle?.addEventListener("click", () => {
//   mobileOpen = !mobileOpen;
//   mobileToggle.setAttribute("aria-expanded", String(mobileOpen));
//   if (mobileOpen) {
//     mobilePanel.classList.remove("hidden");
//     gsap.fromTo(
//       mobilePanel,
//       { y: -16, opacity: 0 },
//       { y: 0, opacity: 1, duration: 0.36, ease: "power3.out" }
//     );
//   } else {
//     gsap.to(mobilePanel, {
//       y: -12,
//       opacity: 0,
//       duration: 0.22,
//       onComplete: () => mobilePanel.classList.add("hidden"),
//     });
//   }
// });

// // nav link underline hover + active handling (GSAP)
// navLinks.forEach((link) => {
//   link.addEventListener("mouseenter", () => {
//     gsap.to(link, { y: -2, duration: 0.18, ease: "power2.out" });
//   });
//   link.addEventListener("mouseleave", () => {
//     gsap.to(link, { y: 0, duration: 0.22, ease: "power2.out" });
//   });
//   link.addEventListener("click", () => {
//     navLinks.forEach((l) => l.classList.remove("active"));
//     link.classList.add("active");
//   });
// });

// // GSAP entrance animations
// gsap.from("header", { y: -40, opacity: 0, duration: 0.9, ease: "power4.out" });
// gsap.from("#home h1", {
//   y: 30,
//   opacity: 0,
//   duration: 1.0,
//   ease: "power3.out",
//   delay: 0.1,
// });
// gsap.from("#home p", { y: 20, opacity: 0, duration: 0.9, delay: 0.2 });
// gsap.from(".ultra-card", {
//   scrollTrigger: { trigger: ".ultra-card", start: "top 85%" },
//   opacity: 0,
//   y: 24,
//   duration: 0.7,
//   stagger: 0.08,
//   ease: "power3.out",
// });

// // header hide on scroll (smooth)
// (function headerHide() {
//   let lastY = window.pageYOffset,
//     muted = false;
//   window.addEventListener(
//     "scroll",
//     () => {
//       const y = window.pageYOffset;
//       if (Math.abs(y - lastY) < 8) return;
//       if (y > lastY && y > 80) {
//         if (!muted)
//           gsap.to(nav, { y: -120, duration: 0.32, ease: "power2.in" }),
//             (muted = true);
//       } else {
//         if (muted)
//           gsap.to(nav, { y: 0, duration: 0.42, ease: "power3.out" }),
//             (muted = false);
//       }
//       lastY = y;
//     },
//     { passive: true }
//   );
// })();

// // ---------------------------
// // Optional Lottie animated orb
// // ---------------------------
// // If you want animated icons, run: `npm install lottie-web` and place a JSON at /assets/animations/orb.json
// (async function tryLoadLottie() {
//   if (!orbAnimEl) return;
//   try {
//     const lottie = (await import("lottie-web")).default;
//     // local path to animation JSON; you must provide this file if you want animation
//     const animPath = "/assets/animations/orb.json";
//     const anim = lottie.loadAnimation({
//       container: orbAnimEl,
//       renderer: "svg",
//       loop: true,
//       autoplay: true,
//       path: animPath,
//     });
//     // hide fallback svg once lottie loaded
//     orbFallback?.classList.add("opacity-0", "pointer-events-none");
//   } catch (err) {
//     // lottie not installed or animation missing — leave fallback visible
//     // console.warn("Lottie not available / animation missing. Falling back to SVG.");
//   }
// })();

// // ---------------------------
// // Accessibility: close mobile on focus loss / ESC
// // ---------------------------
// document.addEventListener("keydown", (e) => {
//   if (e.key === "Escape" && mobileOpen) {
//     mobileToggle?.click();
//   }
// });

// // tiny interactive pulse for logo on hover
// const brandLink = document.getElementById("brandLink");
// brandLink?.addEventListener("mouseenter", () =>
//   gsap.to(brandLink, { scale: 1.02, duration: 0.16 })
// );
// brandLink?.addEventListener("mouseleave", () =>
//   gsap.to(brandLink, { scale: 1, duration: 0.18 })
// );

// // End of file
