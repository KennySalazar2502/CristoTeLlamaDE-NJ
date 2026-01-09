// CALENDAR
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
    calendarGrid.innerHTML += `<div class="day">${d}<br><small>Event</small></div>`;
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

// DARK MODE
function toggleDark() {
  document.body.classList.toggle("dark");
}

document.getElementById("darkModeToggle").addEventListener("click", toggleDark);

// LANGUAGE TOGGLE
function toggleLang() {
  document.querySelectorAll("[data-en]").forEach(el => {
    el.innerText = el.innerText === el.dataset.en ? el.dataset.es : el.dataset.en;
  });
}

document.getElementById("langToggle").addEventListener("click", toggleLang);

// POPUP
const popup = document.getElementById("popup");
const popupText = document.getElementById("popupText");

function openPopup(message) {
  popupText.innerText = message;
  popup.style.display = "flex";
}

function closePopup() {
  popup.style.display = "none";
}


