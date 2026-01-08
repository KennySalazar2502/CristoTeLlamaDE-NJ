/* ======================
   DARK MODE (GLOBAL)
====================== */
const darkToggle = document.getElementById("darkModeToggle");
if (localStorage.getItem("dark") === "true") {
  document.body.classList.add("dark");
}

darkToggle?.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  localStorage.setItem("dark", document.body.classList.contains("dark"));
});

/* ======================
   LANGUAGE TOGGLE
====================== */
const langToggle = document.getElementById("langToggle");
let currentLang = localStorage.getItem("lang") || "en";

function setLanguage(lang) {
  document.querySelectorAll("[data-en]").forEach(el => {
    el.innerText = lang === "en" ? el.dataset.en : el.dataset.es;
  });
  localStorage.setItem("lang", lang);
}
setLanguage(currentLang);

langToggle?.addEventListener("click", () => {
  currentLang = currentLang === "en" ? "es" : "en";
  setLanguage(currentLang);
  renderCalendar(); // re-render calendar language
});

/* ======================
   CALENDAR
====================== */
const calendarGrid = document.getElementById("calendarGrid");
const monthTitle = document.getElementById("monthTitle");

let date = new Date(2026, 0, 1); // January 2026

const weekdayNames = {
  en: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
  es: ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"]
};

const events = [
  { day: 3, title: { en: "Servicio De Adoracion", es: "Servicio de Adoración" }, type: "event" },
  { day: 6, title: { en: "Servicio De Oracion", es: "Servicio de Oración" }, type: "event" },
  { day: 8, title: { en: "Oracion De Damas 7pm", es: "Oración de Damas 7pm" }, type: "women" },
  { day: 11, title: { en: "Ayuno Congregacional", es: "Ayuno Congregacional" }, type: "event" },
  { day: 24, title: { en: "Retiro y Servicio de Damas", es: "Retiro y Servicio de Damas" }, type: "event" }
];

function renderCalendar() {
  if (!calendarGrid) return;

  calendarGrid.innerHTML = "";
  const year = date.getFullYear();
  const month = date.getMonth();

  monthTitle.innerText = date.toLocaleString(
    currentLang === "en" ? "en-US" : "es-ES",
    { month: "long", year: "numeric" }
  );

  // Weekday headers
  weekdayNames[currentLang].forEach(day => {
    const div = document.createElement("div");
    div.className = "day-name";
    div.innerText = day;
    calendarGrid.appendChild(div);
  });

  const firstDay = new Date(year, month, 1).getDay();
  for (let i = 0; i < firstDay; i++) {
    calendarGrid.appendChild(document.createElement("div"));
  }

  const daysInMonth = new Date(year, month + 1, 0).getDate();

  for (let d = 1; d <= daysInMonth; d++) {
    const dayDiv = document.createElement("div");
    dayDiv.className = "day";

    const eventToday =
      year === 2026 && month === 0
        ? events.find(e => e.day === d)
        : null;

    if (eventToday) {
      dayDiv.classList.add(eventToday.type);
      const title = eventToday.title[currentLang];
      const shortTitle =
        title.length > 18 ? title.slice(0, 18) + "…" : title;

      dayDiv.innerHTML = `<span>${d}</span><small>${shortTitle}</small>`;
      dayDiv.onclick = () => {
        document.getElementById("popupText").innerText = title;
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

function closePopup() {
  document.getElementById("popup").style.display = "none";
}

renderCalendar();
