let date = new Date();
const calendarGrid = document.getElementById("calendarGrid");
const monthTitle = document.getElementById("monthTitle");

function renderCalendar(){
  if(!calendarGrid) return;
  calendarGrid.innerHTML="";
  const year=date.getFullYear();
  const month=date.getMonth();
  monthTitle.innerText=date.toLocaleString("default",{month:"long",year:"numeric"});
  const firstDay=new Date(year,month,1).getDay();
  const days=new Date(year,month+1,0).getDate();

  for(let i=0;i<firstDay;i++) calendarGrid.innerHTML+=`<div></div>`;
  for(let d=1;d<=days;d++){
    calendarGrid.innerHTML+=`<div class="day">${d}</div>`;
  }
}
function nextMonth(){date.setMonth(date.getMonth()+1);renderCalendar();}
function prevMonth(){date.setMonth(date.getMonth()-1);renderCalendar();}
renderCalendar();

document.getElementById("presentationToggle")?.addEventListener("click",()=>{
  document.body.classList.toggle("presentation");
});
