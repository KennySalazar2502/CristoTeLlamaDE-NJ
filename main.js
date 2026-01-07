/* main.js */

// DARK MODE TOGGLE
const darkModeToggle = document.getElementById('darkModeToggle');
darkModeToggle.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
  localStorage.setItem('darkMode', document.body.classList.contains('dark-mode'));
});

// Apply saved dark mode preference
if (localStorage.getItem('darkMode') === 'true') {
  document.body.classList.add('dark-mode');
}

// LANGUAGE TOGGLE
const langToggle = document.getElementById('langToggle');
if (langToggle) {
  langToggle.addEventListener('click', () => {
    document.querySelectorAll('[data-en]').forEach(el => {
      el.innerText = el.innerText === el.dataset.en ? el.dataset.es : el.dataset.en;
    });
    localStorage.setItem('lang', langToggle.innerText);
  });
}
// Apply saved language preference
if (localStorage.getItem('lang') === 'es') {
  document.querySelectorAll('[data-en]').forEach(el => {
    el.innerText = el.dataset.es;
  });
}

// CALENDAR LOGIC
const calendarGrid = document.getElementById('calendarGrid');
const monthTitle = document.getElementById('monthTitle');

let currentDate = new Date();
let currentMonth = currentDate.getMonth();
let currentYear = currentDate.getFullYear();

// Events array
const events = [
  { date: '2026-01-03', title: 'Servicio De Adoracion', type: 'adoracion' },
  { date: '2026-01-10', title: 'Servicio De Adoracion', type: 'adoracion' },
  { date: '2026-01-17', title: 'Servicio De Adoracion', type: 'adoracion' },
  { date: '2026-01-31', title: 'Servicio De Adoracion', type: 'adoracion' },
  { date: '2026-01-06', title: 'Servicio De Oracion', type: 'oracion' },
  { date: '2026-01-13', title: 'Servicio De Oracion', type: 'oracion' },
  { date: '2026-01-20', title: 'Servicio De Oracion', type: 'oracion' },
  { date: '2026-01-27', title: 'Servicio De Oracion', type: 'oracion' },
  { date: '2026-01-08', title: 'Oracion De Damas 7pm', type: 'damas' },
  { date: '2026-01-15', title: 'Oracion De Damas 7pm', type: 'damas' },
  { date: '2026-01-22', title: 'Oracion De Damas 7pm', type: 'damas' },
  { date: '2026-01-29', title: 'Oracion De Damas 7pm', type: 'damas' },
  { date: '2026-01-11', title: 'Ayuno Congregacional', type: 'ayuno' },
  { date: '2026-01-30', title: 'Gran Vigilia Congregacional', type: 'vigilia' },
  { date: '2026-01-24', title: 'Servicio De Adoracion Retiro Y Servicio De Damas', type: 'adoracion', long: true }
];

// Colors by type (set in CSS as classes)
const eventTypes = ['oracion','damas','vigilia','ayuno','adoracion'];

function renderCalendar() {
  calendarGrid.innerHTML = '';

  // Month & Year title
  const monthName = currentDate.toLocaleString('default', { month: 'long' });
  monthTitle.innerText = `${monthName} ${currentYear}`;

  // First day of month
  const firstDay = new Date(currentYear, currentMonth, 1).getDay();
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

  // Empty slots for first week
  for (let i = 0; i < firstDay; i++) {
    const emptyDiv = document.createElement('div');
    emptyDiv.classList.add('day','empty');
    calendarGrid.appendChild(emptyDiv);
  }

  // Days with events
  for (let day = 1; day <= daysInMonth; day++) {
    const dayDiv = document.createElement('div');
    dayDiv.classList.add('day');
    
    const fullDate = `${currentYear}-${String(currentMonth+1).padStart(2,'0')}-${String(day).padStart(2,'0')}`;
    const eventToday = events.filter(e => e.date === fullDate)[0];

    if (eventToday) {
      dayDiv.classList.add(eventToday.type);
      const title = eventToday.long ? eventToday.title.slice(0,18)+'...' : eventToday.title;
      dayDiv.innerHTML = `<span>${day}</span><small>${title}</small>`;
      dayDiv.style.fontSize = eventToday.long ? '0.75rem' : '';
      dayDiv.dataset.event = eventToday.title;
    } else {
      dayDiv.innerHTML = `<span>${day}</span>`;
    }

    // Popup on click
    dayDiv.addEventListener('click', () => {
      if(dayDiv.dataset.event){
        document.getElementById('popupText').innerText = dayDiv.dataset.event;
        document.getElementById('popup').style.display = 'flex';
      }
    });

    calendarGrid.appendChild(dayDiv);
  }
}

// Navigation
function nextMonth() {
  if(currentMonth === 11) {
    currentMonth = 0;
    currentYear++;
  } else {
    currentMonth++;
  }
  currentDate.setMonth(currentMonth);
  currentDate.setFullYear(currentYear);
  renderCalendar();
}

function prevMonth() {
  if(currentMonth === 0) {
    currentMonth = 11;
    currentYear--;
  } else {
    currentMonth--;
  }
  currentDate.setMonth(currentMonth);
  currentDate.setFullYear(currentYear);
  renderCalendar();
}

// Close popup
function closePopup() {
  document.getElementById('popup').style.display = 'none';
}

renderCalendar();
