// ================================
// SAFE GSAP FALLBACK (NO CRASH)
// ================================
const gsapSafe = window.gsap || null;

// ================================
// RUN ONLY AFTER DOM LOADS
// ================================
document.addEventListener("DOMContentLoaded", () => {
  const signinTab = document.getElementById("signin-tab");
  const signupTab = document.getElementById("signup-tab");
  const signinForm = document.getElementById("signin-form");
  const signupForm = document.getElementById("signup-form");

  // ✅ HARD SAFETY CHECK
  if (!signinTab || !signupTab || !signinForm || !signupForm) {
    console.error("Auth elements missing from DOM.");
    return;
  }

  // ================================
  // TAB SWITCHING
  // ================================
  signinTab.addEventListener("click", () => {
    signinTab.classList.add("tab-active");
    signupTab.classList.remove("tab-active");

    signinForm.classList.remove("hidden");
    signupForm.classList.add("hidden");
  });

  signupTab.addEventListener("click", () => {
    signupTab.classList.add("tab-active");
    signinTab.classList.remove("tab-active");

    signupForm.classList.remove("hidden");
    signinForm.classList.add("hidden");
  });

  // ================================
  // SIGN UP LOGIC (SINGLE HANDLER)
  // ================================
  signupForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = signupForm.querySelector("input[type='text']").value.trim();

    const email = signupForm
      .querySelector("input[type='email']")
      .value.trim()
      .toLowerCase();

    const password = signupForm
      .querySelector("input[type='password']")
      .value.trim();

    if (!name || !email || !password) {
      alert("All fields are required");
      return;
    }

    const users = JSON.parse(localStorage.getItem("pss_users")) || [];

    const userExists = users.find((user) => user.email === email);
    if (userExists) {
      alert("Account already exists. Please sign in.");
      signinTab.click();
      return;
    }

    const newUser = { name, email, password };
    users.push(newUser);
    localStorage.setItem("pss_users", JSON.stringify(users));

    // AUTO LOGIN AFTER SIGNUP
    localStorage.setItem("pss_logged_in", JSON.stringify(newUser));

    signupForm.reset();

    alert("Account created successfully!");
    window.location.href = "./categories.html";
  });

  // ================================
  //  SIGN IN LOGIC (SINGLE HANDLER)
  // ================================
  signinForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const email = signinForm
      .querySelector("input[type='email']")
      .value.trim()
      .toLowerCase();

    const password = signinForm
      .querySelector("input[type='password']")
      .value.trim();

    const users = JSON.parse(localStorage.getItem("pss_users")) || [];

    const validUser = users.find(
      (user) => user.email === email && user.password === password
    );

    if (!validUser) {
      alert("Invalid email or password");
      return;
    }

    localStorage.setItem("pss_logged_in", JSON.stringify(validUser));
    window.location.href = "./categories.html";
  });
});

// ================================
// AUTH GUARD (FOR PROTECTED PAGES ONLY)
// Put this SAME FILE on categories.html also
// It will NOT break the login page
// ================================
const protectedPages = ["categories.html", "dashboard.html", "profile.html"];

const currentPage = location.pathname.split("/").pop();

if (protectedPages.includes(currentPage)) {
  const user = JSON.parse(localStorage.getItem("pss_logged_in"));

  if (!user) {
    window.location.href = "./index.html";
  }
}
