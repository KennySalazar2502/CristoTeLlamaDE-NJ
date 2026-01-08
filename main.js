/* ================== Dark Mode ================== */
const darkToggle = document.getElementById("darkModeToggle");
darkToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  localStorage.setItem("darkMode", document.body.classList.contains("dark"));
});

/* Restore dark mode on load */
if(localStorage.getItem("darkMode") === "true") document.body.classList.add("dark");

/* ================== Language Toggle ================== */
function toggleLang() {
  document.querySelectorAll("[data-en]").forEach(el => {
    el.innerText = el.innerText === el.dataset.en ? el.dataset.es : el.dataset.en;
  });
}

/* ================== Calendar ================== */
const calendarContainer = document.createElement("div");
calendarContainer.classList.add("calendar-wrapper");
document.body.appendChild(calendarContainer);

calendarContainer.innerHTML = `
  <div class="calendar-header">
    <button class="arrow-btn" id="prevMonth">←</button>
    <h3 id="monthTitle">Month Year</h3>
    <button class="arrow-btn" id="nextMonth">→</button>
  </div>
  <div class="calendar-grid" id="calendarGrid"></div>
`;

const monthNames = ["January","February","March","April","May","June","July","August","September","October","November","December"];
let currentDate = new Date();

const events = [
  {day:3, month:0, title:"Servicio De Adoracion", type:"event"},
  {day:10, month:0, title:"Servicio De Adoracion", type:"event"},
  {day:17, month:0, title:"Servicio De Adoracion", type:"event"},
  {day:31, month:0, title:"Servicio De Adoracion", type:"event"},
  {day:6, month:0, title:"Servicio De Oracion", type:"event"},
  {day:13, month:0, title:"Servicio De Oracion", type:"event"},
  {day:20, month:0, title:"Servicio De Oracion", type:"event"},
  {day:27, month:0, title:"Servicio De Oracion", type:"event"},
  {day:8, month:0, title:"Oracion De Damas 7pm", type:"women"},
  {day:15, month:0, title:"Oracion De Damas 7pm", type:"women"},
  {day:22, month:0, title:"Oracion De Damas 7pm", type:"women"},
  {day:29, month:0, title:"Oracion De Damas 7pm", type:"women"},
  {day:30, month:0, title:"Gran Vigilia Congregacional", type:"event"},
  {day:11, month:0, title:"Ayuno Congregacional", type:"event"},
  {day:24, month:0, title:"Servicio De Adoracion Retiro Y Servicio De Damas", type:"event"}
];

function renderCalendar() {
  const grid = document.getElementById("calendarGrid");
  grid.innerHTML = "";

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  document.getElementById("monthTitle").innerText = `${monthNames[month]} ${year}`;

  // Weekday names
  const weekdays = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
  weekdays.forEach(d => {
    const div = document.createElement("div");
    div.classList.add("day-name");
    div.innerText = d;
    grid.appendChild(div);
  });

  const firstDay = new Date(year, month, 1).getDay();
  for(let i=0;i<firstDay;i++){
    const empty = document.createElement("div");
    empty.classList.add("day","empty");
    grid.appendChild(empty);
  }

  const daysInMonth = new Date(year, month+1,0).getDate();
  for(let d=1; d<=daysInMonth; d++){
    const dayDiv = document.createElement("div");
    dayDiv.classList.add("day");

    const todayEvent = events.find(ev => ev.day === d && ev.month === month);
    if(todayEvent){
      dayDiv.classList.add(todayEvent.type);
      let shortTitle = todayEvent.title.length > 15 ? todayEvent.title.slice(0,15) + "..." : todayEvent.title;
      dayDiv.innerHTML = `<span>${d}</span><small>${shortTitle}</small>`;
      dayDiv.addEventListener("click", ()=>{
        showPopup(todayEvent.title);
      });
    } else {
      dayDiv.innerHTML = `<span>${d}</span>`;
    }
    grid.appendChild(dayDiv);
  }
}

function showPopup(text){
  let popup = document.createElement("div");
  popup.classList.add("popup");
  popup.innerHTML = `<div class="popup-content"><span class="close">&times;</span><p>${text}</p></div>`;
  document.body.appendChild(popup);
  popup.style.display = "flex";
  popup.querySelector(".close").addEventListener("click", ()=> popup.remove());
}

document.getElementById("nextMonth").addEventListener("click", ()=>{
  currentDate.setMonth(currentDate.getMonth()+1);
  renderCalendar();
});
document.getElementById("prevMonth").addEventListener("click", ()=>{
  currentDate.setMonth(currentDate.getMonth()-1);
  renderCalendar();
});

renderCalendar();
