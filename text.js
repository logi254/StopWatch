let startTime;
let updatedTime;
let difference;
let t;
let running = false;

const display = document.getElementById("display");
const startButton = document.getElementById("start");
const stopButton = document.getElementById("stop");
const resetButton = document.getElementById("reset");
const lapButton = document.getElementById("lap");

function startTimer() {
    if (!running) {
        startTime = new Date().getTime() - (difference || 0);
        t = setInterval(getShowTime, 10);
        running = true;
    }
}

function stopTimer() {
    clearInterval(t);
    running = false;
}

function resetTimer() {
    clearInterval(t);
    running = false;
    difference = 0;
    display.innerHTML = "00:00:00";
    document.getElementById("laps").innerHTML = ""; // Clear lap times
}

function lapTimer() {
    if (running) {
        const lapTime = new Date().getTime() - startTime;
        const acceleratedLapTime = lapTime * 60; // Increase speed
        const hours = Math.floor((acceleratedLapTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((acceleratedLapTime % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((acceleratedLapTime % (1000 * 60))  / 1000);
        
        const lapDisplay = document.createElement("li");
        lapDisplay.textContent = `Lap: ${hours < 10 ? "0" + hours : hours}:${minutes < 10 ? "0" + minutes : minutes}:${seconds < 10 ? "0" + seconds : seconds}`;
        document.getElementById("laps").appendChild(lapDisplay);
    }
}

function getShowTime() {
    updatedTime = new Date().getTime();
    difference = updatedTime - startTime;

    // 🔥 Accelerate time by making minutes go 2x faster
    const acceleratedTime = difference * 60;

    const hours = Math.floor((acceleratedTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((acceleratedTime % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((acceleratedTime % (1000 * 60)) / 1000);

    display.innerHTML =
        (hours < 10 ? "0" + hours : hours) +
        ":" +
        (minutes < 10 ? "0" + minutes : minutes) +
        ":" +
        (seconds < 10 ? "0" + seconds : seconds);
}

startButton.addEventListener("click", startTimer);
stopButton.addEventListener("click", stopTimer);
resetButton.addEventListener("click", resetTimer);
lapButton.addEventListener("click", lapTimer);
