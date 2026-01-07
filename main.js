// PWA - Service Worker
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("/sw.js")
      .then(reg => console.log("SW registered", reg))
      .catch(err => console.log("SW failed", err));
  });
}

// Dark Mode
if (localStorage.getItem("darkMode") === "true") {
  document.body.classList.add("dark");
  document.querySelectorAll(".calendar-container, #liveStream").forEach(el => el.classList.add("dark"));
}
document.getElementById("darkModeToggle").addEventListener("click", () => {
  document.body.classList.toggle("dark");
  document.querySelectorAll(".calendar-container, #liveStream").forEach(el => el.classList.toggle("dark"));
  localStorage.setItem("darkMode", document.body.classList.contains("dark"));
});

// Language Toggle
function toggleLang() {
  document.querySelectorAll("[data-en]").forEach(el => {
    el.innerText = (el.innerText === el.dataset.en) ? el.dataset.es : el.dataset.en;
  });
}

// Calendar
const calendarGrid = document.getElementById("calendarGrid");
const monthTitle = document.getElementById("monthTitle");
const popup = document.getElementById("popup");
const popupText = document.getElementById("popupText");
const closeBtn = document.querySelector(".close");

let currentDate = new Date();

// Event data
const events = [
  {day:6, month:0, year:2026, title:"Servicio De Oracion", type:"event"},
  {day:13, month:0, year:2026, title:"Servicio De Oracion", type:"event"},
  {day:20, month:0, year:2026, title:"Servicio De Oracion", type:"event"},
  {day:27, month:0, year:2026, title:"Servicio De Oracion", type:"event"},
  {day:8, month:0, year:2026, title:"Oracion De Damas 7pm", type:"women"},
  {day:15, month:0, year:2026, title:"Oracion De Damas 7pm", type:"women"},
  {day:22, month:0, year:2026, title:"Oracion De Damas 7pm", type:"women"},
  {day:29, month:0, year:2026, title:"Oracion De Damas 7pm", type:"women"},
  {day:30, month:0, year:2026, title:"Gran Vigilia Congregacional", type:"event"},
  {day:11, month:0, year:2026, title:"Ayuno Congregacional", type:"event"},
  {day:3, month:0, year:2026, title:"Servicio De Adoracion", type:"event"},
  {day:10, month:0, year:2026, title:"Servicio De Adoracion", type:"event"},
  {day:17, month:0, year:2026, title:"Servicio De Adoracion", type:"event"},
  {day:31, month:0, year:2026, title:"Servicio De Adoracion", type:"event"},
  {day:24, month:0, year:2026, title:"Servicio De Adoracion Retiro Y Servicio De Damas", type:"event", long:true}
];

// Render Calendar
function renderCalendar() {
  calendarGrid.innerHTML = "";
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  monthTitle.innerText = currentDate.toLocaleString("default", { month: "long", year: "numeric" });

  const firstDay = new Date(year, month, 1).getDay();
  const lastDay = new Date(year, month + 1, 0).getDate();

  // Empty slots
  for (let i = 0; i < firstDay; i++) {
    const empty = document.createElement("div");
    empty.classList.add("day", "empty");
    calendarGrid.appendChild(empty);
  }

  // Days
  for (let d = 1; d <= lastDay; d++) {
    const dayDiv = document.createElement("div");
    dayDiv.classList.add("day");
    const event = events.find(e => e.day===d && e.month===month && e.year===year);
    if(event){
      dayDiv.classList.add(event.type);
      if(event.long) dayDiv.classList.add("long-event");
      dayDiv.innerHTML = `<span>${d}</span><small>${event.title.length > 15 ? event.title.substring(0,15)+"..." : event.title}</small>`;
      dayDiv.dataset.full = event.title;
    } else {
      dayDiv.innerHTML = `<span>${d}</span>`;
    }
    dayDiv.addEventListener("click", ()=>{
      if(dayDiv.dataset.full){
        popupText.innerText = dayDiv.dataset.full;
        popup.style.display="flex";
      }
    });
    calendarGrid.appendChild(dayDiv);
  }
}

// Calendar navigation
function nextMonth(){
  if(currentDate.getFullYear()===2030 && currentDate.getMonth()===11) return; // limit 2030
  currentDate.setMonth(currentDate.getMonth()+1);
  renderCalendar();
}
function prevMonth(){
  if(currentDate.getFullYear()===2026 && currentDate.getMonth()===0) return; // limit 2026
  currentDate.setMonth(currentDate.getMonth()-1);
  renderCalendar();
}

// Close popup
closeBtn.addEventListener("click", ()=> popup.style.display="none");

// Initial render
renderCalendar();
