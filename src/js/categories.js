// ======== CATEGORY FETCH ========
const categoryURL = "https://opentdb.com/api_category.php";

const desktopContainer = document.getElementById("desktop-categories");
const mobileContainer = document.getElementById("mobile-categories");

async function loadCategories() {
  try {
    const res = await fetch(categoryURL);
    const data = await res.json();
    const categories = data.trivia_categories; // Array of {id, name}

    renderDesktop(categories);
    renderMobile(categories);
  } catch (err) {
    console.error("Failed to load categories:", err);
    desktopContainer.innerHTML = `<p class="text-center text-red-400">Failed to load categories.</p>`;
  }
}

loadCategories();

// =============================
//  RENDER DESKTOP
// =============================
function renderDesktop(categories) {
  desktopContainer.innerHTML = "";

  categories.forEach((cat) => {
    const card = document.createElement("div");
    card.className =
      "ultra-card sweep-hover cursor-pointer flex flex-col items-center justify-center text-center";
    card.innerHTML = `
      <iconify-icon icon="mdi:book-education-outline" class="text-primary text-5xl mb-4"></iconify-icon>
      <h3 class="text-xl font-semibold text-primary">${cat.name}</h3>
      <p class="text-sm text-base-content/70">Start quiz on ${cat.name}</p>
    `;
    card.addEventListener("click", () => selectCategory(cat.id, cat.name));
    desktopContainer.appendChild(card);
  });
}

// ======== RENDER MOBILE ========
function renderMobile(categories) {
  mobileContainer.innerHTML = "";

  categories.forEach((cat) => {
    const card = document.createElement("article");
    card.className =
      "glass-box article-card sweep-hover text-center p-5 cursor-pointer";
    card.innerHTML = `
      <iconify-icon icon="mdi:book-education-outline" class="text-accent text-4xl mb-3"></iconify-icon>
      <h3 class="text-lg font-semibold text-accent">${cat.name}</h3>
      <p class="text-sm text-base-content/70">Start quiz on ${cat.name}</p>
    `;
    card.addEventListener("click", () => selectCategory(cat.id, cat.name));
    mobileContainer.appendChild(card);
  });
}

// ======== SAVE CATEGORY AND REDIRECT ========
function selectCategory(id, name) {
  localStorage.setItem("selectedCategoryId", id);
  localStorage.setItem("selectedCategoryName", name);
  window.location.href = "quiz.html";
}

loadCategories();
