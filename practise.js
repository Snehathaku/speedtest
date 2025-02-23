const practiceText = document.getElementById('practice-text');
const practiceInput = document.getElementById('practice-input');
const timerDisplay = document.getElementById('timer');
const wpmDisplay = document.getElementById('wpm');
const accuracyDisplay = document.getElementById('accuracy');
const startPracticeBtn = document.getElementById('start-practice-btn');
const restartPracticeBtn = document.getElementById('restart-practice-btn');

let startTime, endTime;
let practiceTimeLeft = 60;
let timerInterval;


const randomTexts = [
  "Practice makes perfect.",
  "The quick brown fox jumps over the lazy dog.",
  "Typing is a skill that improves with practice.",
  "Focus on accuracy and speed to become a better typist.",
  "Keep practicing to achieve your typing goals.",
];


function initPractice() {
  const randomIndex = Math.floor(Math.random() * randomTexts.length);
  practiceText.textContent = randomTexts[randomIndex];
  practiceInput.value = '';
  practiceInput.disabled = false;
  practiceInput.focus();
  startTimer();
  startTime = new Date();
}


function startTimer() {
  timerInterval = setInterval(() => {
    practiceTimeLeft--;
    timerDisplay.textContent = 'Time: ${practiceTimeLeft}s';

    if (practiceTimeLeft <= 0) {
      clearInterval(timerInterval);
      endPractice();
    }
  }, 1000);
}


function endPractice() {
  practiceInput.disabled = true;
  endTime = new Date();
  const typedText = practiceInput.value;
  const { wpm, accuracy } = calculateResults(typedText);
  wpmDisplay.textContent = 'WPM: ${wpm}';
  accuracyDisplay.textContent = 'Accuracy: ${accuracy}%';
  alert('Practice session over!');
}
function calculateResults(typedText) {
  const words = practiceText.textContent.split(' ').length;
  const characters = practiceText.textContent.length;
  const typedWords = typedText.split(' ').length;
  const typedCharacters = typedText.length;


  const timeInMinutes = (endTime - startTime) / 60000;
  const wpm = Math.round((typedWords / timeInMinutes));

 
  let correctCharacters = 0;
  for (let i = 0; i < Math.min(characters, typedCharacters); i++) {
    if (practiceText.textContent[i] === typedText[i]) {
      correctCharacters++;
    }
  }
  const accuracy = Math.round((correctCharacters / characters) * 100);

  return { wpm, accuracy };
}


startPracticeBtn.addEventListener('click', () => {
  practiceTimeLeft = 60;
  timerDisplay.textContent = 'Time: ${practiceTimeLeft}s';
  wpmDisplay.textContent = 'WPM: 0';
  accuracyDisplay.textContent = 'Accuracy: 0%';
  startPracticeBtn.disabled = true;
  restartPracticeBtn.disabled = false;
  initPractice();
});


restartPracticeBtn.addEventListener('click', () => {
  clearInterval(timerInterval);
  practiceTimeLeft = 60;
  timerDisplay.textContent = 'Time: ${practiceTimeLeft}s';
  wpmDisplay.textContent = 'WPM: 0';
  accuracyDisplay.textContent = 'Accuracy: 0%';
  initPractice();
});