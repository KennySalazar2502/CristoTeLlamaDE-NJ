/* ==============================
   Main JS for Cristo Te Llama
============================== */

// ------------------
// DARK MODE TOGGLE
// ------------------
const darkModeToggle = document.getElementById('darkModeToggle');
const liveContainer = document.getElementById('liveStream');
const darkMode = localStorage.getItem('darkMode') === 'true';

if(darkMode) document.body.classList.add('dark');
if(darkMode && liveContainer) liveContainer.classList.add('dark');

darkModeToggle.addEventListener('click', () => {
  document.body.classList.toggle('dark');
  if(liveContainer) liveContainer.classList.toggle('dark');
  localStorage.setItem('darkMode', document.body.classList.contains('dark'));
});

// ------------------
// LANGUAGE TOGGLE
// ------------------
let lang = localStorage.getItem('lang') || 'en';
const langToggle = document.getElementById('langToggle');

function updateLanguage() {
  document.querySelectorAll('[data-en]').forEach(el => {
    el.innerText = lang === 'en' ? el.dataset.en : el.dataset.es;
  });
}
updateLanguage();

langToggle.addEventListener('click', () => {
  lang = lang === 'en' ? 'es' : 'en';
  localStorage.setItem('lang', lang);
  updateLanguage();
});

// ------------------
// CALENDAR
// ------------------
const calendarGrid = document.getElementById('calendarGrid');
const monthTitle = document.getElementById('monthTitle');
let currentDate = new Date();
let currentMonth = currentDate.getMonth();
let currentYear = currentDate.getFullYear();

const years = [2026, 2027, 2028, 2029, 2030];

const monthNames = [
  "January","February","March","April","May","June",
  "July","August","September","October","November","December"
];

// Event palette
const eventColors = {
  service: '#FFD700',   // gold
  women: '#FF69B4',     // hot pink
  special: '#1E90FF'    // dodger blue
};

// Sample events
let events = [
  {day:3, month:0, year:2026, title:"Servicio De Adoración", type:"service"},
  {day:8, month:0, year:2026, title:"Oración De Damas 7:00PM", type:"women"},
  {day:15, month:0, year:2026, title:"Evento Especial", type:"special"}
];

function renderCalendar() {
  if(!calendarGrid || !monthTitle) return;

  calendarGrid.innerHTML = '';
  const firstDay = new Date(currentYear, currentMonth, 1).getDay();
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

  // Day names
  const dayNames = lang === 'en' ? ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"] : ["Dom","Lun","Mar","Mié","Jue","Vie","Sáb"];
  dayNames.forEach(d => {
    const div = document.createElement('div');
    div.classList.add('day-name');
    div.innerText = d;
    calendarGrid.appendChild(div);
  });

  // Empty slots
  for(let i=0; i<firstDay; i++){
    const empty = document.createElement('div');
    empty.classList.add('day','empty');
    calendarGrid.appendChild(empty);
  }

  // Days
  for(let d=1; d<=daysInMonth; d++){
    const dayDiv = document.createElement('div');
    dayDiv.classList.add('day');

    // Check if event exists
    const eventToday = events.find(e => e.day===d && e.month===currentMonth && e.year===currentYear);
    if(eventToday){
      dayDiv.classList.add('event');
      dayDiv.style.background = eventColors[eventToday.type] || '#ccc';
      dayDiv.dataset.event = eventToday.title;
      dayDiv.innerHTML = `<span>${d}</span><small>${eventToday.title}</small>`;
    } else {
      dayDiv.innerHTML = `<span>${d}</span>`;
    }

    dayDiv.addEventListener('click',()=>{
      if(dayDiv.dataset.event){
        document.getElementById("popupText").innerText = dayDiv.dataset.event;
        document.getElementById("popup").style.display = 'flex';
      }
    });

    calendarGrid.appendChild(dayDiv);
  }

  monthTitle.innerText = `${monthNames[currentMonth]} ${currentYear}`;
}

function nextMonth() {
  currentMonth++;
  if(currentMonth > 11) {
    currentMonth = 0;
    currentYear = years.includes(currentYear+1) ? currentYear+1 : currentYear;
  }
  renderCalendar();
}

function prevMonth() {
  currentMonth--;
  if(currentMonth < 0) {
    currentMonth = 11;
    currentYear = years.includes(currentYear-1) ? currentYear-1 : currentYear;
  }
  renderCalendar();
}

// Initialize calendar if exists
if(calendarGrid) renderCalendar();

// ------------------
// POPUP CLOSE
// ------------------
function closePopup(){
  document.getElementById("popup").style.display='none';
}

// ------------------
// FACEBOOK LIVE (only live.html)
// ------------------
if(document.getElementById('liveStream')){
  const liveContainer = document.getElementById('liveStream');
  const status = document.getElementById('status');
  const pageId = '310457289629080'; // Facebook Page ID

  function showLiveVideo(videoId){
    liveContainer.innerHTML = `
      <iframe 
        src="https://www.facebook.com/plugins/video.php?href=https://www.facebook.com/${pageId}/videos/${videoId}/&show_text=false&width=560"
        allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
        allowfullscreen>
      </iframe>
    `;
  }

  async function checkLive() {
    try {
      const token = 'YOUR_FACEBOOK_ACCESS_TOKEN';
      const res = await fetch(`https://graph.facebook.com/${pageId}/live_videos?status=LIVE&access_token=${token}`);
      const data = await res.json();
      if(data.data && data.data.length > 0){
        const liveVideoId = data.data[0].id;
        showLiveVideo(liveVideoId);
      } else {
        status.innerText = lang === 'en'
          ? "No live broadcast currently. Check back during our service times!"
          : "No hay transmisión en vivo actualmente. ¡Vuelve durante nuestros horarios de servicio!";
      }
    } catch(e){
      console.error(e);
      status.innerText = lang === 'en'
        ? "Unable to load live stream at this time."
        : "No se puede cargar la transmisión en este momento.";
    }
  }

  checkLive();
}
