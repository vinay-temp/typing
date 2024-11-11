const countdownTime = 15 * 60;

let timeLeft = countdownTime;
let timerInterval;

function goFullScreen() {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen().catch((err) => {
      alert(
        `Error attempting to enable fullscreen mode: ${err.message} (${err.name})`
      );
    });
  } else {
    document.exitFullscreen();
  }
}

function preventEvent(event) {
  event.preventDefault();
}

function disableFunctions() {
  window.addEventListener("wheel", preventEvent, { passive: false });
  window.addEventListener("copy", preventEvent, { passive: false });
  window.addEventListener("paste", preventEvent, { passive: false });
}

function enableFunctions() {
  window.removeEventListener("wheel", preventEvent, { passive: false });
  window.removeEventListener("copy", preventEvent, { passive: false });
  window.removeEventListener("paste", preventEvent, { passive: false });
}

function setup() {
  const text2 = document.getElementById("text2");
  text2.textContent = "";
  text2.removeAttribute("disabled");
  text2.setAttribute("placeholder", "Start typing here...");

  document.getElementById("text1").scrollTop = 0;
  document.getElementById("btn").classList.add("hide");
}

function startTimer() {
  if (timerInterval) return;

  disableFunctions();
  goFullScreen();
  setup();

  timerInterval = setInterval(() => {
    timeLeft--;

    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;

    document.getElementById("timer").textContent = `${String(minutes).padStart(
      2,
      "0"
    )} : ${String(seconds).padStart(2, "0")}`;

    if (timeLeft < 0) {
      clearInterval(timerInterval);
      document.getElementById("timer").textContent = "Time's Up!";
      document.getElementById("text2").disabled = true;
      enableFunctions();
    }
  }, 1000);
}
