const calendarGrid = document.getElementById("calendarGrid");
const monthTitle = document.getElementById("monthTitle");
const eventBanner = document.getElementById("eventBanner");
let date = new Date();
let currentEventIndex = 0;

// Calendar events
const events = [
  {day:3, title:"Servicio De Adoracion", type:"event"},
  {day:6, title:"Servicio De Oracion", type:"event"},
  {day:8, title:"Oracion De Damas 7pm", type:"women"},
  {day:10, title:"Servicio De Adoracion", type:"event"},
  {day:11, title:"Ayuno Congregacional", type:"event"},
  {day:13, title:"Servicio De Oracion", type:"event"},
  {day:15, title:"Oracion De Damas 7pm", type:"women"},
  {day:17, title:"Servicio De Adoracion", type:"event"},
  {day:20, title:"Servicio De Oracion", type:"event"},
  {day:22, title:"Oracion De Damas 7pm", type:"women"},
  {day:24, title:"Servicio De Adoracion Retiro Y Servicio De Damas", type:"event"},
  {day:27, title:"Servicio De Oracion", type:"event"},
  {day:29, title:"Oracion De Damas 7pm", type:"women"},
  {day:30, title:"Gran Vigilia Congregacional", type:"event"},
  {day:31, title:"Servicio De Adoracion", type:"event"}
];

// RENDER CALENDAR
function renderCalendar() {
  calendarGrid.innerHTML = "";
  const year = date.getFullYear();
  const month = date.getMonth();
  monthTitle.innerText = date.toLocaleString("default", { month: "long", year: "numeric" });

  const firstDay = new Date(year, month, 1).getDay();
  const days = new Date(year, month + 1, 0).getDate();

  for (let i = 0; i < firstDay; i++) {
    calendarGrid.innerHTML += `<div class="day empty"></div>`;
  }

  for (let d = 1; d <= days; d++) {
    const dayEvent = events.find(e => e.day === d);
    let className = dayEvent ? dayEvent.type : "";
    let title = dayEvent ? `<br><small>${dayEvent.title}</small>` : "";
    calendarGrid.innerHTML += `<div class="day ${className}">${d}${title}</div>`;
  }
}

// NEXT / PREV MONTH
function nextMonth() { date.setMonth(date.getMonth()+1); renderCalendar(); }
function prevMonth() { date.setMonth(date.getMonth()-1); renderCalendar(); }

// DARK MODE TOGGLE
document.getElementById("darkModeToggle").addEventListener("click", () => {
  document.body.classList.toggle("dark");
});

// LANGUAGE TOGGLE
document.getElementById("langToggle").addEventListener("click", () => {
  document.querySelectorAll("[data-en]").forEach(el => {
    el.innerText = el.innerText === el.dataset.en ? el.dataset.es : el.dataset.en;
  });
});

// POPUP
const popup = document.getElementById("popup");
const popupText = document.getElementById("popupText");
function openPopup(msg){ popupText.innerText = msg; popup.style.display="flex"; }
function closePopup(){ popup.style.display="none"; }

// EVENT BANNER LOGIC
function highlightEventDay(day) {
  const allDays = document.querySelectorAll(".calendar-grid .day");
  allDays.forEach(d => d.classList.remove("highlight"));
  allDays.forEach(d => {
    if (!d.classList.contains("empty") && parseInt(d.textContent) === day) {
      d.classList.add("highlight");
    }
  });
  setTimeout(() => allDays.forEach(d => d.classList.remove("highlight")), 10000);
}

function hideBanner() { eventBanner.classList.remove("show"); }

function showNextEvent() {
  if (events.length === 0) return;

  let attempts = 0;
  let event;

  do {
    event = events[currentEventIndex];
    currentEventIndex = (currentEventIndex + 1) % events.length;
    attempts++;
  } while (sessionStorage.getItem(`dismissed-${event.day}`) && attempts <= events.length);

  if (!event) return;

  const today = new Date().getDate();
  const todayEvents = events.filter(e => e.day === today && !sessionStorage.getItem(`dismissed-${e.day}`));
  const todayCount = todayEvents.length;

  eventBanner.classList.remove("show");

  setTimeout(() => {
    let bannerText = `${event.title}`;
    if (today === event.day && todayCount > 1) {
      bannerText += ` (and ${todayCount - 1} more event${todayCount - 1 > 1 ? "s" : ""} today!)`;
    }

    eventBanner.innerHTML = `
      <div id="todayEventPulse"></div>
      <span id="bannerText">${bannerText}</span>
      <span class="calendarHint">→ View Calendar</span>
      <span id="closeBanner">&times;</span>
    `;

    eventBanner.classList.remove("bounce", "now");
    if (event.day === today) eventBanner.classList.add("now");
    void eventBanner.offsetWidth;
    eventBanner.classList.add("bounce");
    eventBanner.classList.add("show");

    document.getElementById("closeBanner").addEventListener("click", () => {
      hideBanner();
      sessionStorage.setItem(`dismissed-${event.day}`, "true");
    });

    document.getElementById("bannerText").addEventListener("click", () => {
      const calendarSection = document.getElementById("eventos");
      if (calendarSection) calendarSection.scrollIntoView({ behavior: "smooth" });
      highlightEventDay(event.day);
    });

    setTimeout(hideBanner, 30000);

  }, 600);
}

// INIT
renderCalendar();
showNextEvent();
setInterval(showNextEvent, 15000);
