const timer = document.getElementById("timer")

const start = document.getElementById("study")
const shortBreak = document.getElementById("short-break")
const longBreak = document.getElementById("long-break")

var clockTimer;
let clockRunning = false;

let studyInterval = 1500;
let shortBreakInterval = 300;
let longBreakInterval = 900;

let timeLeft = 1500;
var alarm = new Audio('assets/sounds/dorostudy-alarm.mp3');

const toggleTimer = (resetTime) => {
    if (resetTime > -1) {
        clearInterval(clockTimer);
        clockRunning = false;
        timeLeft = resetTime;
        alarm.pause();
        alarm.currentTime = 0;
        displayTime();
    } else {
        if (clockRunning) {
            clearInterval(clockTimer);
            clockRunning = false;
        } else {
            clockRunning = true;
            // Every 1 second, decrease the time left by one.
            clockTimer = setInterval(() => {
                if (timeLeft == 0) {
                    clearInterval(clockTimer);
                    alarm.play();
                } else {
                    timeLeft--;
                }
                displayTime();
            }, 1000)
        }
    }
};

const displayTime = () => {
    const current = timeLeft;
    let formattedTime = "";
    const seconds = current % 60;
    const minutes = Math.floor(current / 60)
    formattedTime += (minutes < 10) ? "0" + minutes + ":" : minutes + ":";
    formattedTime += (seconds < 10) ? "0" + seconds : seconds;
    timer.innerText = formattedTime.toString();
};

// Stop and start the timer from its current time.
document.addEventListener('keyup', (e) => {
    if (e.keyCode == 32) {
        // Stop the space bar from toggling the button (does this by default).
        e.preventDefault();
        toggleTimer(-1);
        if (timeLeft == 0) {
            alarm.pause();
            alarm.currentTime = 0;
        }
    }
});

timer.addEventListener('click', (e) => {
    toggleTimer(-1);
    if (timeLeft == 0) {
        alarm.pause();
        alarm.currentTime = 0;
    }
});

// Start study time interval (25 minutes).
start.addEventListener('click', (e) => {
    var current = document.getElementsByClassName("active");
    current[0].className = current[0].className.replace(" active", "");
    start.className += " active";
    toggleTimer(studyInterval);
});

// Start a short break (5 minutes).
shortBreak.addEventListener('click', (e) => {
    var current = document.getElementsByClassName("active");
    current[0].className = current[0].className.replace(" active", "");
    shortBreak.className += " active";
    toggleTimer(shortBreakInterval);
});

// Start a long break (10 minutes).
longBreak.addEventListener('click', (e) => {
    var current = document.getElementsByClassName("active");
    current[0].className = current[0].className.replace(" active", "");
    longBreak.className += " active";
    toggleTimer(longBreakInterval);
});