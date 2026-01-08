/* ========= DARK MODE ========= */
const darkModeToggle = document.getElementById("darkModeToggle");

function loadDarkMode() {
  if(localStorage.getItem("darkMode") === "true") document.body.classList.add("dark");
}
loadDarkMode();

darkModeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  localStorage.setItem("darkMode", document.body.classList.contains("dark"));
});

/* ========= LANGUAGE TOGGLE ========= */
const langToggle = document.getElementById("langToggle");
langToggle.addEventListener("click", () => {
  document.querySelectorAll("[data-en]").forEach(el => {
    el.innerText = el.innerText === el.dataset.en ? el.dataset.es : el.dataset.en;
  });
});

/* ========= CALENDAR ========= */
const calendarGrid = document.getElementById("calendarGrid");
const monthTitle = document.getElementById("monthTitle");

let currentDate = new Date();
let currentMonth = currentDate.getMonth();
let currentYear = currentDate.getFullYear();

// Events
const events = [
  { day: 3, month:0, year:2026, title:"Servicio De Adoracion", type:"event" },
  { day: 10, month:0, year:2026, title:"Servicio De Adoracion", type:"event" },
  { day: 17, month:0, year:2026, title:"Servicio De Adoracion", type:"event" },
  { day: 31, month:0, year:2026, title:"Servicio De Adoracion", type:"event" },
  { day: 6, month:0, year:2026, title:"Servicio De Oracion", type:"event" },
  { day: 13, month:0, year:2026, title:"Servicio De Oracion", type:"event" },
  { day: 20, month:0, year:2026, title:"Servicio De Oracion", type:"event" },
  { day: 27, month:0, year:2026, title:"Servicio De Oracion", type:"event" },
  { day: 8, month:0, year:2026, title:"Oracion De Damas 7PM", type:"women" },
  { day: 15, month:0, year:2026, title:"Oracion De Damas 7PM", type:"women" },
  { day: 22, month:0, year:2026, title:"Oracion De Damas 7PM", type:"women" },
  { day: 29, month:0, year:2026, title:"Oracion De Damas 7PM", type:"women" },
  { day: 30, month:0, year:2026, title:"Gran Vigilia Congregacional", type:"special" },
  { day: 11, month:0, year:2026, title:"Ayuno Congregacional", type:"special" },
  { day: 24, month:0, year:2026, title:"Servicio De Adoracion Retiro y Servicio De Damas", type:"special" }
];

function renderCalendar() {
  if(!calendarGrid) return;

  calendarGrid.innerHTML = "";

  const months = [
    "January","February","March","April","May","June",
    "July","August","September","October","November","December"
  ];

  monthTitle.innerText = `${months[currentMonth]} ${currentYear}`;

  const firstDay = new Date(currentYear,currentMonth,1).getDay();
  const daysInMonth = new Date(currentYear,currentMonth+1,0).getDate();

  // empty slots
  for(let i=0;i<firstDay;i++){
    const emptyDiv = document.createElement("div");
    emptyDiv.classList.add("day","empty");
    calendarGrid.appendChild(emptyDiv);
  }

  // days
  for(let d=1; d<=daysInMonth; d++){
    const dayDiv = document.createElement("div");
    dayDiv.classList.add("day");
    const eventToday = events.find(ev => ev.day===d && ev.month===currentMonth && ev.year===currentYear);
    if(eventToday){
      dayDiv.classList.add(eventToday.type);
      dayDiv.innerHTML = `<span>${d}</span><small>${eventToday.title}</small>`;
      dayDiv.addEventListener("click",()=>{
        showPopup(eventToday.title);
      });
    } else {
      dayDiv.innerHTML = `<span>${d}</span>`;
    }
    calendarGrid.appendChild(dayDiv);
  }
}

// Popup
function showPopup(text){
  const popup = document.getElementById("popup");
  document.getElementById("popupText").innerText = text;
  popup.style.display = "flex";
}

function closePopup(){
  document.getElementById("popup").style.display = "none";
}

// Navigation for calendar
function nextMonth(){
  currentMonth++;
  if(currentMonth>11){
    currentMonth=0;
    currentYear++;
  }
  renderCalendar();
}

function prevMonth(){
  currentMonth--;
  if(currentMonth<0){
    currentMonth=11;
    currentYear--;
  }
  renderCalendar();
}

renderCalendar();
