let current = 0;
let score = 0;
let correct = 0;
let total = 0;
let timer;
const timeLimit = 10;

function startGame() {
  poems = shuffle([...poems]);
  current = 0;
  score = 0;
  correct = 0;
  total = 0;
  showPoem();
}

function showPoem() {
  clearInterval(timer);
  const poem = poems[current];
  document.getElementById("upperPhrase").textContent = poem.upper;
  const options = shuffle([poem.lower, ...getRandomLowers(poem.lower)]);
  const optionsDiv = document.getElementById("options");
  optionsDiv.innerHTML = "";
  options.forEach(opt => {
    const btn = document.createElement("button");
    btn.textContent = opt;
    btn.onclick = () => checkAnswer(opt);
    optionsDiv.appendChild(btn);
  });
  startTimer();
}

function checkAnswer(selected) {
  const poem = poems[current];
  total++;
  if (selected === poem.lower) {
    score++;
    correct++;
  }
  updateScore();
  nextPoem();
}

function updateScore() {
  document.getElementById("scoreValue").textContent = score;
  const accuracy = total === 0 ? 0 : Math.round((correct / total) * 100);
  document.getElementById("accuracyValue").textContent = accuracy;
}

function nextPoem() {
  current++;
  if (current >= poems.length) {
    alert("終了！お疲れ様でした！");
  } else {
    showPoem();
  }
}

function getRandomLowers(correctLower) {
  const lowers = poems.map(p => p.lower).filter(l => l !== correctLower);
  return shuffle(lowers).slice(0, 3);
}

function shuffle(array) {
  return array.sort(() => Math.random() - 0.5);
}

function startTimer() {
  let time = timeLimit;
  document.getElementById("time").textContent = time;
  timer = setInterval(() => {
    time--;
    document.getElementById("time").textContent = time;
    if (time <= 0) {
      clearInterval(timer);
      nextPoem();
    }
  }, 1000);
}

document.getElementById("restartBtn").onclick = startGame;
window.onload = startGame;
