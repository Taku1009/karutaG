// script.js
let current = 0, correct = 0, wrong = 0, timer;
const question = document.getElementById("question");
const choices = document.getElementById("choices");
const timeDisplay = document.getElementById("time");
const correctDisplay = document.getElementById("correct");
const wrongDisplay = document.getElementById("wrong");
const accuracyDisplay = document.getElementById("accuracy");

function shuffle(array) {
  return array.sort(() => Math.random() - 0.5);
}

function startGame() {
  correct = 0;
  wrong = 0;
  updateScore();
  document.getElementById("quiz-area").style.display = "block";
  document.getElementById("mode-buttons").style.display = "none";
  poemsUsed = shuffle([...poems]);
  nextQuestion();
}

function updateScore() {
  correctDisplay.textContent = correct;
  wrongDisplay.textContent = wrong;
  const total = correct + wrong;
  accuracyDisplay.textContent = total ? Math.round((correct / total) * 100) : 0;
}

function resetGame() {
  location.reload();
}

function retryGame() {
  startGame();
}

function nextQuestion() {
  if (poemsUsed.length === 0) {
    alert("終了！正解数: " + correct);
    return;
  }

  const p = poemsUsed.pop();
  current = p;
  question.textContent = p.upper;

  const options = shuffle([
    p.lower,
    ...shuffle(poems.filter(x => x !== p)).slice(0, 3).map(x => x.lower),
  ]);

  choices.innerHTML = "";
  options.forEach(opt => {
    const btn = document.createElement("button");
    btn.textContent = opt;
    btn.onclick = () => {
      clearInterval(timer);
      if (opt === p.lower) {
        correct++;
      } else {
        wrong++;
      }
      updateScore();
      nextQuestion();
    };
    choices.appendChild(btn);
  });

  let time = 10;
  timeDisplay.textContent = time;
  clearInterval(timer);
  timer = setInterval(() => {
    time--;
    timeDisplay.textContent = time;
    if (time === 0) {
      clearInterval(timer);
      wrong++;
      updateScore();
      nextQuestion();
    }
  }, 1000);
}
