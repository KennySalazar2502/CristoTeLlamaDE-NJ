const calendarGrid = document.getElementById("calendarGrid");
const monthTitle = document.getElementById("monthTitle");
let date = new Date();

function renderCalendar(){
  if(!calendarGrid) return;
  calendarGrid.innerHTML="";
  monthTitle.innerText = date.toLocaleString("default",{month:"long",year:"numeric"});
  const days = new Date(date.getFullYear(),date.getMonth()+1,0).getDate();
  for(let i=1;i<=days;i++){
    calendarGrid.innerHTML+=`<div class="day">${i}<br><small>Service</small></div>`;
  }
}

function nextMonth(){ date.setMonth(date.getMonth()+1); renderCalendar();}
function prevMonth(){ date.setMonth(date.getMonth()-1); renderCalendar();}
renderCalendar();
