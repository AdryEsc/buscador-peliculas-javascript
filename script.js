//Estos tres datos se sacan de la documentacion de la API
let apiKey = '4b3cbf9fb0742c10a9d7811a4dff966d';

let urlBase = 'https://api.themoviedb.org/3/search/movie';

let urlImg = 'https://image.tmdb.org/t/p/w200';

let resultContainer = document.getElementById('results');   //Obtenemos el div que muestra los datos de peliculas (div principal)

document.getElementById('searchButton').addEventListener('click', searchMovies); //Evento de escucha del boton y llamamos a la funcion searchMovies

function searchMovies() {
    resultContainer.innerHTML = 'Cargando...';
    let searchInput = document.getElementById('searchInput').value; //Capturamos el texto del input

    fetch(`${urlBase}?query=${searchInput}&api_key=${apiKey}`)
    .then(response => response.json())
    .then(response => displayMovies(response.results))

}

function displayMovies(movies) {
    resultContainer.innerHTML = '';
    if (movies.length === 0) {  //Si el array de la consulta es 0 (no se encontro peliculas)
        resultContainer.innerHTML = '<p> No se encontraron resultados para tu busqueda. </p>';
        return;
    }

    movies.forEach(movie => {   //Recorremos el array de peliculas (movies)
        let movieDiv = document.createElement('div'); //Creamos un nuevo div por cada pelicula
        movieDiv.classList.add('movie');    //Aplicamos el estilo css (con el id movie) al div

        //Titulo de la pelicula
        let title = document.createElement('h2');
        title.textContent = movie.title;

        //Fecha de lanzamiento
        let releaseDate = document.createElement('p');
        releaseDate.textContent = 'La fecha de lanzamiento fue: ' + movie.release_date;

        //Reseña o descripcion
        let overview = document.createElement('p');
        overview.textContent = movie.overview;

        //Imagen o poster de la pelicula
        let posterPath = urlImg + movie.poster_path;
        let poster = document.createElement('img');
        poster.src = posterPath;

        //Agregamos los elementos creados al div
        movieDiv.appendChild(poster);
        movieDiv.appendChild(title);
        movieDiv.appendChild(releaseDate);
        movieDiv.appendChild(overview);

        //Agregamos los divs al div principal
        resultContainer.appendChild(movieDiv);
    });

}