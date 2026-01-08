// DARK MODE
const darkToggle = document.getElementById("darkModeToggle");
if (localStorage.getItem("dark") === "true") document.body.classList.add("dark");
darkToggle?.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  localStorage.setItem("dark", document.body.classList.contains("dark"));
});

// LANGUAGE
const langToggle = document.getElementById("langToggle");
let lang = localStorage.getItem("lang") || "en";
function setLang(l) {
  document.querySelectorAll("[data-en]").forEach(el => {
    el.innerText = l === "en" ? el.dataset.en : el.dataset.es;
  });
  localStorage.setItem("lang", l);
}
setLang(lang);
langToggle?.addEventListener("click", () => {
  lang = lang === "en" ? "es" : "en";
  setLang(lang);
});

// CALENDAR
const calendarGrid = document.getElementById("calendarGrid");
const monthTitle = document.getElementById("monthTitle");
let date = new Date(2026, 0, 1);

const events = {
  "2026-0-3": "Servicio De Adoracion",
  "2026-0-6": "Servicio De Oracion",
  "2026-0-8": "Oracion De Damas 7pm",
  "2026-0-11": "Ayuno Congregacional",
  "2026-0-24": "Servicio De Adoracion Retiro Y Servicio De Damas",
  "2026-0-30": "Gran Vigilia Congregacional"
};

function renderCalendar() {
  if (!calendarGrid) return;
  calendarGrid.innerHTML = "";
  monthTitle.innerText = date.toLocaleString("default", { month: "long", year: "numeric" });

  ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"].forEach(d=>{
    const div=document.createElement("div");
    div.className="day-name";
    div.innerText=d;
    calendarGrid.appendChild(div);
  });

  const firstDay=new Date(date.getFullYear(),date.getMonth(),1).getDay();
  for(let i=0;i<firstDay;i++) calendarGrid.appendChild(document.createElement("div"));

  const days=new Date(date.getFullYear(),date.getMonth()+1,0).getDate();
  for(let d=1;d<=days;d++){
    const cell=document.createElement("div");
    cell.className="day";
    cell.innerHTML=`<strong>${d}</strong>`;
    const key=`${date.getFullYear()}-${date.getMonth()}-${d}`;
    if(events[key]){
      cell.classList.add("event");
      cell.innerHTML+=`<small>${events[key].slice(0,18)}...</small>`;
      cell.onclick=()=>alert(events[key]);
    }
    calendarGrid.appendChild(cell);
  }
}
function nextMonth(){ date.setMonth(date.getMonth()+1); renderCalendar(); }
function prevMonth(){ date.setMonth(date.getMonth()-1); renderCalendar(); }
renderCalendar();
