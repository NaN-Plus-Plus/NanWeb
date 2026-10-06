let startTime;
let pauseTime;
let timerRunning = false;
let hours = 0;
let minutes = 10;
let seconds = 0;
let milliseconds = 0;
let showMilliseconds = false;

let initialHours = 0;
let initialMinutes = 10;
let initialSeconds = 0;

window.onload = function () {
    setInitialTime();
    initializeTimerValues();
}

function setInitialTime() {
    initialHours = Math.max(0, initialHours);
    initialMinutes = Math.max(0, Math.min(initialMinutes, 59));
    initialSeconds = Math.max(0, Math.min(initialSeconds, 59));
}

function initializeTimerValues() {
    hours = initialHours;
    minutes = initialMinutes;
    seconds = initialSeconds;
}

function resetTimer() {
    timerRunning = false;
    hours = initialHours;
    minutes = initialMinutes;
    seconds = initialSeconds;
    milliseconds = 0;
    startTime = null;
    updateTimerDisplay();
}

function toggleTimer() {
    if (timerRunning) {
        pauseTimer();
    } else {
        startTimer();
    }
}

function startTimer() {
    if (!timerRunning && (hours > 0 || minutes > 0 || seconds > 0 || milliseconds > 0)) {
        timerRunning = true;
        if (!startTime) {
            startTime = Date.now();
        } else if (pauseTime) {
            const pausedDuration = Date.now() - pauseTime;
            startTime += pausedDuration;
            pauseTime = null;
        }
        requestAnimationFrame(updateTimer);
        document.getElementById("endMessage").style.display = "none";
        document.getElementById("startStopButton").innerText = "Pauza";
        document.getElementById("resetButton").disabled = true;
        document.getElementById("resetButton").classList.add("disabled");
        document.getElementById("timeButton").disabled = true;
        document.getElementById("timeButton").classList.add("disabled");
    }
}

function pauseTimer() {
    timerRunning = false;
    pauseTime = Date.now();
    document.getElementById("startStopButton").innerText = "Wznów";
    document.getElementById("resetButton").disabled = false;
    document.getElementById("resetButton").classList.remove("disabled");
    document.getElementById("timeButton").disabled = false;
    document.getElementById("timeButton").classList.remove("disabled");
}

function updateTimer() {
    if (!timerRunning) return;

    const elapsedTime = Date.now() - startTime;
    let remainingTime = (initialHours * 3600000) + (initialMinutes * 60000) + (initialSeconds * 1000) - elapsedTime;
    if (remainingTime < 0) remainingTime = 0;

    hours = Math.floor(remainingTime / 3600000);
    minutes = Math.floor((remainingTime % 3600000) / 60000);
    seconds = Math.floor((remainingTime % 60000) / 1000);
    milliseconds = Math.floor((remainingTime % 1000) / 10);

    updateTimerDisplay();

    if (remainingTime > 0) {
        requestAnimationFrame(updateTimer);
    } else {
        document.getElementById("endMessage").style.display = "block";
        document.getElementById("startStopButton").innerText = "Start";
        resetTimer();
    }
}

function updateTimerDisplay() {
    const timerDisplay = document.getElementById("timer");
    timerDisplay.innerText = (hours > 0 ? formatTime(hours) + ":" : "") + formatTime(minutes) + ":" + formatTime(seconds) + (showMilliseconds ? "." + formatMilliseconds(milliseconds) : "");
}

function formatTime(time) {
    return (time < 10 ? "0" + time : time);
}

function formatMilliseconds(ms) {
    const msWithLeadingZeros = ms < 10 ? '0' + ms : ms;
    return msWithLeadingZeros;
}

function openModal() {
    if (!timerRunning) {
        document.getElementById("myModal").style.display = "block";
    }
}

function closeModal() {
    document.getElementById("myModal").style.display = "none";
}



function setTime() {
    const newHours = parseInt(document.getElementById("modalHours").value) || 0;
    const newMinutes = parseInt(document.getElementById("modalMinutes").value) || 0;
    const newSeconds = parseInt(document.getElementById("modalSeconds").value) || 0;

    initialHours = Math.max(0, newHours);
    initialMinutes = Math.max(0, Math.min(newMinutes, 59));
    initialSeconds = Math.max(0, Math.min(newSeconds, 59));

    initializeTimerValues();
    resetTimer();



    hours = initialHours;
    minutes = initialMinutes;
    seconds = initialSeconds;
    milliseconds = 0;

    updateTimerDisplay();
    closeModal();
}

function toggleMillisecondsDisplay() {
    showMilliseconds = document.getElementById("showMillisecondsCheckbox").checked;
    updateTimerDisplay();
}
