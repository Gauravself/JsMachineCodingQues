(function () {
  let startBtn = document.querySelector(".start");
  let resetBtn = document.querySelector(".reset");
  let stopBtn = document.querySelector(".stop");

  let hour = document.querySelector(".hour");
  let minutes = document.querySelector(".minutes");
  let seconds = document.querySelector(".seconds");

  let countDownTimer = null;

  // Event Listeners on Buttons
  startBtn.addEventListener("click", () => {
    if (hour.value === 0 && minutes.value === 0 && seconds.value === 0) return;
    function startInterval() {
      startBtn.style.display = "none";
      stopBtn.style.display = "initial";
      countDownTimer = setInterval(() => {
        startTimer();
      }, 1000);
    }
    startInterval();
    // timer = setInterval(() => {}, 1000);
  });
  function stopInterval(state) {
    startBtn.innerHTML = state === "pause" ? "Continue" : "Start";
    startBtn.style.display = "initial";
    stopBtn.style.display = "none";
    clearInterval(countDownTimer);
  }

  function resetInterval() {
    hour.value = "";
    minutes.value = "";
    seconds.value = "";
  }

  function startTimer() {
    if (seconds.value > 60) {
      minutes.value++;
      seconds.value = parseInt(seconds.value) - 59;
    }
    if (minutes.value > 60) {
      hour.value++;
      minutes.value = parseInt(minutes.value) - 59;
    }

    if (hour.value === 0 && minutes.value === 0 && seconds.value === 0) {
      hour.value = "";
      minutes.value = "";
      seconds.value = "";
      stopInterval();
    } else if (seconds.value != 0) {
      seconds.value = `${seconds.value <= 10 ? "0" : ""}${seconds.value - 1}`;
    } else if (minutes.value != 0 && seconds.value == 0) {
      seconds.value = 59;
      minutes.value = `${minutes.value <= 10 ? "0" : ""}${minutes.value - 1}`;
    } else if (hour.value != 0 && minutes.value == 0) {
      minutes.value = 59;
      hour.value = `${hour.value <= 10 ? "0" : ""}${hour.value - 1}`;
    }
  }

  resetBtn.addEventListener("click", () => {
    resetInterval();
  });

  stopBtn.addEventListener("click", () => {
    stopInterval("pause");
  });
})();
