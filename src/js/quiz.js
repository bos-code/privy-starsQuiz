const categoryId = localStorage.getItem("selectedCategoryId");
const categoryName = localStorage.getItem("selectedCategoryName");

if (!categoryId) {
  alert("No category selected. Redirecting to categories page.");
  window.location.href = "categories.html";
}

document.getElementById(
  "quiz-category"
).textContent = `Category: ${categoryName}`;

const quizContainer = document.getElementById("quiz-container");
const nextBtn = document.getElementById("next-btn");
const questionCounter = document.getElementById("question-counter");
const quizResult = document.getElementById("quiz-result");
const scoreEl = document.getElementById("score");

let questions = [];
let currentQuestionIndex = 0;
let score = 0;

// Fetch questions from OpenTDB
async function loadQuestions() {
  try {
    const res = await fetch(
      `https://opentdb.com/api.php?amount=10&category=${categoryId}&type=multiple`
    );
    const data = await res.json();
    questions = data.results;
    showQuestion();
  } catch (err) {
    quizContainer.innerHTML = `<p class="text-red-400 text-center">Failed to load questions. Try again later.</p>`;
    console.error(err);
  }
}

function showQuestion() {
  const q = questions[currentQuestionIndex];
  if (!q) return;

  const answers = [...q.incorrect_answers, q.correct_answer];
  shuffleArray(answers);

  quizContainer.innerHTML = `
    <div class="space-y-4">
      <h2 class="text-lg font-semibold">${decodeHTML(q.question)}</h2>
      <div id="answers" class="grid gap-3">
        ${answers
          .map(
            (a) =>
              `<button class="btn btn-outline w-full answer-btn">${decodeHTML(
                a
              )}</button>`
          )
          .join("")}
      </div>
    </div>
  `;

  questionCounter.textContent = `Question ${currentQuestionIndex + 1} of ${
    questions.length
  }`;

  document.querySelectorAll(".answer-btn").forEach((btn) => {
    btn.addEventListener("click", () =>
      selectAnswer(btn.textContent, q.correct_answer)
    );
  });
}

function selectAnswer(selected, correct) {
  if (selected === decodeHTML(correct)) {
    score++;
  }

  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    endQuiz();
  }
}

function endQuiz() {
  quizContainer.classList.add("hidden");
  nextBtn.classList.add("hidden");
  questionCounter.classList.add("hidden");
  quizResult.classList.remove("hidden");
  scoreEl.textContent = `Your score: ${score} / ${questions.length}`;
}

nextBtn.addEventListener("click", () => showQuestion());

// Utility: shuffle array
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

// Utility: decode HTML entities
function decodeHTML(html) {
  const txt = document.createElement("textarea");
  txt.innerHTML = html;
  return txt.value;
}

loadQuestions();
