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

  let count = 300; // 5 minutes in seconds (5 minutes * 60 seconds)
  const countdownInterval = setInterval(() => {
    const minutes = Math.floor(count / 60);
    const seconds = count % 60;
    bottomElement.innerText = `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
    count--;

    if (count < 0) {
      clearInterval(countdownInterval);
      bottomElement.innerText = "Ready"; // Change the text to "Ready" after the countdown is complete

      // Remove the inline styles
      removeInlineStyles(bottomElement);
      removeInlineStyles(backgroundEl);

      // Re-add the click event listener
      container.addEventListener("click", handleClick);
    }
  }, 1000); // Update the countdown every second

  // Remove the click event listener to prevent multiple countdowns
  container.removeEventListener("click", handleClick);
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
