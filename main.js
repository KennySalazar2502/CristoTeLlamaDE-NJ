// ------------------- DARK MODE -------------------
const darkToggle = document.getElementById('darkModeToggle');
if(localStorage.getItem('darkMode') === 'true'){
    document.body.classList.add('dark-mode');
}

darkToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    localStorage.setItem('darkMode', document.body.classList.contains('dark-mode'));
});

// ------------------- LANGUAGE TOGGLE -------------------
function toggleLang() {
    document.querySelectorAll('[data-en]').forEach(el => {
        const current = el.innerText;
        const en = el.dataset.en;
        const es = el.dataset.es;
        el.innerText = current === en ? es : en;
    });
}

// ------------------- CALENDAR -------------------
const calendar = document.getElementById("calendar");
const monthTitle = document.getElementById("monthTitle");

let date = new Date();
let yearStart = 2026;
let yearEnd = 2030;

// Define events
const events = [
    {day:6, month:0, year:2026, title:"Servicio De Oracion", type:"event"},
    {day:13, month:0, year:2026, title:"Servicio De Oracion", type:"event"},
    {day:20, month:0, year:2026, title:"Servicio De Oracion", type:"event"},
    {day:27, month:0, year:2026, title:"Servicio De Oracion", type:"event"},
    {day:8, month:0, year:2026, title:"Oracion De Damas 7pm", type:"women"},
    {day:15, month:0, year:2026, title:"Oracion De Damas 7pm", type:"women"},
    {day:22, month:0, year:2026, title:"Oracion De Damas 7pm", type:"women"},
    {day:29, month:0, year:2026, title:"Oracion De Damas 7pm", type:"women"},
    {day:30, month:0, year:2026, title:"Gran Vigilia Congregacional", type:"event"},
    {day:11, month:0, year:2026, title:"Ayuno Congregacional", type:"event"},
    {day:3, month:0, year:2026, title:"Servicio De Adoracion", type:"event"},
    {day:10, month:0, year:2026, title:"Servicio De Adoracion", type:"event"},
    {day:17, month:0, year:2026, title:"Servicio De Adoracion", type:"event"},
    {day:31, month:0, year:2026, title:"Servicio De Adoracion", type:"event"},
    {day:24, month:0, year:2026, title:"Servicio De Adoracion Retiro Y Servicio De Damas", type:"event"}
];

function renderCalendar() {
    calendar.innerHTML = '';
    const year = date.getFullYear();
    const month = date.getMonth();
    monthTitle.innerText = date.toLocaleString("default", { month: "long", year: "numeric" });

    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month+1,0).getDate();

    // Day names
    ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"].forEach(d=>{
        const div = document.createElement('div');
        div.classList.add('day-name');
        div.innerText = d;
        calendar.appendChild(div);
    });

    // Empty spaces
    for(let i=0;i<firstDay;i++){
        const empty = document.createElement('div');
        empty.classList.add('day','empty');
        calendar.appendChild(empty);
    }

    // Days
    for(let d=1; d<=daysInMonth; d++){
        const dayDiv = document.createElement('div');
        dayDiv.classList.add('day');
        const eventToday = events.find(e=>e.day===d && e.month===month && e.year===year);
        if(eventToday){
            dayDiv.classList.add(eventToday.type);
            dayDiv.setAttribute('data-event', eventToday.title);
            // shorten display if too long
            let displayTitle = eventToday.title.length>15 ? eventToday.title.slice(0,15)+"..." : eventToday.title;
            dayDiv.innerHTML = `<span>${d}</span><small>${displayTitle}</small>`;
        } else {
            dayDiv.innerHTML = `<span>${d}</span>`;
        }
        dayDiv.addEventListener('click', ()=>{
            if(dayDiv.dataset.event){
                document.getElementById("popupText").innerText = dayDiv.dataset.event;
                document.getElementById("popup").style.display='flex';
            }
        });
        calendar.appendChild(dayDiv);
    }
}

function nextMonth(){
    if(date.getMonth()===11 && date.getFullYear()===yearEnd) return;
    date.setMonth(date.getMonth()+1);
    renderCalendar();
}

function prevMonth(){
    if(date.getMonth()===0 && date.getFullYear()===yearStart) return;
    date.setMonth(date.getMonth()-1);
    renderCalendar();
}

function closePopup(){
    document.getElementById("popup").style.display='none';
}

renderCalendar();
