const DEFAULT_COOLDOWN = 240;
const COUNT_STORAGE_KEY = "count";
const LANGUAGE_STORAGE_KEY = "language";
const DEFAULT_LANGUAGE = "en";

const translations = {
  en: {
    pageTitle: "Control Panel",
    configuration: "CONFIGURATION",
    downtime: "DOWNTIME:",
    quickTime: "Quick Time",
    customTime: "Custom Time",
    minutes: "MINUTES",
    seconds: "SECONDS",
    save: "SAVE",
    translate: "Translate",
    language: "Language",
    languageEnglish: "English",
    languageSpanish: "Spanish",
    languageFrench: "French",
    languageGerman: "German",
    languageRussian: "Russian",
    subtitle: "A r/Place Control Panel",
    days: "DAYS",
    months: "MONTHS",
    startAll: "START ALL",
    ready: "Ready",
    january: "January",
    february: "February",
    march: "March",
    april: "April",
    may: "May",
    june: "June",
    july: "July",
    august: "August",
    september: "September",
    october: "October",
    november: "November",
    december: "December",
  },
  es: {
    pageTitle: "Panel de Control",
    configuration: "CONFIGURACION",
    downtime: "TIEMPO DE ESPERA:",
    quickTime: "Tiempo Rapido",
    customTime: "Tiempo Personalizado",
    minutes: "MINUTOS",
    seconds: "SEGUNDOS",
    save: "GUARDAR",
    translate: "Traducir",
    language: "Idioma",
    languageEnglish: "Ingles",
    languageSpanish: "Espanol",
    languageFrench: "Frances",
    languageGerman: "Aleman",
    languageRussian: "Ruso",
    subtitle: "Un panel de control de r/Place",
    days: "DIAS",
    months: "MESES",
    startAll: "INICIAR TODO",
    ready: "Listo",
    january: "Enero",
    february: "Febrero",
    march: "Marzo",
    april: "Abril",
    may: "Mayo",
    june: "Junio",
    july: "Julio",
    august: "Agosto",
    september: "Septiembre",
    october: "Octubre",
    november: "Noviembre",
    december: "Diciembre",
  },
  fr: {
    pageTitle: "Panneau de Controle",
    configuration: "CONFIGURATION",
    downtime: "TEMPS D'ATTENTE:",
    quickTime: "Temps Rapide",
    customTime: "Temps Personnalise",
    minutes: "MINUTES",
    seconds: "SECONDES",
    save: "ENREGISTRER",
    translate: "Traduire",
    language: "Langue",
    languageEnglish: "Anglais",
    languageSpanish: "Espagnol",
    languageFrench: "Francais",
    languageGerman: "Allemand",
    languageRussian: "Russe",
    subtitle: "Un panneau de controle r/Place",
    days: "JOURS",
    months: "MOIS",
    startAll: "DEMARRER TOUT",
    ready: "Pret",
    january: "Janvier",
    february: "Fevrier",
    march: "Mars",
    april: "Avril",
    may: "Mai",
    june: "Juin",
    july: "Juillet",
    august: "Aout",
    september: "Septembre",
    october: "Octobre",
    november: "Novembre",
    december: "Decembre",
  },
  de: {
    pageTitle: "Kontrollpanel",
    configuration: "KONFIGURATION",
    downtime: "AUSZEIT:",
    quickTime: "Schnellzeit",
    customTime: "Benutzerzeit",
    minutes: "MINUTEN",
    seconds: "SEKUNDEN",
    save: "SPEICHERN",
    translate: "Uebersetzen",
    language: "Sprache",
    languageEnglish: "Englisch",
    languageSpanish: "Spanisch",
    languageFrench: "Franzoesisch",
    languageGerman: "Deutsch",
    languageRussian: "Russisch",
    subtitle: "Ein r/Place Kontrollpanel",
    days: "TAGE",
    months: "MONATE",
    startAll: "ALLE STARTEN",
    ready: "Bereit",
    january: "Januar",
    february: "Februar",
    march: "Maerz",
    april: "April",
    may: "Mai",
    june: "Juni",
    july: "Juli",
    august: "August",
    september: "September",
    october: "Oktober",
    november: "November",
    december: "Dezember",
  },
  ru: {
    pageTitle: "Panel Upravleniya",
    configuration: "NASTROIKI",
    downtime: "VREMYA OZHIDANIYA:",
    quickTime: "Bystroe Vremya",
    customTime: "Svoe Vremya",
    minutes: "MINUTY",
    seconds: "SEKUNDY",
    save: "SOHRANIT",
    translate: "Perevod",
    language: "Yazyk",
    languageEnglish: "Angliyskiy",
    languageSpanish: "Ispanskiy",
    languageFrench: "Frantsuzskiy",
    languageGerman: "Nemeckiy",
    languageRussian: "Russkiy",
    subtitle: "Panel upravleniya r/Place",
    days: "DNI",
    months: "MESYACY",
    startAll: "ZAPUSTIT VSE",
    ready: "Gotovo",
    january: "Yanvar",
    february: "Fevral",
    march: "Mart",
    april: "Aprel",
    may: "May",
    june: "Iyun",
    july: "Iyul",
    august: "Avgust",
    september: "Sentyabr",
    october: "Oktyabr",
    november: "Noyabr",
    december: "Dekabr",
  },
};

