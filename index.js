//https://www.omdbapi.com/?apikey=1d17f1a4&s=Batman
const API_KEY = '1d17f1a4';
const BASE_URL = 'https://www.omdbapi.com/';
const inputE1 = document.getElementById('searchInput');
const buttonE1 = document.getElementById('searchBTN');
const resultsHeader = document.querySelector('.searched__results');
const resultsGrid = document.getElementById('movieResults');
const yearFilter    = document.getElementById('yearFilter');
const selectedRange = document.getElementById('selectedRange');
const resetBtn = document.getElementById('resetBtn');

let allMovies = []; 



function paintSlider(el) {
    const min = +el.min, max = +el.max, val = +el.value;
    const pct = ((val - min) / (max - min)) * 100;
    el.style.background = 
        `linear-gradient(to right, royalblue ${pct}%, #ddd ${pct}%)`;
}

function renderMovies(list) {
    resultsGrid.innerHTML = '';
    list.forEach(movie => {
        const poster = movie.Poster !== 'N/A'
        ? movie.Poster
        : 'placeholder.jpg';
    const card = document.createElement('div');
    card.className = 'movie-card';
    card.innerHTML = `
        <img src="${poster}" alt="${movie.Title}">
        <div class="movie-info">
            <h3>${movie.Title}</h3>
            <p>${movie.Year}</p>
        </div>
        `;
            resultsGrid.appendChild(card);
    });
}

async function fetchMovies(query) {
    const url = `${BASE_URL}?apikey=${API_KEY}&s=${encodeURIComponent(query)}`;
    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error(response.statusText);
        const { Search } = await response.json();
        return Search || [];
    } catch (err) {
        console.error('.fetchMovies error:', err);
        return [];
    }
}

async function doSearch() {
    const query = inputE1.value.trim();
    if (!query) return;
    const raw = await fetchMovies(query);

    const seen = new Set();
    allMovies = raw.filter(m => {
        if (seen.has(m.imdbID)) return false;
        seen.add(m.imdbID);
        return true;
    });

    resultsHeader.textContent = allMovies.length
        ? `Results for "${query}"`
        : `No results for "${query}"`;

    yearFilter.value = yearFilter.min;
    selectedRange.textContent = yearFilter.min;
    paintSlider(yearFilter);

    renderMovies(allMovies);   
}
yearFilter.addEventListener('input', () => {
    const year = +yearFilter.value;
    selectedRange.textContent = year;
    paintSlider(yearFilter);
    renderMovies(allMovies.filter(m => parseInt(m.Year, 10) >= year));
});

resetBtn.addEventListener('click', () => {
    yearFilter.value = yearFilter.min;
    selectedRange.textContent = yearFilter.min;
    paintSlider(yearFilter);
    renderMovies(allMovies);
});

buttonE1.addEventListener('click', doSearch);
inputE1.addEventListener('keydown', e => {
    if (e.key === 'Enter') {
        e.preventDefault();
        doSearch();
    }   
});

paintSlider(yearFilter);
selectedRange.textContent = yearFilter.value;

const menuBtn =document.querySelector(".mobile__menu--btn");


menuBtn.addEventListener("click", function (){

    const mainNav = document.querySelector(".nav__links")
    mainNav.classList.toggle("show");
})


    