// ---------------------------
// DARK MODE TOGGLE
// ---------------------------
const darkModeToggle = document.getElementById('darkModeToggle');

if(localStorage.getItem('darkMode') === 'enabled') {
  document.body.classList.add('dark');
}

darkModeToggle.addEventListener('click', () => {
  document.body.classList.toggle('dark');
  if(document.body.classList.contains('dark')) {
    localStorage.setItem('darkMode','enabled');
  } else {
    localStorage.setItem('darkMode','disabled');
  }
});

// ---------------------------
// LANGUAGE TOGGLE
// ---------------------------
const langToggle = document.getElementById('langToggle');

// Load saved language
if(localStorage.getItem('lang') === 'es') {
  toggleLang();
}

langToggle.addEventListener('click', () => {
  toggleLang();
  const current = localStorage.getItem('lang') === 'es' ? 'en' : 'es';
  localStorage.setItem('lang', current);
});

function toggleLang() {
  document.querySelectorAll('[data-en]').forEach(el => {
    el.innerText = el.innerText === el.dataset.en ? el.dataset.es : el.dataset.en;
  });
}

// ---------------------------
// CALENDAR
// ---------------------------
const calendar = document.getElementById("calendar");
const monthTitle = document.getElementById("monthTitle");

const events = [
  {day:3, month:0, year:2026, title:"Servicio De Adoracion", type:"event"},
  {day:10, month:0, year:2026, title:"Servicio De Adoracion", type:"event"},
  {day:17, month:0, year:2026, title:"Servicio De Adoracion", type:"event"},
  {day:31, month:0, year:2026, title:"Servicio De Adoracion", type:"event"},
  {day:6, month:0, year:2026, title:"Servicio De Oracion", type:"women"},
  {day:13, month:0, year:2026, title:"Servicio De Oracion", type:"women"},
  {day:20, month:0, year:2026, title:"Servicio De Oracion", type:"women"},
  {day:27, month:0, year:2026, title:"Servicio De Oracion", type:"women"},
  {day:8, month:0, year:2026, title:"Oracion De Damas 7pm", type:"women"},
  {day:15, month:0, year:2026, title:"Oracion De Damas 7pm", type:"women"},
  {day:22, month:0, year:2026, title:"Oracion De Damas 7pm", type:"women"},
  {day:29, month:0, year:2026, title:"Oracion De Damas 7pm", type:"women"},
  {day:30, month:0, year:2026, title:"Gran Vigilia Congregacional", type:"event"},
  {day:11, month:0, year:2026, title:"Ayuno Congregacional", type:"event"},
  {day:24, month:0, year:2026, title:"Servicio De Adoracion Retiro Y Servicio De Damas", type:"event"}
];

let currentDate = new Date();
let currentMonth = currentDate.getMonth();
let currentYear = currentDate.getFullYear();

function renderCalendar() {
  calendar.innerHTML = "";
  const firstDay = new Date(currentYear, currentMonth, 1).getDay();
  const days = new Date(currentYear, currentMonth + 1, 0).getDate();
  const monthNames = ["January","February","March","April","May","June","July","August","September","October","November","December"];
  monthTitle.innerText = `${monthNames[currentMonth]} ${currentYear}`;

  // empty slots
  for(let i=0;i<firstDay;i++){
    const empty = document.createElement('div');
    empty.classList.add('day','empty');
    calendar.appendChild(empty);
  }

  // days
  for(let d=1; d<=days; d++){
    const dayDiv = document.createElement('div');
    dayDiv.classList.add('day');
    const eventToday = events.find(ev => ev.day===d && ev.month===currentMonth && ev.year===currentYear);
    if(eventToday){
      dayDiv.classList.add(eventToday.type);
      dayDiv.innerHTML = `<span>${d}</span><small>${eventToday.title.length>25? eventToday.title.slice(0,25)+"..." : eventToday.title}</small>`;
      dayDiv.setAttribute('title', eventToday.title);
      dayDiv.addEventListener('click',()=>{
        alert(eventToday.title);
      });
    } else {
      dayDiv.innerHTML = `<span>${d}</span>`;
    }
    calendar.appendChild(dayDiv);
  }
}

function nextMonth() {
  currentMonth++;
  if(currentMonth>11){ currentMonth=0; currentYear++; }
  renderCalendar();
}

function prevMonth() {
  currentMonth--;
  if(currentMonth<0){ currentMonth=11; currentYear--; }
  renderCalendar();
}

renderCalendar();

// ---------------------------
// YOUTUBE LIVE EMBED
// ---------------------------
const liveContainer = document.getElementById('liveStream');
if(liveContainer){
  const channelId = "UCB-beIq8bOOnmi78a8uEvWQ"; // your channel ID
  liveContainer.innerHTML = `
    <iframe src="https://www.youtube.com/embed/live_stream?channel=${channelId}&autoplay=0" 
            allow="autoplay; encrypted-media" allowfullscreen></iframe>
  `;
}

// ---------------------------
// POPUP
// ---------------------------
function closePopup(){ document.getElementById("popup").style.display='none'; }
