const startBtn = document.getElementById('start-btn');
const stopBtn = document.getElementById('stop-btn');
const resetBtn = document.getElementById('reset-btn');
const secondsContainer = document.getElementById('seconds');
const tensContainer = document.getElementById('tens');

let seconds = 0;
let tens = 0;
let timerInterval;

function startBtnHandler() {
  timerInterval = setInterval(startTimer, 10);
}

function stopBtnHandler() {
  clearInterval(timerInterval);
}

function resetBtnHandler() {
  clearInterval(timerInterval);
  tens = '00';
  seconds = '00';
  tensContainer.innerHTML = tens;
  secondsContainer.innerHTML = seconds;
}

function startTimer() {
  tens++;
  if (tens > 99) {
    seconds++;
    tens = 0;
    secondsContainer.innerHTML = `0${seconds}`;
  }
  if (tens < 10) {
    tensContainer.innerHTML = `0${tens}`;
  } else {
    tensContainer.innerHTML = tens;
  }
  if (seconds > 9) {
    secondsContainer.innerHTML = seconds;
  }
}

startBtn.addEventListener('click', startBtnHandler);
stopBtn.addEventListener('click', stopBtnHandler);
resetBtn.addEventListener('click', resetBtnHandler);
