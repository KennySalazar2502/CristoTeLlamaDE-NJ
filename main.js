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

// ------------------- YOUTUBE LIVE -------------------
const liveContainer = document.getElementById('liveStream');
const status = document.getElementById('status');

function showLiveVideo() {
    liveContainer.innerHTML = `
        <iframe width="100%" height="480"
            src="https://www.youtube.com/embed/live_stream?channel=@cristo-te-llama"
            frameborder="0" allowfullscreen>
        </iframe>
    `;
}

showLiveVideo();
status.style.display = 'none';
