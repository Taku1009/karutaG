let currentPoem;
let score = 0;
let totalAnswered = 0;
let highScore = 0;
let timer;
let timeLeft = 10;
let answered = false;

function shuffle(array) {
  return array.sort(() => Math.random() - 0.5);
}

function loadHighScore() {
  const saved = localStorage.getItem("karutaHighScore");
  highScore = saved ? parseInt(saved) : 0;
  document.getElementById("highscore").textContent = highScore;
}

function updateHighScore() {
  if (score > highScore) {
    highScore = score;
    localStorage.setItem("karutaHighScore", highScore);
    document.getElementById("highscore").textContent = highScore;
  }
}

function updateAccuracy() {
  const accuracy = totalAnswered > 0 ? Math.round((score / totalAnswered) * 100) : 0;
  document.getElementById("accuracy").textContent = accuracy;
}

function startTimer() {
  timeLeft = 10;
  document.getElementById("timer").textContent = `残り時間: ${timeLeft}秒`;
  timer = setInterval(() => {
    timeLeft--;
    document.getElementById("timer").textContent = `残り時間: ${timeLeft}秒`;
    if (timeLeft <= 0) {
      clearInterval(timer);
      if (!answered) {
        totalAnswered++;
        document.getElementById("feedback").textContent = "時間切れ！不正解。";
        document.querySelectorAll('.choice').forEach(c => {
          if (c.textContent === currentPoem.lower) c.classList.add("correct");
        });
        updateAccuracy();
        updateHighScore();
      }
    }
  }, 1000);
}

function nextQuestion() {
  clearInterval(timer);
  answered = false;
  document.getElementById("feedback").textContent = "";

  currentPoem = poems[Math.floor(Math.random() * poems.length)];

  let choices = [currentPoem.lower];
  while (choices.length < 3) {
    const random = poems[Math.floor(Math.random() * poems.length)].lower;
    if (!choices.includes(random)) choices.push(random);
  }
  choices = shuffle(choices);

  document.getElementById("question").textContent = currentPoem.upper;

  const choicesDiv = document.getElementById("choices");
  choicesDiv.innerHTML = "";
  choices.forEach(choice => {
    const div = document.createElement("div");
    div.className = "choice";
    div.textContent = choice;
    div.onclick = () => checkAnswer(choice, div);
    choicesDiv.appendChild(div);
  });

  startTimer();
}

function checkAnswer(choice, element) {
  if (answered) return;
  answered = true;
  clearInterval(timer);
  totalAnswered++;

  const isCorrect = choice === currentPoem.lower;
  const feedback = document.getElementById("feedback");

  if (isCorrect) {
    feedback.textContent = "正解！";
    element.classList.add("correct");
    score++;
  } else {
    feedback.textContent = "残念、不正解。";
    element.classList.add("wrong");
    document.querySelectorAll('.choice').forEach(c => {
      if (c.textContent === currentPoem.lower) c.classList.add("correct");
    });
  }

  document.getElementById("score").textContent = score;
  updateAccuracy();
  updateHighScore();
}

function retryGame() {
  clearInterval(timer);
  score = 0;
  totalAnswered = 0;
  document.getElementById("score").textContent = score;
  document.getElementById("feedback").textContent = "ゲームを再開しました！";
  updateAccuracy();
  nextQuestion();
}

function resetAll() {
  clearInterval(timer);
  score = 0;
  totalAnswered = 0;
  highScore = 0;
  localStorage.removeItem("karutaHighScore");
  document.getElementById("score").textContent = score;
  document.getElementById("highscore").textContent = highScore;
  document.getElementById("feedback").textContent = "スコアとハイスコアをリセットしました！";
  updateAccuracy();
  nextQuestion();
}

loadHighScore();
nextQuestion();
