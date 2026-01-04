const calendar = document.getElementById("calendar");
const monthTitle = document.getElementById("monthTitle");

let date = new Date();

function renderCalendar() {
  calendar.innerHTML = "";
  const year = date.getFullYear();
  const month = date.getMonth();

  monthTitle.innerText =
    date.toLocaleString("default", { month: "long", year: "numeric" });

  const firstDay = new Date(year, month, 1).getDay();
  const days = new Date(year, month + 1, 0).getDate();

  for (let i = 0; i < firstDay; i++) {
    calendar.innerHTML += `<div></div>`;
  }

  for (let d = 1; d <= days; d++) {
    calendar.innerHTML += `<div class="day">${d}<br><small>Event</small></div>`;
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

/* TOGGLES */
function toggleDark() {
  document.body.classList.toggle("dark");
}

function toggleMenu() {
  document.getElementById("menu").classList.toggle("show");
}

function toggleLang() {
  document.querySelectorAll("[data-en]").forEach(el => {
    el.innerText =
      el.innerText === el.dataset.en ? el.dataset.es : el.dataset.en;
  });
}
