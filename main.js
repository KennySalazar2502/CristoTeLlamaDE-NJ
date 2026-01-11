// Calendar & Events
const calendarGrid = document.getElementById("calendarGrid");
const monthTitle = document.getElementById("monthTitle");
const eventBanner = document.getElementById("eventBanner");

let date = new Date();
let currentEventIndex = 0;

const events = [
  {day:3,title:"Servicio De Adoracion",type:"event"},
  {day:8,title:"Oracion De Damas 7PM",type:"women"},
  {day:11,title:"Ayuno Congregacional",type:"event"},
  {day:15,title:"Oracion De Damas 7PM",type:"women"},
  {day:24,title:"Servicio De Adoracion Retiro Y Servicio De Damas",type:"women"},
  {day:30,title:"Gran Vigilia Congregacional",type:"event"},
  {day:31,title:"Servicio De Adoracion",type:"event"}
];

function renderCalendar() {
  if(!calendarGrid) return;
  calendarGrid.innerHTML = "";

  const year = date.getFullYear();
  const month = date.getMonth();
  const today = new Date();

  monthTitle.innerText = date.toLocaleString("default",{month:"long", year:"numeric"});

  const firstDay = new Date(year, month, 1).getDay();
  const days = new Date(year, month+1,0).getDate();

  for(let i=0;i<firstDay;i++) calendarGrid.innerHTML += `<div class="day empty"></div>`;

  for(let d=1;d<=days;d++){
    const e=events.find(ev=>ev.day===d);
    const cls=e?e.type:"";
    const eventAttr=e?`data-event="${e.title}"`:"";
    const title=e?`<br><small>${e.title}</small>`:"";
    const isToday = (d===today.getDate() && month===today.getMonth() && year===today.getFullYear());
    const todayClass = isToday?"today":"";

    let countdown="";
    if(e){
      const eventDate=new Date(year,month,d);
      const diffDays=Math.ceil((eventDate-today)/(1000*60*60*24));
      if(diffDays>0) countdown=`<span class="countdown-badge">${diffDays}</span>`;
    }

    calendarGrid.innerHTML += `<div class="day ${cls} ${todayClass}" ${eventAttr} style="animation-delay:${d*50}ms">${d}${countdown}${title}</div>`;
  }

  addCalendarClickEvents();

  document.querySelectorAll('.countdown-badge').forEach(badge=>{
    badge.style.animation='none';
    badge.offsetHeight;
    badge.style.animation='';
  });
}

// Month navigation with fade
function nextMonth() {
  const grid = calendarGrid;
  grid.classList.add("fade-out");
  setTimeout(()=>{
    date.setMonth(date.getMonth()+1);
    renderCalendar();
    grid.classList.remove("fade-out");
    grid.classList.add("fade-in");
    setTimeout(()=>grid.classList.remove("fade-in"),400);
  },200);
}
function prevMonth() {
  const grid = calendarGrid;
  grid.classList.add("fade-out");
  setTimeout(()=>{
    date.setMonth(date.getMonth()-1);
    renderCalendar();
    grid.classList.remove("fade-out");
    grid.classList.add("fade-in");
    setTimeout(()=>grid.classList.remove("fade-in"),400);
  },200);
}

// Popups
const popup=document.getElementById("popup");
const popupText=document.getElementById("popupText");
function addCalendarClickEvents(){
  document.querySelectorAll(".day").forEach(day=>{
    day.onclick=()=>{
      const eventTitle=day.dataset.event;
      if(eventTitle){
        popupText.innerHTML=`<strong>${eventTitle}</strong>`;
        popup.classList.add("show");
      }
    };
  });
}
function closePopup(){popup.classList.remove("show");}

// Dark mode
document.getElementById("darkModeToggle")?.addEventListener("click",()=>{
  document.body.classList.toggle("dark");
});

// Language toggle
document.getElementById("langToggle")?.addEventListener("click",()=>{
  document.querySelectorAll("[data-en]").forEach(el=>{
    el.innerText=el.innerText===el.dataset.en?el.dataset.es:el.dataset.en;
  });
});

// Event banner cycle
function showNextEvent(){
  if(!eventBanner||events.length===0)return;
  const e=events[currentEventIndex];
  currentEventIndex=(currentEventIndex+1)%events.length;

  eventBanner.innerText=e.title;
  eventBanner.classList.add("show");
  setTimeout(()=>eventBanner.classList.remove("show"),10000);
}
renderCalendar();
showNextEvent();
setInterval(showNextEvent,10000);

// Smooth scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor=>{
  anchor.addEventListener("click",function(e){
    e.preventDefault();
    const target=document.querySelector(this.getAttribute("href"));
    if(target) target.scrollIntoView({behavior:"smooth",block:"start"});
  });
});

// LIVE STREAM CHECK
const youtubeAPIKey="AIzaSyDNJgtFtzPlFIhHnY9JcrA2ZDlkwkLCzOU";
const youtubeChannelID="YOUR_CHANNEL_ID";
const facebookPageID="YOUR_PAGE_ID";
const facebookAccessToken="YOUR_PAGE_ACCESS_TOKEN";

async function checkYouTubeLive(){
  const url=`https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${youtubeChannelID}&type=video&eventType=live&key=${youtubeAPIKey}`;
  const liveSection=document.getElementById("liveStream");
  try{
    const res=await fetch(url);
    const data=await res.json();
    if(data.items && data.items.length>0){
      const liveVideoId=data.items[0].id.videoId;
      liveSection.innerHTML=`<iframe width="100%" height="315" src="https://www.youtube.com/embed/${liveVideoId}?autoplay=1" frameborder="0" allowfullscreen></iframe>`;
      liveSection.classList.add("live"); liveSection.classList.remove("not-live");
    }else{
      liveSection.innerHTML=`<p>Sorry, we aren’t live on YouTube right now. <a href="#servicios">Click here to see service times</a>.</p>`;
      liveSection.classList.add("not-live"); liveSection.classList.remove("live");
    }
  }catch(err){console.error(err);}
}

async function checkFacebookLive(){
  const url=`https://graph.facebook.com/${facebookPageID}/live_videos?access_token=${facebookAccessToken}&fields=status,embed_html`;
  const liveSection=document.getElementById("facebookLive");
  try{
    const res=await fetch(url);
    const data=await res.json();
    if(data.data && data.data.length>0 && data.data[0].status==="LIVE"){
      liveSection.innerHTML=data.data[0].embed_html;
      liveSection.classList.add("live"); liveSection.classList.remove("not-live");
    }else{
      liveSection.innerHTML=`<p>Sorry, we aren’t live on Facebook right now. <a href="#servicios">Click here to see service times</a>.</p>`;
      liveSection.classList.add("not-live"); liveSection.classList.remove("live");
    }
  }catch(err){console.error(err);}
}

checkYouTubeLive();
checkFacebookLive();
