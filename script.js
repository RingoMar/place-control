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

const monthTranslations = {
  en: [
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
  ],
  fr: [
    "Janvier",
    "Février",
    "Mars",
    "Avril",
    "Mai",
    "Juin",
    "Juillet",
    "Août",
    "Septembre",
    "Octobre",
    "Novembre",
    "Décembre",
  ],
  de: [
    "Januar",
    "Februar",
    "März",
    "April",
    "Mai",
    "Juni",
    "Juli",
    "August",
    "September",
    "Oktober",
    "November",
    "Dezember",
  ],
  es: [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
  ],
  pt: [
    "Janeiro",
    "Fevereiro",
    "Março",
    "Abril",
    "Maio",
    "Junho",
    "Julho",
    "Agosto",
    "Setembro",
    "Outubro",
    "Novembro",
    "Dezembro",
  ],
};

const languageTranslations = {
  en: { days: "Days", months: "Months", ready: "Ready" },
  fr: { days: "Jours", months: "Mois", ready: "Prêt" },
  de: { days: "Tage", months: "Monate", ready: "Bereit" },
  es: { days: "Días", months: "Meses", ready: "Listo" },
  pt: { days: "Dias", months: "Meses", ready: "Pronto" },
};

function getCurrentLanguageCode() {
  const htmlLang = document.documentElement.lang.toLowerCase();
  return htmlLang;
}

function getTranslatedMonths() {
  const currentLanguageCode = getCurrentLanguageCode();
  if (monthTranslations.hasOwnProperty(currentLanguageCode)) {
    return monthTranslations[currentLanguageCode];
  } else {
    return monthTranslations["en"];
  }
}

// Create month elements
const monthsContent = document.getElementById("monthsContent");
const translatedMonths = getTranslatedMonths();
for (const month of translatedMonths) {
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

  let count = 240; // 4 minutes in seconds (4 minutes * 60 seconds)
  const countdownInterval = setInterval(() => {
    const minutes = Math.floor(count / 60);
    const seconds = count % 60;
    bottomElement.innerText = `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
    count--;

    if (count < 0) {
      clearInterval(countdownInterval);
      bottomElement.innerText =
        languageTranslations[getCurrentLanguageCode()].ready;

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

function changeLanguage() {
  const langSelect = document.getElementById("langSelect");
  const selectedLanguage = langSelect.value;

  document.documentElement.lang = selectedLanguage;

  const translatedStrings = languageTranslations[selectedLanguage];

  const tabs = document.querySelectorAll(".tab");
  for (const tab of tabs) {
    const dataTab = tab.getAttribute("data-tab");
    if (dataTab === "numbers") {
      tab.textContent = translatedStrings.days;
    } else if (dataTab === "months") {
      tab.textContent = translatedStrings.months;
    }
  }

  const translatedMonths = getTranslatedMonths();
  const monthContainers = document.querySelectorAll(".months-content");
  for (let i = 0; i < monthContainers.length; i++) {
    monthContainers[i].textContent = translatedMonths[i];
  }

  const bottomDivs = document.querySelectorAll(".bottom");
  for (const bottomDiv of bottomDivs) {
    bottomDiv.textContent = translatedStrings.ready;
  }
}
