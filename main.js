const calendarGrid = document.getElementById("calendarGrid");
const monthTitle = document.getElementById("monthTitle");
const eventBanner = document.getElementById("eventBanner");

let date = new Date();
let currentEventIndex = 0;

// EVENTS
const events = [
  {day:3,title:"Servicio De Adoracion",type:"event"},
  {day:8,title:"Oracion De Damas 7pm",type:"women"},
  {day:11,title:"Ayuno Congregacional",type:"event"},
  {day:15,title:"Oracion De Damas 7pm",type:"women"},
  {day:30,title:"Gran Vigilia Congregacional",type:"event"}
];

function renderCalendar(){
  if(!calendarGrid) return;
  calendarGrid.innerHTML="";
  const year=date.getFullYear();
  const month=date.getMonth();
  monthTitle.innerText=date.toLocaleString("default",{month:"long",year:"numeric"});

  const firstDay=new Date(year,month,1).getDay();
  const days=new Date(year,month+1,0).getDate();

  for(let i=0;i<firstDay;i++){
    calendarGrid.innerHTML+=`<div class="day empty"></div>`;
  }

  for(let d=1;d<=days;d++){
    const e=events.find(ev=>ev.day===d);
    const cls=e?e.type:"";
    const title=e?`<br><small>${e.title}</small>`:"";
    const todayCls=(new Date().getDate()===d && new Date().getMonth()===month)?"highlight":"";
    calendarGrid.innerHTML+=`<div class="day ${cls} ${todayCls}" style="animation-delay:${d*20}ms" onclick="showPopup('${title.replace(/'/g,'\\\'')}')">${d}${title}</div>`;
  }
}

function nextMonth(){date.setMonth(date.getMonth()+1);renderCalendar();}
function prevMonth(){date.setMonth(date.getMonth()-1);renderCalendar();}

document.getElementById("darkModeToggle")?.addEventListener("click",()=>{document.body.classList.toggle("dark");});
document.getElementById("langToggle")?.addEventListener("click",()=>{
  document.querySelectorAll("[data-en]").forEach(el=>{el.innerText=el.innerText===el.dataset.en?el.dataset.es:el.dataset.en;});
});

function showPopup(msg){
  const popup = document.getElementById("popup");
  const popupText = document.getElementById("popupText");
  popupText.innerHTML=msg;
  popup.style.display="flex";
}

function closePopup(){document.getElementById("popup").style.display="none";}

// EVENT BANNER ROTATION
function showNextEvent(){
  if(!eventBanner||events.length===0)return;
  const e=events[currentEventIndex];
  currentEventIndex=(currentEventIndex+1)%events.length;
  document.getElementById("eventText").innerText = e.title;
  eventBanner.classList.add("show");
  setTimeout(()=>eventBanner.classList.remove("show"),10000);
}

renderCalendar();
showNextEvent();
setInterval(showNextEvent,10000);
