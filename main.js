// ===== GLOBAL VARIABLES =====
const darkModeToggle = document.getElementById('darkModeToggle');
const calendarGrid = document.getElementById('calendarGrid');
const monthTitle = document.getElementById('monthTitle');
const popup = document.getElementById('popup');
const popupText = document.getElementById('popupText');

let currentDate = new Date();

// ===== EVENT DATA =====
const events = [
  // January 2026
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
  {day:24, month:0, year:2026, title:"Servicio De Adoracion Retiro Y Servicio De Damas", type:"event"}
];

// ===== DARK MODE =====
function loadDarkMode() {
  const saved = localStorage.getItem('darkMode');
  if(saved === 'true') document.body.classList.add('dark');
}
loadDarkMode();

darkModeToggle.addEventListener('click', () => {
  document.body.classList.toggle('dark');
  localStorage.setItem('darkMode', document.body.classList.contains('dark'));
});

// ===== CALENDAR FUNCTIONS =====
function renderCalendar() {
  calendarGrid.innerHTML = '';
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const monthNames = ["January","February","March","April","May","June","July","August","September","October","November","December"];
  monthTitle.innerText = `${monthNames[month]} ${year}`;

  // Day headers
  const dayNames = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
  dayNames.forEach(d => {
    const div = document.createElement('div');
    div.classList.add('day-name');
    div.innerText = d;
    calendarGrid.appendChild(div);
  });

  // Empty boxes for first day offset
  const firstDay = new Date(year, month, 1).getDay();
  for(let i=0; i<firstDay; i++){
    const empty = document.createElement('div');
    empty.classList.add('day','empty');
    calendarGrid.appendChild(empty);
  }

  // Days
  const daysInMonth = new Date(year, month+1, 0).getDate();
  for(let d=1; d<=daysInMonth; d++){
    const dayDiv = document.createElement('div');
    dayDiv.classList.add('day');
    dayDiv.innerHTML = `<span>${d}</span>`;

    // Check for event
    const eventToday = events.find(e => e.day===d && e.month===month && e.year===year);
    if(eventToday){
      dayDiv.classList.add(eventToday.type);
      dayDiv.setAttribute('data-event', eventToday.title);
      const displayTitle = eventToday.title.length > 20 ? eventToday.title.slice(0,20)+'…' : eventToday.title;
      dayDiv.innerHTML += `<small>${displayTitle}</small>`;
    }

    // Popup
    dayDiv.addEventListener('click', () => {
      if(dayDiv.dataset.event){
        popupText.innerText = dayDiv.dataset.event;
        popup.style.display = 'flex';
      }
    });

    calendarGrid.appendChild(dayDiv);
  }
}

// Month navigation
function nextMonth() {
  currentDate.setMonth(currentDate.getMonth()+1);
  renderCalendar();
}
function prevMonth() {
  currentDate.setMonth(currentDate.getMonth()-1);
  renderCalendar();
}

renderCalendar();

// Popup close
function closePopup() { popup.style.display='none'; }

// ===== LANGUAGE TOGGLE =====
function toggleLang() {
  document.querySelectorAll('[data-en]').forEach(el => {
    el.innerText = el.innerText === el.dataset.en ? el.dataset.es : el.dataset.en;
  });
}