const monthKeys = [
  "january",
  "february",
  "march",
  "april",
  "may",
  "june",
  "july",
  "august",
  "september",
  "october",
  "november",
  "december",
];

let currentLanguage =
  localStorage.getItem(LANGUAGE_STORAGE_KEY) || DEFAULT_LANGUAGE;
if (!translations[currentLanguage]) {
  currentLanguage = DEFAULT_LANGUAGE;
}

let hasSavedValue =
  localStorage.getItem(COUNT_STORAGE_KEY) !== null
    ? Number(localStorage.getItem(COUNT_STORAGE_KEY))
    : DEFAULT_COOLDOWN;
if (Number.isNaN(hasSavedValue) || hasSavedValue < 0) {
  hasSavedValue = DEFAULT_COOLDOWN;
}

let count = 0;

function t(key) {
  const dictionary =
    translations[currentLanguage] || translations[DEFAULT_LANGUAGE];
  return dictionary[key] || translations[DEFAULT_LANGUAGE][key] || key;
}

function applyStaticTranslations() {
  document.documentElement.lang = currentLanguage;
  document.title = t("pageTitle");

  const pageTitleElement = document.getElementById("pageTitle");
  if (pageTitleElement) {
    pageTitleElement.textContent = t("pageTitle");
  }

  document.querySelectorAll("[data-i18n]").forEach((element) => {
    const key = element.getAttribute("data-i18n");
    element.textContent = t(key);
  });
}

function applyMonthTranslations() {
  document
    .querySelectorAll(".months-content[data-month-key]")
    .forEach((element) => {
      const monthKey = element.getAttribute("data-month-key");
      element.textContent = t(monthKey);
    });
}

function applyReadyTranslations() {
  const readyValues = Object.values(translations).map(
    (dictionary) => dictionary.ready,
  );

  document.querySelectorAll(".bottom").forEach((element) => {
    const value = element.textContent.trim();
    if (readyValues.includes(value)) {
      element.textContent = t("ready");
    }
  });
}

function applyLanguage() {
  applyStaticTranslations();
  applyMonthTranslations();
  applyReadyTranslations();
}

function syncLanguageSelect() {
  const languageSelect = document.getElementById("languageSelect");
  if (languageSelect) {
    languageSelect.value = currentLanguage;
  }
}

function setLanguage(language) {
  if (!translations[language]) {
    return;
  }

  currentLanguage = language;
  localStorage.setItem(LANGUAGE_STORAGE_KEY, currentLanguage);
  applyLanguage();
}

function updateCurrentTime(timeInSec = DEFAULT_COOLDOWN) {
  const parsedTime = Number(timeInSec);
  const normalizedTime =
    Number.isFinite(parsedTime) && parsedTime >= 0
      ? parsedTime
      : DEFAULT_COOLDOWN;

  localStorage.setItem(COUNT_STORAGE_KEY, normalizedTime);
  count = normalizedTime;

  const displayTime = new Date(normalizedTime * 1000);
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
  bottomDiv.textContent = t("ready");
  numberContainer.appendChild(bottomDiv);
}

updateCurrentTime(hasSavedValue);

// Create month elements
const monthsContent = document.getElementById("monthsContent");
for (const monthKey of monthKeys) {
  const monthContainer = document.createElement("div");
  monthContainer.className = "months-container";
  monthsContent.appendChild(monthContainer);

  const monthDiv = document.createElement("div");
  monthDiv.className = "months-content boxborder";
  monthDiv.dataset.monthKey = monthKey;
  monthDiv.textContent = t(monthKey);
  monthContainer.appendChild(monthDiv);

  const bottomDiv = document.createElement("div");
  bottomDiv.className = "bottom";
  bottomDiv.textContent = t("ready");
  monthContainer.appendChild(bottomDiv);
}

// Function to handle the countdown logic
function startCountdown(container) {
  const bottomElement = container.querySelector(".bottom");
  const backgroundEl = container.querySelector(".boxborder");
  bottomElement.style.backgroundColor = "grey";
  backgroundEl.style.backgroundColor = "grey";
  backgroundEl.style.color = "#939393";

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
      bottomElement.innerText = t("ready");

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
  const settingsContainer = document.getElementById("settings").style.display;
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
}

function updateCustom() {
  const seconds = parseInt(document.getElementById("usec").value, 10) || 0;
  const minutes = parseInt(document.getElementById("umin").value, 10) || 0;
  const totalSeconds = (seconds + minutes * 60) % 3600;

  updateCurrentTime(totalSeconds);
}

syncLanguageSelect();
applyLanguage();
