const timerDisplay = document.getElementById('timer');
const statusDisplay = document.getElementById('status');
const startBtn = document.getElementById('startBtn');
const pauseBtn = document.getElementById('pauseBtn');
const resetBtn = document.getElementById('resetBtn');
const cycleCountDisplay = document.getElementById('cycleCount');
let cycleCount = 0;


let workDuration = 0.25 * 60; // seconds
let breakDuration = 0.25 * 60; // seconds
let isWorkTime = true;
let timeLeft = workDuration;
let timer = null;

function updateTimerDisplay() {
    const minutes = String(Math.floor(timeLeft / 60)).padStart(2, '0');
    const seconds = String(timeLeft % 60).padStart(2, '0');
    timerDisplay.textContent = `${minutes}:${seconds}`;
}

function updateCycleDisplay() {
    cycleCountDisplay.textContent = `Cycles completed: ${cycleCount}`;
}

function startTimer() {
    if (timer) return;
    timer = setInterval(() => {
        if (timeLeft > 0) {
            timeLeft--;
            updateTimerDisplay();
        } else {
            clearInterval(timer);
            timer = null;
            toggleStatus();
            updateTimerDisplay();
            startTimer();
        }
    }, 1000);
}

function resetTimer() {
    pauseTimer();
    timeLeft = isWorkTime ? workDuration : breakDuration;
    updateTimerDisplay();
    // Uncomment if reset should not reset cycles:
    cycleCount = 0;
    updateCycleDisplay();
}


function pauseTimer() {
    clearInterval(timer);
    timer = null;
}

function resetTimer() {
    pauseTimer();
    timeLeft = isWorkTime ? workDuration : breakDuration;
    updateTimerDisplay();
}

function toggleStatus() {
    isWorkTime = !isWorkTime;
    if (isWorkTime) {
        // Completed a break, now entering new focus = 1 full cycle
        cycleCount++;
        updateCycleDisplay();
    }
    timeLeft = isWorkTime ? workDuration : breakDuration;
    statusDisplay.textContent = isWorkTime ? 'Focus Time' : 'Break Time';
}


startBtn.addEventListener('click', startTimer);
pauseBtn.addEventListener('click', pauseTimer);
resetBtn.addEventListener('click', resetTimer);

updateTimerDisplay();
updateCycleDisplay();
