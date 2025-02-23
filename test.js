const participantNameInput = document.getElementById('participant-name');
const randomTextElement = document.getElementById('random-text');
const userInputElement = document.getElementById('user-input');
const startBtn = document.getElementById('start-btn');
const endBtn = document.getElementById('end-btn');
const resetBtn = document.getElementById('reset-btn');
const timerElement = document.getElementById('timer');
const speedElement = document.getElementById('speed');
const accuracyElement = document.getElementById('accuracy');
const leaderboardList = document.getElementById('leaderboard-list');
const winnerList = document.getElementById('winner-list');
const themeBtn = document.getElementById('theme-btn');


let startTime, endTime, timerInterval;
const paragraphs = [
    "The quick brown fox jumps over the lazy dog.",
    "Programming is the art of telling another human what one wants the computer to do.",
    "Coding is not just about writing code, it's about solving problems.",
    "JavaScript is the language of the web, enabling dynamic and interactive websites.",
    "Practice makes perfect, especially when it comes to typing and coding.",
    "A journey of a thousand miles begins with a single step.",
    "Success is the sum of small efforts repeated day in and day out.",
    "The only way to do great work is to love what you do.",
    "Believe you can and you're halfway there.",
    "Dream big and dare to fail.",
    "The best way to predict the future is to create it.",
    "Hard work beats talent when talent doesn't work hard.",
    "Every great developer you know got there by solving problems they were unqualified to solve.",
    "The only limit to our realization of tomorrow is our doubts of today.",
    "Strive not to be a success, but rather to be of value."
];
function toggleTheme() {
    document.body.classList.toggle('dark-mode');
    if (document.body.classList.contains('dark-mode')) {
        themeBtn.textContent = "☀️ Light Mode";
        localStorage.setItem('theme', 'dark');
    } else {
        themeBtn.textContent = "🌙 Dark Mode";
        localStorage.setItem('theme', 'light');
    }
}


const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'dark') {
    document.body.classList.add('dark-mode');
    themeBtn.textContent = "☀️ Light Mode";
} else {
    themeBtn.textContent = "🌙 Dark Mode";
}


themeBtn.addEventListener('click', toggleTheme);


function getRandomParagraph() {
    return paragraphs[Math.floor(Math.random() * paragraphs.length)];
}

function startTest() {
    if (!participantNameInput.value.trim()) {
        alert("Please enter your name!");
        return;
    }
    randomTextElement.textContent = getRandomParagraph();
    userInputElement.value = '';
    userInputElement.disabled = false;
    userInputElement.focus();
    startBtn.disabled = true;
    endBtn.disabled = false;
    resetBtn.disabled = false;
    startTime = new Date();
    timerInterval = setInterval(updateTimer, 1000);
}

function endTest() {
    clearInterval(timerInterval);
    calculateResults();
    userInputElement.disabled = true;
    endBtn.disabled = true;
    updateLeaderboard();
    updateWinners();
}
function resetTest() {
    clearInterval(timerInterval);
    timerElement.textContent = 0;
    speedElement.textContent = 0;
    accuracyElement.textContent = 0;
    randomTextElement.textContent = "Click 'Start Test' to begin.";
    userInputElement.value = '';
    userInputElement.disabled = true;
    startBtn.disabled = false;
    endBtn.disabled = true;
    resetBtn.disabled = true;
}

function updateTimer() {
    const currentTime = new Date();
    const elapsedTime = Math.floor((currentTime - startTime) / 1000);
    timerElement.textContent = elapsedTime;
}

function calculateResults() {
    endTime = new Date();
    const timeTaken = (endTime - startTime) / 1000;
    const userText = userInputElement.value;
    const originalText = randomTextElement.textContent;


    const words = userText.split(' ').length;
    const speed = Math.floor((words / timeTaken) * 60);
    speedElement.textContent = speed;


    let correctChars = 0;
    for (let i = 0; i < userText.length; i++) {
        if (userText[i] === originalText[i]) {
            correctChars++;
        }
    }
    const accuracy = ((correctChars / originalText.length) * 100).toFixed(2);
    accuracyElement.textContent = accuracy;

    return { speed, accuracy };
}

function updateLeaderboard() {
    const { speed, accuracy } = calculateResults();
    const participant = {
        name: participantNameInput.value.trim() || "Anonymous",
        speed,
        accuracy
    };


    let leaderboard = JSON.parse(localStorage.getItem('leaderboard')) || [];
    leaderboard.push(participant);
    localStorage.setItem('leaderboard', JSON.stringify(leaderboard));


    const li = document.createElement('li');
    li.innerHTML = 
        '<span>${participant.name}</span>'
        <span>'Speed: ${participant.speed} WPM</span>'
        <span>'Accuracy: ${participant.accuracy}%</span>'
    
    leaderboardList.appendChild(li);
}
function updateWinners() {
    let leaderboard = JSON.parse(localStorage.getItem('leaderboard')) || [
    ];
    leaderboard.sort((a, b) => b.speed - a.speed || b.accuracy - a.accuracy);
    const top3 = leaderboard.slice(0, 3);


    winnerList.innerHTML = top3.map((participant, index) => 
        <li>
            <span>${index + 1}. ${participant.name}</span>
            <span>Speed: ${participant.speed} WPM</span>
            <span>Accuracy: ${participant.accuracy}%</span>
        </li>
    ).join('');
}


startBtn.addEventListener('click', startTest);
endBtn.addEventListener('click', endTest);
resetBtn.addEventListener('click', resetTest);
userInputElement.addEventListener('input', () => {
    if (userInputElement.value === randomTextElement.textContent) {
        endTest();
    }
});


updateWinners();
