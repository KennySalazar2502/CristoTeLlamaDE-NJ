// DARK MODE
const darkModeToggle = document.getElementById('darkModeToggle');
const body = document.body;
if(localStorage.getItem('darkMode') === 'true') body.classList.add('dark');
darkModeToggle.addEventListener('click', () => {
  body.classList.toggle('dark');
  localStorage.setItem('darkMode', body.classList.contains('dark'));
});

// LANGUAGE TOGGLE
const langToggle = document.getElementById('langToggle');
let currentLang = localStorage.getItem('lang') || 'en';
function updateLanguage(lang){
  document.querySelectorAll('[data-en]').forEach(el=>{
    el.innerText = lang==='en'?el.dataset.en:el.dataset.es;
  });
  currentLang = lang;
  localStorage.setItem('lang', lang);
}
updateLanguage(currentLang);
langToggle.addEventListener('click',()=>updateLanguage(currentLang==='en'?'es':'en'));

// POPUP
function closePopup(){ document.getElementById("popup").style.display='none'; }

// CALENDAR
const calendarGrid = document.getElementById('calendarGrid');
const monthTitle = document.getElementById('monthTitle');
let date = new Date(2026,0,1); // start January 2026

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

function renderCalendar(){
  if(!calendarGrid) return;
  calendarGrid.innerHTML="";
  const year = date.getFullYear();
  const month = date.getMonth();
  monthTitle.innerText = date.toLocaleString('default',{month:'long',year:'numeric'});

  // Weekday headers
  const dayNames = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
  dayNames.forEach(d=>{
    const div = document.createElement('div');
    div.classList.add('day-name');
    div.innerText=d;
    calendarGrid.appendChild(div);
  });

  // Empty slots before first day
  const firstDay = new Date(year,month,1).getDay();
  for(let i=0;i<firstDay;i++){
    const empty = document.createElement('div'); empty.classList.add('day','empty'); calendarGrid.appendChild(empty);
  }

  // Days with events
  const daysInMonth = new Date(year,month+1,0).getDate();
  for(let d=1; d<=daysInMonth; d++){
    const dayDiv = document.createElement('div'); dayDiv.classList.add('day');
    const eventToday = events.find(e=>e.day===d && month===0); // only January 2026
    if(eventToday){
      dayDiv.classList.add(eventToday.type);
      dayDiv.innerHTML = `<span>${d}</span><small>${eventToday.title.length>18?eventToday.title.slice(0,18)+'...':eventToday.title}</small>`;
      dayDiv.addEventListener('click',()=>{ 
        document.getElementById("popupText").innerText=eventToday.title;
        document.getElementById("popup").style.display='flex';
      });
    } else { dayDiv.innerHTML=`<span>${d}</span>`;}
    calendarGrid.appendChild(dayDiv);
  }
}

function nextMonth(){ date.setMonth(date.getMonth()+1); renderCalendar();}
function prevMonth(){ date.setMonth(date.getMonth()-1); renderCalendar();}
renderCalendar();
