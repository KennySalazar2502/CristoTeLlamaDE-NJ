// Calendar events
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

const calendarGrid = document.getElementById("calendarGrid");
const monthTitle = document.getElementById("monthTitle");
let date = new Date();

function renderCalendar() {
  calendarGrid.innerHTML = "";
  const year = date.getFullYear();
  const month = date.getMonth();

  monthTitle.innerText = date.toLocaleString("default", { month: "long", year: "numeric" });

  const firstDay = new Date(year, month, 1).getDay();
  const days = new Date(year, month + 1, 0).getDate();

  for (let i = 0; i < firstDay; i++) {
    calendarGrid.innerHTML += `<div class="day empty"></div>`;
  }

  for (let d = 1; d <= days; d++) {
    const event = events.find(e => e.day === d);
    const type = event ? event.type : '';
    const title = event ? event.title : '';
    calendarGrid.innerHTML += `<div class="day ${type}" title="${title}">${d}${title ? `<br><small>${title}</small>` : ''}</div>`;
  }
}

function nextMonth() { date.setMonth(date.getMonth() + 1); renderCalendar(); }
function prevMonth() { date.setMonth(date.getMonth() - 1); renderCalendar(); }
renderCalendar();

// Dark Mode
document.getElementById("darkModeToggle").addEventListener("click", () => document.body.classList.toggle("dark"));

// Language Toggle
document.getElementById("langToggle").addEventListener("click", () => {
  document.querySelectorAll("[data-en]").forEach(el => {
    el.innerText = el.innerText === el.dataset.en ? el.dataset.es : el.dataset.en;
  });
});

// Popup
const popup = document.getElementById("popup");
const popupText = document.getElementById("popupText");
function openPopup(message) { popupText.innerText = message; popup.style.display="flex"; }
function closePopup() { popup.style.display="none"; }

// Prayer Form Submission
document.getElementById("prayerForm").addEventListener("submit", function(e){
  e.preventDefault();
  alert("Your prayer request has been submitted! 🙏");
  this.reset();
});

// Live Stream Embed (if used on live.html)
const liveContainer = document.getElementById('liveStream');
if(liveContainer){
  const youtubeChannelId = 'UCB-beIq8bOOnmi78a8uEvWQ';
  liveContainer.innerHTML = `<iframe width="100%" height="400" src="https://www.youtube.com/embed/live_stream?channel=${youtubeChannelId}&autoplay=0" allow="autoplay; encrypted-media" allowfullscreen></iframe>`;
}
