// script.js

const hungerEl = document.getElementById('hunger');
const energyEl = document.getElementById('energy');
const happinessEl = document.getElementById('happiness');
const petImage = document.getElementById('petImage');

const feedBtn = document.getElementById('feedBtn');
const playBtn = document.getElementById('playBtn');
const restBtn = document.getElementById('restBtn');
const reportBtn = document.getElementById('reportBtn');
const healthReportEl = document.getElementById('healthReport');

let hunger = 5;
let energy = 5;
let happiness = 5;

function updateStats() {
    hungerEl.textContent = hunger;
    energyEl.textContent = energy;
    happinessEl.textContent = happiness;

    if (hunger > 8 || energy < 3 || happiness < 3) {
        petImage.src = 'pet-sad.png';
    } else {
        petImage.src = 'pet-happy.png';
    }
}

function clampStat(value) {
    return Math.max(0, Math.min(10, value));
}

feedBtn.addEventListener('click', () => {
    hunger = clampStat(hunger - 2);
    happiness = clampStat(happiness + 1);
    updateStats();
});

playBtn.addEventListener('click', () => {
    happiness = clampStat(happiness + 2);
    energy = clampStat(energy - 1);
    hunger = clampStat(hunger + 1);
    updateStats();
});

restBtn.addEventListener('click', () => {
    energy = clampStat(energy + 3);
    hunger = clampStat(hunger + 1);
    updateStats();
});

function decayStats() {
    hunger = clampStat(hunger + 1);
    energy = clampStat(energy - 1);
    happiness = clampStat(happiness - 1);
    updateStats();
}




reportBtn.addEventListener('click', () => {
    const html = getHealthReportHTML();
    healthReportEl.innerHTML = html;
});

function getHealthReportHTML() {
    let hungerStatus, energyStatus, happinessStatus;

    // Hunger
    if (hunger <= 3) {
        hungerStatus = "😋 Not hungry";
    } else if (hunger <= 7) {
        hungerStatus = "🍽 Getting a bit hungry";
    } else {
        hungerStatus = "🚨 Very hungry!";
    }

    // Energy
    if (energy >= 7) {
        energyStatus = "⚡ Full of energy";
    } else if (energy >= 4) {
        energyStatus = "😴 A little tired";
    } else {
        energyStatus = "💤 Exhausted";
    }

    // Happiness
    if (happiness >= 7) {
        happinessStatus = "😺 Super happy";
    } else if (happiness >= 4) {
        happinessStatus = "🙂 Doing okay";
    } else {
        happinessStatus = "😿 Feeling sad";
    }

    return `
        <h2>🐾 Pet Health Report</h2>
        <ul>
            <li><strong>Hunger:</strong> ${hunger} — ${hungerStatus}</li>
            <li><strong>Energy:</strong> ${energy} — ${energyStatus}</li>
            <li><strong>Happiness:</strong> ${happiness} — ${happinessStatus}</li>
        </ul>
    `;
}

// Game loop: update every 10 seconds
setInterval(decayStats, 10000);

// Initialize
updateStats();
