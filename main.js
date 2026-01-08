/* ===== MAIN.JS ===== */

// ---------- DARK MODE TOGGLE ----------
const darkToggle = document.getElementById('darkModeToggle');
darkToggle.addEventListener('click', () => {
  document.body.classList.toggle('dark');
  localStorage.setItem('darkMode', document.body.classList.contains('dark'));
});
if(localStorage.getItem('darkMode') === 'true') document.body.classList.add('dark');

// ---------- LANGUAGE TOGGLE ----------
function toggleLang() {
  document.querySelectorAll('[data-en]').forEach(el => {
    el.innerText = el.innerText === el.dataset.en ? el.dataset.es : el.dataset.en;
  });
}

// ---------- CALENDAR SETUP ----------
const monthNames = ["January","February","March","April","May","June",
                    "July","August","September","October","November","December"];
const calendarGrid = document.getElementById('calendarGrid');
const monthTitle = document.getElementById('monthTitle');
const yearStart = 2026;
let currentMonth = 0;
let currentYear = 2026;

// Events object: year -> month -> day
let events = {};
for(let y=2026;y<=2030;y++){ events[y] = {}; for(let m=0;m<12;m++){ events[y][m] = {}; } }

// ---------- JANUARY 2026 EVENTS ----------
events[2026][0][3]  = "Servicio De Adoracion";
events[2026][0][6]  = "Servicio De Oracion";
events[2026][0][8]  = "Oracion De Damas 7pm";
events[2026][0][10] = "Servicio De Adoracion";
events[2026][0][11] = "Ayuno Congregacional";
events[2026][0][13] = "Servicio De Oracion";
events[2026][0][15] = "Oracion De Damas 7pm";
events[2026][0][17] = "Servicio De Adoracion";
events[2026][0][20] = "Servicio De Oracion";
events[2026][0][22] = "Oracion De Damas 7pm";
events[2026][0][24] = "Servicio De Adoracion Retiro Y Servicio De Damas";
events[2026][0][27] = "Servicio De Oracion";
events[2026][0][29] = "Oracion De Damas 7pm";
events[2026][0][30] = "Gran Vigilia Congregacional";
events[2026][0][31] = "Servicio De Adoracion";

// ---------- RENDER CALENDAR ----------
function renderCalendar() {
  calendarGrid.innerHTML = '';

  // Weekday headers
  const weekdays = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
  weekdays.forEach(d => {
    const div = document.createElement('div');
    div.classList.add('day-name');
    div.innerText = d;
    calendarGrid.appendChild(div);
  });

  const firstDay = new Date(currentYear, currentMonth, 1).getDay();
  const daysInMonth = new Date(currentYear, currentMonth+1,0).getDate();

  // Empty slots before first day
  for(let i=0;i<firstDay;i++){
    const empty = document.createElement('div');
    empty.classList.add('day','empty');
    calendarGrid.appendChild(empty);
  }

  // Days
  for(let d=1; d<=daysInMonth; d++){
    const dayDiv = document.createElement('div');
    dayDiv.classList.add('day');
    if(events[currentYear][currentMonth][d]){
      dayDiv.classList.add('event');
      const shortText = events[currentYear][currentMonth][d].length>18 ? 
                        events[currentYear][currentMonth][d].substring(0,18)+'...' : 
                        events[currentYear][currentMonth][d];
      dayDiv.innerHTML = `<span>${d}</span><small>${shortText}</small>`;
      dayDiv.dataset.event = events[currentYear][currentMonth][d];
    } else {
      dayDiv.innerHTML = `<span>${d}</span>`;
    }
    dayDiv.addEventListener('click',()=>{
      if(dayDiv.dataset.event){
        document.getElementById('popupText').innerText = dayDiv.dataset.event;
        document.getElementById('popup').style.display='flex';
      }
    });
    calendarGrid.appendChild(dayDiv);
  }

  monthTitle.innerText = `${monthNames[currentMonth]} ${currentYear}`;
}

// ---------- NAVIGATION ----------
function nextMonth(){
  currentMonth++;
  if(currentMonth>11){ currentMonth=0; currentYear++; }
  renderCalendar();
}
function prevMonth(){
  currentMonth--;
  if(currentMonth<0){ currentMonth=11; currentYear--; }
  renderCalendar();
}

// ---------- CLOSE POPUP ----------
function closePopup(){ document.getElementById('popup').style.display='none'; }

// Initial render
renderCalendar();
