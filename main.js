/* ======================
   DARK MODE TOGGLE
====================== */
const darkModeToggle = document.getElementById('darkModeToggle');
const body = document.body;

// Load saved dark mode
if(localStorage.getItem('darkMode') === 'true') body.classList.add('dark');

if(darkModeToggle){
  darkModeToggle.addEventListener('click', () => {
    body.classList.toggle('dark');
    localStorage.setItem('darkMode', body.classList.contains('dark'));
  });
}

/* ======================
   LANGUAGE TOGGLE
====================== */
const langToggle = document.getElementById('langToggle');
let currentLang = localStorage.getItem('lang') || 'en';

function updateLanguage(lang){
  document.querySelectorAll('[data-en]').forEach(el=>{
    el.innerText = lang==='en' ? el.dataset.en : el.dataset.es;
  });
  currentLang = lang;
  localStorage.setItem('lang', lang);
}

// initialize language
updateLanguage(currentLang);

if(langToggle){
  langToggle.addEventListener('click',()=>{
    updateLanguage(currentLang==='en' ? 'es' : 'en');
  });
}

/* ======================
   POPUP FOR EVENTS
====================== */
function closePopup(){
  const popup = document.getElementById("popup");
  if(popup) popup.style.display='none';
}

/* ======================
   CALENDAR
====================== */
const calendarGrid = document.getElementById('calendarGrid');
const monthTitle = document.getElementById('monthTitle');

// Start January 2026
let date = new Date(2026,0,1);

// Event data for January 2026
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

// Render the calendar
function renderCalendar(){
  if(!calendarGrid) return;

  calendarGrid.innerHTML="";

  const year = date.getFullYear();
  const month = date.getMonth();

  monthTitle.innerText = date.toLocaleString('default',{month:'long', year:'numeric'});

  // Weekday headers
  const dayNames = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
  dayNames.forEach(d=>{
    const div = document.createElement('div');
    div.classList.add('day-name');
    div.innerText=d;
    calendarGrid.appendChild(div);
  });

  // Empty cells before first day
  const firstDay = new Date(year,month,1).getDay();
  for(let i=0;i<firstDay;i++){
    const empty = document.createElement('div');
    empty.classList.add('day','empty');
    calendarGrid.appendChild(empty);
  }

  // Days of month
  const daysInMonth = new Date(year,month+1,0).getDate();
  for(let d=1; d<=daysInMonth; d++){
    const dayDiv = document.createElement('div');
    dayDiv.classList.add('day');

    // Only show events for January 2026
    let eventToday = null;
    if(year===2026 && month===0){
      eventToday = events.find(e=>e.day===d);
    }

    if(eventToday){
      dayDiv.classList.add(eventToday.type);

      // Show truncated text if long
      const text = eventToday.title.length>18 ? eventToday.title.slice(0,18)+'...' : eventToday.title;
      dayDiv.innerHTML = `<span>${d}</span><small>${text}</small>`;

      dayDiv.addEventListener('click',()=>{
        const popupText = document.getElementById("popupText");
        if(popupText){
          popupText.innerText = eventToday.title;
          document.getElementById("popup").style.display='flex';
        }
      });
    } else {
      dayDiv.innerHTML = `<span>${d}</span>`;
    }

    calendarGrid.appendChild(dayDiv);
  }
}

// Next/Previous month
function nextMonth(){
  if(date.getFullYear() < 2030){
    date.setMonth(date.getMonth()+1);
    renderCalendar();
  }
}
function prevMonth(){
  if(date.getFullYear() > 2026 || (date.getFullYear()===2026 && date.getMonth()>0)){
    date.setMonth(date.getMonth()-1);
    renderCalendar();
  }
}

// Render calendar if calendar exists
renderCalendar();

/* ======================
   YOUTUBE LIVE EMBED
====================== */
const liveContainer = document.getElementById('liveStream');
const youtubeChannelId = 'UCB-beIq8bOOnmi78a8uEvWQ'; // Replace with your channel ID

if(liveContainer){
  liveContainer.innerHTML = `
    <iframe width="100%" height="400"
      src="https://www.youtube.com/embed/live_stream?channel=${youtubeChannelId}&autoplay=0"
      allow="autoplay; encrypted-media" allowfullscreen>
    </iframe>
  `;
}

/* ======================
   SERVICE WORKER REGISTER
====================== */
if('serviceWorker' in navigator){
  window.addEventListener('load',()=>{
    navigator.serviceWorker.register('sw.js').then(()=>{
      console.log("Service Worker registered");
    });
  });
}
