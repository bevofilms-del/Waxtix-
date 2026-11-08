document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('featured-slider')) loadFeaturedFilms();
    if (document.getElementById('movies-grid')) loadAllMovies();
    if (document.getElementById('translators-list')) loadTranslators();
});

// 1. Featured Films Slider (Buri masegonda 5)[span_6](start_span)[span_6](end_span)
function loadFeaturedFilms() {
    const featured = bevoFilmsData.content.filter(i => i.isFeatured);
    const slider = document.getElementById('featured-slider');
    if (!slider || featured.length === 0) return;

    let index = 0;
    function showSlide() {
        const item = featured[index];
        slider.innerHTML = `
            <div class="featured-card" onclick="goToPlay('${item.id}')" style="cursor:pointer;">
                <img src="${item.imageUrl}" alt="${item.title}" style="width:100%; max-height:300px; object-fit:cover;">
                <h2>${item.title}</h2>
                <p>Umusobanuzi: ${item.translator}</p>
            </div>
        `;
        index = (index + 1) % featured.length;
    }
    showSlide();
    setInterval(showSlide, 5000);
}

// 2. Kugaragaza Movies zose
function loadAllMovies() {
    const movies = bevoFilmsData.content.filter(i => i.type === 'movie');
    const container = document.getElementById('movies-grid');
    if (!container) return;

    container.innerHTML = movies.map(m => `
        <div class="card" onclick="goToPlay('${m.id}')" style="cursor:pointer; margin-bottom:15px;">
            <img src="${m.imageUrl}" alt="${m.title}" style="width:150px; height:200px; object-fit:cover;">
            <h3>${m.title}</h3>
        </div>
    `).join('');
}

// 3. Abasobanuzi (Nta foto igaragara nk'uko wabyifuje)[span_7](start_span)[span_7](end_span)
function loadTranslators() {
    const container = document.getElementById('translators-list');
    if (!container) return;

    container.innerHTML = bevoFilmsData.translators.map(t => `
        <li>🎤 ${t.name}</li>
    `).join('');
}

function goToPlay(id) {
    window.location.href = `play.html?id=${id}`;
}
