// ===== GLOBAL VARIABLES =====
const calendarWrapper = document.getElementById("calendarWrapper");
const calendarGrid = document.getElementById("calendar");
const monthTitle = document.getElementById("monthTitle");
const darkModeToggle = document.getElementById("darkModeToggle");
const langToggle = document.getElementById("langToggle");
const popup = document.getElementById("popup");
const popupContent = document.getElementById("popupContent");
const popupClose = document.getElementById("popupClose");

let date = new Date();

// ===== EVENT DATA =====
const events = {
  "2026-01-03": "Servicio De Adoracion",
  "2026-01-06": "Servicio De Oracion",
  "2026-01-08": "Oracion De Damas 7pm",
  "2026-01-10": "Servicio De Adoracion",
  "2026-01-11": "Ayuno Congregacional",
  "2026-01-13": "Servicio De Oracion",
  "2026-01-15": "Oracion De Damas 7pm",
  "2026-01-17": "Servicio De Adoracion",
  "2026-01-20": "Servicio De Oracion",
  "2026-01-22": "Oracion De Damas 7pm",
  "2026-01-24": "Servicio De Adoracion Retiro Y Servicio De Damas",
  "2026-01-27": "Servicio De Oracion",
  "2026-01-29": "Oracion De Damas 7pm",
  "2026-01-30": "Gran Vigilia Congregacional",
  "2026-01-31": "Servicio De Adoracion"
};

// ===== DARK MODE =====
function loadDarkMode() {
  if(localStorage.getItem("darkMode") === "true") document.body.classList.add("dark");
}
loadDarkMode();

darkModeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  localStorage.setItem("darkMode", document.body.classList.contains("dark"));
});

// ===== LANGUAGE TOGGLE =====
langToggle.addEventListener("click", () => {
  document.querySelectorAll("[data-en]").forEach(el => {
    el.innerText = el.innerText === el.dataset.en ? el.dataset.es : el.dataset.en;
  });
});

// ===== CALENDAR RENDER =====
function renderCalendar() {
  calendarGrid.innerHTML = "";
  const year = date.getFullYear();
  const month = date.getMonth();

  monthTitle.innerText = date.toLocaleString("default", { month: "long", year: "numeric" });

  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  // Empty slots
  for(let i=0;i<firstDay;i++){
    const emptyDiv=document.createElement("div");
    emptyDiv.classList.add("day","empty");
    calendarGrid.appendChild(emptyDiv);
  }

  // Days
  for(let d=1; d<=daysInMonth; d++){
    const fullDate = `${year}-${String(month+1).padStart(2,"0")}-${String(d).padStart(2,"0")}`;
    const dayDiv = document.createElement("div");
    dayDiv.classList.add("day");
    dayDiv.innerHTML = `<span>${d}</span>`;

    if(events[fullDate]){
      dayDiv.classList.add("event");
      dayDiv.title = events[fullDate];
      dayDiv.addEventListener("click", ()=>{
        popupContent.innerText = events[fullDate];
        popup.style.display = "flex";
      });
    }

    calendarGrid.appendChild(dayDiv);
  }
}

// ===== POPUP =====
popupClose.addEventListener("click",()=>popup.style.display="none");
popup.addEventListener("click",e=>{if(e.target===popup) popup.style.display="none";});

// ===== NAVIGATION =====
document.getElementById("prevMonth").addEventListener("click",()=>{
  date.setMonth(date.getMonth()-1);
  renderCalendar();
});
document.getElementById("nextMonth").addEventListener("click",()=>{
  date.setMonth(date.getMonth()+1);
  renderCalendar();
});

renderCalendar();
