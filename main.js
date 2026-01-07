/* main.js */

// ------------------ Dark Mode ------------------
const darkModeToggle = document.getElementById("darkModeToggle");
const body = document.body;

// Load dark mode preference
if (localStorage.getItem("darkMode") === "enabled") {
  body.classList.add("dark-mode");
}

darkModeToggle.addEventListener("click", () => {
  body.classList.toggle("dark-mode");
  localStorage.setItem(
    "darkMode",
    body.classList.contains("dark-mode") ? "enabled" : "disabled"
  );
});

// ------------------ Language Toggle ------------------
const langToggle = document.getElementById("langToggle");
let currentLang = localStorage.getItem("lang") || "en";

function updateLanguage() {
  document.querySelectorAll("[data-en]").forEach((el) => {
    el.innerText = currentLang === "en" ? el.dataset.en : el.dataset.es;
  });
}
updateLanguage();

if (langToggle) {
  langToggle.addEventListener("click", () => {
    currentLang = currentLang === "en" ? "es" : "en";
    localStorage.setItem("lang", currentLang);
    updateLanguage();
  });
}

// ------------------ Calendar ------------------
const calendarGrid = document.getElementById("calendarGrid");
const monthTitle = document.getElementById("monthTitle");
const popup = document.getElementById("popup");
const popupText = document.getElementById("popupText");
let currentDate = new Date();

// 2026-2030 Events
const events = [
  { day: 3, month: 0, year: 2026, title: "Servicio De Adoracion", type: "event" },
  { day: 10, month: 0, year: 2026, title: "Servicio De Adoracion", type: "event" },
  { day: 17, month: 0, year: 2026, title: "Servicio De Adoracion", type: "event" },
  { day: 31, month: 0, year: 2026, title: "Servicio De Adoracion", type: "event" },
  { day: 6, month: 0, year: 2026, title: "Servicio De Oracion", type: "special" },
  { day: 13, month: 0, year: 2026, title: "Servicio De Oracion", type: "special" },
  { day: 20, month: 0, year: 2026, title: "Servicio De Oracion", type: "special" },
  { day: 27, month: 0, year: 2026, title: "Servicio De Oracion", type: "special" },
  { day: 8, month: 0, year: 2026, title: "Oracion De Damas 7PM", type: "women" },
  { day: 15, month: 0, year: 2026, title: "Oracion De Damas 7PM", type: "women" },
  { day: 22, month: 0, year: 2026, title: "Oracion De Damas 7PM", type: "women" },
  { day: 29, month: 0, year: 2026, title: "Oracion De Damas 7PM", type: "women" },
  { day: 11, month: 0, year: 2026, title: "Ayuno Congregacional", type: "special" },
  { day: 30, month: 0, year: 2026, title: "Gran Vigilia Congregacional", type: "special" },
  { day: 24, month: 0, year: 2026, title: "Servicio De Adoracion Retiro Y Servicio De Damas", type: "long" }
];

// Calendar rendering
function renderCalendar() {
  calendarGrid.innerHTML = "";
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  monthTitle.innerText = currentDate.toLocaleString("default", {
    month: "long",
    year: "numeric"
  });

  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  // Day names
  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  dayNames.forEach((d) => {
    const div = document.createElement("div");
    div.classList.add("day-name");
    div.innerText = d;
    calendarGrid.appendChild(div);
  });

  // Empty days
  for (let i = 0; i < firstDay; i++) {
    const div = document.createElement("div");
    div.classList.add("day", "empty");
    calendarGrid.appendChild(div);
  }

  // Days
  for (let d = 1; d <= daysInMonth; d++) {
    const div = document.createElement("div");
    div.classList.add("day");

    // Event check
    const event = events.find(
      (e) => e.day === d && e.month === month && e.year === year
    );

    if (event) {
      div.classList.add(event.type);
      div.innerHTML = `<span>${d}</span><small>${event.title.length>18?event.title.slice(0,18)+'...':event.title}</small>`;
      div.addEventListener("click", () => {
        popupText.innerText = event.title;
        popup.style.display = "flex";
      });
    } else {
      div.innerHTML = `<span>${d}</span>`;
    }

    calendarGrid.appendChild(div);
  }
}

// Arrow navigation
document.getElementById("prevMonth").addEventListener("click", () => {
  currentDate.setMonth(currentDate.getMonth() - 1);
  renderCalendar();
});
document.getElementById("nextMonth").addEventListener("click", () => {
  currentDate.setMonth(currentDate.getMonth() + 1);
  renderCalendar();
});

// Close popup
document.querySelector(".close").addEventListener("click", () => {
  popup.style.display = "none";
});

// Initial render
renderCalendar();

// ------------------ YouTube Live ------------------
const liveContainer = document.getElementById("liveStream");
if (liveContainer) {
  liveContainer.innerHTML = `
    <iframe 
      width="100%" height="480"
      src="https://www.youtube.com/embed/live_stream?channel=UCB-beIq8bOOnmi78a8uEvWQ"
      allow="autoplay; encrypted-media; picture-in-picture"
      allowfullscreen>
    </iframe>
  `;
}
