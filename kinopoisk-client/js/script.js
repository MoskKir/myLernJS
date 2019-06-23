const searchForm = document.getElementById('search-form');
const movie = document.getElementById('movies');
    // apiKey ='a2ce4328762335e1bbb276de21b1278d';

searchForm.addEventListener('submit', apiSearch);


function apiSearch(event) {
    event.preventDefault();

    const searchText = document.getElementById('searchText').value,
        server = 'https://api.themoviedb.org/3/search/multi?api_key=a2ce4328762335e1bbb276de21b1278d&language=ru&query=' + searchText + '&page=1&include_adult=true';
    
    requestApi('GET', server);
}

function requestApi(method, url) {
    const request = new XMLHttpRequest();
    request.open(method, url);
    request.send();

    request.addEventListener('readystatechange', () => {
        if (request.readyState !== 4) return;

        if (request.status !== 200) {
            console.error(`error ${request.status}`);
            return;
        }
        
        const output = JSON.parse(request.responseText);

        let inner = '';

        output.results.forEach(function(item) {
            let nameItem = item.name || item.title;
            let posterPath = item.poster_path;
            let overview = item.overview;
            let releaseDate = item.release_date;

            console.log(releaseDate);

            inner += `                
                <div class="col-3 item">
                    <img src="https://image.tmdb.org/t/p/w500${posterPath}">
                    <div class="overview">
                        <h3>${nameItem}</h3>
                        <p><i class="far fa-calendar-alt"></i> ${releaseDate}</p>
                        <p>${overview}</p>
                    </div>                    
                </div>
            `;
        });

        movie.innerHTML = inner;
    });
}