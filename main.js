/***********************
 DARK MODE (GLOBAL)
************************/
const body = document.body;
const darkModeToggle = document.getElementById("darkModeToggle");

if (localStorage.getItem("darkMode") === "true") {
  body.classList.add("dark");
}

if (darkModeToggle) {
  darkModeToggle.addEventListener("click", () => {
    body.classList.toggle("dark");
    localStorage.setItem("darkMode", body.classList.contains("dark"));
  });
}

/***********************
 LANGUAGE TOGGLE
************************/
const langToggle = document.getElementById("langToggle");
let currentLang = localStorage.getItem("lang") || "en";

const translations = {
  weekdays: {
    en: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
    es: ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"]
  },
  months: {
    en: [
      "January","February","March","April","May","June",
      "July","August","September","October","November","December"
    ],
    es: [
      "enero","febrero","marzo","abril","mayo","junio",
      "julio","agosto","septiembre","octubre","noviembre","diciembre"
    ]
  }
};

function updateLanguage(lang) {
  document.querySelectorAll("[data-en]").forEach(el => {
    el.innerText = lang === "en" ? el.dataset.en : el.dataset.es;
  });
  currentLang = lang;
  localStorage.setItem("lang", lang);
  renderCalendar();
}

if (langToggle) {
  langToggle.addEventListener("click", () => {
    updateLanguage(currentLang === "en" ? "es" : "en");
  });
}

updateLanguage(currentLang);

/***********************
 POPUP
************************/
function closePopup() {
  document.getElementById("popup").style.display = "none";
}

/***********************
 CALENDAR
************************/
const calendarGrid = document.getElementById("calendarGrid");
const monthTitle = document.getElementById("monthTitle");

let date = new Date(2026, 0, 1); // January 2026

const serviceDays = [0, 2, 6]; // Sun, Tue, Sat

const events = [
  { day: 3, title: "Servicio De Adoración", type: "event" },
  { day: 6, title: "Servicio De Oración", type: "event" },
  { day: 8, title: "Oración De Damas 7pm", type: "women" },
  { day: 10, title: "Servicio De Adoración", type: "event" },
  { day: 11, title: "Ayuno Congregacional", type: "event" },
  { day: 13, title: "Servicio De Oración", type: "event" },
  { day: 15, title: "Oración De Damas 7pm", type: "women" },
  { day: 17, title: "Servicio De Adoración", type: "event" },
  { day: 20, title: "Servicio De Oración", type: "event" },
  { day: 22, title: "Oración De Damas 7pm", type: "women" },
  { day: 24, title: "Servicio De Adoración Retiro Y Servicio De Damas", type: "event" },
  { day: 27, title: "Servicio De Oración", type: "event" },
  { day: 29, title: "Oración De Damas 7pm", type: "women" },
  { day: 30, title: "Gran Vigilia Congregacional", type: "event" },
  { day: 31, title: "Servicio De Adoración", type: "event" }
];

function renderCalendar() {
  if (!calendarGrid) return;
  calendarGrid.innerHTML = "";

  const year = date.getFullYear();
  const month = date.getMonth();
  const today = new Date();

  monthTitle.innerText =
    translations.months[currentLang][month] + " " + year;

  // Weekday headers
  translations.weekdays[currentLang].forEach(day => {
    const d = document.createElement("div");
    d.className = "day-name";
    d.innerText = day;
    calendarGrid.appendChild(d);
  });

  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  for (let i = 0; i < firstDay; i++) {
    calendarGrid.appendChild(document.createElement("div"));
  }

  for (let d = 1; d <= daysInMonth; d++) {
    const cellDate = new Date(year, month, d);
    const dayDiv = document.createElement("div");
    dayDiv.className = "day";

    // Weekend styling
    if (cellDate.getDay() === 0 || cellDate.getDay() === 6) {
      dayDiv.classList.add("weekend");
    }

    // Service day highlight
    if (serviceDays.includes(cellDate.getDay())) {
      dayDiv.classList.add("service-day");
    }

    // Today highlight
    if (
      d === today.getDate() &&
      month === today.getMonth() &&
      year === today.getFullYear()
    ) {
      dayDiv.classList.add("today");
    }

    const eventToday =
      month === 0 ? events.find(e => e.day === d) : null;

    if (eventToday) {
      dayDiv.classList.add(eventToday.type);
      const shortText =
        eventToday.title.length > 20
          ? eventToday.title.slice(0, 20) + "…"
          : eventToday.title;

      dayDiv.innerHTML = `<span>${d}</span><small>${shortText}</small>`;
      dayDiv.onclick = () => {
        document.getElementById("popupText").innerText = eventToday.title;
        document.getElementById("popup").style.display = "flex";
      };
    } else {
      dayDiv.innerHTML = `<span>${d}</span>`;
    }

    calendarGrid.appendChild(dayDiv);
  }
}

function nextMonth() {
  date.setMonth(date.getMonth() + 1);
  renderCalendar();
}

function prevMonth() {
  date.setMonth(date.getMonth() - 1);
  renderCalendar();
}

renderCalendar();

