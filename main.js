/* ==============================
   Main JavaScript for Cristo Te Llama
   Handles Dark Mode, Language Toggle, Calendar, and Popups
   ============================== */

// ---------------- Dark Mode ----------------
const darkToggle = document.getElementById("darkModeToggle");

function applyDarkMode(isDark) {
  if(isDark){
    document.body.classList.add("dark");
    document.querySelectorAll(".calendar-wrapper").forEach(c => c.classList.add("dark"));
    localStorage.setItem("darkMode", "true");
  } else {
    document.body.classList.remove("dark");
    document.querySelectorAll(".calendar-wrapper").forEach(c => c.classList.remove("dark"));
    localStorage.setItem("darkMode", "false");
  }
}

// Load dark mode from localStorage
const savedDark = localStorage.getItem("darkMode");
applyDarkMode(savedDark === "true");

// Toggle dark mode
darkToggle.addEventListener("click", () => {
  applyDarkMode(!document.body.classList.contains("dark"));
});

// ---------------- Language Toggle ----------------
const langToggle = document.getElementById("langToggle");

function toggleLanguage() {
  document.querySelectorAll("[data-en]").forEach(el => {
    const current = el.innerText;
    el.innerText = (current === el.dataset.en) ? el.dataset.es : el.dataset.en;
  });
  const lang = localStorage.getItem("lang") === "es" ? "en" : "es";
  localStorage.setItem("lang", lang);
}

// Load language from localStorage
const savedLang = localStorage.getItem("lang") || "en";
if(savedLang === "es") toggleLanguage();

if(langToggle){
  langToggle.addEventListener("click", toggleLanguage);
}

// ---------------- Calendar ----------------
const months = [
  {name:"January", days:31},{name:"February", days:28},{name:"March", days:31},
  {name:"April", days:30},{name:"May", days:31},{name:"June", days:30},
  {name:"July", days:31},{name:"August", days:31},{name:"September", days:30},
  {name:"October", days:31},{name:"November", days:30},{name:"December", days:31}
];

let currentDate = new Date();
let currentYear = currentDate.getFullYear();
let currentMonth = currentDate.getMonth();

const calendarGrid = document.getElementById("calendarGrid");
const monthTitle = document.getElementById("monthTitle");
const popup = document.getElementById("popup");
const popupText = document.getElementById("popupText");

// Sample event data (can add more later)
const events = [
  {day:3, month:0, year:2026, title:"Servicio De Adoración", type:"event"},
  {day:8, month:0, year:2026, title:"Oración De Damas 7:00PM", type:"women"}
];

// Generate calendar for given month/year
function renderCalendar(year = currentYear, month = currentMonth){
  calendarGrid.innerHTML = "";

  // Show month and year
  monthTitle.innerText = `${months[month].name} ${year}`;

  // Day names
  const dayNames = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
  dayNames.forEach(d => {
    const div = document.createElement("div");
    div.classList.add("day-name");
    div.innerText = d;
    calendarGrid.appendChild(div);
  });

  // First day offset
  const firstDay = new Date(year, month, 1).getDay();
  for(let i=0;i<firstDay;i++){
    const empty = document.createElement("div");
    empty.classList.add("day","empty");
    calendarGrid.appendChild(empty);
  }

  // Days
  const daysInMonth = new Date(year, month+1,0).getDate();
  for(let d=1; d<=daysInMonth; d++){
    const dayDiv = document.createElement("div");
    dayDiv.classList.add("day");
    // Find events for this day
    const dayEvents = events.filter(e=>e.day===d && e.month===month && e.year===year);
    if(dayEvents.length){
      dayEvents.forEach(ev=>{
        dayDiv.classList.add(ev.type);
        dayDiv.dataset.event = ev.title;
      });
    }
    dayDiv.innerHTML = `<span>${d}</span>${dayEvents.length?'<small>'+dayEvents[0].title+'</small>':''}`;
    dayDiv.addEventListener("click", ()=>{
      if(dayDiv.dataset.event){
        popupText.innerText = dayDiv.dataset.event;
        popup.style.display = "flex";
      }
    });
    calendarGrid.appendChild(dayDiv);
  }
}

// Next/Prev month
function nextMonth(){
  currentMonth++;
  if(currentMonth>11){ currentMonth=0; currentYear++; }
  renderCalendar(currentYear,currentMonth);
}
function prevMonth(){
  currentMonth--;
  if(currentMonth<0){ currentMonth=11; currentYear--; }
  renderCalendar(currentYear,currentMonth);
}

// Close popup
function closePopup(){
  popup.style.display="none";
}

document.getElementById("nextMonthBtn").addEventListener("click", nextMonth);
document.getElementById("prevMonthBtn").addEventListener("click", prevMonth);
document.querySelectorAll(".close").forEach(c => c.addEventListener("click", closePopup));

// Initial render
renderCalendar();
