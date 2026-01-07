// ---------------------------
// MAIN.JS
// ---------------------------

// DARK MODE TOGGLE
const darkModeToggle = document.getElementById('darkModeToggle');
const body = document.body;

if(localStorage.getItem('darkMode') === 'true') {
  body.classList.add('dark-mode');
}

darkModeToggle.addEventListener('click', () => {
  body.classList.toggle('dark-mode');
  localStorage.setItem('darkMode', body.classList.contains('dark-mode'));
});

// ---------------------------
// LANGUAGE TOGGLE
// ---------------------------
function toggleLang() {
  document.querySelectorAll("[data-en]").forEach(el => {
    el.innerText = el.innerText === el.dataset.en ? el.dataset.es : el.dataset.en;
  });
}

// ---------------------------
// CALENDAR SETUP
// ---------------------------
const calendarEl = document.getElementById("calendar");
const monthTitle = document.getElementById("monthTitle");

// Current calendar date
let date = new Date();

// Calendar Events (add more as needed)
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

// Helper to format YYYY-MM-DD
function formatDate(y, m, d) {
  return `${y}-${String(m + 1).padStart(2,'0')}-${String(d).padStart(2,'0')}`;
}

// Render calendar
function renderCalendar() {
  calendarEl.innerHTML = "";
  const year = date.getFullYear();
  const month = date.getMonth();
  monthTitle.innerText = date.toLocaleString('default', { month: 'long', year: 'numeric' });

  const firstDay = new Date(year, month, 1).getDay(); // Sunday = 0
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  // Empty slots before first day
  for(let i = 0; i < firstDay; i++){
    const empty = document.createElement('div');
    empty.classList.add('day','empty');
    calendarEl.appendChild(empty);
  }

  for(let d=1; d<=daysInMonth; d++){
    const dayEl = document.createElement('div');
    dayEl.classList.add('day');

    const fullDate = formatDate(year, month, d);
    if(events[fullDate]) {
      dayEl.classList.add('event');
      const shortText = events[fullDate].length > 20 ? events[fullDate].substring(0,20)+"..." : events[fullDate];
      dayEl.innerHTML = `<span>${d}</span>${shortText}`;
      dayEl.addEventLis
