// DARK MODE TOGGLE
const darkModeToggle = document.getElementById('darkModeToggle');
darkModeToggle.addEventListener('click', () => {
  document.body.classList.toggle('dark');
  localStorage.setItem('darkMode', document.body.classList.contains('dark'));
});
if(localStorage.getItem('darkMode') === 'true') document.body.classList.add('dark');

// LANGUAGE TOGGLE
function toggleLang() {
  document.querySelectorAll('[data-en]').forEach(el => {
    el.innerText = el.innerText === el.dataset.en ? el.dataset.es : el.dataset.en;
  });
}

// CALENDAR
const months = [
  {name:"January", days:31}, {name:"February", days:28}, {name:"March", days:31},
  {name:"April", days:30}, {name:"May", days:31}, {name:"June", days:30},
  {name:"July", days:31}, {name:"August", days:31}, {name:"September", days:30},
  {name:"October", days:31}, {name:"November", days:30}, {name:"December", days:31}
];

let currentMonth = 0;
let currentYear = 2026;
const calendarGrid = document.getElementById('calendarGrid');
const monthTitle = document.getElementById('monthTitle');

// PRESET EVENTS FOR JANUARY 2026 ONLY
const events = [
  {day:3, month:0, title:"Servicio De Adoracion", type:"event"},
  {day:6, month:0, title:"Servicio De Oracion", type:"event"},
  {day:8, month:0, title:"Oracion De Damas 7pm", type:"women"},
  {day:10, month:0, title:"Servicio De Adoracion", type:"event"},
  {day:11, month:0, title:"Ayuno Congregacional", type:"event"},
  {day:13, month:0, title:"Servicio De Oracion", type:"event"},
  {day:15, month:0, title:"Oracion De Damas 7pm", type:"women"},
  {day:17, month:0, title:"Servicio De Adoracion", type:"event"},
  {day:20, month:0, title:"Servicio De Oracion", type:"event"},
  {day:22, month:0, title:"Oracion De Damas 7pm", type:"women"},
  {day:24, month:0, title:"Servicio De Adoracion Retiro y Servicio De Damas", type:"event"},
  {day:27, month:0, title:"Servicio De Oracion", type:"event"},
  {day:29, month:0, title:"Oracion De Damas 7pm", type:"women"},
  {day:30, month:0, title:"Gran Vigilia Congregacional", type:"event"},
  {day:31, month:0, title:"Servicio De Adoracion", type:"event"}
];

// WEEKDAY NAMES
const dayNames = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];

function renderCalendar() {
  calendarGrid.innerHTML = "";

  // WEEKDAY HEADERS
  dayNames.forEach(d => {
    const div = document.createElement('div');
    div.classList.add('day-name');
    div.innerText = d;
    calendarGrid.appendChild(div);
  });

  const firstDay = new Date(currentYear, currentMonth, 1).getDay();
  for(let i=0;i<firstDay;i++){
    const empty = document.createElement('div');
    empty.classList.add('day','empty');
    calendarGrid.appendChild(empty);
  }

  for(let d=1; d<=months[currentMonth].days; d++){
    const dayDiv = document.createElement('div');
    dayDiv.classList.add('day');

    const eventToday = events.find(e => e.day===d && e.month===currentMonth && e.month===0 && currentYear===2026);
    if(eventToday){
      dayDiv.classList.add(eventToday.type);
      dayDiv.setAttribute('data-event', eventToday.title);

      // shrink text if too long
      const displayText = eventToday.title.length>18 ? eventToday.title.substring(0,18)+"..." : eventToday.title;
      dayDiv.innerHTML = `<span>${d}</span><small>${displayText}</small>`;
    } else {
      dayDiv.innerHTML = `<span>${d}</span>`;
    }

    dayDiv.addEventListener('click',()=>{
      if(dayDiv.dataset.event){
        document.getElementById("popupText").innerText = dayDiv.dataset.event;
        document.getElementById("popup").style.display='flex';
      }
    });

    calendarGrid.appendChild(dayDiv);
  }

  monthTitle.innerText = `${months[currentMonth].name} ${currentYear}`;
}

function nextMonth(){
  if(currentMonth===11){
    if(currentYear<2030){
      currentMonth=0;
      currentYear++;
    }
  } else currentMonth++;
  renderCalendar();
}

function prevMonth(){
  if(currentMonth===0){
    if(currentYear>2026){
      currentMonth=11;
      currentYear--;
    }
  } else currentMonth--;
  renderCalendar();
}

function closePopup(){
  document.getElementById("popup").style.display='none';
}

renderCalendar();
