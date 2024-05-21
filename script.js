let hasSavedValue =
  localStorage.getItem("count") !== null ? localStorage.getItem("count") : 240;
let count = 0;

function updateCurrentTime(timeInSec = 240) {
  localStorage.setItem("count", timeInSec);
  count = timeInSec;

  let displayTime = new Date(timeInSec * 1000);
  document.querySelector(".currentCooldown").textContent = displayTime
    .toISOString()
    .substr(14, 5);
  document.getElementById("umin").value = displayTime.getMinutes();
  document.getElementById("usec").value = displayTime.getSeconds();
}

function showTab(tabName) {
  const tabs = document.getElementsByClassName("tab");
  for (const tab of tabs) {
    tab.classList.remove("active");
  }

  const contents = document.getElementsByClassName("content");
  for (const content of contents) {
    content.style.display = "none";
  }

  document.getElementById(tabName + "Content").style.display = "flex";
  document
    .querySelector('.tab[data-tab="' + tabName + '"]')
    .classList.add("active");
}

// Create number elements
const numbersContent = document.getElementById("numbersContent");
for (let i = 1; i <= 31; i++) {
  const numberContainer = document.createElement("div");
  numberContainer.className = "number-container";
  numbersContent.appendChild(numberContainer);

  const numberDiv = document.createElement("div");
  numberDiv.className = "number-content boxborder";
  numberDiv.textContent = i;
  numberContainer.appendChild(numberDiv);

  const bottomDiv = document.createElement("div");
  bottomDiv.className = "bottom";
  bottomDiv.textContent = "Ready";
  numberContainer.appendChild(bottomDiv);
}

updateCurrentTime(hasSavedValue);

// Create month elements
const monthsContent = document.getElementById("monthsContent");
const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
for (const month of months) {
  const monthContainer = document.createElement("div");
  monthContainer.className = "months-container";
  monthsContent.appendChild(monthContainer);

  const monthDiv = document.createElement("div");
  monthDiv.className = "months-content boxborder";
  monthDiv.textContent = month;
  monthContainer.appendChild(monthDiv);

  const bottomDiv = document.createElement("div");
  bottomDiv.className = "bottom";
  bottomDiv.textContent = "Ready";
  monthContainer.appendChild(bottomDiv);
}

// Function to handle the countdown logic
function startCountdown(container) {
  const bottomElement = container.querySelector(".bottom");
  const backgroundEl = container.querySelector(".boxborder");
  bottomElement.style.backgroundColor = "grey";
  backgroundEl.style.backgroundColor = "grey";
  backgroundEl.style.color = "#939393";

  // let count = 240; // 4 minutes in seconds (4 minutes * 60 seconds)
  let localCount = count;
  const countdownInterval = setInterval(() => {
    const minutes = Math.floor(localCount / 60);
    const seconds = localCount % 60;
    bottomElement.innerText = `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
    localCount--;

    if (localCount < 0) {
      clearInterval(countdownInterval);
      bottomElement.innerText = "Ready";

      // Remove the inline styles
      removeInlineStyles(bottomElement);
      removeInlineStyles(backgroundEl);

      // Re-add the click event listener
      container.addEventListener("click", handleClick);
    }
  }, 1000);

  // Remove the click event listener to prevent multiple countdowns
  container.removeEventListener("click", handleClick);
}

function handleStartAll() {
  const numberContainers = document.querySelectorAll(".number-container");

  for (let i = 0; i < numberContainers.length; i++) {
    const container = numberContainers[i];
    const bottomElement = container.querySelector(".bottom");

    // ignore started containers
    if (bottomElement.hasAttribute("style")) continue;

    startCountdown(container);
  }

  const monthContainers = document.querySelectorAll(".months-container");

  for (let i = 0; i < monthContainers.length; i++) {
    const container = monthContainers[i];
    const bottomElement = container.querySelector(".bottom");

    // ignore started containers
    if (bottomElement.hasAttribute("style")) continue;

    startCountdown(container);
  }
}

function removeInlineStyles(element) {
  element.removeAttribute("style");
}

const numberContainers = document.querySelectorAll(".number-container");

numberContainers.forEach((container) => {
  container.addEventListener("click", handleClick);
});

function handleClick() {
  startCountdown(this);
}

const monthContainers = document.querySelectorAll(".months-container");

monthContainers.forEach((container) => {
  container.addEventListener("click", handleClick);
});

document.querySelector("main").addEventListener("click", function () {
  let settingsContainer = document.getElementById("settings").style.display;
  if (settingsContainer === "block") {
    document.getElementById("settings").style.display = "none";
  }
});

function settings_open() {
  document.getElementById("settings").style.display = "block";
}

function settings_close() {
  document.getElementById("settings").style.display = "none";
}

function quickselect() {
  updateCurrentTime(document.getElementById("quickselect").value);
  // console.log(document.getElementById("quickselect").value);
}

function updateCustom() {
  let seconds = parseInt(document.getElementById("usec").value);
  let minutes = parseInt(document.getElementById("umin").value);
  let totalSeconds = (seconds + minutes * 60) % 3600;

  updateCurrentTime(totalSeconds);
}
