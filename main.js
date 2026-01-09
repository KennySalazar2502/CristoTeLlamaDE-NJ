// ---------------- CALENDAR ----------------
const calendarGrid = document.getElementById("calendarGrid");
const monthTitle = document.getElementById("monthTitle");

let date = new Date();

// EVENTS
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
    const eventForDay = events.find(ev => ev.day === d);
    let typeClass = eventForDay ? eventForDay.type : "";
    let title = eventForDay ? `<br><small>${eventForDay.title}</small>` : "";
    calendarGrid.innerHTML += `<div class="day ${typeClass}">${d}${title}</div>`;
  }
}

function nextMonth() {
  date.setMonth(date.getMonth() + 1);
  renderCalendar();
}

function prevMonth() {
  date.setMonth(date.getMonth() - 1);
  renderCalendar();
}

renderCalendar();

// ---------------- DARK MODE ----------------
function toggleDark() {
  document.body.classList.toggle("dark");
}
document.getElementById("darkModeToggle").addEventListener("click", toggleDark);

// ---------------- LANGUAGE TOGGLE ----------------
function toggleLang() {
  document.querySelectorAll("[data-en]").forEach(el => {
    el.innerText = el.innerText === el.dataset.en ? el.dataset.es : el.dataset.en;
  });
}
document.getElementById("langToggle").addEventListener("click", toggleLang);

// ---------------- POPUP ----------------
const popup = document.getElementById("popup");
const popupText = document.getElementById("popupText");
function openPopup(message) {
  popupText.innerText = message;
  popup.style.display = "flex";
}
function closePopup() { popup.style.display = "none"; }

// ---------------- PRAYER FORM ----------------
const prayerForm = document.getElementById("prayerForm");
const formMessage = document.getElementById("formMessage");
if (prayerForm) {
  prayerForm.addEventListener("submit", function(e) {
    e.preventDefault();
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const request = document.getElementById("request").value.trim();
    if (!name || !email || !request) {
      formMessage.style.color = "red";
      formMessage.innerText = "Please fill out all fields / Por favor complete todos los campos";
      return;
    }
    formMessage.style.color = "green";
    formMessage.innerText = "Prayer request submitted! / Solicitud enviada!";
    prayerForm.reset();
  });
}
