const countdownTime = 5;

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
  document.getElementById("timer").textContent = "15 : 00";
  document.getElementById("words").classList.add("hide");
  document.getElementById("keystrokes").classList.add("hide");
}

function startTimer() {
  if (timerInterval) return;

  setup();
  disableFunctions();
  goFullScreen();

  timerInterval = setInterval(() => {
    timeLeft--;

    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;

    document.getElementById("timer").textContent = `${String(minutes).padStart(2,"0")} : ${String(seconds).padStart(2, "0")}`;

    if (timeLeft < 0) {
      clearInterval(timerInterval);

      document.getElementById("text2").disabled = true;
      document.getElementById("timer").textContent = "Time's Up!";
      document.getElementById("words").classList.remove("hide");
      document.getElementById("keystrokes").classList.remove("hide");
      
      enableFunctions();
    }
  }, 1000);
}

async function load_test(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error("File not found");
    
    const data = await response.json();

    document.title = data.name;
    document.getElementById("title").innerHTML = data.name;
    document.getElementById("text1").innerHTML = data.text;
    document.getElementById("words").innerHTML = `Total Words: ${data.words}`;
    document.getElementById("keystrokes").innerHTML = `Keystrokes: ${data.keystrokes}`;

  } catch (error) {
    console.error("Error loading text:", error);
  }
}

const urlParams = new URLSearchParams(window.location.search);
const url = urlParams.get("src");
load_test(url);
